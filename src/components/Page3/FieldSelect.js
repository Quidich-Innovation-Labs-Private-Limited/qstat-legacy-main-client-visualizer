import React, { useEffect, useRef, useState } from "react";
import "./Page3.css";
import { select, scaleLinear, extent } from "d3";

function Field(props) {
  const ref = useRef(null);

  let end_flip = props.ball.flip;
  let end_flip2 = props.ball2.flip;
  let bat_type = props.ball.Bat_type;

  let colorCode = (id) => {
    let list = props.selected.map((item) => {
      return item.identities;
    });
    let index = list.indexOf(id);
    let colors = [
      "yellow",
      "purple",
      "green",
      "brown",
      "skyblue",
      "green",
      "gray",
      "black",
      "white",
      "darkblue",
      "pink",
    ];
    return colors[index];
  };

  let playerlocation = Array.isArray(props.ball.players)
    ? props.ball.players.map((player, index) => {
        if (end_flip) {
          //myFunction_set180();
          var oldx = player.homo_track[0];
          var oldy = player.homo_track[1];
          var xtransformed = 0;
          var ytransformed = 0;

          if (oldx > 1422) xtransformed = 1500 - (oldx - 1500);
          else xtransformed = 1500 - oldx + 1500;

          if (oldy > 1513) ytransformed = 1513 - (oldy - 1513);
          else ytransformed = 1513 - oldy + 1513;

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
  let playerlocation2 = Array.isArray(props.ball2.players)
    ? props.ball2.players.map((player, index) => {
        if (end_flip2) {
          //myFunction_set180();
          var oldx = player.homo_track[0];
          var oldy = player.homo_track[1];
          var xtransformed = 0;
          var ytransformed = 0;

          if (oldx > 1422) xtransformed = 1500 - (oldx - 1500);
          else xtransformed = 1500 - oldx + 1500;

          if (oldy > 1513) ytransformed = 1513 - (oldy - 1513);
          else ytransformed = 1513 - oldy + 1513;

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

  let classFilter = (player) => {
    return props.selected.some((item) => item.identities === player.id);
  };
  let data = playerlocation;
  let data2 = playerlocation2;
  const w = 401,
    h = 370,
    margin = { top: 0, bottom: 0, left: 0, right: 0 };
  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;
  useEffect(() => {
    const g = select(ref.current);
    const xScale = scaleLinear()
      .domain([781, 2264])
      // .range([0, parseInt(select(".image-containerpage3").style('width'))]);
      .range([0, width]);
    const yscale = scaleLinear()
      .domain([-2232, -795])
      // .range([parseInt(select(".image-containerpage3").style('height')), 0]);
      .range([height, 0]);

    g.selectAll(".circles")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 6)
      .style("cursor", "pointer")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr(
        "viewBox",
        `0 0 ${parseInt(
          select(".image-containerpage3").style("width")
        )} ${parseInt(select(".image-containerpage3").style("height"))}`
      )
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yscale(d.y))
      .attr("fill", (d) => {
        return props.selected.some((item) => item.identities == d.id)
          ? colorCode(d.id)
          : "red";
      })
      .on("click", (a, b) => {
        classFilter(b)
          ? console.log("test")
          : props.selectFielder(
              { identities: b.id, homo_track: [b.x, b.y] },
              props.index
            );
      });

    g.selectAll(".circles")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(d.x) + 10)
      .attr("y", (d) => yscale(d.y) + 10);
    // .text((d) => {
    //   return d.id;
    // })

    //   g.selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .on("click",(d)=>{alert("x:"+d.x +", y:"+d.y +", id:"+d.id )
    //   console.log(d)
    //   });
    g.selectAll(".circles2")
      .data(data2)
      .enter()
      .append("circle")
      .attr("r", 6)
      .style("cursor", "pointer")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr(
        "viewBox",
        `0 0 ${parseInt(
          select(".image-containerpage3").style("width")
        )} ${parseInt(select(".image-containerpage3").style("height"))}`
      )
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yscale(d.y))
      .attr("fill", (d) => {
        return props.selected.some((item) => item.identities == d.id)
          ? colorCode(d.id)
          : "yellow";
      })
      .on("click", (a, b) => {
        classFilter(b)
          ? console.log("test")
          : props.selectFielder(
              { identities: b.id, homo_track: [b.x, b.y] },
              props.index
            );
      });

    g.selectAll(".circles2")
      .data(data2)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(d.x) + 10)
      .attr("y", (d) => yscale(d.y) + 10);
    // .text((d) => {
    //   return d.id;
    // })
  }, [data, data2]);

  let sortidlist = playerlocation;
  sortidlist.sort((a, b) => (parseInt(a.id) > parseInt(b.id) ? 1 : -1));

  return (
    <>
      <div className="field-select">
        <div className="mag-image-playerspage3">
          <div className="image-containerpage3">
            <svg width={w} height={h} viewBox={`0 0 401 370`}>
              <g
                ref={ref}
                transform={`translate(${margin.left},${margin.top})`}
              />
            </svg>
          </div>
        </div>
        <div className="details-style">
          <div className="tabpage3">
            <p className="tab-headingpage3">
              <span class="dot"></span>{" "}
              <strong>
                {props.ball.over}.{props.ball.ball}
              </strong>{" "}
              Details
            </p>
            <p className="tab-textpage3">Over Number: {props.ball.over}</p>
            <p className="tab-textpage3">Ball Number: {props.ball.ball}</p>
            <p className="tab-textpage3">Result: {props.ball.result}</p>
            <p className="tab-textpage3">
              Batsmen: {props.ball.onstrike_batsman}
            </p>
            <p className="tab-textpage3">Batsmen Type: {props.ball.Bat_type}</p>
            <p className="tab-textpage3">Bowler: {props.ball.bowler}</p>
          </div>
          <div className="tabpage3">
            <p className="tab-headingpage3">
              <span class="dotball2"></span>{" "}
              <strong>
                {props.ball2.over}.{props.ball2.ball}
              </strong>{" "}
              Details
            </p>
            <p className="tab-textpage3">Over Number: {props.ball2.over}</p>
            <p className="tab-textpage3">Ball Number: {props.ball2.ball}</p>
            <p className="tab-textpage3">Result: {props.ball2.result}</p>
            <p className="tab-textpage3">
              Batsmen: {props.ball2.onstrike_batsman}
            </p>
            <p className="tab-textpage3">
              Batsmen Type: {props.ball2.Bat_type}
            </p>
            <p className="tab-textpage3">Bowler: {props.ball2.bowler}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Field;
