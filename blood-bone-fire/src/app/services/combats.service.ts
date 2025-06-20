import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CombatsService {

  playerNumber = 0;
  savedCharacters: number[] = [];
  isIAfight: boolean = false;

  soloPlayer() {
    this.playerNumber = 1;
    this.isIAfight = true;
  }

  twoPlayers() {
    this.playerNumber = 2;
  }

  saveCharacter(left: number, right: number) {
    this.savedCharacters.push(left);
    this.savedCharacters.push(right);
    console.log(this.savedCharacters);
  }
  getSavedCharactersIDs() {
    return this.savedCharacters;
  }

  fullReset(){
    this.resetSelectedCharacters();
    this.resetIAselect();
    this.resetPlayerNumber();
  }

  resetPlayerNumber() {
    this.playerNumber = 0;
  }

  resetSelectedCharacters() {
    this.savedCharacters = [];
  }
  resetIAselect(){
    this.isIAfight = false;
  }
}
