import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import googleMeet from "../image/googleMeet.png";

const PopUpMeeting = ({ onClose, meetingID }) => {
  const [meetingData, setMeetingData] = useState(null);
  const [formattedDetails, setFormattedDetails] = useState({});

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const url = new URL(
        "http://52.35.66.255:8000/calendar_app/api/calendar_meeting"
      );
      const params = { id: meetingID };
      url.search = new URLSearchParams(params).toString();

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMeetingData(data);
        const parseStartDate = parseISO(data.start);
        const parseEndDate = parseISO(data.end);
        const formattedDate = format(parseStartDate, "do MMMM yyyy", {
          locale: enGB,
        });
        const formattedStartTime = format(parseStartDate, "hh:mm a");
        const formattedEndTime = format(parseEndDate, "hh:mm a");
        setFormattedDetails({
          formattedDate,
          formattedStartTime,
          formattedEndTime,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEvents();
  }, [meetingID]);

  if (!meetingData) return null;

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button className="popupCloseButton" onClick={handleClose}>
          x
        </button>
        <div className="popupDetailCard">
          <div className="popupDetailText">
            <p>{`Interview With: ${meetingData.user_det.candidate.candidate_firstName} ${meetingData.user_det.candidate.candidate_lastName}`}</p>
            <p>{`Position: ${meetingData.job_id.jobRequest_Role}`}</p>
            <p>{`Created By: ${meetingData.user_det.handled_by.userRole}`}</p>
            <p>{`Interview Date: ${formattedDetails.formattedDate}`}</p>
            <p>{`Interview Time: ${formattedDetails.formattedStartTime} - ${formattedDetails.formattedEndTime}`}</p>
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
  );
};

export default PopUpMeeting;
