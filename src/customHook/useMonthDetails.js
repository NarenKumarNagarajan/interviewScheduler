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

const useMonthDetails = () => {
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);
  const firstDayOfMonth = startOfMonth(new Date(selectedYear, selectedMonth));
  const lastDayOfMonth = endOfMonth(new Date(selectedYear, selectedMonth));
  let currentWeekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  let currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const monthDetails = daysOfWeek.map((day) => [day]);

  while (currentWeekStart <= lastDayOfMonth) {
    eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd }).forEach(
      (day) => {
        const dayName = format(day, "EEEE");
        const dayIndex = daysOfWeek.indexOf(dayName);
        if (isSameMonth(day, firstDayOfMonth)) {
          monthDetails[dayIndex].push(format(day, "dd"));
        } else {
          monthDetails[dayIndex].push("");
        }
      }
    );
    currentWeekStart = addDays(currentWeekEnd, 1);
    currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  }

  return monthDetails;
};

export default useMonthDetails;
