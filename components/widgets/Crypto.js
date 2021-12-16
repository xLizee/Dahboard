import { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const KRAKEN_DATA_LABELS = Object.freeze({
  a: "Ask",
  b: "Bid",
  c: "Last Trade Closed",
  v: "Volume",
  l: "Low",
  h: "High",
  o: "Today Opening Price",
});

/**
 * This function is used to collect the information of the selected crypto with the API kraken
 * which we use to access crypto information.
 * @param {*} pair 
 *   
 */
const useFindTicker = (pair) => {
  const [symbol, setSymbol] = useState(pair);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return {
    symbol,
    setSymbol,
    data,
    error,
    find: async () => {
      try {
        if (symbol.trim().length < 1) {
          console.log("Symbol is empty");
          return;
        }

        const res = await fetch(
          `https://api.kraken.com/0/public/Ticker?pair=${symbol.trim()}`
        );
        const { error, result } = await res.json();

        if (error.length > 0) {
          setError(error);
          return;
        } else setError(null);

        setData(
          Object.keys(result).reduce(
            (pv, cv) => ({
              ...result[cv],
            }),
            {}
          )
        );
        return;
      } catch (e) {
        console.error(e);
      }
      
    },
  };
};

const Crypto = (props) => {
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState(new Date());
  let defaultPair = props.params.params.pair;
  let refreshRate = props.params.params.refreshRate;
  let widgetId = props.params._id;
  const { find, symbol, setSymbol, data, error } = useFindTicker(defaultPair);

  let t = defaultPair.split("EUR").length - 1;
  /**
   * This function is used to resfresh the data, and display the new crypto information
   */
  const handleSubmit = async () => {
    find();
    await fetch("/api/widgets/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        req_type: "CRYPTO",
        _id: widgetId,
        pair: symbol,
      }),
    });
    setUpdate(!update);
  };
  /**
   * This function is used to change the crypto
   * @param {*} e 
   *   
   */
  const handleChange = async (e) => setSymbol(e.target.value);
  /**
   * This function is used for delete a widget
   * @param {*} e 
   */
  const handleClick = async (e) => {
    props.deleteWidget(widgetId);
  };

  useEffect(() => {
    find();
    const interval = setInterval(() => setValue(new Date()), refreshRate);
    return () => {
      clearInterval(interval);
    };
  }, [update, value]);

  return (
    <>
      <div>
        <div className="flex flex-col justify-center py-12">
          <div className="relative max-w-xl mx-auto">
            <div className="relative bg-white shadow-lg rounded-3xl pb-8 py-6 px-6 bg-clip-padding bg-opacity-60 border border-gray-100">
              <button
                className="absolute bottom-1 text-black hover:text-red-600"
                onClick={handleClick}
              >
                <FontAwesomeIcon
                  className="h-3"
                  icon={faTrashAlt}
                ></FontAwesomeIcon>
              </button>
              <h2 className="text-purple-800 text-xl mb-2">
                Search Crypto Currency Data
              </h2>
              <div className="relative pt-2">
                <input
                  className="h-8 w-60 pl-2 rounded-lg z-0 focus:shadow border-purple-100 focus:outline-none"
                  type="text"
                  placeholder={defaultPair}
                  onChange={handleChange}
                />
                <div className="absolute top-3 right-4">
                  {" "}
                  <button className="pr-2" onClick={handleSubmit}>
                    <FontAwesomeIcon
                      className="h-4 text-gray-400 hover:text-purple-400"
                      icon={faSearch}
                    ></FontAwesomeIcon>
                  </button>
                </div>
              </div>
              {/*  */}
              {(error && <h1>{error}</h1>) ||
                (data && (
                  <div className="w-56 mx-6 mt-6 px-6 border border-purple-500 rounded-xl bg-gray-200">
                    <div className="pt-4 text-2xl">
                      {t > 0 ? "€ " : "$ "}
                      {(data.a[0] * 100) / 100}
                    </div>
                    <div className="pt-1 text-sm">
                      {(((data.c[0] - data.o) / data.c[0]) * 100).toFixed(2)}{" "}
                      %
                    </div>
                    <div className="flex flex-row mx-auto py-4 place-content-center">
                      <div className="mr-3">
                        {" "}
                        Volume {((data.v[0] * 100) / 100).toFixed(2)}
                      </div>
                      <div className="mr-3">
                        {" "}
                        Low {((data.l[0] * 100) / 100).toFixed(2)}
                      </div>
                      <div className="">
                        {" "}
                        High {((data.h[0] * 100) / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crypto;
