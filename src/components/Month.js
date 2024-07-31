import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import useMonthDetails from "../customHook/useMonthDetails";
import useGetData from "../customHook/useGetData";

const Month = () => {
  const monthDetails = useMonthDetails();
  const data = useGetData();
  const navigate = useNavigate();

  const dataKeys = Object.keys(data);
  const transformedDataKeys = dataKeys.reduce((acc, date) => {
    const day = date.split("-")[2];
    acc[day] = date;
    return acc;
  }, {});

  const getDataByDate = (day) => {
    const date = transformedDataKeys[day];
    return date ? data[date] : null;
  };

  const handleMonthEventsByDate = (dataByDate) => {
    navigate("/month-by-date", { state: { data: dataByDate } });
  };

  return (
    <div className="calendarCard">
      {monthDetails.map((monthRow) => (
        <div className="calendarRow" key={uuidv4()}>
          {monthRow.map((monthCol) => {
            const dataByDate = getDataByDate(monthCol);

            return (
              <div className="calendarCol" key={uuidv4()}>
                <div
                  className={`${dataByDate && "eventsCard"}`}
                  onClick={
                    dataByDate
                      ? () => handleMonthEventsByDate(dataByDate)
                      : undefined
                  }
                >
                  <span className={`${dataByDate && "monthColor"}`}>
                    {monthCol}
                  </span>{" "}
                  <br />
                  <span>
                    {dataByDate &&
                      `${dataByDate.length} ${
                        dataByDate.length <= 1 ? "Event" : "Events"
                      }`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Month;
