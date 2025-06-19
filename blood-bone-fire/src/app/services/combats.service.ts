import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CombatsService {

  playerNumber = 0;
  savedCharacters: number[] = [];

  soloPlayer() {
    this.playerNumber = 1;
  }

  twoPlayers() {
    this.playerNumber = 2;
  }

  getPlayerNumber() {
    return this.playerNumber;
  }

  saveCharacter(left: number, right: number) {
    this.savedCharacters.push(left);
    this.savedCharacters.push(right);
    console.log(this.savedCharacters);
  }
  getSavedCharactersIDs() {
    return this.savedCharacters;
  }
}
