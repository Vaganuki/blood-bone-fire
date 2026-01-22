import {Injectable} from '@angular/core';
import {CombatState, GameMode, INITIAL_COMBAT_STATE} from '../models/combat-state.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CombatsService {

  private _combatState$ = new BehaviorSubject<CombatState>(INITIAL_COMBAT_STATE);

  public combatState$ = this._combatState$.asObservable()

  get currentState(): CombatState {
    return this._combatState$.value;
  }

  get gameMode(): GameMode {
    return this.currentState.gameMode;
  }

  get isIaOpponent(): boolean {
    return this.currentState.isIaOpponent;
  }

  get player1CharacterID(): number | null {
    return this.currentState.player1CharacterID;
  }

  get player2CharacterID(): number | null {
    return this.currentState.player2CharacterID;
  }

  get winnerID(): number | null {
    return this.currentState.winnerID;
  }

  get numberOfPlayers(): number {
    return this.gameMode === 'versus' ? 2 : this.gameMode === 'solo' ? 1 : 0;
  }

  // SOLO GAME INIT
  initSoloGame(): void {
    this.updateState({
      gameMode: 'solo',
      isIaOpponent: true,
      player1CharacterID: null,
      player2CharacterID: null,
      currentTurn: 0,
      activePlayerID: 0,
      winnerID: null,
    })
  }

  // PvP GAME INIT
  initVersusGame(): void {
    this.updateState({
      gameMode: 'versus',
      isIaOpponent: false,
      player1CharacterID: null,
      player2CharacterID: null,
      currentTurn: 0,
      activePlayerID: 0,
      winnerID: null,
    })
  }

  setCharacters(player1ID: number, player2ID: number): void {
    this.updateState({
      ...this.currentState,
      player1CharacterID: player1ID,
      player2CharacterID: player2ID,
    });
  }

  setWinnerID(winnerID: number): void {
    this.updateState({
      ...this.currentState,
      winnerID: winnerID,
    });
  }

  incrementTurn(): void {
    this.updateState({
      ...this.currentState,
      currentTurn: this.currentState.currentTurn + 1,
    });
  }

  switchActivePlayer(): void {
    this.updateState({
      ...this.currentState,
      activePlayerID: this.currentState.activePlayerID === 0 ? 1 : 0,
    });
  }

  //Check if user didn't go through from url
  isCombatReady(): boolean {
    return (this.currentState.gameMode !== null && this.currentState.player1CharacterID !== null && this.currentState.player2CharacterID !== null);
  }

  //Check if when can go to character select (same as previous function)
  canSelectCharacters(): boolean {
    return this.currentState.gameMode !== null;
  }

  fullReset(): void {
    this._combatState$.next(INITIAL_COMBAT_STATE);
  }

  //State updater
  private updateState(newState: CombatState): void {
    this._combatState$.next(newState);
  }

  getCharacterIDs(): number[] {
    const IDs: number[] = [];
    if (this.player1CharacterID !== null) IDs.push(this.player1CharacterID);
    if (this.player2CharacterID !== null) IDs.push(this.player2CharacterID);
    return IDs;
  }
}
