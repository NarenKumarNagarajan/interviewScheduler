import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  addHours,
  format,
  parse,
  parseISO,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from "date-fns";

import useWeekOfMonth from "../customHook/useWeekOfMonth";
import { changeWeekLength } from "../redux/dataSlice";
import { TIME_RANGE } from "../globalValues/globalConstants";
import useGetData from "../customHook/useGetData";
import PopUp from "./PopUp";
import PopUpMeeting from "./PopUpMeeting";

const formatDate = (date) => {
  return format(parseISO(date), "dd MMM");
};

const formatTime = (time) => {
  return format(parse(time, "hh a", new Date()), "h:mm a");
};

const adjustEndTime = (date) => {
  if (
    date.getMinutes() > 0 ||
    date.getSeconds() > 0 ||
    date.getMilliseconds() > 0
  ) {
    date = addHours(date, 1);
  }
  return setMilliseconds(setSeconds(setMinutes(date, 0), 0), 0).toString();
};

const adjustStartTime = (date) => {
  return setMilliseconds(setSeconds(setMinutes(date, 0), 0), 0).toString();
};

const Week = () => {
  const [isMeetingPopupVisible, setIsMeetingPopupVisible] = useState(false);
  const [meetingID, setMeetingID] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [allMeetings, setAllMeetings] = useState([]);
  const [timeDetail, setTimeDetail] = useState("");

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

  const handleMeetingEventCardClick = (meetID) => {
    setMeetingID(meetID);
    setIsMeetingPopupVisible(true);
  };

  const handleEventCardClick = (meeting, timeSlot) => {
    setAllMeetings(meeting);
    setTimeDetail(timeSlot);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setIsMeetingPopupVisible(false);
  };

  return (
    <div className="weekView">
      <div className="timeCard">
        {TIME_RANGE.map((time) => (
          <div className="eachTime" key={time}>
            <p className="timeValue">{time}</p>
          </div>
        ))}
      </div>
      {weeksDetails[weekIndex].map((week) => {
        const date = week.date.slice(-2);
        const dataByDate = getDataByDate(date);

        return (
          <div className="weekEventCard" key={week.date}>
            {TIME_RANGE.map((time, timeIndex) => (
              <div className="weekHead" key={timeIndex}>
                {timeIndex === 0 ? (
                  <div className="headContent">
                    {week.date && (
                      <>
                        {formatDate(week.date)}
                        <br />
                      </>
                    )}
                    {week.dayName}
                  </div>
                ) : dataByDate ? (
                  dataByDate.map((eventByTime) => {
                    const timeKeys = Object.keys(eventByTime)[0];
                    const [startTime, endTime] = timeKeys.split(" - ");

                    const currentTime = parse(
                      formatTime(time),
                      "h:mm a",
                      new Date()
                    );
                    const getStartTime = parse(startTime, "h:mm a", new Date());
                    const getEndTime = parse(endTime, "h:mm a", new Date());

                    const currentAdjustTime = adjustStartTime(currentTime);
                    const startAdjustTime = adjustStartTime(getStartTime);
                    const endAdjustTime = adjustEndTime(getEndTime);
                    const eachTimeEvent = eventByTime[timeKeys];
                    const lengthByTime = eachTimeEvent.length;

                    return currentAdjustTime >= startAdjustTime &&
                      currentAdjustTime < endAdjustTime ? (
                      <div
                        className="weekWithEvent"
                        key={timeKeys}
                        onClick={() =>
                          lengthByTime > 1
                            ? handleEventCardClick(eachTimeEvent, timeKeys)
                            : handleMeetingEventCardClick(eachTimeEvent[0].id)
                        }
                      >
                        {currentAdjustTime === startAdjustTime && (
                          <div>
                            {lengthByTime > 1 && (
                              <div className="eventCardLength totalCount">
                                {lengthByTime}
                              </div>
                            )}
                            <span>{eachTimeEvent[0].jobRole}</span>
                            <br />
                            <span>{`Interviewer: ${eachTimeEvent[0].interviewer}`}</span>
                            <br />
                            <span>{`Time: ${timeKeys}`}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="weekHeadBorder" key={timeKeys}></div>
                    );
                  })
                ) : (
                  <div className="weekHeadBorder" key={timeIndex}></div>
                )}
              </div>
            ))}
          </div>
        );
      })}
      {isPopupVisible && (
        <PopUp
          onClose={closePopup}
          data={allMeetings}
          timeDetail={timeDetail}
        />
      )}
      {isMeetingPopupVisible && (
        <PopUpMeeting onClose={closePopup} meetingID={meetingID} />
      )}
    </div>
  );
};

export default Week;
