import {Injectable} from '@angular/core';
import {Character} from '../models/characters.model';
import {Observable, of, throwError} from 'rxjs';
import {CHARACTERS_DATA} from '../datas/characters.data';

@Injectable({providedIn: 'root'})
export class CharactersService {

  private characterList: Character[] = CHARACTERS_DATA;

  getCharacter(id: number):Observable<Character> {
    const character = this.characterList.find(c => c.id === id);
    if(!character) {
      return throwError(() => new Error("Character not found"));
    }

    return of({
      ...character,
      stats:{...character.stats},
      baseStats:{...character.baseStats},
      statusEffects:null,
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
