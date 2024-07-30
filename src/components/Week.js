import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format, parseISO } from "date-fns";

import useWeekOfMonth from "../customHook/useWeekOfMonth";
import { changeWeekLength } from "../redux/dataSlice";
import { TIME_RANGE } from "../globalValues/globalConstants";
import useGetData from "../customHook/useGetData";

const Week = () => {
  const dispatch = useDispatch();
  const weeksDetails = useWeekOfMonth();
  const weekIndex = useSelector((state) => state.dataSlice.weekIndex);

  const data = useGetData();

  const dataKeys = Object.keys(data);
  const transformedDataKeys = dataKeys.reduce((acc, date) => {
    const day = date.split("-")[2];
    acc[day] = date;
    return acc;
  }, {});

  const getDataByDate = (day) => {
    const date = transformedDataKeys[day];
    return date ? data[date] : null;
  };

  const formatDate = (date) => {
    const dateObject = parseISO(date);
    const formattedDate = format(dateObject, "dd MMM");
    return formattedDate;
  };

  useEffect(() => {
    dispatch(changeWeekLength(weeksDetails.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeksDetails]);

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
        <div className="weekHead" key={uuidv4()}>
          {weeksDetails[weekIndex].map((week) => (
            <div className="weekHeadContent" key={uuidv4()}>
              {week.date !== "" && (
                <>
                  {formatDate(week.date)}
                  <br />
                </>
              )}
              {week.dayName !== "" && <>{week.dayName}</>}
            </div>
          ))}
        </div>
        {TIME_RANGE.slice(1).map((time, timeIndex) => (
          <div className="weekHead" key={uuidv4()}>
            {weeksDetails[weekIndex].map((week, weekIndex) => {
              const date = week.date.slice(-2);
              const dataByDate = getDataByDate(date);

              return dataByDate !== null ? (
                <div className="weekHeadContent" key={uuidv4()}>
                  {dataByDate.map((eventByTime) => {
                    const [startTime, endTime] =
                      Object.keys(eventByTime)[0].split(" - ");
                    const getStartTime = new Date(`2000-01-01 ${startTime}`);
                    const getEndTime = new Date(`2000-01-01 ${endTime}`);
                    const getTime = new Date(`2000-01-01 ${endTime}`);

                    if (getTime >= getStartTime && getEndTime <= getTime) {
                      return (
                        <div key={uuidv4()}>{`${time} - ${weekIndex}`}</div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : (
                <div className="weekHeadContent" key={uuidv4()}></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Week;
