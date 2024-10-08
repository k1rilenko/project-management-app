import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../storage/storage.service';
import { Language } from './language.type';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  public currentLanguage$ = new Observable<Language>();
  private readonly defaultLanguage: Language = 'en';
  private _currentLanguage$ = new ReplaySubject<Language>(1);

  constructor(
    private translateService: TranslateService,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.currentLanguage$ = this._currentLanguage$.asObservable();
    if (isPlatformBrowser(this.platformId)) {
      const savedLanguage = this.storageService.getItem<Language>('language');
      if (savedLanguage) {
        this.defaultLanguage = savedLanguage;
      }
      this.translateService.setDefaultLang(this.defaultLanguage);
      this.translateService.use(this.defaultLanguage);
      this._currentLanguage$.next(this.defaultLanguage);
    }
  }

  public changeLanguage(lang: Language): void {
    this.translateService.use(lang);
    this._currentLanguage$.next(lang);
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setItem<Language>('language', lang);
    }
  }
}
