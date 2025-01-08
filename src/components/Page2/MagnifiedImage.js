import React, { useRef, useEffect, useState } from "react";
import "./Page2.css";
import { select, scaleLinear, extent } from "d3";
import BB from "../match/batsman-bowler-info";

export const options = {
  tooltips: {
    enabled: true,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      display: true,
    },
    x: {
      display: true,
    },
  },
};

function MagnifiedImage({ selected_ball_data }) {
  const ref = useRef(null);
  let end_flip = selected_ball_data.flip;
  let bat_type = selected_ball_data.Bat_type;

  let playerlocation = Array.isArray(selected_ball_data.players)
    ? selected_ball_data.players.map((player, index) => {
        if (end_flip) {
          //myFunction_set180();
          var oldx = player.homo_track[0];
          var oldy = player.homo_track[1];
          var xtransformed = 0;
          var ytransformed = 0;

          if (oldx > 1422) {
            xtransformed = 1506 - (oldx - 1506);
          } else {
            xtransformed = 1506 - oldx + 1506;
          }

          if (oldy > 1513) {
            ytransformed = 1511 - (oldy - 1511);
          } else {
            ytransformed = 1511 - oldy + 1511;
          }

          return {
            x: xtransformed,
            y: -1 * ytransformed,
            id: player.identities,
          };
        }
        if (!end_flip) {
          return {
            x: player.homo_track[0],
            y: -1 * player.homo_track[1],
            id: player.identities,
          };
        }
      })
    : [];

  const data = playerlocation;
  const w = 401,
    h = 370,
    margin = { top: 0, bottom: 0, left: 0, right: 0 };
  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  useEffect(() => {
    const g = select(ref.current);
    const xScale = scaleLinear().domain([781, 2264]).range([0, width]);

    const yscale = scaleLinear().domain([-2232, -795]).range([height, 0]);

    g.selectAll(".circles")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      .style("cursor", "pointer")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yscale(d.y))
      .attr("fill", "red");

    g.selectAll(".circles")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(d.x) + 2)
      .attr("y", (d) => yscale(d.y) + 2)
      .text((d) => {
        return d.id;
      });

    g.selectAll("circle").on("click", function (d) {
      alert("x:" + d.x + ", y:" + d.y);
    });
  }, [data]);

  return (
    <>
      <div className="mag-image-players">
        <div className="mag-image-container">
          <div> Over Number : {selected_ball_data.over}</div>
          <div> Ball Number : {selected_ball_data.ball}</div>
        </div>
        <div className="image-container">
          <svg width={w} height={h}>
            <g
              ref={ref}
              transform={`translate(${margin.left},${margin.top})`}
            />
          </svg>
        </div>

        <BB
          batsman={selected_ball_data.onstrike_batsman}
          bowler={selected_ball_data.bowler}
          type={selected_ball_data.Bat_type}
        />
      </div>
    </>
  );
}

export default MagnifiedImage;
