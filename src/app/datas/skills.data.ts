import {Skill} from '../models/skills.model';

export const COMMON_SKILLS: Skill[] = [
  {
    id: 'common_basic_attack',
    name: 'Attaque basique',
    description: 'Un attaque physique simple',
    baseDamage: 10,
    mpCost: 0,
    type: 'physical',
    scalingStat: "strength",
    scalingRatio: 0.8,
    isCommon: true,
  },
  {
    id: 'common_huge_magic',
    name: 'Zaltrook',
    description: 'Grosse attaque magique',
    baseDamage: 15,
    mpCost: 30,
    type: 'magical',
    isCommon: true,
    scalingStat: "intelligence",
    scalingRatio: 1.8,
  },
  {
    id: 'common_quick_slash',
    name: 'Entaille rapide',
    description: 'Attaque rapide',
    baseDamage: 15,
    mpCost: 10,
    type: 'physical',
    scalingStat: 'dexterity',
    scalingRatio: 1.0,
    isCommon: true
  },
  {
    id: 'common_magic_bolt',
    name: 'Éclair magique',
    description: 'Sort magique basique',
    baseDamage: 20,
    mpCost: 12,
    type: 'magical',
    scalingStat: 'intelligence',
    scalingRatio: 1.1,
    isCommon: true
  }
];
export const CHARACTER_SKILLS: Record<number, Skill[]> = {
  1: [
    {
      id: 'dev01_skill_1',
      name: 'Code Furry',
      description: 'OWO ? *notices big int* uwu :3',
      baseDamage: 30,
      mpCost: 20,
      type: 'special',
      scalingStat: 'intelligence',
      scalingRatio: 1.5,
    },
    {
      id: 'dev01_skill_2',
      name: 'npm run debug',
      description: 'OK Google ouvre chatGPT',
      baseDamage: 25,
      mpCost: 15,
      type: 'magical',
      scalingStat: 'dexterity',
      scalingRatio: 1.3,
      statusEffects: [
        {
          type: 'weaken',
          name: 'Affaibli',
          description: 'Force réduite',
          duration: 2,
          potency: 5,
        }
      ]
    },
    {
      id: 'dev01_skill_3',
      name: 'Stack Overflow',
      description: 'Surchage la stack',
      baseDamage: 35,
      mpCost: 25,
      type: 'magical',
      scalingStat: 'intelligence',
      scalingRatio: 1.4,
      statusEffects: [
        {
          type: 'stun',
          name: 'Étourdi',
          description: 'Ne peut pas agir',
          duration: 1,
          potency: 0,
        }
      ]
    },
    {
      id: 'dev01_skill_4',
      name: 'Git revert',
      description: 'Annule le dernier push',
      baseDamage: -20,
      mpCost: 18,
      type: 'heal',
      scalingStat: 'intelligence',
      scalingRatio: 0.8,
      statusEffects: [
        {
          type: 'regen',
          name: 'Régénération',
          description: 'Récupère des HP chaque tour',
          duration: 3,
          potency: 10,
        }
      ]
    },
    {
      id: 'dev01_skill_5',
      name: 'Cafeine hit',
      description: 'MONSTER',
      baseDamage: -65,
      mpCost: 30,
      type: 'heal',
      scalingStat: 'strength',
      scalingRatio: 3,
      statusEffects: [
        {
          type: 'boost_dex',
          name: 'Célérité',
          description: 'Augmente la dexérité',
          duration: 5,
          potency: 10,
        }
      ]
    },
    {
      id: 'dev01_skill_6',
      name: 'Compilation Error',
      description: 'Visit my GitHub but don\'t look at my code',
      baseDamage: 5,
      mpCost: 5,
      type: 'magical',
      scalingStat: 'intelligence',
      scalingRatio: 1.0,
      statusEffects: [
        {
          type: 'silence',
          name: 'Silence',
          description: 'Ne peut pas utiliser de magie',
          duration: 2,
          potency: 0,
        }
      ]
    },
  ],
  2: [
    {
      id: 'lhel_skill_1',
      name: 'Pattes de velours',
      description: 'Boost de dextérité',
      baseDamage: 0,
      mpCost: 18,
      type: 'special',
      targetSelf: true,
      statusEffects: [
        {
          type: 'boost_dex',
          name: 'Célérité',
          description: 'Augmente la dexérité',
          duration: 3,
          potency: 15,
        }
      ]
    },
    {
      id: 'lhel_skill_2',
      name: 'Retour à la renardière',
      description: 'Hiberne pour se soigner',
      baseDamage: -40,
      mpCost: 10,
      type: 'heal',
      scalingStat: 'intelligence',
      scalingRatio: 1,
      targetSelf: true,
      statusEffects: [
        {
          type: 'stun',
          name: 'Étourdi',
          description: 'Ne peut pas agir',
          duration: 3,
          potency: 0,
        }
      ]
    },
    {
      id: 'lhel_skill_3',
      name: 'Morsure sauce poubelle',
      description: 'Empoisonne l\'opposant',
      baseDamage: 5,
      mpCost: 15,
      type: 'special',
      scalingStat: 'dexterity',
      scalingRatio: 1,
      statusEffects: [
        {
          type: 'poison',
          name: 'Empoisonné',
          description: 'Perd des HP% tous les tours',
          duration: 3,
          potency: 0.05,
        }]
    },
    {
      id: 'lhel_skill_4',
      name: 'Fureur du renard',
      description: 'Brûle l\'opposant de passion',
      baseDamage: 5,
      mpCost: 10,
      type: 'magical',
      scalingStat: 'intelligence',
      scalingRatio: 1,
      statusEffects: [
        {
          type: 'burn',
          name: 'Brulure',
          description: 'Perd des HP tous les tours',
          duration: 3,
          potency: 10,
        }
      ]
    },
    {
      id: 'lhel_skill_5',
      name: 'Fourrure étincelante',
      description: 'Affaibli quiconque tombera sous votre charme',
      baseDamage: 0,
      mpCost: 10,
      type: 'special',
      statusEffects: [
        {
          type: 'weaken',
          name: 'Affaibli',
          description: 'Force réduite',
          duration: 4,
          potency: 3,
        }
      ]
    },
    {
      id: 'lhel_skill_6',
      name: 'Furie vindicative',
      description: 'Débloque votre colère',
      baseDamage: -0,
      mpCost: 10,
      type: 'special',
      targetSelf:true,
      statusEffects: [
        {
          type: 'boost_str',
          name: 'Fureur',
          description: 'Force augmentée',
          duration: 6,
          potency: 5,
        }
      ]
    },
  ],
  3: [
    {
      id:'mozarrelli_skill_1',
      name:'Les crocs',
      description: 'Mord l\'adversaire',
      baseDamage: 10,
      mpCost: 20,
      type: 'physical',
      scalingStat: 'strength',
      scalingRatio: 1.3,
    },
    {
      id:'mozarrelli_skill_2',
      name:'Doux parfum',
      description:'Renifle sa propre odeur',
      baseDamage: 0,
      mpCost: 20,
      type: 'special',
      targetSelf:true,
      statusEffects:[
        {
          type:'boost_str',
          name:'Fureur',
          description:'Force augmentée',
          duration: 10,
          potency: 20,
        },
        {
          type:'poison',
          name:'Empoisonné',
          description:'Perd des HP tous les tours',
          duration: 3,
          potency: 0.1,
        }
      ]
    },
    {
      id:'mozarrelli_skill_3',
      name:'Attrappe poule',
      description:'Attrappe les pieds de l\'adversaire',
      baseDamage: 10,
      mpCost:20,
      type: 'special',
      scalingStat: 'strength',
      scalingRatio: 1,
      statusEffects:[
        {
          type: 'stun',
          name: 'Etourdi',
          description: 'Ne peut pas agir',
          duration: 3,
          potency: 0,
        }
      ]
    },
    {
      id:'mozarrelli_skill_4',
      name:'Table basse',
      description:'On en parlera pas',
      baseDamage:0,
      mpCost:20,
      type: 'special',
      scalingStat: 'strength',
      scalingRatio: 1,
      statusEffects:[
        {
          type: 'poison',
          name: 'Empoisonné',
          description: 'Perd des HP tous les tours',
          duration: 3,
          potency: 0.15,
        },
        {
          type: 'burn',
          name: 'Brulure',
          description: 'Perd des HP tous les tours',
          duration: 3,
          potency: 30,
        }
      ]
    },
    {
      id:'mozarrelli_skill_5',
      name:'Coup de pelle',
      description:'Attaque l\'adversaire avec une pelle',
      baseDamage:30,
      mpCost:20,
      type: 'special',
      scalingStat: 'strength',
      scalingRatio: 1,
    },
    {
      id:'mozarrelli_skill_6',
      name:'Réflexion',
      description:'CONCENTRE TOI',
      baseDamage:0,
      mpCost:20,
      type: 'magical',
      targetSelf:true,
      statusEffects:[
        {
          type: 'boost_int',
          name: 'Clairvoyance',
          description: 'Intelligence boostée',
          duration: 10,
          potency: 300,
        },
        {
          type: 'silence',
          name: 'Silence',
          description: 'Ne peut pas utiliser la magie',
          duration: 9,
          potency: 0,
        }
      ]
    }
  ],
  4: [
    {
      id:'criminou_skill_1',
      name:'Griffes de pétales',
      description: 'Des pétales tranchants virevoltent',
      baseDamage: 20,
      mpCost: 15,
      type: 'magical',
      scalingStat: 'dexterity',
      scalingRatio: 1.3,
    },
    {
      id:'criminou_skill_2',
      name:'Pollen soporifique',
      description:'Un nuage floral endort l\'ennemi',
      baseDamage: 0,
      mpCost: 20,
      type: 'special',
      statusEffects:[
        {
          type:'stun',
          name:'Étourdi',
          description:'Ne peut pas agir',
          duration: 2,
          potency: 0,
        }
      ]
    },
    {
      id:'criminou_skill_3',
      name:'Ronces de glace',
      description:'Des lianes épineuses gèlent leur cible',
      baseDamage: 10,
      mpCost:18,
      type: 'magical',
      scalingStat: 'intelligence',
      scalingRatio: 1.1,
      statusEffects:[
        {
          type: 'freeze',
          name: 'Gelé',
          description: 'Dextérité Réduite',
          duration: 3,
          potency: 10,
        }
      ]
    },
    {
      id:'criminou_skill_4',
      name:'Photosynthèse',
      description:'Se nourrit du soleil',
      baseDamage:-35,
      mpCost:22,
      type: 'heal',
      scalingStat: 'intelligence',
      scalingRatio: 1.2,
      targetSelf:true,
      statusEffects:[
        {
          type: 'regen',
          name: 'Régénération',
          description: 'Récupère des HP tous les tours',
          duration: 3,
          potency: 12,
        },
      ]
    },
    {
      id:'criminou_skill_5',
      name:'Parfum toxique',
      description:'Une odeur délicieusement mortelle',
      baseDamage:0,
      mpCost:15,
      type: 'special',
      statusEffects:[
        {
          type: 'poison',
          name: 'Empoisonné',
          description: 'Perd des HP% tous les tours',
          duration: 4,
          potency: 0.07,
        }
      ]
    },
    {
      id:'criminou_skill_6',
      name:'Avatar printanier',
      description:'Criminou devient l\'Avatar du printemps',
      baseDamage:0,
      mpCost:30,
      type: 'magical',
      targetSelf:true,
      statusEffects:[
        {
          type: 'boost_int',
          name: 'Clairvoyance',
          description: 'Intelligence boostée',
          duration: 5,
          potency: 20,
        },
        {
          type: 'boost_dex',
          name: 'Célérité',
          description: 'Dextérité boostée',
          duration: 5,
          potency: 10,
        }
      ]
    }
  ],
  5:[
    {
      id:'skyy_skill_1',
      name:'Châtiment sacré',
      description: 'La lumière frappe la cible',
      baseDamage: 28,
      mpCost: 30,
      type: 'magical',
      scalingStat: 'intelligence',
      scalingRatio: 1.4,
    },
    {
      id:'skyy_skill_2',
      name:'Mot de l\'ombre: Tourment',
      description:'Une souffrance persiste sur la cible',
      baseDamage: 5,
      mpCost: 18,
      type: 'magical',
      scalingStat: 'intelligence',
      scalingRatio: 1,
      statusEffects:[
        {
          type:'burn',
          name:'Brûlure',
          description:'Perd des HP tous les tours',
          duration: 4,
          potency: 15,
        }
      ]
    },
    {
      id:'skyy_skill_3',
      name:'Mot de l\'ombre: Faiblesse',
      description:'Affaiblit la cible',
      baseDamage: 0,
      mpCost:15,
      type: 'magical',
      statusEffects:[
        {
          type: 'weaken',
          name: 'Affaibli',
          description: 'Force réduite',
          duration: 4,
          potency: 8,
        },
        {
          type: 'slow',
          name: 'Ralentit',
          description: 'Dextérité réduite',
          duration: 4,
          potency: 8,
        },
        {
          type: 'silence',
          name: 'Silence',
          description: 'Ne peut pas utiliser la magie',
          duration: 2,
          potency: 0,
        }
      ]
    },
    {
      id:'skyy_skill_4',
      name:'Mot de l\'ombre: Cauchemar',
      description:'Montre les pires horeurs à votre adversaire',
      baseDamage:1,
      mpCost:20,
      type: 'magical',
      statusEffects:[
        {
          type: 'stun',
          name: 'Étourdit',
          description: 'Ne peut pas agir',
          duration: 3,
          potency: 0,
        },
      ]
    },
    {
      id:'skyy_skill_5',
      name:'Mot de pouvoir: Intelligence',
      description:'La sagesse divine vous éclaire',
      baseDamage:0,
      mpCost:20,
      type: 'magical',
      targetSelf:true,
      statusEffects:[
        {
          type: 'boost_int',
          name: 'Sagesse',
          description: 'Intelligence augmentée',
          duration: 6,
          potency: 20,
        }
      ]
    },
    {
      id:'skyy_skill_6',
      name:'Mot de pouvoir: Bouclier',
      description:'La foi renforce le corps',
      baseDamage:-20,
      mpCost:18,
      type: 'special',
      targetSelf:true,
      statusEffects:[
        {
          type: 'regen',
          name: 'Régénération',
          description: 'Récupère des HP tous les tours',
          duration: 5,
          potency: 20,
        },
        {
          type: 'boost_dex',
          name: 'Célérité',
          description: 'Dextérité boostée',
          duration: 2,
          potency: 5,
        }
      ]
    }
  ]
};
