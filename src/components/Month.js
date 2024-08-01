import { v4 as uuidv4 } from "uuid";

import useMonthDetails from "../customHook/useMonthDetails";
import PopupMonthByDate from "./PopupMonthByDate";
import { useState } from "react";
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

  return (
    <div className="calendarCard">
      {monthDetails.map((monthRow) => (
        <div className="calendarRow" key={uuidv4()}>
          {monthRow.map((monthCol) => {
            const dataByDate = getDataByDate(monthCol);

            let values;
            let timeKeys;

            if (dataByDate) {
              timeKeys = Object.keys(dataByDate[0]);
              values = dataByDate[0][timeKeys];
            }

            return dataByDate ? (
              <div
                className="calendarCol calendarColWithEvent"
                key={uuidv4()}
                onClick={() => handlePopupMonthByDate(dataByDate)}
              >
                <div className="monthColor">{monthCol}</div>
                <div className="monthEventCard">
                  {dataByDate.length > 1 && (
                    <div className="totalCount">
                      {dataByDate.length + (values.length - 1)}
                    </div>
                  )}

                  <span>{values[0].jobRole}</span>
                  <br />
                  <span>{`Interviewer: ${values[0].interviewer}`}</span>
                  <br />
                  <span>{`Time: ${timeKeys}`}</span>
                </div>
              </div>
            ) : (
              <div className="calendarCol" key={uuidv4()}>
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
