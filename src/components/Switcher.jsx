import { useContext } from "react";
import { appContext } from "../App";

export let Switcher = () => {
  let context = useContext(appContext);

  let trigger = (t) => {
    switch (t) {
      case "studio":
        context.setVisible({
          flat: { display: "none" },
          studio: { display: "block" },
        });
        break;
      case "flat":
        context.setVisible({
          flat: { display: "block" },
          studio: { display: "none" },
        });
        break;
      default:
        context.setVisible({
          flat: { display: "none" },
          studio: { display: "none" },
        });
    }
  };

  return (
    <div className="m-auto mt-5 w-25 d-flex flex-column">
      Бронировать
      <button
        type="button"
        className="btn btn-primary mt-3 mb-3"
        onClick={() => trigger("studio")}
      >
        Почасовая аренда
      </button>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => trigger("flat")}
      >
        По суточно
      </button>
    </div>
  );
};
