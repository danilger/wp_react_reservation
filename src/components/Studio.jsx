import { useContext } from "react";
import { appContext } from "../App";
import StudioContacts from "./StudioContacts";
import Time from "./Time";
import { ru } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import format from "date-fns/format";
import { getCurrentDate } from "./functions/getCurrentDate";
import { useEffect } from "react";

export let Studio = () => {
  let [selected, setSelected] = useState(new Date()); //инициализируем state с первоначальной датой
  let [time, setTime] = useState(new Set()); //инициализируем state со стартовым временем
  let date = selected ? format(selected, "dd/MM/yyyy") : getCurrentDate();
  let context = useContext(appContext);

  context.studio.date = date;
  context.studio.time = time;
  context.studio.setTime = setTime;
  context.studio.selected = selected;
  context.studio.setSelected = setSelected;

  useEffect(() => {
    setTime(new Set());
  }, [selected]);

  return (
    <div style={context.visible.studio}>
      <div className="m-auto mt-5 w-25">
        <DayPicker
          mode="single"
          fromDate={new Date()}
          locale={ru}
          selected={context.studio.selected}
          onSelect={context.studio.setSelected}
          footer=""
          showOutsideDays
          fixedWeeks
        />
      </div>
      <Time />
      <StudioContacts />
    </div>
  );
};
