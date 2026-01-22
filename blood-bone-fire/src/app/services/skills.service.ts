import {Skill, SkillEffect} from '../models/skills.model';
import {Character} from '../models/characters.model';
import {StatusEffectsService} from './status-effects.service';
import {CHARACTER_SKILLS, COMMON_SKILLS} from '../datas/skills.data';
import {inject, Injectable} from '@angular/core';
import {randomInt} from 'toolzy';

@Injectable({providedIn: 'root'})
export class SkillsService {

  private _statusEffectService = inject(StatusEffectsService);

  getCharacterSkills(characterId: number): Skill[] {
    const specificSkills = CHARACTER_SKILLS[characterId] || [];
    return [...COMMON_SKILLS, ...specificSkills];
  }

  getRandomTurnSkills(character: Character): Skill[] {
    const allSkills = this.getCharacterSkills(character.id);
    const selectedSkills: Skill[] = [];
    const usedIndices = new Set<number>();

    while (selectedSkills.length < 4 && usedIndices.size < allSkills.length) {
      const randomIndex = randomInt(0, allSkills.length - 1);

      //If the skill wasn't added then add it
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selectedSkills.push(allSkills[randomIndex]);
      }
    }

    return selectedSkills;
  }


  calculateDamage(skill: Skill, attacker: Character): number {

    let totalDamage = skill.baseDamage;

    if (skill.scalingStat && skill.scalingRatio) {
      const statValue = attacker.stats[skill.scalingStat];
      const scalingBonus = Math.floor(statValue * skill.scalingRatio);
      totalDamage += scalingBonus;
    }

    return skill.type === 'heal' ? totalDamage : Math.max(0, totalDamage);
  }

  canUseSkill(skill: Skill, attacker: Character): SkillEffect {
    const canActCheck = this._statusEffectService.canAct(attacker);

    if (!canActCheck.canAct) {
      return {
        damage: 0,
        mpUsed: 0,
        canUse: false,
        reason: canActCheck.reason,
      };
    }

    //TODO check if silenced effect later

    //checking MPs
    const canUse = attacker.stats.mp >= skill.mpCost;
    const damage = this.calculateDamage(skill, attacker);

    return {
      damage: Math.abs(damage),
      mpUsed: skill.mpCost,
      canUse,
      reason: canUse ? undefined : 'Not enough MP',
      appliedEffects: null, //will add status later
    }
  }

  applySkill(skill: Skill, attacker: Character, target: Character, currentTurn: number): SkillEffect {
    const effect = this.canUseSkill(skill, attacker);

    if (!effect.canUse) {
      return effect;
    }

    attacker.stats.mp -= skill.mpCost; // deduction of MPs

    const actualTarget = skill.targetSelf ? attacker : target; //Checking for buffs/heals

    if (skill.type === 'heal') {
      //Apply healing but no hover healing
      actualTarget.stats.hp = Math.min(
        actualTarget.stats.hp + effect.damage,
        actualTarget.stats.maxHp
      );
    } else {
      actualTarget.stats.hp -= effect.damage;
    }

    //TODO add status effects here later

    return effect;
  }

  regenerateMP(character: Character): number {
    const mpBefore = character.stats.mp;
    character.stats.mp = Math.min(
      character.stats.mp + character.mpRegenPerTurn,
      character.stats.maxMp
    );
    return character.stats.mp - mpBefore;
  }
}
