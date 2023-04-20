import React, { useEffect, useState } from "react";

const countriesURL = new URL("https://restcountries.com/v3.1/all");

export const Header = ({ setOption }) => {
  const [contries, setContries] = useState(null);
  useEffect(() => {
    fetch(countriesURL)
      .then((res) => res.json())
      .then((data) => setContries(data));
  }, []);

  return (
    <div
      className="d-flex justy-content-center align-items-center  "
      style={{ height: "70px", background: "#48484a", zIndex: 1 }}
    >
      <div className="container-xl d-flex gap-3 align-items-center">
        <input
          type="text"
          className="form-control"
          list="countries"
          placeholder="Bishkek"
          onSelect={(e) =>
            setOption(
              contries?.find(
                (country) => country.capital?.[0] === e.target.value
              )
            )
          }
        />
        <datalist id="countries">
          {contries?.map((country) => {
            const capital = country.capital;
            return capital?.map((item) => (
              <option key={item} style={{ ":hover": { background: "red" } }}>
                {item}
              </option>
            ));
          })}
        </datalist>
      </div>
    </div>
  );
};
