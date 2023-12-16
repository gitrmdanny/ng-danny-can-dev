import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {LangChangeEvent, TranslateModule, TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit, OnDestroy {
  currentLang: string | undefined;

  private _langChangeSubscription: Subscription | undefined;

  constructor(private translate: TranslateService,
              private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this._langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  ngOnDestroy() {
    this._langChangeSubscription?.unsubscribe();
  }

  onChangeLanguage() {
    if (this.currentLang === 'en') {
      this.translate.use('fr');
      this.localStorageService.set('lang', 'fr');
      return;
    }

    this.translate.use('en');
    this.localStorageService.set('lang', 'en');
  }
}
