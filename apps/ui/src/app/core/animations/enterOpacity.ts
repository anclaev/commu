import { trigger, style, animate, transition } from '@angular/animations';

export const enterOpacity = (duration: number = 1000) =>
  trigger('enterOpacity', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${duration}ms`, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(`${duration}ms`, style({ opacity: 0 })),
    ]),
  ]);
