import { animate, state, style, transition, trigger } from '@angular/animations';

export const animations = [
  trigger('headerPosition', [
    state('top', style({ backgroundColor: 'black' })),
    state('scroll', style({ backgroundColor: 'darkslateblue' })),
    transition('top <=> scroll', animate('300ms ease-in-out')),
  ]),
];
