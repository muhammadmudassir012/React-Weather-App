import React from "react";
import { Link } from "react-router-dom";

function WeatherHistory() {
  let allWeather = [];
  const weather = localStorage.getItem("weather");
  if (weather !== null) {
    allWeather = JSON.parse(weather);
  }

  const clearHistory = () => {
    localStorage.removeItem("weather");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col p-5 bg-gradient-to-r from-blue-400 to-indigo-500 lg:items-center ">
      {/* <h1 className=" mb-6 text-4xl font-bold outline-4  lg:text-6xl ">Weather History</h1> */}

      <div className="w-full max-w-4xl overflow-x-auto">
        {allWeather == "" ? (
          // <div className="pt-5 flex flex-col items-center justify-center">
          //   <div className="text-center  p-6 rounded-lg">
          //     {/* Icon */}
          //     <div className="mb-4 w-full text-yellow-400">
          //       {/* <h1 className="">🌤️</h1> */}
          //     </div>

          //     {/* Heading */}
          //     <h1 className="text-4xl font-bold text-gray-800 mb-3">
          //       No History Found!
          //     </h1>

          //     {/* Subtitle */}
          //     <p className="text-lg text-gray-500 mb-5">
          //       You haven't searched for any weather updates yet.
          //     </p>

          //     {/* Button */}
          //     <Link to={"/home"}>
          //       <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-all">
          //         Back to Home
          //       </button>
          //     </Link>
          //   </div>
          // </div>
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Weather History</h1>
        <p className="text-lg text-gray-600 mb-6">No History Found!</p>
        <p className="text-gray-500 mb-8">You haven't searched for any weather updates yet.</p>
        <Link to={'/home'}>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
          Back to Home
        </button>
        </Link>
      </div>
    </div>
        ) : (
          <>
          <h1 className=" mb-6 text-4xl font-bold text-white text-center pt-4 lg:text-6xl ">Weather History</h1>
            <div className="flex justify-between px-4">
              <button
                onClick={clearHistory}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Clear History
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-4 border text-sm lg:text-base">Date</th>
                    <th className="p-4 border text-sm lg:text-base">Time</th>
                    <th className="p-4 border text-sm lg:text-base">
                      City Name
                    </th>
                    <th className="p-4 border text-sm lg:text-base">
                      Temperature
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allWeather.map((item, index) => (
                    <tr
                      key={index}
                      className="text-center text-xs md:text-sm lg:text-base"
                    >
                      <td className="p-4 border">{item.date}</td>
                      <td className="p-4 border">{item.time}</td>
                      <td className="p-4 border">{item.city}</td>
                      <td className="p-4 border">{item.temp}C</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherHistory;
