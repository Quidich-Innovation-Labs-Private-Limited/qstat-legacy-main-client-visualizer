import React, {useEffect, useRef, useState} from "react"
import "./Page2.css";
import { select, scaleLinear, extent } from "d3";

function Field(props){
    const ref = useRef(null)
    let end_flip = props.ball.flip
    let bat_type = props.ball.Bat_type

    let colorCode = (id) =>{      
      let list = props.selected.map(item => {return(item.identities)})
      let index = list.indexOf(id)
      let colors = ['yellow','purple', 'green', 'brown', 'skyblue','green','gray','black','white','darkblue','pink']
      return colors[index]
    }

    let playerlocation = Array.isArray(props.ball.players)
        ? props.ball.players.map((player, index) => {
        if (end_flip){
        //myFunction_set180();
        var oldx = player.homo_track[0];
        var oldy =player.homo_track[1] ;
        var xtransformed = 0;
        var ytransformed = 0 ;

        if (oldx> 1506) xtransformed = 1506 - (oldx - 1506)
        else xtransformed = ( 1506 - oldx ) + 1506
        
        if (oldy> 1511) ytransformed =1511 - (oldy - 1511) 
        else ytransformed =( 1511 - oldy ) + 1511 ;
        
        return {
          x: xtransformed,
          y: -1 *ytransformed,
          id: player.identities,
        }
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
    let classFilter = (player) =>{  
      return props.selected.some(item => item.identities === player.id)
    }
  let data = playerlocation;
  const w = 401, h = 370, margin = { top: 10, bottom: 0, left: 0, right: 0 };
  const width = w - margin.right - margin.left, height = h - margin.top - margin.bottom;
    useEffect(() => {
        const g = select(ref.current);
        const xScale = scaleLinear()
          .domain([781,2264])
          // .range([0, parseInt(select(".image-container").style('width'))]);
          .range([0, width]);
        const yscale = scaleLinear()
          .domain([-2232,-795 ])
          // .range([parseInt(select(".image-container").style('height')), 0]);
          .range([height, 0]);
    
        g.selectAll(".circles")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 4)
          .style("cursor", "pointer")
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", `0 0 ${parseInt(select(".image-container").style('width'))} ${parseInt(select(".image-container").style('height'))}`)
          .attr("cx", (d) => xScale(d.x))
          .attr("cy", (d) => yscale(d.y))
          .attr("fill", d => {
             return props.selected.some(item=> item.identities === d.id) ?colorCode(d.id):"red"} )
          .on("click",(a,b)=>{
            classFilter(b) ? console.log('test'): props.selectFielder({identities:b.id, homo_track:[b.x,b.y]},props.index);
          });
    
        g.selectAll(".circles")
          .data(data)
          .enter()
          .append("text")
          .attr("x", (d) => xScale(d.x) + 10)
          .attr("y", (d) => yscale(d.y) + 10)
          .text((d) => {
            return d.id;
          });
    
        //   g.selectAll("circle")
        //   .data(data)
        //   .enter()
        //   .append("circle")
        //   .on("click",(d)=>{alert("x:"+d.x +", y:"+d.y +", id:"+d.id )
        //   console.log(d)
        //   });
    
      }, [data]);
      
      let sortidlist = playerlocation;
      sortidlist.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : -1);

      

return(
    <>
    <div className="field-select">

      <div className="st-1">
        <div className="st-row">
          <div className="st-2">
              <div className="field-wrapper">

                <div className="mag-image-players">
                    <div className="image-container">
                    <svg width={w} height={h} viewBox={`0 0 401 370`} >
                      <g ref={ref} transform={`translate(${margin.left},${margin.top})`} />
                    </svg>
                    </div>
                </div>
                <div className="tabs-row">
                    <div className="tab">
                        <p className="tab-heading">Result</p>
                        <p className="tab-text"><strong>Over:</strong> {props.ball.over}</p>
                        <p className="tab-text"><strong>Ball:</strong> {props.ball.ball}</p>
                        <p className="tab-text"><strong>Bastsman result:</strong> {props.ball.result}</p>
                        <p className="tab-text">Bowler result: Normal</p>
                        <p className="tab-text">TimeBowledUtc: Normal</p>
                        <p className="tab-text">VenueTimeZoneUtcOffsetMinutes: Normal</p>
                    </div>
                    <div className="tab">
                        <p className="tab-heading">Match Condition</p>
                        <p className="tab-text">Stadium: Wankhede</p> 
                        <p className="tab-text">BoundaryDistanceNorth: 90</p> 
                        <p className="tab-text">BoundaryDistanceSouth: 90</p>
                        <p className="tab-text">BoundaryDistanceEast: 90</p>                  
                        <p className="tab-text">BoundaryDistanceWest: 90</p>
                        <p className="tab-text">BoundaryDistanceNorthEast: 90</p> 
                        <p className="tab-text">BoundaryDistanceNorthWest: 90</p>
                        <p className="tab-text">BoundaryDistanceSouthEast: 90</p>                  
                        <p className="tab-text">BoundaryDistanceSouthWest: 90</p>                     
                        <p className="tab-text">Pitch condition: Dry</p>
                        <p className="tab-text">Weather condition:Rainy</p>                  
                        <p className="tab-text">Day / Night: Day</p>                        
                        <p className="tab-text">Soil condition: Red soil</p>
                    </div>
                </div>
              </div>
          </div>
          <div className="st-3">
              <div className="player">
                  <img src="http://cricket.upcomingwiki.com/public/images/gallery/90372.png" alt="" />
                  <div className="player-data">
                      <div>Player Name: Ravindra Jadeja</div>
                      <div>Position: point</div>
                  </div>
              </div>
              <div className="tab">
                  <p className="tab-heading">Fields Details</p>
                  <p className="tab-text">Player Name: Ravindra Jadeja</p>
                  <p className="tab-text">Position: Point</p>
                  <p className="tab-text">Previous Position: Third Man</p>
                  <p className="tab-text">Distance Covered: 10 km</p>
                  <p className="tab-text">Peak Speed: 5km/hr</p>
                  <p className="tab-text">Initial Speed: 2km/hr</p>
                  <p className="tab-text">Performance Inline: </p>                        
                  <p className="tab-text">Time Spent on Field:3 hr</p>                        
                  <p className="tab-text">Angle Ratio: 30</p>
              </div>
              <div className="tab">
                  <p className="tab-heading">Batsman Details</p>
                  <p className="tab-text"><strong>On Strike:</strong>{props.ball.onstrike_batsman}</p>
                  <p className="tab-text"><strong>Batting Syle:</strong> {props.ball.Bat_type}</p>                        
                  <p className="tab-text">Shot Played: Straight Drive</p>                        
                  <p className="tab-text">Change in Strength: yes</p>                        
                  <p className="tab-text"><strong>Non Strike:</strong> {props.ball.offstrike_batsman}</p>                        
                  <p className="tab-text">Batting Style: Right hand</p>
              </div>
              <div className="tab">
                  <p className="tab-heading">Bowler Details</p>
                  <p className="tab-text"><strong>Name:</strong> {props.ball.bowler}</p>
                  <p className="tab-text">Style: Right hand medium pace</p>
                  <p className="tab-text">Speed: 120 km/hr</p>
                  <p className="tab-text">Economy: 4.3</p>
                  <p className="tab-text">Ball pitch position: Good length</p>
                  <p className="tab-text">Ball Line: To the wicket</p>
                  <p className="tab-text">Ball delivery variation: slow delivery</p>
              </div>
          </div>
        </div>
      </div>
    </div>

    

    </>
)
} 


export default Field