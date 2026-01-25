export type GameMode = 'solo' | 'versus' | null;

export interface CombatState {
  gameMode: GameMode;
  player1CharacterID: number | null;
  player2CharacterID: number | null;
  isIaOpponent: boolean;
  currentTurn: number;
  activePlayerID: number | null;
  winnerID: number | null;
}

export interface CombatLog {
  message: string;
  type: 'damage' | 'heal' | 'status' | 'info' | 'error';
}

export const INITIAL_COMBAT_STATE: CombatState = {
  gameMode:null,
  player1CharacterID: null,
  player2CharacterID: null,
  isIaOpponent: false,
  currentTurn: 0,
  activePlayerID: 0,
  winnerID: null,
};

