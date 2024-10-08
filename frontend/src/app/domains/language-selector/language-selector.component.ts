import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Language } from '../../services/translation/language.type';
import { Languages } from '../../services/translation/language.const';
import { TranslationService } from '../../services/translation/translation.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  public languages = Languages;
  public currentLanguage$: Observable<Language>;

  constructor(private translationService: TranslationService) {
    this.currentLanguage$ = translationService.currentLanguage$;
  }

  public changeLanguage(language: Language): void {
    this.translationService.changeLanguage(language);
  }
}
