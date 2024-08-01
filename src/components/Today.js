import { useState } from "react";
import { format } from "date-fns";

import PopUp from "./PopUp";
import PopUpMeeting from "./PopUpMeeting";
import useGetData from "../customHook/useGetData";

const Today = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMeetingPopupVisible, setIsMeetingPopupVisible] = useState(false);
  const [meetingID, setMeetingID] = useState(null);
  const [allMeetings, setAllMeetings] = useState([]);
  const [timeDetail, setTimeDetail] = useState("");

  const data = useGetData();
  const todayDate = format(new Date(), "yyyy-MM-dd");

  const handleEventCardClick = (meetings, timeSlot) => {
    setAllMeetings(meetings);
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

  if (!Object.keys(data).length) {
    return <div>No Events for Today</div>;
  }

  return (
    <div className="todayPage">
      {data[todayDate] &&
        data[todayDate].map((eventObj, index) => {
          const timeSlots = Object.keys(eventObj);

          return timeSlots.map((timeSlot) => {
            const schedules = eventObj[timeSlot];
            const lengthOfTime = schedules.length;
            const firstEvent = schedules[0];

            return (
              <div
                key={timeSlot + index}
                className={`eventCard ${
                  lengthOfTime > 1 ? "eventCardLength" : ""
                }`}
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
