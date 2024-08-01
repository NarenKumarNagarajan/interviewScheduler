import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { DATE_RANGE } from "../globalValues/globalConstants";
import {
  changeRange,
  changeSelectedMonth,
  changeSelectedYear,
} from "../redux/appSlice";
import { changeWeekIndex } from "../redux/dataSlice";

const Range = () => {
  const dispatch = useDispatch();
  const { rangeSelected, selectedMonth, selectedYear } = useSelector(
    (state) => state.appSlice
  );
  const { weekIndex, weekLength } = useSelector((state) => state.dataSlice);

  const goForward = () => {
    if (rangeSelected === "Month") {
      const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
      const newYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
      dispatch(changeSelectedMonth(newMonth));
      if (newYear !== selectedYear) dispatch(changeSelectedYear(newYear));
    } else if (rangeSelected === "Week" && weekIndex < weekLength - 1) {
      dispatch(changeWeekIndex(weekIndex + 1));
    }
  };

  const goBackward = () => {
    if (rangeSelected === "Month") {
      const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
      const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
      dispatch(changeSelectedMonth(newMonth));
      if (newYear !== selectedYear) dispatch(changeSelectedYear(newYear));
    } else if (rangeSelected === "Week" && weekIndex > 0) {
      dispatch(changeWeekIndex(weekIndex - 1));
    }
  };

  return (
    <div className="headCard">
      <div className="arrowCard">
        <div className="arrowBox" onClick={goBackward}>
          <IoIosArrowBack />
        </div>
        <div className="arrowBox" onClick={goForward}>
          <IoIosArrowForward />
        </div>
      </div>
      <div className="rangeCard">
        {DATE_RANGE.map((range) => (
          <button
            key={range}
            className={`rangeButton ${
              range === rangeSelected ? "rangeButtonSelected" : ""
            }`}
            onClick={() => dispatch(changeRange(range))}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Range;
