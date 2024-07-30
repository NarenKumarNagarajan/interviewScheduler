import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
} from "date-fns";

import Head from "./Head";
import Range from "./Range";
import Today from "./Today";
import Week from "./Week";
import Month from "./Month";
import Year from "./Year";
import { addEventsData } from "../redux/dataSlice";
import useWeekDates from "../customHook/useWeekDates";

const Calendar = () => {
  const dispatch = useDispatch();
  const rangeSelected = useSelector((state) => state.appSlice.rangeSelected);
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);
  const FirstLastDayOfWeek = useWeekDates();

  let formattedFirstDay = "";
  let formattedLastDay = "";

  if (rangeSelected === "Today") {
    const currentDate = new Date();
    formattedFirstDay = format(currentDate, "yyyy-MM-dd");
    formattedLastDay = format(currentDate, "yyyy-MM-dd");
  } else if (rangeSelected === "Week") {
    formattedFirstDay = FirstLastDayOfWeek[0];
    formattedLastDay = FirstLastDayOfWeek[1];
  } else if (rangeSelected === "Month") {
    const firstDay = startOfMonth(new Date(selectedYear, selectedMonth));
    const lastDay = endOfMonth(new Date(selectedYear, selectedMonth));
    formattedFirstDay = format(firstDay, "yyyy-MM-dd");
    formattedLastDay = format(lastDay, "yyyy-MM-dd");
  } else if (rangeSelected === "Year") {
    const firstDay = startOfYear(new Date(selectedYear, 0));
    const lastDay = endOfYear(new Date(selectedYear, 0));

    formattedFirstDay = format(firstDay, "yyyy-MM-dd");
    formattedLastDay = format(lastDay, "yyyy-MM-dd");
  }

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedFirstDay, formattedLastDay]);

  const fetchEvents = async () => {
    // Construct URL with query parameters
    const url = new URL("http://52.35.66.255:8000/calendar_app/api/calendar");
    const params = {
      from_date: formattedFirstDay,
      to_date: formattedLastDay,
    };
    url.search = new URLSearchParams(params).toString();

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch(addEventsData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="calendarPage">
      <Head />
      <Range />
      {rangeSelected === "Today" && <Today />}
      {rangeSelected === "Week" && <Week />}
      {rangeSelected === "Month" && <Month />}
      {rangeSelected === "Year" && <Year />}
    </div>
  );
};

export default Calendar;