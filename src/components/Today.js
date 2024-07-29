import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import PopUp from "./PopUp";
import PopUpMeeting from "./PopUpMeeting";
import useGetData from "../customHook/useGetData";

const Today = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMeetingPopupVisible, setIsMeetingPopupVisible] = useState(false);
  const [meetingID, setMeetingID] = useState({});
  const [allMeetings, setAllMeeting] = useState({});
  const [timeDetail, setTimeDetail] = useState("");
  const data = useGetData();
  const currentDate = new Date();
  const todayDate = format(currentDate, "yyyy-MM-dd");

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

  const isEmpty = Object.keys(data).length;

  return isEmpty === 0 ? (
    <div>No Events for Today</div>
  ) : (
    <div className="todayPage">
      {data[todayDate] &&
        data[todayDate].map((eventObj) => {
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

export default Today;
