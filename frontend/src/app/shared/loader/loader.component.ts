import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInOut } from '../../animations/fade-in-out.animation';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut(300)],
})
export class LoaderComponent {}
