export interface Character {
  id: number;
  name: string;
  stats:CharacterStats;
  skills: string[];
}
export interface CharacterStats{
  hp: number;
  mp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
}
