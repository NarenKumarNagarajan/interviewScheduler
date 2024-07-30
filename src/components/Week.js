import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { format, parse, parseISO } from "date-fns";

import useWeekOfMonth from "../customHook/useWeekOfMonth";
import { changeWeekLength } from "../redux/dataSlice";
import { TIME_RANGE } from "../globalValues/globalConstants";
import useGetData from "../customHook/useGetData";

const formatDate = (date) => {
  const dateObject = parseISO(date);
  return format(dateObject, "dd MMM");
};

const formatTime = (time) => {
  const parsedTime = parse(time, "hh a", new Date());
  return format(parsedTime, "h:mm a");
};

const Week = () => {
  const dispatch = useDispatch();
  const weeksDetails = useWeekOfMonth();
  const weekIndex = useSelector((state) => state.dataSlice.weekIndex);

  const data = useGetData();

  const transformedDataKeys = useMemo(() => {
    return Object.keys(data).reduce((acc, date) => {
      const day = date.split("-")[2];
      acc[day] = date;
      return acc;
    }, {});
  }, [data]);

  const getDataByDate = (day) => {
    const date = transformedDataKeys[day];
    return date ? data[date] : null;
  };

  useEffect(() => {
    dispatch(changeWeekLength(weeksDetails.length));
  }, [weeksDetails, dispatch]);

  return (
    <div className="weekView">
      <div className="timeCard">
        {TIME_RANGE.map((time) => (
          <div className="eachTime" key={uuidv4()}>
            <p className="timeValue">{time}</p>
          </div>
        ))}
      </div>
      <div className="weekCard">
        <div className="weekHead">
          {weeksDetails[weekIndex].map((week) => (
            <div className="weekHeadContent" key={uuidv4()}>
              {week.date && (
                <>
                  {formatDate(week.date)}
                  <br />
                </>
              )}
              {week.dayName}
            </div>
          ))}
        </div>
        {TIME_RANGE.slice(1).map((time, timeIndex) => (
          <div className="weekHead" key={uuidv4()}>
            {weeksDetails[weekIndex].map((week) => {
              const date = week.date.slice(-2);
              const dataByDate = getDataByDate(date);
              return (
                <div className="weekHeadContent" key={week.date}>
                  {dataByDate && (
                    <>
                      {dataByDate.map((eventByTime) => {
                        const timeKeys = Object.keys(eventByTime)[0];
                        const [startTime, endTime] = timeKeys.split(" - ");

                        const getStartTime = parse(
                          startTime,
                          "h:mm a",
                          new Date()
                        );
                        const getEndTime = parse(endTime, "h:mm a", new Date());
                        const getTime = parse(
                          formatTime(time),
                          "h:mm a",
                          new Date()
                        );

                        return getTime >= getStartTime &&
                          getEndTime <= getTime ? (
                          <div key={uuidv4()}>{TIME_RANGE[timeIndex]}</div>
                        ) : (
                          <div key={uuidv4()}></div>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Week;
