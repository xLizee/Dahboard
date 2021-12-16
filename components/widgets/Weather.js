import { useEffect, useState } from "react";
import moment from "moment";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * This function is used to collect the information Weather with api.
 * it retrieves the data of the day as well as of the next week.
 * @param {*} props 
 *   
 */
const useFindWeather = (props) => {
  const [city, setCity] = useState(props.city);
  const [type, setType] = useState(props.type);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return {
    city,
    setCity,
    data,
    error,
    setError,
    fetchWeather: async () => {
      let res = null;
      let result = null;
      try {
        if (type == "daily") {
          res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.weatherKey}`
          );
          if (!res.ok) setError("Not found");
          else {
            setError(null);
            result = await res.json();
          }
        }
        if (type == "weekly") {
          res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.weatherKey}`
          );
          if (!res.ok) setError("Not found");
          else {
            setError(null);
            result = await res.json();
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setData(result);
      }
    },
  };
};

const Weather = (props) => {
  const [update, setUpdate] = useState(false);
  let currentParams = props.params.params;
  let widgetId = props.params._id;
  const { fetchWeather, city, setCity, data, error, setError } =
    useFindWeather(currentParams);

  /**
   * This function is used to change the city
   */
  const handleChange = async (e) => setCity(e.target.value);
  const handleSubmit = async () => {
    try {
      await fetch("/api/widgets/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          req_type: "WEATHER",
          _id: widgetId,
          city: city,
        }),
      });
      setUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  };
  /**
   * This function is used to delete the widget.
   * @param {*} e 
   */
  const handleClick = async (e) => {
    props.deleteWidget(widgetId);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchWeather();
    }
    fetchData();
  }, [update]);

  return (
    <div>
      {currentParams.type == "daily" && error && <div className="flex flex-col justify-center py-12">
        <div className="relative max-w-xl mx-auto">
          <div className="relative bg-white shadow-lg rounded-3xl p-4 bg-clip-padding bg-opacity-60 border border-gray-100">
            <h1 className="">{error}</h1>
            <button
              className="absolute left-3 top-2 text-black hover:text-red-600"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon
                className="h-3"
                icon={faTrashAlt}
                onClick={handleClick}
              ></FontAwesomeIcon>
            </button>
            <div className="relative pt-2">
              <input
                type="text"
                className="h-6 w-52 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
                placeholder={city}
                onChange={handleChange}
              />
              <div className="absolute top-2 right-0">
                {" "}
                <button
                  className="text-black h-6 rounded-md pl-2 pr-2 bg-opacity-50 hover:text-purple-500"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    className="h-3"
                    icon={faSync}
                  ></FontAwesomeIcon>
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
        || data && currentParams.type == "daily" && (
          <div className="flex flex-col justify-center py-12">
            <div className="relative max-w-xl mx-auto">
              <div className="relative bg-white shadow-lg rounded-3xl p-4 bg-clip-padding bg-opacity-60 border border-gray-100">
                <button
                  className="absolute right-3 top-2 text-black hover:text-red-600"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    className="h-3"
                    icon={faTrashAlt}
                    onClick={handleClick}
                  ></FontAwesomeIcon>
                </button>
                <div className="text-2xl text-purple-800">
                  {moment().format("dddd")}
                </div>
                <img
                  className="mx-auto h-28"
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                />
                <div className="text-4xl mt-2 mb-5">
                  {Math.round(data.main.temp)}&deg;C
                </div>
                <div className="sm:text-lg xl:text-2xl">{data.name}</div>
                <div className="m-0 italic">{data.weather[0].main}</div>
                <div className="ml-auto flex flex-row text-xs">
                  <svg
                    className="h-3.5"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="#202020"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  >
                    <path d="M51.9 40.1a20.6 20.6 0 0 0-1-4.9C46.9 20.8 32 2 32 2S17.1 20.8 13 35.2a20.6 20.6 0 0 0-1 4.9c0 .5-.1 1-.1 1.5A20.2 20.2 0 0 0 32 62a20.2 20.2 0 0 0 20-20.4c0-.5 0-1-.1-1.5z" />
                    <path
                      data-name="layer1"
                      fill="none"
                      stroke="#202020"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                      d="M38 30L26 50"
                    />
                    <circle
                      data-name="layer1"
                      cx="26"
                      cy="32"
                      r="4"
                      fill="none"
                      stroke="#202020"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                    <circle
                      data-name="layer1"
                      cx="38"
                      cy="48"
                      r="4"
                      fill="none"
                      stroke="#202020"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    />
                  </svg>
                  <div>{data.main.humidity}%</div>
                </div>
                <div className="relative pt-2">
                  <input
                    type="text"
                    className="h-6 w-52 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
                    placeholder={city}
                    onChange={handleChange}
                  />
                  <div className="absolute top-2 right-0">
                    {" "}
                    <button
                      className="text-black h-6 rounded-md pl-2 pr-2 bg-opacity-50 hover:text-purple-500"
                      onClick={handleSubmit}
                    >
                      <FontAwesomeIcon
                        className="h-3"
                        icon={faSync}
                      ></FontAwesomeIcon>
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      <div>
        {currentParams.type == "weekly" && error && <div className="relative max-w-xl mx-auto">
          <div className="relative bg-white shadow-lg rounded-3xl p-4 bg-clip-padding bg-opacity-60 border border-gray-100">
            <h1 className="">{error}</h1>
            <button
              className="absolute left-3 top-2 text-black hover:text-red-600"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon
                className="h-3"
                icon={faTrashAlt}
                onClick={handleClick}
              ></FontAwesomeIcon>
            </button>
            <div className="relative pt-2">
              <input
                type="text"
                className="h-6 w-52 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
                placeholder={city}
                onChange={handleChange}
              />
              <div className="absolute top-2 right-0">
                {" "}
                <button
                  className="text-black h-6 rounded-md pl-2 pr-2 bg-opacity-50 hover:text-purple-500"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    className="h-3"
                    icon={faSync}
                  ></FontAwesomeIcon>
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
          || data && currentParams.type == "weekly" && (
            <div className="py-12">
              <div className="relative max-w-xl mx-auto">
                <div className="flex flex-col relative bg-white shadow-lg rounded-3xl p-4 bg-clip-padding bg-opacity-60 border border-gray-100">
                  <div className="md:text-2xl mb-2 sm:text-xl">{data.city.name}</div>
                  <div className="m-0 italic text-ms mb-4">
                    {data.list[1].weather[0].main}
                  </div>
                  <img
                    className="sm:hidden xl:block absolute mx-auto right-6 top-0 h-24"
                    src={`http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`}
                  />
                  <div className="md:flex md:flex-row sm:flex-wrap sm:place-content-center mx-auto">
                    <div className="ml-6 flex-col mr-4">
                      <div className="text-purple-800">
                        {moment(data.list[3].dt_txt).format("DD/MM/YYYY")}
                      </div>
                      <div>{Math.round(data.list[3].main.temp)}&deg;C</div>
                      <img
                        className="mx-auto"
                        src={`http://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png`}
                      />
                    </div>
                    <div className="flex-col mr-4">
                      <div className="text-purple-800">
                        {moment(data.list[11].dt_txt).format("DD/MM/YYYY")}
                      </div>
                      <div>{Math.round(data.list[11].main.temp)}&deg;C</div>
                      <img
                        className="mx-auto"
                        src={`http://openweathermap.org/img/w/${data.list[11].weather[0].icon}.png`}
                      />
                    </div>
                    <div className="flex-col mr-4">
                      <div className="text-purple-800">
                        {moment(data.list[19].dt_txt).format("DD/MM/YYYY")}
                      </div>
                      <div>{Math.round(data.list[19].main.temp)}&deg;C</div>
                      <img
                        className="mx-auto"
                        src={`http://openweathermap.org/img/w/${data.list[19].weather[0].icon}.png`}
                      />
                    </div>
                    <div className="flex-col mr-4">
                      <div className="text-purple-800">
                        {moment(data.list[27].dt_txt).format("DD/MM/YYYY")}
                      </div>
                      <div>{Math.round(data.list[27].main.temp)}&deg;C</div>
                      <img
                        className="mx-auto"
                        src={`http://openweathermap.org/img/w/${data.list[27].weather[0].icon}.png`}
                      />
                    </div>
                    <div className="flex-col mr-4">
                      <div className="text-purple-800">
                        {moment(data.list[35].dt_txt).format("DD/MM/YYYY")}
                      </div>
                      <div>{Math.round(data.list[35].main.temp)}&deg;C</div>
                      <img
                        className="mx-auto"
                        src={`http://openweathermap.org/img/w/${data.list[35].weather[0].icon}.png`}
                      />
                    </div>
                  </div>
                  <button
                    className="absolute top-2 left-4 text-black hover:text-red-600"
                    onClick={handleSubmit}
                  >
                    <FontAwesomeIcon
                      className="h-3"
                      icon={faTrashAlt}
                      onClick={handleClick}
                    ></FontAwesomeIcon>
                  </button>
                  <div className="relative pt-2 w-52 mx-auto">
                    <input
                      type="text"
                      className="h-6 w-52 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
                      placeholder={city}
                      onChange={handleChange}
                    />
                    <div className="absolute top-2 right-0">
                      {" "}
                      <button
                        className="text-black h-6 rounded-md pl-2 pr-2 bg-opacity-50 hover:text-purple-500"
                        onClick={handleSubmit}
                      >
                        <FontAwesomeIcon
                          className="h-3"
                          icon={faSync}
                        ></FontAwesomeIcon>
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Weather;