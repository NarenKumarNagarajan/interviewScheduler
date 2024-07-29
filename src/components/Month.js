import { v4 as uuidv4 } from "uuid";

import useMonthDetails from "../customHook/useMonthDetails";
import useGetData from "../customHook/useGetData";

const Month = () => {
  const monthDetails = useMonthDetails();
  const data = useGetData();

  return (
    <div className="calendarCard">
      {monthDetails.map((monthRow) => (
        <div className="calendarRow" key={uuidv4()}>
          {monthRow.map((monthCol) => (
            <div className="calendarCol" key={uuidv4()}>
              {monthCol}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Month;
