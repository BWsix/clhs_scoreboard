import got from "got";
import { decodeBig5 } from "../utils/decodeBig5";
import { isSessionExpired } from "../utils/isSessionExpired";
import { getLessonNames } from "./schedule.getLessonNames";

const URL =
  "https://eschool.clhs.tyc.edu.tw/online/student/school_class_tabletime.asp";

export const getSchedule = async (sessionCookie: string) => {
  const schedulePageResult = await got.get(URL, {
    headers: { cookie: sessionCookie },
  });
  const decodedScheduleHtml = decodeBig5(schedulePageResult.rawBody);

  isSessionExpired(decodedScheduleHtml);

  const data = getLessonNames(decodedScheduleHtml);

  return data;
};