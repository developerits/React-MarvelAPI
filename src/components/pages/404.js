import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const NoMatch = () => {
  let navigate = useNavigate();

  return (
    <div>
      <button
        style={{
          border: "none",
          display: "block",
          margin: "0 auto",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        <ErrorMessage />
      </button>
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Click on the robot to go back
      </p>
    </div>
  );
};

export default NoMatch;
