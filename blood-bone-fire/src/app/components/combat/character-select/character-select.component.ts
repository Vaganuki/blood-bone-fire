import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CharactersService} from '../../../services/characters.service';
import {Router, RouterLink} from '@angular/router';
import {Character} from '../../../models/characters.model';
import {randomInt} from 'toolzy';

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

  characters: { id: number, name: string }[] = [];
  selectedCharacters: number[] = [];
  numberOfPlayers = 1;

  private _characterService = inject(CharactersService);
  private _router = inject(Router);


  constructor() {
    const nav = this._router.getCurrentNavigation();
    this.numberOfPlayers = nav?.extras?.state?.['numberOfPlayers'] || 1;
  }

  ngOnInit() {
    this._characterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
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
    if (this.selectedCharacters.length === this.numberOfPlayers) {
      this._router.navigate(['/fight'], {state: {players: this.selectedCharacters}}).then();
    }
  }

  // if (this.numberOfPlayers === 1) {
  //     const randomChar = randomInt(0, this.characters.length - 1);
  //     const alreadySelected = this.selectedCharacters.find(c => c === randomChar);
  //
  // }
}
