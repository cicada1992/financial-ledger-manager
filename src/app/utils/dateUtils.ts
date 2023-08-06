export namespace DateUtils {
  function getKoreanNow() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    // 한국 시간은 UTC보다 9시간 빠름 (9시간의 밀리세컨드 표현)
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    return new Date(utc + KR_TIME_DIFF);
  }
  export function getKoreanDateInfo() {
    const korNow = getKoreanNow();
    const thisYear = korNow.getFullYear();
    const month = korNow.getMonth() + 1;
    const day = korNow.getDate();
    const isDaySameOrBiggerThan25 = day >= 25;
    const startMonth = isDaySameOrBiggerThan25 ? month : month - 1;
    return {
      thisYear,
      thisMonth: month,
      startMonth: startMonth,
      endMonth: startMonth + 1,
      day,
    };
  }

  export function getProgressInfo() {
    const { thisYear, thisMonth, endMonth } = getKoreanDateInfo();
    const korNow = getKoreanNow();
    const last = new Date(endMonth === 1 ? thisYear + 1 : thisYear, endMonth - 1, 25).getTime();
    const current = korNow.getTime();
    const total = getDaysInMonth();
    const remains = Math.floor((last - current) / (24 * 3600 * 1000));
    return { ratio: remains <= 0 ? 100 : ((total - remains) / total) * 100, remains };
  }

  function getDaysInMonth() {
    const korNow = getKoreanNow();
    const year = korNow.getFullYear();
    const month = korNow.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  }
}
