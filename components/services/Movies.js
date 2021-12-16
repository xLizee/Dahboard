import { useState, useEffect } from "react";

/**
 * This is the Service Movies, is used to collect different types of Movies, 
 * For example: In theaters Movies, Popular Movies, Top rated Movies and Upcoming Movies
 * @param  {type: type} props 
 *   
 */

const Movies = (props) => {
  const addWidget = async (type) => {
    await fetch("/api/widgets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_name: "movies",
        auth_required: false,
        params: { type: type },
      }),
    });
  };

  useEffect(() => { }, []);
  /**
  * This is the function for create the widget Clock
  */
  const handleClick = (type) => {
    addWidget(type);
    props.toggleModal();
    props.resetServiceType(null);
    props.refreshData();
  }

  return (
    <div className="text-center">
      <h1 className="mb-2 text-3xl text-black">The Movie DB</h1>

      <div className="mt-12 grid grid-cols-2 gap-4">
        <button className="mx-auto my-3 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => handleClick('popular')}>Popular Movies</button>
        <button className="mx-auto my-3 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => handleClick('top_rated')}>Top Rated Movies</button>
        <button className="mx-auto my-3 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => handleClick('now_playing')}>In Theaters Now</button>
        <button className="mx-auto my-3 bg-gray-400 p-3 rounded-2xl text-white hover:text-purple-300" onClick={() => handleClick('upcoming')}>Upcoming Movies</button>
      </div>
    </div>
  );
};

export default Movies;
