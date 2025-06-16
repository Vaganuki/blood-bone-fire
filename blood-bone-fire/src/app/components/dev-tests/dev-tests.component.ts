import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';

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

    private router = inject(Router);

  soloPlayer() {
    this.router.navigate(['/character-select'],{state:{numberOfPlayers: 1}}).then();
  }

  twoPlayers() {
    this.router.navigate(['/character-select'], {state: {numberOfPlayers: 2}}).then();
  }
}
