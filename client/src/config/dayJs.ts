import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";

dayjs.extend(relativeTime);
dayjs.extend(isToday);

export { dayjs };
