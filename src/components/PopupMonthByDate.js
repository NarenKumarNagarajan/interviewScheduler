import { useState } from "react";

import PopUpMeeting from "./PopUpMeeting";

const PopupMonthByDate = ({ onClose, allDateData }) => {
  const [isMeetingPopupVisible, setIsMeetingPopupVisible] = useState(false);
  const [meetingID, setMeetingID] = useState({});

  const handleMeetingEventCardClick = (meetID) => {
    setMeetingID(meetID);
    setIsMeetingPopupVisible(true);
  };

  const closePopup = () => {
    setIsMeetingPopupVisible(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button className="popupCloseButton" onClick={handleClose}>
          x
        </button>
        <div className="todayPage">
          {allDateData.map((dataByTime) => {
            const timeSlots = Object.keys(dataByTime);
            return dataByTime[timeSlots].map((eachTimeData) => (
              <div
                className="eventCard"
                key={eachTimeData.id}
                onClick={() => handleMeetingEventCardClick(eachTimeData.id)}
              >
                <p>{eachTimeData.jobRole}</p>
                <p>{`Interviewer: ${eachTimeData.interviewer}`}</p>
                <p>{`Time: ${timeSlots}`}</p>
              </div>
            ));
          })}
        </div>
        {isMeetingPopupVisible && (
          <PopUpMeeting onClose={closePopup} meetingID={meetingID} />
        )}
      </div>
    </div>
  );
};

export default PopupMonthByDate;
