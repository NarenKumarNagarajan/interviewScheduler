import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";

const useGetData = () => {
  const eventsData = useSelector((state) => state.dataSlice.eventsData);

  let data = {};

  eventsData.forEach((event) => {
    const startDateString = event.start;
    const endDateString = event.end;
    const startDateObject = parseISO(startDateString);
    const endDateObject = parseISO(endDateString);
    const date = format(startDateObject, "yyyy-MM-dd");
    const startTime = format(startDateObject, "h:mm a");
    const endTime = format(endDateObject, "h:mm a");

    let timeSlot = `${startTime} - ${endTime}`;
    let tempObj = {
      id: event.id,
      interviewer: event.user_det.handled_by.username,
      jobRole: event.user_det.job_id.jobRequest_Role,
      link: event.link,
    };

    if (!data[date]) {
      data[date] = [];
    }

    let dateObj = data[date].find((obj) => obj.hasOwnProperty(timeSlot));

    if (!dateObj) {
      dateObj = { [timeSlot]: [] };
      data[date].push(dateObj);
    }

    dateObj[timeSlot].push(tempObj);
  });

  return data;
};

export default useGetData;
