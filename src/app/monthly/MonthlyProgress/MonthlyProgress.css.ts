import { keyframes, style } from '@vanilla-extract/css';

const animation = keyframes({
  '0%': { backgroundPosition: '-50px' },
  '40%': { backgroundPosition: '100%' },
  '100%': { backgroundPosition: '100%' },
});

export const progress = style({
  animationName: animation,
});
