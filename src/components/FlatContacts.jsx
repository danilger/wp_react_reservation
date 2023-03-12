import { useRef } from "react";
import { useContext } from "react";
import { appContext } from "../App";
import { saveAllDays } from "./functions/saveAllDays";
import { createPaymentApi } from "./functions/createPaymentApi";
import { formvalidation } from "./functions/formvalidation";

export let FlatContacts = () => {
  let context = useContext(appContext);

  let ref = useRef([]);

  let handler = async () => {
    let check = formvalidation(ref.current[0], ref.current[1]);

    if (!check) {
      let days = context.flat.days.map((d) => {
        let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        let month =
          d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        return `${d.getFullYear()}-${month}-${day}`; // переводим дату в формат 2023-02-19 00:00:00 для ACF плагина
      });

      let ids = await saveAllDays(
        ref.current[0].value,
        ref.current[1].value,
        days
      );

      if (ref.current[2].checked) {
        let amount = days.length * context.initialCost.day;
        createPaymentApi(amount, JSON.stringify(ids));
      }
    }
  };

  return (
    <div className="m-auto mt-3 mb-3 w-100">
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
