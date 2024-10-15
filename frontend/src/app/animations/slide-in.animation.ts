import { animate, state, style, transition, trigger } from '@angular/animations';
import { defaultTiming } from './consts/get-timing.const';

export function slideIn(direction: 'vertical' | 'horizontal' = 'vertical') {
  const animatedProperty = direction === 'vertical' ? 'height' : 'width';
  return trigger('slideIn', [
    state('*', style({ 'overflow-y': 'hidden' })),
    state('void', style({ 'overflow-y': 'hidden' })),
    transition('* => void', [style({ [animatedProperty]: '*' }), animate(defaultTiming, style({ [animatedProperty]: 0 }))]),
    transition('void => *', [style({ [animatedProperty]: '0' }), animate(defaultTiming, style({ [animatedProperty]: '*' }))]),
  ]);
}
