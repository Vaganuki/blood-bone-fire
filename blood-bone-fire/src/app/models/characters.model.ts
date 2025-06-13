export interface Character {
  id: number;
  name: string;
  stats:{
    hp: number;
    mp: number;
    strength: number;
    dexterity: number;
    intelligence: number;
  };
  skills: string[];
}
