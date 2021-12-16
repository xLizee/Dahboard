import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

/**
 * This function is used to collect the different information of Movies, with the API.
 * @param {*} props 
 *   
 */

const useFindMovies = (props) => {
  const [type, setType] = useState(props);
  const [data, setData] = useState(null);

  return {
    type,
    setType,
    data,
    findMovies: async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.moviesKey}&language=en-US&page=1`
        );
        let result = await res.json();
        setData(result);
        return;
      } catch (e) {
        console.error(e);
      }
    },
  };
};

const Movies = (props) => {
  const [update, setUpdate] = useState(false);
  const defaultType = props.params.params.type;
  let widgetId = props.params._id;
  const { findMovies, type, setType, data } = useFindMovies(defaultType);
  console.log(type)
  console.log(data)

  /**
   * This functions is used to change the options Movies.
   * @param {*} e 
   */
  const handleChange = async (e) => {
    setType(e.target.value);
    setUpdate(!update);
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
      await fetch("/api/widgets/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          req_type: "MOVIES",
          _id: widgetId,
          type: type,
        }),
      });

      findMovies(type);
    }
    fetchData();
  }, [type]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 1,
    },
  };
  return (
    <div >
      <div className="z-0 flex flex-col justify-center py-12">
        <div className="relative max-w-xl mx-auto">
          <div className="relative bg-white shadow-lg rounded-3xl py-10 px-0 bg-clip-padding bg-opacity-60 border border-gray-100 w-72">
            <div className="absolute top-2 right-1"> <button className="pr-2" onClick={handleClick}><FontAwesomeIcon className="h-3" icon={faTrashAlt}></FontAwesomeIcon></button></div>
            <div className="absolute w-50 bottom-0 p-2 text-right">
              <Menu as="div" className="text-left">
                <div>
                  <Menu.Button className="z-2000 w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-3xl bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Options =
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-violet-500 text-purple-900" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            value={"popular"}
                            onClick={handleChange}
                          >
                            Popular Movies
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-violet-500 text-purple-900" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            value={"top_rated"}
                            onClick={handleChange}
                          >
                            Top Rated Movies
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-violet-500 text-purple-900" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            value={"now_playing"}
                            onClick={handleChange}
                          >
                            In Theaters Now
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-violet-500 text-purple-900" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            value={"upcoming"}
                            onClick={handleChange}
                          >
                            Upcoming Movies
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <h1 className="text-2xl text-purple-800 divide-x divide-green-500">Movies</h1>
            <div>
              {data && type == "now_playing" && (
                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  arrows={true}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={4000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  partialVisibile={true}
                  containerClass="carousel-container relative z-0"
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  <div>
                    <p className="text-sm mb-3">In Theaters Now</p>
                    <p className="italic mb-1">{data.results[0].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`} />
                    <p className="mt-4">{data.results[0].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">In Theaters Now</p>
                    <p className="italic mb-2">{data.results[2].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[2].poster_path}`} />
                    <p className="mt-4">{data.results[2].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">In Theaters Now</p>
                    <p className="italic mb-2">{data.results[6].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[6].poster_path}`} />
                    <p className="mt-4">{data.results[6].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">In Theaters Now</p>
                    <p className="italic mb-2">{data.results[9].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[9].poster_path}`} />
                    <p className="mt-4">{data.results[9].vote_average}/10</p>
                  </div>
                </Carousel>
              )}
            </div>
            <div>
              {data && type == "popular" && (
                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  arrows={true}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={5000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container relative z-0"
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-10-px"
                >
                  <div>
                    <p className="text-sm mb-3">Popular Movies</p>
                    <p className="italic mb-1">{data.results[0].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`} />
                    <p className="mt-4">{data.results[0].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Popular Movies</p>
                    <p className="italic mb-2">{data.results[2].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[2].poster_path}`} />
                    <p className="mt-4">{data.results[2].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Popular Movies</p>
                    <p className="italic mb-2">{data.results[6].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[6].poster_path}`} />
                    <p className="mt-4">{data.results[6].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Popular Movies</p>
                    <p className="italic mb-2">{data.results[9].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[9].poster_path}`} />
                    <p className="mt-4">{data.results[9].vote_average}/10</p>
                  </div>
                </Carousel>
              )}
            </div>
            <div>
              {data && type == "top_rated" && (
                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  arrows={true}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={5000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container relative z-0"
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-10-px"
                >
                  <div>
                    <p className="text-sm mb-3">Top Rated Movies</p>
                    <p className="italic mb-1">{data.results[0].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`} />
                    <p className="mt-4">{data.results[0].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Top Rated Movies</p>
                    <p className="italic mb-2">{data.results[2].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[2].poster_path}`} />
                    <p className="mt-4">{data.results[2].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Top Rated Movies</p>
                    <p className="italic mb-2">{data.results[6].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[6].poster_path}`} />
                    <p className="mt-4">{data.results[6].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Top Rated Movies</p>
                    <p className="italic mb-2">{data.results[9].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[9].poster_path}`} />
                    <p className="mt-4">{data.results[9].vote_average}/10</p>
                  </div>
                </Carousel>
              )}
            </div>
            <div>
              {data && type == "upcoming" && (
                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  arrows={true}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={5000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container relative z-0"
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-10-px"
                >
                  <div>
                    <p className="text-sm mb-3">Upcoming Movies</p>
                    <p className="italic mb-1">{data.results[0].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`} />
                    <p className="mt-4">{data.results[0].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Upcoming Movies</p>
                    <p className="italic mb-2">{data.results[2].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[2].poster_path}`} />
                    <p className="mt-4">{data.results[2].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Upcoming Movies</p>
                    <p className="italic mb-2">{data.results[6].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[6].poster_path}`} />
                    <p className="mt-4">{data.results[6].vote_average}/10</p>
                  </div>
                  <div>
                    <p className="text-sm mb-3">Upcoming Movies</p>
                    <p className="italic mb-2">{data.results[9].title}</p>
                    <img className="h-32 mx-auto" src={`https://image.tmdb.org/t/p/original/${data.results[9].poster_path}`} />
                    <p className="mt-4">{data.results[9].vote_average}/10</p>
                  </div>
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
