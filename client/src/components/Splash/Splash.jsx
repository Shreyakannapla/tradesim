import React, { useEffect } from "react";
import "./Splash.css";

const Splash = ({ setLoading }) => {

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 3000);

  }, []);

  return (
    <div className="splash-container">

      <h1 className="logo">
        Trade<span>Sim</span>
      </h1>

      <p className="tagline">
        Practice trading without financial risk
      </p>

    </div>
  );
};

export default Splash;