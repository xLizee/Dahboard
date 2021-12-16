import { useState, useEffect } from "react";

/**
 * This is the Service Crypto, to get the information of the slected crypto
 * @param  {pair: pair, refreshRate: refreshRate} props 
 *   
 */

const Crypto = (props) => {
  const [pair, setPair] = useState("ETHUSD");
  const [refreshRate, setRefreshRate] = useState(10000)

  const addWidget = async (pair) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "crypto",
        auth_required: false,
        params: { pair: pair, refreshRate: refreshRate },
      }),
    });
  };

  useEffect(() => { }, []);
  /**
  * This is the function for create the widget Clock
  */
  const handleClick = () => {
    addWidget(pair)
    props.toggleModal()
    props.resetServiceType(null);
    props.refreshData();
  }

  return (
    <div className="text-center">
      <h1 className="mb-2 text-3xl text-black">Crypto Market</h1>
      <label>Default pair :</label>
      <div className="flex flex-col ">
        <input
          className="mx-auto w-72 pl-2 mt-2 mb-6 py-2 rounded-xl"
          type="text"
          placeholder="ETHUSD"
          onChange={(e) => setPair(e.target.value)}
        />
        <label>Refresh Rate (ms) :</label>
        <input
          className="mx-auto w-72 pl-2 mt-2 mb-6 py-2 rounded-xl"
          type="text"
          placeholder="10000"
          onChange={(e) => setRefreshRate(e.target.value)}
        />
        <button className="mx-auto bg-gray-400 px-6 py-2 rounded-2xl text-white hover:text-purple-300" onClick={handleClick}>Create Widget</button>
      </div>
    </div>
  );
};

export default Crypto;
