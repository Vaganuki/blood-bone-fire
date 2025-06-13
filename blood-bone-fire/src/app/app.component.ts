import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DevTestsComponent} from './components/dev-tests/dev-tests.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DevTestsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blood-bone-fire';
}
