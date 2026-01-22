export type SkillType = 'physical' | 'magical' | 'special' | 'heal';
export type ScalingStat = 'strength' | 'dexterity' | 'intelligence';

export interface Skill {
  id: string;
  name: string;
  description: string;
  baseDamage: number;
  mpCost: number;
  type: SkillType;
  scalingStat?: ScalingStat;
  scalingRatio?: number;
  isCommon?: boolean;
  statusEffects?: any; // will add status later
  targetSelf?: boolean; // True for healing, buffs and stuff owo
}

export interface SkillEffect {
  damage: number;
  mpUsed: number;
  canUse: boolean;
  reason?: string; //Will be null if the skill can be used obv
  appliedEffects?: null; // will add status later
}
