import { style } from '@vanilla-extract/css';

export const summaryChipText = style({
  '::before': {
    content: '￦',
  },
  '@media': {
    'screen and (max-width: 376px)': {
      fontSize: 12,
    },
  },
});
