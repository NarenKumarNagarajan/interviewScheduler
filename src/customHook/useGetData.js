import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";

const useGetData = () => {
  const eventsData = useSelector((state) => state.dataSlice.eventsData);

  const data = eventsData.reduce((acc, event) => {
    const startDateObject = parseISO(event.start);
    const endDateObject = parseISO(event.end);
    const date = format(startDateObject, "yyyy-MM-dd");
    const startTime = format(startDateObject, "h:mm a");
    const endTime = format(endDateObject, "h:mm a");

    const timeSlot = `${startTime} - ${endTime}`;
    const tempObj = {
      id: event.id,
      interviewer: event.user_det.handled_by.username,
      jobRole: event.user_det.job_id.jobRequest_Role,
      link: event.link,
    };

    if (!acc[date]) {
      acc[date] = [];
    }

    let dateObj = acc[date].find((obj) => obj.hasOwnProperty(timeSlot));

    if (!dateObj) {
      dateObj = { [timeSlot]: [] };
      acc[date].push(dateObj);
    }

    dateObj[timeSlot].push(tempObj);

    return acc;
  }, {});

  return data;
};

export default useGetData;
