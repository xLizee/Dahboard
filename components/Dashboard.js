import { useEffect } from "react";
import Weather from "./widgets/Weather";
import Clock from "./widgets/Clock";
import Crypto from "./widgets/Crypto";
import Movies from "./widgets/Movies";

import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * This is function is used to call the correct widget depending on the type.
 */
const Dashboard = ({ widgets, refreshData }) => {
  const deleteWidget = async (widgetId) => {
    await fetch("api/widgets/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: widgetId,
      }),
    });
    refreshData();
  };

  useEffect(() => { }, []);

  return (
    <div className="my-20 text-center">
      <h1 className="mb-4">Octoboard Project</h1>
      <button onClick={() => refreshData()}><FontAwesomeIcon
        className="w-full hover:text-purple-700"
        icon={faRedoAlt}
      ></FontAwesomeIcon></button>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {" "}
        {widgets.map((widget, index) => {
          if (widget.api_name == "weather")
            return (
              <Weather
                key={index}
                params={widget}
                deleteWidget={deleteWidget}
              />
            );
          if (widget.api_name == "clock")
            return (
              <Clock key={index} params={widget} deleteWidget={deleteWidget} />
            );
          if (widget.api_name == "crypto")
            return (
              <Crypto key={index} params={widget} deleteWidget={deleteWidget} />
            );
          if (widget.api_name == "movies")
            return (
              <Movies key={index} params={widget} deleteWidget={deleteWidget} />
            );
        })}{" "}
      </div>

    </div>
  );
};

export default Dashboard;