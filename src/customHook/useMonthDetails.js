import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
} from "date-fns";
import { useSelector } from "react-redux";
import { DAYS_OF_WEEK } from "../globalValues/globalConstants";

const useMonthDetails = () => {
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);
  const firstDayOfMonth = startOfMonth(new Date(selectedYear, selectedMonth));
  const lastDayOfMonth = endOfMonth(new Date(selectedYear, selectedMonth));

  let currentWeekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const monthDetails = Array.from({ length: 7 }, (_, i) => [DAYS_OF_WEEK[i]]);

  while (currentWeekStart <= lastDayOfMonth) {
    const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });

    eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd }).forEach(
      (day) => {
        const dayName = format(day, "EEEE");
        const dayIndex = DAYS_OF_WEEK.indexOf(dayName);
        const dayFormatted = format(day, "dd");

        if (day.getMonth() === firstDayOfMonth.getMonth()) {
          monthDetails[dayIndex].push(dayFormatted);
        } else {
          monthDetails[dayIndex].push("");
        }
      }
    );

    currentWeekStart = addWeeks(currentWeekStart, 1);
  }

  return monthDetails;
};

export default useMonthDetails;
