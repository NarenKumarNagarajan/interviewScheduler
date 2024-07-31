import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";

import googleMeet from "../image/googleMeet.png";

const PopUpMeeting = ({ onClose, meetingID }) => {
  const [meetingData, setMeetingData] = useState({});
  const isEmpty = Object.keys(meetingData).length;
  let parseStartDate = "";
  let parseEndDate = "";
  let formattedDate = "";
  let formattedStartTime = "";
  let formattedEndTime = "";

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isEmpty > 0) {
    parseStartDate = parseISO(meetingData.start);
    parseEndDate = parseISO(meetingData.end);
    formattedDate = format(parseStartDate, "do MMMM yyyy", { locale: enGB });
    formattedStartTime = format(parseStartDate, "hh:mm a");
    formattedEndTime = format(parseEndDate, "hh:mm a");
  }

  const fetchEvents = async () => {
    const url = new URL(
      "http://52.35.66.255:8000/calendar_app/api/calendar_meeting"
    );
    const params = {
      id: meetingID,
    };
    url.search = new URLSearchParams(params).toString();

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMeetingData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    isEmpty > 0 && (
      <div className="popupOverlay">
        <div className="popupContent">
          <button className="popupCloseButton" onClick={handleClose}>
            x
          </button>
          <div className="popupDetailCard">
            <div className="popupDetailText">
              <p>{`Interview With: ${meetingData.user_det.candidate.candidate_firstName} ${meetingData.user_det.candidate.candidate_lastName}`}</p>
              <p>{`Position: ${meetingData.job_id.jobRequest_Role}`}</p>
              <p>{`Created By: ${meetingData.job_id.jobRequest_createdBy.userRole}`}</p>
              <p>{`Interview Date: ${formattedDate}`}</p>
              <p>{`Interview Time: ${formattedStartTime} - ${formattedEndTime}`}</p>
              <p>{`Interview Via: Google Meet`}</p>
            </div>
            <div className="popupMeetCard">
              <img src={googleMeet} alt="meetPic" className="meetPic" />
              <a
                className="linkButton"
                href={meetingData.link}
                target="_blank"
                rel="noreferrer"
              >
                Link
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PopUpMeeting;
