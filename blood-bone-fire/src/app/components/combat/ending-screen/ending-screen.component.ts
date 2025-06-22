import {Component, inject} from '@angular/core';
import {CombatsService} from '../../../services/combats.service';
import {CharactersService} from '../../../services/characters.service';
import {Router, RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {Character} from '../../../models/characters.model';

@Component({
  selector: 'app-ending-screen',
  imports: [
    RouterLink
  ],
  templateUrl: './ending-screen.component.html',
  styleUrl: './ending-screen.component.scss'
})
export class EndingScreenComponent {
  private _combatService = inject(CombatsService);
  private _router = inject(Router);
  private _characterService = inject(CharactersService);

  winnerName: string = '';

  ngOnInit() {
    if (this._combatService.victoriousCharacter === 0) this._router.navigate(['/']).then();
    const c = this._characterService.getCharacter(this._combatService.victoriousCharacter)
      .subscribe({
        next: (c) => this.winnerName = c.name,
        error: () => this.winnerName = '???'
      });
  }

}
