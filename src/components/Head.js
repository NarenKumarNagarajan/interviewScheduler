import { useDispatch, useSelector } from "react-redux";
import { changeWeekIndex } from "../redux/dataSlice";
import { MONTHS_NAMES } from "../globalValues/globalConstants";
import { changeSelectedMonth, changeSelectedYear } from "../redux/appSlice";

const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

const Head = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.appSlice.selectedMonth);
  const selectedYear = useSelector((state) => state.appSlice.selectedYear);

  const handleChangeMonth = (e) => {
    dispatch(changeSelectedMonth(Number(e.target.value)));
    dispatch(changeWeekIndex(0));
  };

  const handleChangeYear = (e) => {
    dispatch(changeSelectedYear(Number(e.target.value)));
    dispatch(changeWeekIndex(0));
  };

  return (
    <div className="headCard">
      <h2>Your Todo's</h2>
      <div className="monthSelectCard">
        <select
          className="selectBox"
          value={selectedMonth}
          onChange={handleChangeMonth}
        >
          {MONTHS_NAMES.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="selectBox"
          value={selectedYear}
          onChange={handleChangeYear}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Head;
