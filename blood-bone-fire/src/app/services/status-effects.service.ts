import {Character} from '../models/characters.model';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StatusEffectsService {
  canAct(character: Character): { canAct: boolean, reason?: string } {
    // add stun and stuff here

    return {canAct:true};
  }
}
