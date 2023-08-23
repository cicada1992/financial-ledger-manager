import { style } from '@vanilla-extract/css';

export const doneCell = style({
  '::before': {
    position: 'absolute',
    left: -10,
    bottom: 7,
    color: '#F31260',
    fontSize: 10,
    content: '🚀',
  },
});

export const grandient = style({
  background: 'linear-gradient(to top, #99C7FB 50%, transparent 10%)',
});
