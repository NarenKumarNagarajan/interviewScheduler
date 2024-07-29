import { useDispatch, useSelector } from "react-redux";
import { DATE_RANGE } from "../globalValues/globalConstants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  changeRange,
  changeSelectedMonth,
  changeSelectedYear,
} from "../redux/appSlice";
import { v4 as uuidv4 } from "uuid";
import { changeWeekIndex } from "../redux/dataSlice";

const Range = () => {
  const dispatch = useDispatch();
  const rangeSelected = useSelector((state) => state.appSlice.rangeSelected);
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);
  const weekIndex = useSelector((state) => state.dataSlice.weekIndex);
  const weekLength = useSelector((state) => state.dataSlice.weekLength);

  const goForward = () => {
    if (rangeSelected === "Month") {
      if (selectedMonth === 11) {
        dispatch(changeSelectedMonth(0));
        dispatch(changeSelectedYear(selectedYear + 1));
      } else {
        dispatch(changeSelectedMonth(selectedMonth + 1));
      }
    }

    if (rangeSelected === "Week") {
      if (weekIndex < weekLength - 1) {
        dispatch(changeWeekIndex(weekIndex + 1));
      }
    }
  };

  const goBackward = () => {
    if (rangeSelected === "Month") {
      if (selectedMonth === 0) {
        dispatch(changeSelectedMonth(11));
        dispatch(changeSelectedYear(selectedYear - 1));
      } else {
        dispatch(changeSelectedMonth(selectedMonth - 1));
      }
    }

    if (rangeSelected === "Week") {
      if (weekIndex > 0) {
        dispatch(changeWeekIndex(weekIndex - 1));
      }
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
            key={uuidv4()}
            className={`rangeButton ${
              range === rangeSelected && "rangeButtonSelected"
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
