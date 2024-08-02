import { useState, useMemo } from "react";
import useMonthDetails from "../customHook/useMonthDetails";
import PopupMonthByDate from "./PopupMonthByDate";
import useGetData from "../customHook/useGetData";

const Month = () => {
  const [isMonthPopupVisible, setIsMonthPopupVisible] = useState(false);
  const [allDateData, setAllDateData] = useState([]);
  const monthDetails = useMonthDetails();
  const data = useGetData();

  const handlePopupMonthByDate = (sendData) => {
    setAllDateData(sendData);
    setIsMonthPopupVisible(true);
  };

  const closePopup = () => {
    setIsMonthPopupVisible(false);
  };

  const transformedDataKeys = useMemo(() => {
    return Object.keys(data).reduce((acc, date) => {
      const day = date.split("-")[2];
      acc[day] = date;
      return acc;
    }, {});
  }, [data]);

  const getDataByDate = (day) => {
    const date = transformedDataKeys[day];
    return date ? data[date] : null;
  };

  return (
    <div className="calendarCard">
      {monthDetails.map((monthRow, rowIndex) => (
        <div className="calendarRow" key={`row-${rowIndex}`}>
          {monthRow.map((monthCol, colIndex) => {
            const dataByDate = getDataByDate(monthCol);

            let values;
            let timeKeys;
            let totalInterviews = 0;

            if (dataByDate) {
              timeKeys = Object.keys(dataByDate[0]);
              values = dataByDate[0][timeKeys];

              dataByDate.forEach((slot) => {
                for (const time in slot) {
                  if (slot.hasOwnProperty(time)) {
                    totalInterviews += slot[time].length;
                  }
                }
              });
            }

            return dataByDate ? (
              <div
                className="calendarCol calendarColWithEvent"
                key={`col-${rowIndex}-${colIndex}`}
                onClick={() => handlePopupMonthByDate(dataByDate)}
              >
                <div className="monthColor">{monthCol}</div>
                <div className="monthEventCard">
                  {totalInterviews > 1 && (
                    <div className="totalCount">{totalInterviews}</div>
                  )}
                  <span>{values[0].jobRole}</span>
                  <br />
                  <span>{`Interviewer: ${values[0].interviewer}`}</span>
                  <br />
                  <span>{`Time: ${timeKeys}`}</span>
                </div>
              </div>
            ) : (
              <div className="calendarCol" key={`col-${rowIndex}-${colIndex}`}>
                {monthCol}
              </div>
            );
          })}
        </div>
      ))}

      {isMonthPopupVisible && (
        <PopupMonthByDate allDateData={allDateData} onClose={closePopup} />
      )}
    </div>
  );
};

export default Month;
