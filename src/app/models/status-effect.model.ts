export type StatusEffectType =
  'poison' | //DMG by hp% overtime
  'burn' |  //DMG flat overtime
  'regen' | //Flat heal overtime (Maybe I'll look into making hp% later)
  'stun' |  //Turn skip
  'freeze' | //Turn skip chance + low dex
  'slow' | //Lower dex
  'weaken' | //Lower strength
  'silence' | //Can't use magic anymore
  'boost_str' | //Higher strength
  'boost_int' | //Higher intelligence
  'boost_dex'; //Higher dex

export interface StatusEffect {
  type: StatusEffectType;
  name: string;
  description: string;
  duration: number; //Duration in turns
  potency: number;
  icon?: string; //Maybe for later TODO sort of
}

export interface ActiveStatusEffect extends StatusEffect {
  appliedAt: number;
  remainingDuration: number;
} //Where it began and when it will end
