import { useContext, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { appContext } from "../App";
import { ru } from "date-fns/locale";
import { useState } from "react";
import { setNontAvailableDaysInCalendar } from "./functions/setNontAvailableDaysInCalendar";
import { FlatContacts } from "./FlatContacts";

export let Flat = () => {
  let context = useContext(appContext);

  let [days, setDays] = useState([]);
  let [notAvailableDays, setNotAvailableDays] = useState([]);

  let handleMonthChange = (date) => {
    setNontAvailableDaysInCalendar(date).then((dates) => {
      if (dates) setNotAvailableDays(dates);
    });
  };

  context.flat.days = days;

  useEffect(() => {
    handleMonthChange(new Date());
  }, []);

  return (
    <div className="m-auto mt-5 w-25" style={context.visible.flat}>
      <DayPicker
        mode="multiple"
        fromDate={new Date()}
        // min={1}
        selected={days}
        onSelect={setDays}
        locale={ru}
        disabled={notAvailableDays}
        onMonthChange={handleMonthChange}
      />
      <FlatContacts />
    </div>
  );
};
