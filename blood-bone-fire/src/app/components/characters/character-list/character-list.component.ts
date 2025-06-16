import { Component } from '@angular/core';
import {CharactersService} from '../../../services/characters.service';
import {Character} from '../../../models/characters.model';
import {CommonModule} from '@angular/common';
import {CharacterCardComponent} from '../character-card/character-card.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule, CharacterCardComponent, RouterLink],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {

  characters: {id: number, name: string}[] = [];
  selectedCharacter?: Character;

  constructor(private characterService: CharactersService) {}

  ngOnInit() {
    this.characterService.getAllCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

  selectCharacter(id: number) {
    this.characterService.getCharacter(id).subscribe(character => {
      this.selectedCharacter = character;
    });
  }
}

