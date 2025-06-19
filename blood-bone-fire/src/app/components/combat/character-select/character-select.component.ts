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

  private _characterService = inject(CharactersService);
  private _combatService = inject(CombatsService);
  private router = new Router();

  ngOnInit() {
    this.numberOfPlayers = this._combatService.getPlayerNumber();
    this._characterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  ngAfterViewInit() {
    if (this.numberOfPlayers === 0) this.router.navigate(['/']).then();
  }

  selectCharacter(id: number) {
    const alreadySelected = this.selectedCharacters.find(c => c === id);
    if (alreadySelected) {
      return;
    }
    const selected = this.characters.find(c => c.id === id);
    if (selected && this.selectedCharacters.length < this.numberOfPlayers) {
      this.selectedCharacters.push(selected.id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedCharacters.some(c => c === id);
  }

  confirmSelection() {
    if (this.numberOfPlayers === 1) {
      const randomChar = randomInt(0, this.characters.length - 1);
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
