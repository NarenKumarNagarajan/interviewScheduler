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

const useWeekOfMonth = () => {
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);

  const weeks = [];
  const firstDayOfMonth = startOfMonth(new Date(selectedYear, selectedMonth));
  const lastDayOfMonth = endOfMonth(new Date(selectedYear, selectedMonth));

  let currentWeekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }); // Monday
  let currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });

  while (currentWeekStart <= lastDayOfMonth) {
    const week = [{ date: "", dayName: "" }]; // Add an empty string at the start of each week
    eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd }).forEach(
      (day) => {
        if (isSameMonth(day, firstDayOfMonth)) {
          week.push({
            date: format(day, "yyyy-MM-dd"),
            dayName: format(day, "EEEE"),
          });
        } else {
          week.push({
            date: "",
            dayName: format(day, "EEEE"),
          });
        }
      }
    );
    weeks.push(week);
    currentWeekStart = addDays(currentWeekEnd, 1);
    currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  }

  return weeks;
};

export default useWeekOfMonth;
