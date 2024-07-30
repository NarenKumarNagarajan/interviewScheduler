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
      <div className="weekHead">
        {weeksDetails[weekIndex].map((week) => (
          <div className="weekHeadDetails" key={uuidv4()}>
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
      <div className="timeHead">
        {TIME_RANGE.map((time) => (
          <div key={uuidv4()} className="weekHead">
            <div className="timeHeadDetails">
              <p className="timeValue">{time}</p>
            </div>
            {weeksDetails[weekIndex].slice(1).map((week) => {
              const date = week.date.slice(-2);
              const dataByDate = getDataByDate(date);

              return (
                <div className="weekHeadDetails" key={uuidv4()}>
                  {dataByDate !== null && `${dataByDate.length}`}
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
