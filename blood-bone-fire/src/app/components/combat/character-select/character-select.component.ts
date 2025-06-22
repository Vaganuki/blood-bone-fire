import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CharactersService} from '../../../services/characters.service';
import {Router, RouterLink} from '@angular/router';
import {randomInt} from 'toolzy';
import {CombatsService} from '../../../services/combats.service';

@Component({
  selector: 'app-character-select',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './character-select.component.html',
  styleUrl: './character-select.component.scss'
})
export class CharacterSelectComponent {

  numberOfPlayers = 0;
  characters: { id: number, name: string }[] = [];
  selectedCharacters: number[] = [];
  isFirstPlayerChoosing = true;

  private _characterService = inject(CharactersService);
  private _combatService = inject(CombatsService);
  private router = new Router();

  ngOnInit() {
    this.numberOfPlayers = this._combatService.playerNumber;
    this._characterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  ngAfterViewInit() {
    if (this.numberOfPlayers === 0) this.router.navigate(['/']).then();
  }

  selectCharacter(id: number) {
    const selected = this.characters.find(c => c.id === id);
    if (selected && this.selectedCharacters.length < this.numberOfPlayers) {
      this.selectedCharacters.push(selected.id);
      if (this.numberOfPlayers > 1) this.isFirstPlayerChoosing = !this.isFirstPlayerChoosing;
    } else {
      this.isFirstPlayerChoosing ? this.selectedCharacters[0] = id : this.selectedCharacters[1] = id;
      if (this.numberOfPlayers > 1) this.isFirstPlayerChoosing = !this.isFirstPlayerChoosing;
    }
  }

  isSelected(id: number): boolean {
    return this.selectedCharacters.some(c => c === id);
  }

  confirmSelection() {
    if (this._combatService.isIAfight) {
      const randomChar = randomInt(1, this.characters.length);
      this.selectedCharacters.push(randomChar);
    }
    if (this.selectedCharacters.length === 2) {
      this._combatService.saveCharacter(
        this.selectedCharacters[0],
        this.selectedCharacters[1]
      )
      this.router.navigate(['/fight']).then();
    }
  }
}
