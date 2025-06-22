import {Component, ElementRef, inject, QueryList, ViewChildren} from '@angular/core';
import {CharactersService} from '../../../services/characters.service';
import {Character} from '../../../models/characters.model';
import {randomInt} from 'toolzy';
import {CommonModule} from '@angular/common';
import {forkJoin} from 'rxjs';
import {Router, RouterLink} from '@angular/router';
import {CombatsService} from '../../../services/combats.service';

@Component({
  selector: 'app-combat-main',
  imports: [CommonModule, RouterLink],
  templateUrl: './combat-main.component.html',
  styleUrl: './combat-main.component.scss'
})
export class CombatMainComponent {

  @ViewChildren('player') _playerList!: QueryList<ElementRef>;

  private _characterService = inject(CharactersService);
  private _combatService = inject(CombatsService);
  private _router = inject(Router);


  numberOfPlayers = this._combatService.playerNumber;
  selectedCharactersIDs: number[] = [];
  activePlayer = 0;

  players: ElementRef[] = [];

  character1: Character = {
    id: 0,
    name: 'Char1',
    stats: {
      hp: 0,
      dexterity: 0,
      intelligence: 0,
      strength: 0,
      mp: 0
    },
    skills: []
  };
  character2: Character = {
    id: 0,
    name: 'Char2',
    stats: {
      hp: 0,
      dexterity: 0,
      intelligence: 0,
      strength: 0,
      mp: 0
    },
    skills: []
  };

  displayedSkills: string[] = [];


  ngOnInit() {
    if (this.numberOfPlayers === 0) this._router.navigate(['/']).then();
    this.selectedCharactersIDs = this._combatService.getSavedCharactersIDs();
    forkJoin([this._characterService.getCharacter(this.selectedCharactersIDs[0]), this._characterService.getCharacter(this.selectedCharactersIDs[1])]).subscribe(([character1, character2]) => {
      this.character1 = {...character1, stats: {...character1.stats}};
      this.character2 = {...character2, stats: {...character2.stats}};
      this.getRandomTurnSkills(this.activePlayer);
    });
  }

  ngAfterViewInit() {
    this.players = this._playerList.toArray();
    this.players[0].nativeElement.classList.toggle('activePlayer');
  }

  attack() {

    const target = this.activePlayer === 0 ? this.character2 : this.character1;
    target.stats.hp -= 25;
    if (target.stats.hp <= 0) {
      this._combatService.saveVictoriousCharacter(this.selectedCharactersIDs[this.activePlayer]);
      this._router.navigate(['/ending-screen']).then();
    } else {
      if (!this._combatService.isIAfight) {
        this.players[0].nativeElement.classList.toggle('activePlayer');
        this.players[1].nativeElement.classList.toggle('activePlayer');
        this.activePlayer = this.activePlayer === 0 ? 1 : 0;
      } else {
        this.character1.stats.hp -= 25;
      }
      this.getRandomTurnSkills(this.activePlayer);
    }
  }

  getRandomTurnSkills(playerId: number) {
    const player = playerId === 1 ? this.character2 : this.character1;
    const selectedSkillsIndex: number[] = [];
    const selectedSkillsName: string[] = [];
    for (let i = 0; i < 4; i++) {
      const random = randomInt(0, player!.skills.length - 1);
      const randomIsSelected = selectedSkillsIndex.includes(random);
      if (!randomIsSelected) {
        selectedSkillsIndex.push(random);
        selectedSkillsName.push(player!.skills[random]);
      } else {
        i--;
      }
    }
    this.displayedSkills = selectedSkillsName;
  }
}
