export interface CharacterStats{
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
}

export interface Character {
  id: number;
  name: string;
  stats:CharacterStats;
  baseStats: CharacterStats;
  statusEffects: [] | null; //TODO Will add status later on
  mpRegenPerTurn: number;
}
