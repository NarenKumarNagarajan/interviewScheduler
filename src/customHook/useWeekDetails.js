import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  isSameMonth,
} from "date-fns";
import { useSelector } from "react-redux";

const useWeekDetails = () => {
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);

  const weeks = [];
  const firstDayOfMonth = startOfMonth(new Date(selectedYear, selectedMonth));
  const lastDayOfMonth = endOfMonth(new Date(selectedYear, selectedMonth));

  let currentWeekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  let currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });

  while (currentWeekStart <= lastDayOfMonth) {
    const week = eachDayOfInterval({
      start: currentWeekStart,
      end: currentWeekEnd,
    }).map((day) => {
      const dayName = format(day, "EEEE");
      return {
        date: isSameMonth(day, firstDayOfMonth)
          ? format(day, "yyyy-MM-dd")
          : "",
        dayName,
      };
    });

    weeks.push(week);
    currentWeekStart = addDays(currentWeekEnd, 1);
    currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  }

  return weeks;
};

export default useWeekDetails;
