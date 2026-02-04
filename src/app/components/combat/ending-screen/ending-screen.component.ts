import {Component, inject} from '@angular/core';
import {CombatsService} from '../../../services/combats.service';
import {CharactersService} from '../../../services/characters.service';
import {Router, RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {Character} from '../../../models/characters.model';
import {CHARACTERS_DATA} from '../../../datas/characters.data';

@Component({
  selector: 'app-ending-screen',
  imports: [
    RouterLink
  ],
  templateUrl: './ending-screen.component.html',
  styleUrl: './ending-screen.component.scss'
})
export class EndingScreenComponent {
  private _combatService = inject(CombatsService);
  private _router = inject(Router);
  private _characterService = inject(CharactersService);
  private characterList: Character[] = CHARACTERS_DATA;

  winnerName: string = '';

  ngOnInit() {
    const winnerID = this._combatService.winnerID;
    const character = this.characterList.find(c => c.id === winnerID);
    if (character) {
      this.winnerName = character.name;
    }
  }

}
