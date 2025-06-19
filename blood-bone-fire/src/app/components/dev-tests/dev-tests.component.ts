import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';
import {CombatsService} from '../../services/combats.service';

@Component({
  selector: 'app-dev-tests',
  imports: [
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './dev-tests.component.html',
  styleUrl: './dev-tests.component.scss'
})
export class DevTestsComponent {

  private _combatService = inject(CombatsService)

  soloGame(){
    this._combatService.soloPlayer();
  }

  versusGame(){
    this._combatService.twoPlayers();
  }
}
