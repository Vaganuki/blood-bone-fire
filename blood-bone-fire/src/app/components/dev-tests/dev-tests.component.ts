import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {LangSelectorComponent} from '../lang-selector/lang-selector.component';
import {RouterLink} from '@angular/router';
import {CombatMainComponent} from '../combat/combat-main/combat-main.component';

@Component({
  selector: 'app-dev-tests',
  imports: [
    TranslatePipe,
    LangSelectorComponent,
    RouterLink,
    CombatMainComponent
  ],
  templateUrl: './dev-tests.component.html',
  styleUrl: './dev-tests.component.scss'
})
export class DevTestsComponent {

  protected readonly RouterLink = RouterLink;
}
