import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

export const hoverAnimation = trigger('hoverAnimation', [
  state(
    'notHovered',
    style({
      transform: 'scale(1)',
    })
  ),
  state(
    'hovered',
    style({
      transform: 'scale(1.1)',
    })
  ),
  transition('notHovered => hovered', animate('200ms ease-in')),
  transition('hovered => notHovered', animate('200ms ease-out')),
]);
