import React, { useEffect, useState } from "react";
import { CardWeather } from "./card-weather";
const BASE_URL = new URL("http://api.openweathermap.org");
const KEY = "805df7ee7abbf9d4902605f53067e86d";

function _url(path) {
  const _URL = new URL(path, BASE_URL);
  _URL.searchParams.set("appid", KEY);
  _URL.searchParams.set("units", "metric");
  _URL.searchParams.set("lang", "ru");
  return _URL;
}
function weatherURL(city) {
  const _URL = new URL(_url("/data/2.5/weather"));
  _URL.searchParams.set("q", city ?? "London");
  return _URL;
}

function forecastURL(coord) {
  const _URL = new URL(_url(`/data/2.5/forecast`));
  _URL.searchParams.set("lat", coord.lat);
  _URL.searchParams.set("lon", coord.lon);
  return _URL;
}
export const Weather = ({ option }) => {
  const name = option?.capital?.[0];
  const [openWeatherMap, setOpenWeatherMap] = useState(null);

  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetch(weatherURL(name))
      .then((res) => res.json())
      .then((data) => {
        setOpenWeatherMap(data);
      })
      .catch((e) => {
        console.log("error", e);
        setOpenWeatherMap(null);
      });
  }, [name]);

  useEffect(() => {
    const coord = openWeatherMap?.coord;
    if (coord) {
      fetch(forecastURL(coord))
        .then((response) => response.json())
        .then((data) => setForecast(data))
        .catch((e) => {
          console.log("error", e);
          setForecast(null);
        });
    }
  }, [openWeatherMap]);
  const main = openWeatherMap?.main;
  console.log("main", main);
  const HR = () => <hr style={{ margin: 0 }} />;
  return (
    <div className="py-4">
      <div className="d-flex justify-content-end mb-2 align-items-end">
        <div
          className="card"
          style={{
            marginRight: "14px",
          }}
        >
        </div>
        <div className="card">
          <div className="card-header">Погода</div>
          <div className="card-body">
            <p className="lead" style={{ fontSize: "16px" }}>
              Тепература: {main?.temp}
              <HR />
              Чувствуется как: {main?.feels_like}
              <HR />
              Влажность: {main?.humidity}
            </p>
          </div>
        </div>
      </div>

      <CardWeather {...openWeatherMap} {...forecast} />
    </div>
  );
};
