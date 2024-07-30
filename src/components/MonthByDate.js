import { useLocation } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import PopUp from "./PopUp";
import PopUpMeeting from "./PopUpMeeting";

const MonthByDate = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMeetingPopupVisible, setIsMeetingPopupVisible] = useState(false);
  const [meetingID, setMeetingID] = useState({});
  const [allMeetings, setAllMeeting] = useState({});
  const [timeDetail, setTimeDetail] = useState("");

  const location = useLocation();
  const { data } = location.state || {};

  const handleEventCardClick = (meeting, timeSlot) => {
    setAllMeeting(meeting);
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

  return (
    <div className="todayPage">
      {data.map((eventObj) => {
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
            </div>
          );
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

export default MonthByDate;
