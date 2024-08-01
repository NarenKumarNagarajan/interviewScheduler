import { useState } from "react";
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
    return format(parseISO(date), "dd MMMM yyyy");
  };

  return isEmpty ? (
    <div>No Events for Year</div>
  ) : (
    <div className="yearPage">
      {dataKeys.map((dateKey) => {
        const eventsByDate = getData[dateKey];

        return (
          <div key={dateKey} className="dateSection">
            <h2>{changeDateFormat(dateKey)}</h2>
            {eventsByDate.map((eventObj, index) => {
              const timeSlots = Object.keys(eventObj);

              return timeSlots.map((timeSlot) => {
                const schedules = eventObj[timeSlot];
                const firstEvent = schedules[0];
                const lengthOfTime = schedules.length;

                return (
                  <div
                    key={`${dateKey}-${timeSlot}-${index}`}
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
                    <p>{`Date: ${changeDateFormat(dateKey)}`}</p>
                  </div>
                );
              });
            })}
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

export default Year;
