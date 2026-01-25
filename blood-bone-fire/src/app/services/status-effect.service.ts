import {Injectable} from '@angular/core';
import {Character} from '../models/characters.model';
import {StatusEffect, StatusEffectType} from '../models/status-effect.model';
import {CombatLog} from '../models/combat-state.model';
import {randomInt} from 'toolzy';

@Injectable({providedIn: 'root'})
export class StatusEffectService {

  applyStatusEffects(character: Character, effect: StatusEffect, currentTurn: number) {

    const existingEffect = character.statusEffects.find(e => e.type === effect.type);

    if (existingEffect) {
      existingEffect.remainingDuration = effect.duration;
      existingEffect.potency = Math.max(existingEffect.potency, effect.potency);
      existingEffect.appliedAt = currentTurn;
    } else {
      character.statusEffects.push({
        ...effect,
        appliedAt: currentTurn,
        remainingDuration: effect.duration,
      });
    }

    this.applyStatModifications(character);
  }

  processStatusEffects(character: Character): CombatLog[] {
    let totalDamage = 0;
    let totalHealing = 0;
    let logs: CombatLog[] = [];

    character.statusEffects.forEach(effect => {
      switch (effect.type) {
        case 'poison':
          const poisonDamage= Math.ceil(character.stats.hp * effect.potency);
          totalDamage += poisonDamage;
          logs.push({message: `${character.name} subit ${poisonDamage} dégats de poison !`, type: 'damage'});
          break;
        case 'burn':
          totalDamage += effect.potency;
          logs.push({message: `${character.name} subit ${effect.potency} dégats de brûlure !`, type: 'damage'});
          break;
        case 'regen':
          totalHealing += effect.potency;
          logs.push({message: `${character.name} récupère ${effect.potency} HP !`, type: 'heal'});
          break;
      }
    });

    character.stats.hp = Math.max(0, character.stats.hp - totalDamage);
    character.stats.hp = Math.min(character.stats.hp + totalHealing, character.stats.maxHp);

    return logs;
  }

  decrementStatusEffects(character: Character): CombatLog[] {
    const expiredLogs: CombatLog[] = [];
    character.statusEffects = character.statusEffects.filter(effect => {
      effect.remainingDuration --;

      if (effect.remainingDuration <= 0) {
        expiredLogs.push({message:`${effect.name} s'est dissipé sur ${character.name}`,type:'info'});
        return false;
      }
      return true;
    });

    this.applyStatModifications(character);

    return expiredLogs;
  }


  private applyStatModifications(character: Character): void {
    character.stats.strength = character.baseStats.strength;
    character.stats.dexterity = character.baseStats.dexterity;
    character.stats.intelligence = character.baseStats.intelligence;

    character.statusEffects.forEach(effect => {
      switch (effect.type) {
        case 'weaken':
          character.stats.strength = Math.max(1, character.stats.strength - effect.potency);
          break;
        case 'slow':
        case 'freeze':
          character.stats.dexterity = Math.max(1, character.stats.dexterity - effect.potency);
          break;
        case 'boost_str':
          character.stats.strength += effect.potency;
          break;
        case "boost_dex":
          character.stats.dexterity += effect.potency;
          break;
        case "boost_int":
          character.stats.intelligence += effect.potency;
          break;
      }
    });
  }

  canAct(character: Character): {canAct: boolean, reason?: string} {
    const stunEffect = character.statusEffects.find(effect => effect.type === 'stun');
    if (stunEffect) {
      return {canAct: false, reason: `${character.name} est étourdi !`};
    }

    const freezeEffect = character.statusEffects.find(effect => effect.type === 'freeze');
    if (freezeEffect) {
      const isLucky = randomInt(0, 100) % 2 !== 0;

      if (isLucky) {
        return {canAct: true}
      } else {
        return {canAct: false, reason: `${character.name} ne peut agir à cause du gel`};
      }
    }

    return {canAct: true};
  }

  canUseMagic(character: Character): boolean {
    return !character.statusEffects.find(effect => effect.type === 'silence');
  }

  clearAllEffects(character: Character): void {
    character.statusEffects = [];
    this.applyStatModifications(character);
  }

  removeEffect(character: Character, effectType : StatusEffectType): void {
    character.statusEffects = character.statusEffects.filter(effect => effect.type === effectType);
    this.applyStatModifications(character);
  }
}
