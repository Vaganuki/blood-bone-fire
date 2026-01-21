import {Injectable} from '@angular/core';
import {Character} from '../models/characters.model';
import {Observable, of, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CharactersService {

  private characterList: Character[] = [
    {
      "id": 1,
      "name": "Dev 1",
      "stats": {
        "hp": 120,
        "mp": 50,
        "strength": 15,
        "dexterity": 12,
        "intelligence": 14
      },
      "skills": [
        "attack 1",
        "attack 2",
        "attack 3",
        "attack 4",
        "attack 5",
        "attack 6",
        "attack 7",
        "attack 8",
        "attack 9",
        "attack 10"
      ]
    },
    {
      "id": 2,
      "name": "Dev 2",
      "stats": {
        "hp": 100,
        "mp": 70,
        "strength": 15,
        "dexterity": 12,
        "intelligence": 20
      },
      "skills": [
        "dev attack 1",
        "dev attack 2",
        "dev attack 3",
        "dev attack 4",
        "dev attack 5",
        "dev attack 6",
        "dev attack 7",
        "dev attack 8",
        "dev attack 9",
        "dev attack 10"
      ]
    },
    {
      "id": 3,
      "name": "Dev 3",
      "stats": {
        "hp": 800,
        "mp": 1000,
        "strength": 1500,
        "dexterity": 120,
        "intelligence": 200
      },
      "skills": [
        "dev 1",
        "dev 2",
        "dev 3",
        "dev 4",
        "dev 5",
        "dev 6",
        "dev 7",
        "dev 8",
        "dev 9",
        "dev 10"
      ]
    }
  ]


  constructor() {}

  getCharacter(id: number):Observable<Character> {
    const character = this.characterList.find(c => c.id === id);
    if(!character) {
      return throwError(() => new Error("Character not found"));
    }

    return of({
      ...character,
      stats:{...character.stats},
      baseStats:{...character.baseStats},
      statusEffects:[],
    });

  }

  getAllCharacters(): Observable<{ id: number, name: string }[]> {
    const allCharacters = this.characterList.map(c => ({
      id: c.id,
      name: c.name,
    }));
    return of(allCharacters);
  }

  createCombatInstance(id: number): Observable<Character> {
    return this.getCharacter(id);
  }
}
