import {Character} from '../models/characters.model';

export const CHARACTERS_DATA: Character[] = [
  {
    id: 1,
    name: 'Dev01',
    stats: {
      hp: 120,
      maxHp: 120,
      mp: 50,
      maxMp: 50,
      strength: 15,
      dexterity: 15,
      intelligence: 15,
    },
    baseStats:{
      hp: 120,
      maxHp: 120,
      mp: 50,
      maxMp: 50,
      strength: 15,
      dexterity: 15,
      intelligence: 15,
    },
    statusEffects: [],
    mpRegenPerTurn: 5,
  },
  {
    id: 2,
    name: 'Lhelfic',
    stats: {
      hp: 100,
      maxHp: 100,
      mp: 70,
      maxMp: 70,
      strength: 12,
      dexterity: 16,
      intelligence: 20,
    },
    baseStats:{
      hp: 100,
      maxHp: 100,
      mp: 70,
      maxMp: 70,
      strength: 12,
      dexterity: 16,
      intelligence: 20,
    },
    statusEffects: [],
    mpRegenPerTurn: 10,
  },
];
