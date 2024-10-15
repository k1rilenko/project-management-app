import { animate, state, style, transition, trigger } from '@angular/animations';
import { defaultTiming } from './consts/get-timing.const';

export function marginBottom(value: number) {
  return trigger('marginBottom', [
    state('*', style({ 'margin-bottom': value })),
    state('void', style({ 'margin-bottom': 0 })),
    transition('* => void', [style({ 'margin-bottom': value }), animate(defaultTiming, style({ 'margin-bottom': 0 }))]),
  ]);
}
