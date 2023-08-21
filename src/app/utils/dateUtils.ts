import dayjs, { Dayjs } from 'dayjs';

import { YYYYMM } from '@/types';

export namespace DateUtils {
  export function getYearAndMonth(date: Dayjs, referenceDate: number) {
    const dateYear = date.year();
    const month = date.month() + 1;
    const isDaySameOrBiggerThanReferenceDate = date.date() >= referenceDate;
    const computedMonth = isDaySameOrBiggerThanReferenceDate ? month : month - 1;
    // 익월이 내년 1월일때, 위연산에서 "1-0=0"이 되면 12월로 보여주어야한다.
    const baseMonth = computedMonth === 0 ? 12 : computedMonth;
    return { year: computedMonth === 0 ? dateYear - 1 : dateYear, baseMonth };
  }

  export function getProgressInfo(date: Dayjs, referenceDate: number) {
    const now = getNow();
    const { year, baseMonth } = getYearAndMonth(date, referenceDate);
    // 이번달 시작기준일
    const thisStartDate = dayjs(`${year}-${baseMonth}-${referenceDate}`).startOf('day');
    // 익월 시작기준일
    const nextStartDate = dayjs(thisStartDate).add(1, 'month').add(1, 'day').startOf('day');
    const total = nextStartDate.diff(thisStartDate, 'day');
    const remains = (() => {
      if (now.month() > baseMonth) return 0;
      return nextStartDate.diff(now, 'day');
    })();
    const ratio = remains <= 0 ? 100 : ((total - remains) / total) * 100;
    return { ratio, remains };
  }

  export function getDateParam(date: Dayjs, referenceDate: number): YYYYMM {
    const { year, baseMonth } = getYearAndMonth(date, referenceDate);
    return `${year}-${String(baseMonth).padStart(2, '0')}` as YYYYMM;
  }

  function getNow() {
    return dayjs();
  }
}
