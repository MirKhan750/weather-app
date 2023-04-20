import React from "react";

export const CardWeather = (props) => {
  const date = new Date(Date.now());
  const dateConfig = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="card">
      <div className="card-body">
        <p className="font-weight-light text-muted m-0">
          {date.toLocaleDateString("ru-RU", dateConfig)}
        </p>
        <h5 className="card-title">
          {props?.name}, {props?.sys?.country}
        </h5>
        <hr className="hr" />
        <table className="table table-small table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Время</th>
              <th scope="col">Облачность в процентах</th>
              <th scope="col">Описание</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {props?.list?.map((li, index) => (
              <tr key={index}>
                <th scope="col">{index + 1}</th>
                <td>{li.dt_txt}</td>
                <td>{li.clouds.all}%</td>
                <td>{li.weather[0].description}</td>
                <td className="p-0">
                  <img
                    src={openWeatherMapIcon(li.weather[0].icon)}
                    alt={li.weather[0].description}
                    style={{ width: "38px", margin: 0 }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const openWeatherMapIcon = (icon) =>
  new URL(`https://openweathermap.org/img/wn/${icon}.png`);
