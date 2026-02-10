import {Character} from '../models/characters.model';

export const CHARACTERS_DATA: Character[] = [
  {
    id: 1,
    name: 'Dev01',
    stats: {
      hp: 200,
      maxHp: 200,
      mp: 92,
      maxMp: 92,
      strength: 16,
      dexterity: 16,
      intelligence: 16,
    },
    baseStats: {
      hp: 200,
      maxHp: 200,
      mp: 92,
      maxMp: 92,
      strength: 16,
      dexterity: 16,
      intelligence: 16,
    },
    statusEffects: [],
    mpRegenPerTurn: 12,
  },
  {
    id: 2,
    name: 'Lhelfic',
    stats: {
      hp: 160,
      maxHp: 160,
      mp: 110,
      maxMp: 110,
      strength: 12,
      dexterity: 16,
      intelligence: 20,
    },
    baseStats: {
      hp: 160,
      maxHp: 160,
      mp: 110,
      maxMp: 110,
      strength: 12,
      dexterity: 16,
      intelligence: 20,
    },
    statusEffects: [],
    mpRegenPerTurn: 15,
  },
  {
    id: 3,
    name: 'Mozarrelli le conquérant',
    stats: {
      hp: 290,
      maxHp: 290,
      mp: 61,
      maxMp: 61,
      strength: 28,
      dexterity: 10,
      intelligence: 2,
    },
    baseStats: {
      hp: 290,
      maxHp: 290,
      mp: 61,
      maxMp: 61,
      strength: 28,
      dexterity: 10,
      intelligence: 2,
    },
    statusEffects: [],
    mpRegenPerTurn: 6,
  },
  {
    id: 4,
    name: 'Criminou',
    stats: {
      hp: 150,
      maxHp: 150,
      mp: 106,
      maxMp: 106,
      strength: 10,
      dexterity: 18,
      intelligence: 18,
    },
    baseStats: {
      hp: 150,
      maxHp: 150,
      mp: 106,
      maxMp: 106,
      strength: 10,
      dexterity: 18,
      intelligence: 18,
    },
    statusEffects: [],
    mpRegenPerTurn: 14,
  },
  {
    id: 5,
    name: 'Skyy',
    stats: {
      hp: 120,
      maxHp: 120,
      mp: 108,
      maxMp: 108,
      strength: 10,
      dexterity: 13,
      intelligence: 24,
    },
    baseStats: {
      hp: 120,
      maxHp: 120,
      mp: 108,
      maxMp: 108,
      strength: 10,
      dexterity: 13,
      intelligence: 24,
    },
    statusEffects: [],
    mpRegenPerTurn: 13,
  }
];

// HOW TO BALANCE CHARACTERS :
/*
HP = 100 + (STR * 5) + ARCHETYPE
MP = 50 + (INT *2)
MP REGEN = 5 + (INT/3) + ARCHETYPE

ARCHETYPES BONUSES:

- Tank:
  - + 50 HP
  - + 5 MP
  - + 0  MP REGEN

- Balanced :
  - + 20 HP
  - + 10 MP
  - + 1  MP REGEN

- Mage/Assassin:
  - + 0 HP
  - + 20 MP
  - + 3 MP REGEN

- Glass Cannon :
  - - 20 HP
  - + 10 MP
  - - 1  MP REGEN
*/
