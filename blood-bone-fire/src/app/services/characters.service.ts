import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {inject} from '@angular/core';
import {Character} from '../models/characters.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CharactersService {

  private readonly _http = inject(HttpClient);
  private baseUrl = 'assets/data/characters';

  constructor() {
  }

  getCharacter(id: number): Observable<Character> {
    return this._http.get<Character>(`${this.baseUrl}/dev-character-${id}.json`);
  }

  getAllCharacters(): Observable<{ id: number, name: string }[]> {
    return this._http.get<{ id: number, name: string }[]>(`${this.baseUrl}/all-characters.json`);
  }

}
