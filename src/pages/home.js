import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";

import { API } from "../api/api-country";
import AutoComplete from "../components/autoComplete";
import Search from "../components/search";

export default function Home() {
  const [country, setCountry] = useState([]);
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  var timer;

  const HandleKeyUp = (e) => {
    const time = 500;
    clearTimeout(timer);
    timer = setTimeout(() => {
      // CountryByName(e?.target.value, setCountry);
      // console.log(country);
      setValue(e.target.value);
      if (value !== "") {
        fetch(API + e?.target.value)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((country) => {
            setCountry(country);
          })
          .catch((error) => {
            setCountry([]);
          });
      } else {
        setCountry([]);
      }
    }, time);
  };
  const HandleFocus = () => {
    setFocus(!focus);
  };
  const data =
    country.length > 0
      ? country.slice(0, 5).map((item) => {
          return <AutoComplete name={item.name.common} key={item.name.cca2} />;
        })
      : value
      ? <li className="ml-10 p-1" style={{ color:'red' }}>Data Not Found</li>
      : country.slice(0, 5).map((item) => {
          return <AutoComplete name={item.name.common} key={item.car.cca2} />;
        });

  return (
    <div className="flex flex-col items-center w-screen h-2/4">
      <div className="absolute top-40 flex w-1/2 flex-col items-center">
        <p className="text-7xl p-2">COUNTRY</p>
        <div
          className={
            focus
              ? "focus border-bermuda focus:ring-bermuda"
              : "focus border-abu-abu"
          }
        >
          <Search KeyUp={HandleKeyUp} Focus={HandleFocus} />
          <FiSearch
            className={
              focus ? "text-bermuda focus:ring-bermuda" : "text-abu-abu"
            }
          />
        </div>
        <ul className="list-none p-0 m-0 w-full shadow-lg rounded-md">
          {data}
        </ul>
      </div>
    </div>
  );
}
