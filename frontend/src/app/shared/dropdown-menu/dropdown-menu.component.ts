import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenuComponent {

}
