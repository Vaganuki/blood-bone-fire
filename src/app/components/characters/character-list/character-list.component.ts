import {Component, inject, PLATFORM_ID} from '@angular/core';
import {CharactersService} from '../../../services/characters.service';
import {Character} from '../../../models/characters.model';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {CharacterCardComponent} from '../character-card/character-card.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule, CharacterCardComponent, RouterLink],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {

  private platformId = inject(PLATFORM_ID)

  characters: {id: number, name: string}[] = [];
  selectedCharacter: Character | null = null;

  constructor(private _characterService: CharactersService) {}

  ngOnInit() {
    this._characterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
    if(isPlatformBrowser(this.platformId)) {
      window.addEventListener('keydown', this.keyboardClearSelectedCharacters)
    }
  }

  ngOnDestroy() {
    if(isPlatformBrowser(this.platformId)) {
      window.removeEventListener('keydown', this.keyboardClearSelectedCharacters);
    }
  }

  selectCharacter(id: number) {
    this._characterService.getCharacter(id).subscribe(character => {
      this.selectedCharacter = character;
    });
  }

  clearSelectedCharacter() {
    this.selectedCharacter = null;
  }

  keyboardClearSelectedCharacters = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.selectedCharacter = null;
  }

  closeContainer(event: MouseEvent) {
    if(event.target === event.currentTarget) this.clearSelectedCharacter();
  }
}

