import {Routes} from '@angular/router';
import {DevTestsComponent} from './components/dev-tests/dev-tests.component';
import {CharacterListComponent} from './components/characters/character-list/character-list.component';

export const routes: Routes = [

  {
    path: 'character-list',
    'component': CharacterListComponent,
  },
  {
    'path': '',
    'component': DevTestsComponent,
  },

];
