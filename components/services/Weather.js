import { useState, useEffect } from "react";

/**
 * This is the Service Weather, is used to collect the weather of the selected timezone, 
 * @param  {city: city, type: type} props 
 *   
 */

const Weather = (props) => {
  const [city, setCity] = useState("Nice");

  const addWidget = async (city, type) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "weather",
        auth_required: false,
        params: { city: city, type: type },
      }),
    });
  };

  useEffect(() => { }, []);
  /**
  * This is the function for create the widget Clock
  */
  const handleClick = (widgetType) => {
    addWidget(city, widgetType);
    props.refreshData();
    props.toggleModal();
    props.resetServiceType(null);
  }

  return (
    <div className="text-center">
      <h1 className="mb-4  text-3xl text-black">Weather</h1>
      <input
        className="pl-2 mt-2 mr-2 py-2 rounded-xl"
        type="text"
        placeholder="Nice"
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="mt-12 flex flex-row ">
        <button className="mx-auto bg-gray-400 px-6 py-2 rounded-2xl text-white hover:text-purple-300" onClick={() => handleClick('daily')}>Daily</button>
        <button className="mx-auto bg-gray-400 px-6 py-2 rounded-2xl text-white hover:text-purple-300" onClick={() => handleClick('weekly')}>Weekly</button>
      </div>
    </div>
  );
};

export default Weather;
