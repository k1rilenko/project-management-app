import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';
import { getTiming } from './consts/get-timing.const';

export function fadeInOut(timingIn: number, timingOut = 0, height = false): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    transition(':enter', [
      style(height ? { opacity: 0, height: 0 } : { opacity: 0 }),
      animate(getTiming(timingIn), style(height ? { opacity: 1, height: 'fit-content' } : { opacity: 1 })),
    ]),
    transition(':leave', [animate(getTiming(timingOut), style(height ? { opacity: 0, height: 0 } : { opacity: 0 }))]),
  ]);
}
