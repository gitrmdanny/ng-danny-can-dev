import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./components/nav/nav.component";
import {FooterComponent} from "./components/footer/footer.component";
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "./services/local-storage.service";
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-danny-can-dev';

  constructor(private translate: TranslateService,
              private localStorageService: LocalStorageService) {
    inject();
    this.initTranslations();
  }

  initTranslations() {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.checkBrowserForSavedLanguageOrLocale();
  }

  checkBrowserForSavedLanguageOrLocale() {
    const storedLang = this.localStorageService.get('lang');

    if (storedLang !== undefined && this.translate.langs.includes(storedLang)) {
      this.translate.use(storedLang);
      return;
    }

    const browserLang = this.translate.getBrowserLang();

    if (browserLang !== undefined && this.translate.langs.includes(browserLang)) {
      this.translate.use(browserLang);
      this.localStorageService.set('lang', browserLang);
      return;
    }

    this.localStorageService.set('lang', 'en');
  }
}
