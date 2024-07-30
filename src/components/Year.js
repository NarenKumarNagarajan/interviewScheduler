import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format, parseISO } from "date-fns";

import PopUp from "./PopUp";
import PopUpMeeting from "./PopUpMeeting";
import useGetData from "../customHook/useGetData";

const Year = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMeetingPopupVisible, setIsMeetingPopupVisible] = useState(false);
  const [meetingID, setMeetingID] = useState(null);
  const [allMeetings, setAllMeetings] = useState([]);
  const [timeDetail, setTimeDetail] = useState("");

  const getData = useGetData();
  const dataKeys = Object.keys(getData);
  const isEmpty = dataKeys.length === 0;

  const handleEventCardClick = (meeting, timeSlot) => {
    setAllMeetings(meeting);
    setTimeDetail(timeSlot);
    setIsPopupVisible(true);
  };

  const handleMeetingEventCardClick = (meetID) => {
    setMeetingID(meetID);
    setIsMeetingPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setIsMeetingPopupVisible(false);
  };

  const changeDateFormat = (date) => {
    const parseDate = parseISO(date);
    const formattedDate = format(parseDate, "dd MMMM yyyy");
    return formattedDate;
  };

  return isEmpty ? (
    <div>No Events for Today</div>
  ) : (
    <div className="todayPage">
      {dataKeys.map((dateKey) => {
        const eventsByDate = getData[dateKey];

        return eventsByDate.map((eventObj) => {
          const timeSlots = Object.keys(eventObj);

          return timeSlots.map((timeSlot) => {
            const schedules = eventObj[timeSlot];
            const firstEvent = schedules[0];
            const lengthOfTime = schedules.length;

            return (
              <div
                key={uuidv4()}
                className={
                  lengthOfTime > 1 ? "eventCard eventCardLength" : "eventCard"
                }
                onClick={() =>
                  lengthOfTime > 1
                    ? handleEventCardClick(schedules, timeSlot)
                    : handleMeetingEventCardClick(firstEvent.id)
                }
              >
                {lengthOfTime > 1 && (
                  <div className="totalCount">{lengthOfTime}</div>
                )}
                <p>{firstEvent.jobRole}</p>
                <p>{`Interviewer: ${firstEvent.interviewer}`}</p>
                <p>{`Time: ${timeSlot}`}</p>
                <p>{`Date: ${changeDateFormat(dateKey)}`}</p>
              </div>
            );
          });
        });
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

export default Year;
