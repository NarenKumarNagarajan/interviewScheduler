import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useSelector } from "react-redux";
import useWeekDetails from "./useWeekDetails";

const useWeekFetch = () => {
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);
  const weekIndex = useSelector((state) => state.dataSlice.weekIndex);
  const weeksDetails = useWeekDetails();
  const eachWeek = weeksDetails[weekIndex];

  const parseDate = (dateString) => {
    return new Date(dateString);
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

export default useWeekFetch;