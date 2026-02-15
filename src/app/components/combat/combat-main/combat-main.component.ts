import {Component, ElementRef, inject, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CharactersService} from '../../../services/characters.service';
import {Character} from '../../../models/characters.model';
import {randomInt} from 'toolzy';
import {CommonModule} from '@angular/common';
import {forkJoin, Subject, takeUntil} from 'rxjs';
import {Router, RouterLink} from '@angular/router';
import {CombatsService} from '../../../services/combats.service';
import {SkillsService} from '../../../services/skills.service';
import {Skill, SkillEffect} from '../../../models/skills.model';
import {CombatLog} from '../../../models/combat-state.model';
import {StatusEffectService} from '../../../services/status-effect.service';

@Component({
  selector: 'app-combat-main',
  imports: [CommonModule, RouterLink],
  templateUrl: './combat-main.component.html',
  styleUrl: './combat-main.component.scss'
})
export class CombatMainComponent {

  @ViewChildren('player') _playerList!: QueryList<ElementRef>;
  @ViewChild('combatLogContainer') _combatLogContainer!: ElementRef;

  private destroy$ = new Subject<void>();

  private _statusEffectService = inject(StatusEffectService);
  private _characterService = inject(CharactersService);
  private _skillsService = inject(SkillsService);
  private _combatService = inject(CombatsService);
  private _router = inject(Router);

  isIaOpponent = false;
  activePlayer: number | null = 0;
  currentTurn = 1;

  players: ElementRef[] = [];


  character1!: Character;
  character2!: Character;

  displayedSkills: Skill[] = [];
  lastSkillEffect?: SkillEffect;
  combatLog: CombatLog[] = [];

  ngOnInit() {
    if (!this._combatService.isCombatReady()) {
      this._router.navigate(['/']).then();
      return;
    }


    this._combatService.combatState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.isIaOpponent = state.isIaOpponent;
        this.activePlayer = state.activePlayerID;
        this.currentTurn = state.currentTurn;
      });
    const charactersIDs = this._combatService.getCharacterIDs();
    forkJoin([this._characterService.getCharacter(charactersIDs[0]), this._characterService.getCharacter(charactersIDs[1])])
      .subscribe(([selected1, selected2]) => {
        this.character1 = selected1;
        this.character2 = selected2;
        this.addLog({
          message: `Le combat commence entre ${this.character1.name} et ${this.character2.name} !`,
          type: 'info'
        });
        this._combatService.incrementTurn();
        this.getRandomTurnSkills();
      });
  }

  ngAfterViewInit() {
    this.players = this._playerList.toArray()
    if (this.players.length > 0) {
      this.players[0].nativeElement.classList.toggle('activePlayer');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  useSkill(skill: Skill) {
    const attacker = this.activePlayer === 0 ? this.character1 : this.character2;
    const target = this.activePlayer === 0 ? this.character2 : this.character1;

    this.lastSkillEffect = this._skillsService.applySkill(skill, attacker, target, this.currentTurn);

    if (!this.lastSkillEffect.canUse) {
      this.addLog({
        message: this.lastSkillEffect.reason || 'Impossible d\'utiliser cette compétence',
        type: 'error'
      });
      return;
    }

    if (skill.type === 'heal') {
      this.addLog({
        message: `${attacker.name} utilise ${skill.name} et récupère ${this.lastSkillEffect.damage} HP`,
        type: 'heal'
      });
    } else {
      this.addLog({
        message: `${attacker.name} utilise ${skill.name} et inflige ${this.lastSkillEffect.damage} dégats à ${target.name}`,
        type: 'damage'
      });
    }

    if (this.lastSkillEffect.appliedEffects && this.lastSkillEffect.appliedEffects.length > 0) {
      this.lastSkillEffect.appliedEffects.forEach(effect => {
        const effectTarget = skill.targetSelf ? attacker : target;
        this.addLog({
          message: `${effectTarget.name} est affecté par ${effect.name} !`,
          type: 'status'
        });
      });
    }

    if (target.stats.hp <= 0) {
      this.endCombat(attacker);
      return;
    }
    if (this.isIaOpponent && this.activePlayer === 0) {
      this.aiTurn()
    } else {
      this.switchPlayer();
    }
  }

  getRandomTurnSkills() {
    const player = this.activePlayer === 0 ? this.character1 : this.character2;
    this.displayedSkills = this._skillsService.getRandomTurnSkills(player);

    const usableSkills = this.displayedSkills.filter(skill => this._skillsService.canUseSkill(skill, player).canUse);
    if (usableSkills.length === 0) {
      this.addLog({
        message: `${player.name} ne peut pas agir !`,
        type: 'info'
      });
      this.switchPlayer();
      return;
    }
  }

  canUseSkill(skill: Skill): boolean {
    const attacker = this.activePlayer === 0 ? this.character1 : this.character2;
    return this._skillsService.canUseSkill(skill, attacker).canUse;
  }

  getSkillEffect(skill: Skill): SkillEffect {
    const attacker = this.activePlayer === 0 ? this.character1 : this.character2;
    return this._skillsService.canUseSkill(skill, attacker);
  }

  private switchPlayer() {
    this.players[0].nativeElement.classList.toggle('activePlayer');
    this.players[1].nativeElement.classList.toggle('activePlayer');

    this._combatService.switchActivePlayer();

    if (this.activePlayer === 0) {
      this._combatService.incrementTurn();
      this.addLog({
        message: `--- Tour ${this.currentTurn} ---`,
        type: 'info'
      });
    }

    const currentCharacter = this.activePlayer === 0 ? this.character1 : this.character2

    const statusResult = this._statusEffectService.processStatusEffects(currentCharacter);
    statusResult.forEach(status => {
      this.addLog(status);
    })

    if (currentCharacter.stats.hp <= 0) {
      const winner = this.activePlayer === 0 ? this.character1 : this.character2;
      this.endCombat(winner);
      return;
    }

    const expiredEffect = this._statusEffectService.decrementStatusEffects(currentCharacter);
    expiredEffect.forEach(status => {
      this.addLog(status);
    });

    const mpRegen = this._skillsService.regenerateMP(currentCharacter);
    if (mpRegen > 0) {
      this.addLog({
        message: `${currentCharacter.name} régénère ${mpRegen} MP`,
        type: 'info'
      });
    }

    this.getRandomTurnSkills();
  }

  private aiTurn() {
    this.switchPlayer();

    const aiSkills = this._skillsService.getRandomTurnSkills(this.character2);

    const usableSkills = aiSkills.filter(skill => this._skillsService.canUseSkill(skill, this.character2).canUse);
    if (usableSkills.length === 0) {
      this.addLog({
        message: `${this.character2.name} ne peut pas agir !`,
        type: 'info'
      });
      this.switchPlayer();
      return;
    }

    const randomSkill = usableSkills[Math.floor(Math.random() * usableSkills.length)];
    this.lastSkillEffect = this._skillsService.applySkill(
      randomSkill,
      this.character2,
      this.character1,
      this.currentTurn
    );

    if (randomSkill.type === 'heal') {
      this.addLog({
        message: `${this.character2.name} utilise ${randomSkill.name} et récupère ${this.lastSkillEffect.damage} HP !`,
        type: 'heal'
      });
    } else {
      this.addLog({
        message: `${this.character2.name} utilise ${randomSkill.name} et inflige ${this.lastSkillEffect.damage} dégâts !`,
        type: 'damage'
      });
    }

    if (this.lastSkillEffect.appliedEffects && this.lastSkillEffect.appliedEffects.length > 0) {
      this.lastSkillEffect.appliedEffects.forEach(effect => {
        const effectTarget = randomSkill.targetSelf ? this.character2 : this.character1;
        this.addLog({
          message: `${effectTarget.name} est affecté par ${effect.name} !`,
          type: 'status'
        });
      });
    }


    if (this.character1.stats.hp <= 0) {
      this.endCombat(this.character2);
      return;
    }

    this.switchPlayer();
  }

  getHpBarColor(currentHp: number, maxHp: number): string {
    const percentage = (currentHp / maxHp) * 100;
    if(percentage >= 75) return 'green';
    if(percentage >= 50) return 'orange';
    if(percentage >= 25) return 'red';
    return 'crimson';
  }

  private endCombat(winner: Character) {
    this.addLog({
      message: `${winner.name} remporte le combat!`,
      type: 'info'
    });
    this._combatService.setWinnerID(winner.id);
    this._router.navigate(['/ending-screen']).then();
  }

  private addLog(log: CombatLog) {
    this.combatLog.push(log);
    setTimeout(()=>{
      if (this._combatLogContainer) this._combatLogContainer.nativeElement.scrollTop = this._combatLogContainer.nativeElement.scrollHeight;
    },0);
  }
}
