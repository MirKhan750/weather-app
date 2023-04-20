import React, { useState } from "react";
import { Header } from "./header";
import { Weather } from "./wether";
export const Main = () => {
  const [option, setOption] = useState(null);
  return (
    <div>
      <Header setOption={setOption}  />
      <div className="container-sm text-bg-light">
        <Weather option={option} />
      </div>
    </div>
  );
};
