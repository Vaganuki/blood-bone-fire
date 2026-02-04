import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  imports: [],
  templateUrl: './lang-selector.component.html',
  styleUrl: './lang-selector.component.scss'
})
export class LangSelectorComponent {

  constructor(private translate: TranslateService) {
    translate.addLangs(['fr-FR', 'en-US']);
    translate.setDefaultLang('fr-FR');
  }

  changeLang(lang : string){
    this.translate.use(lang);
  }

}
