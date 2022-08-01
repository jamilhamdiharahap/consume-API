import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import { API, API2, API3 } from "../api/api-country";

export default function DetailCountry() {
  const [country, setCountry] = useState(null);
  const [code, setCode] = useState("");
  const [currencies, setCurrencies] = useState(null);
  const [curren, setCurren] = useState("");
  const [callingCode, setCallingCode] = useState(null);
  let params = useParams();

  useEffect(() => {
    fetch(API + params.name)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setCountry(data[0]);
        getIdd(data[0].idd.root + data[0].idd.suffixes[0]);
        setCurren(getCurrencies(data[0].currencies));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.name]);

  useEffect(() => {
    fetch(API2 + code)
      .then((response) => response.json())
      .then((data) => {
        setCallingCode(data.map((v) => v.name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [code]);

  useEffect(() => {
    fetch(API3 + curren)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data.map((v) => v.name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [curren]);

  const getIdd = (params) => {
    setCode(params.replace("+", ""));
  };

  const getCurrencies = (params) => {
    return Object.keys(params)[0];
  };

  const getNativeName = (params) => {
    let key = Object.keys(params)[0];
    return country.name.nativeName[key].official;
  };

  const [isHovering, setIsHovering] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOver1 = () => {
    setIsCode(true);
  };
  
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleMouseOut1 = () => {
    setIsCode(false);
  };

  return (
    <>
      {country != null && callingCode != null && currencies != null ? (
        <div className="flex flex-col ml-28 m-10 gap-8">
          <div className="bg-purple flex flex-row p-2 rounded-md text-white items-center gap-4 w-48">
            <FaArrowLeft />
            <Link to="/">Back to Homepage</Link>
          </div>
          <div className="mt-12">
            <div className="flex gap-2 p-2">
              <h1 className="text-5xl">{country.name.common}</h1>
              <img src={country.flags.png} alt="" width="72" height="30" />
            </div>
            <div className="flex gap-1">
              <p className="bg-metal p-2 rounded-full text-xs text-white">
                {country.cca2}
              </p>
              <span className="bg-metal p-2 rounded-full text-xs text-white">
                {country.name.official}
              </span>
              <span className="bg-metal p-2 rounded-full text-xs text-white">
                {getNativeName(country.name.nativeName)}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="shadow-xl gap-3 w-full h-36">
              <div className="ml-6">
                <h1 className="text-lg p-2">LatLong</h1>
                <h1 className="text-5xl p-2 text-purple">
                  {" "}
                  {country.latlng[0] + ", " + country.latlng[1]}
                </h1>
                <div id="image" className="absolute bottom-1/2"></div>
              </div>
            </div>
            <div className="flex items-center shadow-xl gap-3 w-full h-36">
              <div className="ml-6">
                <h1 className="text-xs p-2">Capital : {country.capital[0]}</h1>
                <h1 className="text-xs p-2">Region : {country.region} </h1>
                <h1 className="text-xs p-2">Subregion: {country.subregion}</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="gap-3 w-full h-36">
              <h1>Calling Code</h1>
              <h1 className="text-5xl text-purple">{code}</h1>
              <div onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut1}>
                <h1>
                  <Link className="text-purple" to="#">
                    {callingCode.length} country
                  </Link>{" "}
                  with this calling code
                </h1>
                {isCode && (
                  <div className="bg-silver w-48 z-10 relative rounded-md p-1">
                    {callingCode.map((item) => (
                      <h1 className="text-white text-xs p-1">{item}</h1>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col ml-6 w-full h-36">
              <h1>Currency</h1>
              <h1 className="text-5xl text-purple">
                {getCurrencies(country.currencies)}
              </h1>
              <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <h1>
                  <Link className="text-purple bor" to="#">
                    {currencies.length} country
                  </Link>{" "}
                  with this currency
                </h1>
                {isHovering && (
                  <div className="bg-silver w-48 z-10 relative rounded-md p-1">
                    {currencies.map((item) => (
                      <h1 className="text-white text-xs p-1">{item}</h1>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Kosong</h1>
      )}
    </>
  );
}
