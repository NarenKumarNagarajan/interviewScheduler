import { v4 as uuidv4 } from "uuid";
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
  const dateObject = parseISO(date);
  return format(dateObject, "dd MMM");
};

const formatTime = (time) => {
  const parsedTime = parse(time, "hh a", new Date());
  return format(parsedTime, "h:mm a");
};

const adjustTime = (date) => {
  if (date.getMinutes() > 0) {
    date = addHours(date, 1);
  }
  date = setMinutes(date, 0);
  date = setSeconds(date, 0);
  date = setMilliseconds(date, 0);

  return date.toString();
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
          <div className="eachTime" key={uuidv4()}>
            <p className="timeValue">{time}</p>
          </div>
        ))}
      </div>
      {weeksDetails[weekIndex].map((week) => {
        const date = week.date.slice(-2);
        const dataByDate = getDataByDate(date);

        return (
          <div className="weekEventCard" key={uuidv4()}>
            {TIME_RANGE.map((time, timeIndex) => (
              <div className="weekHead" key={uuidv4()}>
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

                    const currentAdjustTime = adjustTime(currentTime);
                    const startAdjustTime = adjustTime(getStartTime);
                    const endAdjustTime = adjustTime(getEndTime);
                    const eachTimeEvent = eventByTime[timeKeys];
                    const lengthByTime = eachTimeEvent.length;

                    return currentAdjustTime >= startAdjustTime &&
                      currentAdjustTime < endAdjustTime ? (
                      <div
                        className="weekWithEvent"
                        key={uuidv4()}
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
                            <span>{`Interviewer: ${eachTimeEvent[0].interviewer}`}</span>
                            <span>{`Time: ${timeKeys}`}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="weekHeadBorder" key={uuidv4()}></div>
                    );
                  })
                ) : (
                  <div className="weekHeadBorder" key={uuidv4()}></div>
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
