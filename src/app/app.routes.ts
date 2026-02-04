import {Routes} from '@angular/router';
import {DevTestsComponent} from './components/dev-tests/dev-tests.component';
import {CharacterListComponent} from './components/characters/character-list/character-list.component';
import {CharacterSelectComponent} from './components/combat/character-select/character-select.component';
import {CombatMainComponent} from './components/combat/combat-main/combat-main.component';
import {EndingScreenComponent} from './components/combat/ending-screen/ending-screen.component';

export const routes: Routes = [
  {
    path:'fight',
    component: CombatMainComponent,
  },
  {
    path:'ending-screen',
    component: EndingScreenComponent,
  },
  {
    path: 'character-select',
    'component': CharacterSelectComponent
  },
  {
    path: 'character-list',
    'component': CharacterListComponent,
  },
  {
    'path': '',
    'component': DevTestsComponent,
  },

];
