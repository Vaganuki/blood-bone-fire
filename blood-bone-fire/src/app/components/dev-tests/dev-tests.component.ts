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

  private _combatService = inject(CombatsService);
  private _router = inject(Router);

  ngOnInit() {
    this._combatService.fullReset();
  }

  soloGame(){
    this._combatService.initSoloGame();
    this._router.navigate(['/character-select']).then();
  }

  versusGame(){
    this._combatService.initVersusGame();
    this._router.navigate(['/character-select']).then();
  }
}
