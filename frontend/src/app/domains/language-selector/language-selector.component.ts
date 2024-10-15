import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Language } from '../../services/translation/language.type';
import { Languages } from '../../services/translation/language.const';
import { TranslationService } from '../../services/translation/translation.service';
import { Observable } from 'rxjs';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [AsyncPipe, ButtonComponent, UpperCasePipe],
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
