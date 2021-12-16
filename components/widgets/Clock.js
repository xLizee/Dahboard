import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import moment from "moment-timezone";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * This is the Widget Clock, to get the time of the selected time zone
 * @param { continent: continent, country: country} props 
 *   
 */

const WClock = (props) => {
  let currentParams = props.params.params;
  let widgetId = props.params._id;
  const [data, setData] = useState([]);
  const [value, setValue] = useState(new Date());
  const [error, setError] = useState(null);
  const [country, setCountry] = useState(currentParams.country);
  const [continent, setContinent] = useState(currentParams.continent);
  /**
   * FetchTimezone used to collect the information of the API Weather,
   * which we use to access weather information.
   */
  const fetchTimezone = async () => {
    try {
      let timezone = continent + "/" + country;
      let response = await fetch(
        `http://worldtimeapi.org/api/timezone/${timezone}`
      );
      let data = await response.json();
      setData(data);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  useEffect(() => {
    fetchTimezone();
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * This function is used for delete a widget
   * @param {*} e 
   */
  const handleClick = async (e) => {
    props.deleteWidget(widgetId);
  };
  /**
   * This function is used to change a continent
   * @param {*} e 
   *   
   */
  const handleChangeContinent = async (e) => setContinent(e.target.value);
  /**
   * This function is used to change a country
   * @param {*} e 
   *   
   */
  const handleChangeCountry = async (e) => setCountry(e.target.value);

  /**
   * This function is used to resfresh the data, and display the new date of the selected country
   */
  const handleSubmit = async () => {
    await fetch("/api/widgets/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        req_type: "CLOCK",
        _id: widgetId,
        params: { continent: continent, country: country },
      }),
    });
    await fetchTimezone();
  };

  return (
    <div>
      <div className="flex flex-col justify-center py-12">
        <div className="relative max-w-xl mx-auto">
          <div className="relative bg-white shadow-lg rounded-3xl px-6 py-4 bg-clip-padding bg-opacity-60 border border-gray-100">
            <button className="absolute left-4 top-2 text-black hover:text-red-600">
              <FontAwesomeIcon
                className="h-3"
                icon={faTrashAlt}
                onClick={handleClick}
              ></FontAwesomeIcon>
            </button>
            <div className="mb-2 mt-4 text-xl">
              {" "}
              {moment.tz(data.timezone).format("LTS")}
            </div>
            <Clock value={moment.tz(data.timezone).format("LTS")} />
            <div className="mt-4">{data.timezone}</div>
        <div className="mt-2 flex flex-col">
          <input
            type="text"
            className="mt-2 mx-auto h-6 w-32 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
            placeholder={continent}
            onChange={handleChangeContinent}
            />
          <input
            type="text"
            className="mt-2 mx-auto h-6 w-32 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
            placeholder={country}
            onChange={handleChangeCountry}
            />
          <div className="absolute bottom-9 right-1">
            {" "}
            <button
              className="text-black h-6 rounded-md pl-2 pr-2 bg-opacity-50 hover:text-purple-500"
              onClick={handleSubmit}
              >
              <FontAwesomeIcon className="h-3" icon={faSync}></FontAwesomeIcon>
            </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WClock;