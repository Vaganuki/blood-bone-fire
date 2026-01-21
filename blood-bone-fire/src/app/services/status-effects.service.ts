import {Character} from '../models/characters.model';

@Injectable({providedIn: 'root'})
export class StatusEffectsService {
  canAct(character: Character): { canAct: boolean, reason?: string } {
    // add stun and stuff here

    return {canAct:true};
  }
}
