import { siteConfig } from '@/site-config';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const dateFormat = new Intl.DateTimeFormat(siteConfig.date.locale, siteConfig.date.options);

export function getFormattedDate(
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
  useDayjs?: boolean,
) {
  if (typeof options !== 'undefined') {
    return new Date(date).toLocaleDateString(siteConfig.date.locale, {
      ...(siteConfig.date.options as Intl.DateTimeFormatOptions),
      ...options,
    });
  }

  return useDayjs ? dayjs(new Date(date)).format('YYYY/MM/DD') : dateFormat.format(new Date(date));
}
