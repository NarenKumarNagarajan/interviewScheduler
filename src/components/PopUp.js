import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import PopUpMeeting from "./PopUpMeeting";

const PopUp = ({ onClose, data, timeDetail }) => {
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
          {data &&
            data.map((event) => {
              return (
                <div
                  key={uuidv4()}
                  className="eventCardPopup"
                  onClick={() => handleMeetingEventCardClick(event.id)}
                >
                  <p>{event.jobRole}</p>
                  <p>{`Interviewer: ${event.interviewer}`}</p>
                  <p>{`Time: ${timeDetail}`}</p>
                </div>
              );
            })}

          {isMeetingPopupVisible && (
            <PopUpMeeting onClose={closePopup} meetingID={meetingID} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
