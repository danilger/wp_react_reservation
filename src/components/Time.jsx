import { useContext, useEffect, useRef, useState } from "react";
import schedule from "./functions/schedule";
import isAvailable from "./functions/isAvailable";
import { appContext } from "../App";
import { transformDateToDb } from "./functions/transformDateToDb";

let Time = () => {

  let context = useContext(appContext);
  let date = transformDateToDb(context.studio.date);
  let [list, setList] = useState([schedule()]);
  let ref = useRef([]);

  let handler = async (e) => {
    e.target.classList.toggle("active");

    let timeSlot = e.currentTarget.getAttribute("timeslot");

    if (context.studio.time.has(timeSlot)) {
      await context.studio.setTime((p) => {
        p.delete(timeSlot);
        return new Set([...p]);
      });
    } else {
      await context.studio.setTime((p) => {
        p.add(timeSlot);
        return new Set([...p]);
      });
    }
  };

  useEffect(() => {
    document
      .querySelectorAll(".active")
      .forEach((e) => e.classList.remove("active"));

    let scheduleList = schedule();

    fetch(
      "https://yor_site.com/wp-json/reservation/v1/time_list?date=" + date
    )
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result)) {
          scheduleList = scheduleList.map((timeSlot) => {
            return isAvailable(context.studio.selected, timeSlot, result);
          });
        }
        setList(scheduleList);
      })
      .catch((error) => console.log("error!", error));
  }, [date, context.studio.selected]);

  return (
    <>
      <div className="m-auto mt-3 mb-3 w-25">{date}</div>
      <ul className="m-auto mb-5 list-group w-25">
        {list.map((e, k) => {
          return (
            <li
              ref={(e) => (ref.current[k] = e)}
              timeslot={e[0][0]}
              key={k + "_key"}
              className={
                e[1]
                  ? "list-group-item list-group-item pointer"
                  : "list-group-item list-group-item-warning"
              }
              onClick={(i) => {
                if (e[1]) {
                  handler(i);
                }
              }}
            >
              {e[0][0]} - {e[0][1]}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Time;
