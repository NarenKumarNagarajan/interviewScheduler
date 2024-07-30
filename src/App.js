import { BrowserRouter, Routes, Route } from "react-router-dom";

import Calendar from "./components/Calendar";
import MonthByDate from "./components/MonthByDate";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/month-by-date" element={<MonthByDate />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
