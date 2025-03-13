import React from "react";
import { useIsFetching } from "react-query";
import "./GlobalSpinner.css";

const GlobalSpinner: React.FC = () => {
  const isFetching = useIsFetching();

  return isFetching ? (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(251, 239, 215, 0.6)",
          filter: "blur(0px)",
          zIndex: 1000,
        }}
      >
        {" "}
        <span className="loader"></span>
      </div>
    </div>
  ) : null;
};

export default GlobalSpinner;
