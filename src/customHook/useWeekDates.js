import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useSelector } from "react-redux";

import useWeekOfMonth from "./useWeekOfMonth";

const useWeekDates = () => {
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);
  const weekIndex = useSelector((state) => state.dataSlice.weekIndex);
  const weeksDetails = useWeekOfMonth();
  const eachWeek = weeksDetails[weekIndex];

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const getFirstAndLastDayOfWeek = (week, monthStart) => {
    const nonEmptyDates = week.filter((day) => day.date !== "");
    if (nonEmptyDates.length === 0) {
      return { weekStart: null, weekEnd: null };
    }

    const firstDate = parseDate(nonEmptyDates[0].date);
    const lastDate = parseDate(nonEmptyDates[nonEmptyDates.length - 1].date);

    const weekStart = startOfWeek(firstDate, { weekStartsOn: 1 });
    const adjustedWeekStart = weekStart < monthStart ? monthStart : weekStart;

    const weekEnd = endOfWeek(lastDate, { weekStartsOn: 1 });

    const lastDayOfMonth = endOfMonth(monthStart);
    const adjustedWeekEnd = weekEnd > lastDayOfMonth ? lastDayOfMonth : weekEnd;

    return { weekStart: adjustedWeekStart, weekEnd: adjustedWeekEnd };
  };

  const monthStart = startOfMonth(new Date(selectedYear, selectedMonth));
  const weekRange = getFirstAndLastDayOfWeek(eachWeek, monthStart);

  const formattedFirstDayOfWeek = weekRange.weekStart
    ? format(weekRange.weekStart, "yyyy-MM-dd")
    : "";
  const formattedLastDayOfWeek = weekRange.weekEnd
    ? format(weekRange.weekEnd, "yyyy-MM-dd")
    : "";

  return [formattedFirstDayOfWeek, formattedLastDayOfWeek];
};

export default useWeekDates;
