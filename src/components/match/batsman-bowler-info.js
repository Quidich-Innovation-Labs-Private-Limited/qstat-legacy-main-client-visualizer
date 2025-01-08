import React from "react";
import "./match.css";
import BatIcon from "../../assets/bat.png";
import BallIcon from "../../assets/ball.png";

const BatsmanBowler = ({ result, batsman, bowler, type }) => {
  return (
    <div className="batsmen-bowler-div">
      <table>
        <tr>
          <td>
            <label htmlFor="batsman-name">
              <img src={BatIcon} height="40" alt="Bat" />
            </label>
          </td>
          <td>
            <input
              type="text"
              id="batsman-name"
              // style={
              //   type === "R"
              //     ? { background: "black" }
              //     : { background: "orange" }
              // }
              name="batsman"
              disabled
              value={`${batsman} (${type})`}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="bowler-name">
              <img src={BallIcon} height="22" alt="Ball" />
            </label>
          </td>
          <td>
            <input
              type="text"
              id="bowler-name"
              disabled
              name="bowler"
              value={bowler}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default BatsmanBowler;
