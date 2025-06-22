import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CombatsService {

  playerNumber = 0;
  savedCharacters: number[] = [];
  isIAfight: boolean = false;
  victoriousCharacter = 0;

  soloPlayer() {
    this.playerNumber = 1;
    this.isIAfight = true;
  }

  twoPlayers() {
    this.playerNumber = 2;
  }

  saveVictoriousCharacter(id: number) {
    this.victoriousCharacter = id;
  }

  saveCharacter(left: number, right: number) {
    this.savedCharacters.push(left);
    this.savedCharacters.push(right);
  }

  getSavedCharactersIDs() {
    return this.savedCharacters;
  }

  fullReset() {
    this.resetSelectedCharacters();
    this.resetIAselect();
    this.resetPlayerNumber();
    this.resetVictoriousCharacter();
  }

  resetPlayerNumber() {
    this.playerNumber = 0;
  }

  resetSelectedCharacters() {
    this.savedCharacters = [];
  }

  resetIAselect() {
    this.isIAfight = false;
  }

  resetVictoriousCharacter() {
    this.victoriousCharacter = 0;
  }
}
