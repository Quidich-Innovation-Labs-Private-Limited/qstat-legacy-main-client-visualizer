import React, { useRef, useEffect, useState } from "react";
import "./Page3.css";
import { select, scaleLinear, extent } from "d3";
import BB from "../Page1/BB";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

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
      if (end_flip){
        //myFunction_set180();
        var oldx = player.homo_track[0];
        var oldy =player.homo_track[1] ;
        var xtransformed = 0;
        var ytransformed = 0 ;


        if (oldx> 1422){
          xtransformed = 1500 - (oldx - 1500);
        }
        else{
          xtransformed = ( 1500 - oldx ) + 1500;
        }

        if (oldy> 1513){
          ytransformed =1513 - (oldy - 1513) ;

        }
        else{
          ytransformed =( 1513 - oldy ) + 1513 ;
        }

        return {
          x: xtransformed,
          y: -1 *ytransformed,
          id: player.identities,
        };
      }
      if (!end_flip){
        return {
          x: player.homo_track[0],
          y: -1 *player.homo_track[1],
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
    const xScale = scaleLinear()
      .domain([781,2264])
      .range([0, width]);
      
    const yscale = scaleLinear()
      .domain([-2232,-795 ])
      .range([height, 0]);

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

      g.selectAll("circle")
      .on("click", function(d){alert("x:"+d.x +", y:"+d.y)});

  }, [data]);

  /*const data = {
    datasets: [
      {
        data: playerlocation,
        backgroundColor: "rgba(255, 99, 132, 1)",
        pointRadius: 8,
      },
    ],
  };*/
  return (
    <>
      <div className="mag-image-playerspage3">
        <div className="mag-image-containerpage3">
          <div> Over Number : {selected_ball_data.over}</div>
          <div> Ball Number : {selected_ball_data.ball}</div>
        </div>
        <div className="image-containerpage3">
        <svg width={w} height={h}>
          <g ref={ref} transform={`translate(${margin.left},${margin.top})`} />
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
