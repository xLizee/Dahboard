import { useState, useEffect } from "react";

/**
 * This is the Service Clock, to get the time of the selected time zone
 * @param { continent: continent, country: country} props 
 *   
 */
const Clock = (props) => {
  const [continent, setContinent] = useState("Europe");
  const [country, setCountry] = useState("Paris");

  const addWidget = async (continent, country) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "clock",
        auth_required: false,
        params: { continent: continent, country: country },
      }),
    });
  };

  useEffect(() => {}, []);
  /**
   * This is the function for create the widget Clock
   */
  const handleClick = () => {
    addWidget(continent, country);
    props.toggleModal();
    props.resetServiceType(null);
    props.refreshData();
  };

  return (
    <div className=" text-center">
      <h1 className="mb-2 text-3xl text-black">Clock</h1>
      <input
        className="pl-2 mt-2 mr-2 py-2 rounded-xl"
        type="text"
        placeholder="Europe"
        onChange={(e) => setContinent(e.target.value)}
      />
      <input
        className="pl-2 py-2 rounded-xl"
        type="text"
        placeholder="Paris"
        onChange={(e) => setCountry(e.target.value)}
      />
      <button className="mx-auto my-8 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={handleClick}>Create Widget</button>
    </div>
  );
};

export default Clock;
