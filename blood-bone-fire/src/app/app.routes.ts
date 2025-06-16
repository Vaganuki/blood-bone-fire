import {Routes} from '@angular/router';
import {DevTestsComponent} from './components/dev-tests/dev-tests.component';
import {CharacterListComponent} from './components/characters/character-list/character-list.component';
import {CharacterSelectComponent} from './components/combat/character-select/character-select.component';

export const routes: Routes = [
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
