import { useContext, useRef } from "react";
import { appContext } from "../App";
import { ArangeIntervals } from "./functions/arangeIntervals";
import { countHoursInIntervals } from "./functions/countHoursInIntervals";
import { createPaymentApi } from "./functions/createPaymentApi";
import { formvalidation } from "./functions/formvalidation";
import { updateDate } from "./functions/updateData";

let StudioContacts = () => {
  let context = useContext(appContext);

  let ref = useRef([]);

  let handler = async () => {
    let check = formvalidation(ref.current[0], ref.current[1]);
    console.log(check);
    if (!check) {
      let intervals = ArangeIntervals(context.studio.time);

      let ids = await updateDate(
        context.studio.date,
        intervals,
        ref.current[0].value,
        ref.current[1].value
      );

      if (ref.current[2].checked) {
        let amount =
          countHoursInIntervals(intervals) * context.initialCost.hour;
        createPaymentApi(amount, JSON.stringify(ids));
      }
    }
  };

  return (
    <div className="m-auto mt-3 mb-3 w-25">
      <input
        ref={(e) => (ref.current[0] = e)}
        className="form-control mb-3 w-100"
        type="text"
        placeholder="Имя"
      />
      <input
        ref={(e) => (ref.current[1] = e)}
        className="form-control w-100 mb-5"
        type="tel"
        placeholder="Телефон"
      />
      <div className="form-check mb-5">
        <input
          ref={(e) => (ref.current[2] = e)}
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Оплатить картой на сайте
        </label>
      </div>
      <input
        type="button"
        onClick={handler}
        className="btn btn-primary"
        value="Бронировать"
      />
    </div>
  );
};
export default StudioContacts;
