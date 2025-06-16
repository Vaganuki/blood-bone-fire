import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {CharactersService} from '../../../services/characters.service';
import {Character} from '../../../models/characters.model';
import {randomInt} from 'toolzy';
import {CommonModule} from '@angular/common';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-combat-main',
  imports: [CommonModule],
  templateUrl: './combat-main.component.html',
  styleUrl: './combat-main.component.scss'
})
export class CombatMainComponent {

  @ViewChildren('player') _playerList!: QueryList<ElementRef>;
  activePlayer = 0;
  players: ElementRef[] = [];

  idPlayer1 = 1;
  idPlayer2 = 2;

  character1: Character = {
    id:0,
    name:'Char1',
    stats:{
      hp:0,
      dexterity:0,
      intelligence:0,
      strength:0,
      mp:0
    },
    skills:[]
  };
  character2: Character = {
    id:0,
    name:'Char2',
    stats:{
      hp:0,
      dexterity:0,
      intelligence:0,
      strength:0,
      mp:0
    },
    skills:[]
  };

  displayedSkills: string[] = [];

  constructor(private characterService: CharactersService) {
  }

  ngAfterViewInit() {
    this.players = this._playerList.toArray();
    this.players[0].nativeElement.classList.toggle('activePlayer');

    forkJoin([this.characterService.getCharacter(this.idPlayer1), this.characterService.getCharacter(this.idPlayer2)]).subscribe(([character1, character2] ) => {

      this.character1 = character1;
      this.character2 = character2;
      this.getRandomTurnSkills(this.activePlayer);
    });
  }

  attack() {
    this.players[0].nativeElement.classList.toggle('activePlayer');
    this.players[1].nativeElement.classList.toggle('activePlayer');

    const target = this.activePlayer === 0 ? this.character2 : this.character1;
    target.stats.hp-=25;

    this.activePlayer = this.activePlayer === 0 ? 1 : 0;

    this.getRandomTurnSkills(this.activePlayer);
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
