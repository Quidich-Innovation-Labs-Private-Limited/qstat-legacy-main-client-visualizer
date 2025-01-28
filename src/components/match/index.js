import React, { useState, useEffect } from "react";
import { isEmpty, startCase, isNumber, filter, set, pick } from "lodash";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import jsonData from "../../assets/data/db.json";
import SeriesSelect from "./series-select";
import MatchSelect from "./match-select";
import InningsSelect from "./innings-select";
import FilterSelects from "./filter-selects";
import CarouselWrapper from "./carousel-wrapper";
import axios from "axios";
import toast from "react-hot-toast";
import { createWebsocketConnection } from "./helpers/create-websocket-connection";
import logo from "../../assets/logo.png";

import "./match.css";

const isJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export default function Match() {
  // const [jsonData, setJsonData] = useState(jsonData);
  const [overs, setOvers] = useState({});
  const [seriesOption, setSeriesOption] = useState("");
  const [matchOption, setMatchOption] = useState("");
  const [inningsOption, setInningsOption] = useState(1);
  const [overOption, setOverOption] = useState(null);
  const [ballOption, setBallOption] = useState(null);
  const [batsmenOption, setBatsmenOption] = useState(null);
  const [bowlerOption, setBowlerOption] = useState(null);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [matchOptions, setMatchOptions] = useState([]);
  const [selectedBalls, setSelectedBalls] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  // fixme: can move this state to ball-component as a dataset
  const [layer, setLayer] = useState([]);
  //const [jsonData, setJsonData] = useState({}); 

  const fetchMatch = () => {
    // axios
    //   .get("http://localhost:3001/assets/db.json")
    //   .then(({ data: jsonData }) => {
    //     if (isJson(JSON.stringify(jsonData))) {
    //       const series = Object.keys(jsonData).map((key) => ({
    //         value: key,
    //         label: startCase(key),
    //       }));
    //       setJsonData(jsonData);
    //       setSeriesOptions(series);
    //     }
    //   });
    if (isJson(JSON.stringify(jsonData))) {
      const series = Object.keys(jsonData).map((key) => ({
        value: key,
        label: startCase(key),
      }));
      setSeriesOptions(series);
    }
  };

  useEffect(() => {
    fetchMatch();
  }, []);

  // useEffect(() => {
  //   const { socket } = createWebsocketConnection();
  //   socket?.addEventListener("message", (event) => {
  //     if (event.data === "sync") fetchMatch();
  //   });
  // }, []);


  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       try {
  //         const parsedData = JSON.parse(e.target.result);
  //         setJsonData(parsedData); // Update state with uploaded data
  //         toast.success("JSON file uploaded successfully!");
  //       } catch (error) {
  //         toast.error("Invalid JSON file. Please upload a valid file.");
  //       }
  //     };
  //     reader.readAsText(file);
  //   }
  // };


  useEffect(() => {
    if (!isEmpty(seriesOption)) {
      const matches = jsonData[seriesOption].map((item) => ({
        value: item.match_name,
        label: startCase(item.match_name),
      }));

      setMatchOptions(matches);
    }
  }, [JSON.stringify(jsonData), seriesOption]);


  useEffect(() => {
    // fixme: index "0" is being used, so if there are more than 2 matches
    // filter will always pick the first match
    if (isJson(JSON.stringify(jsonData)) && !isEmpty(jsonData)) {
      try {
        const keys = Object.keys(jsonData);
        const seriesKey = keys[0];

        if (isEmpty(seriesKey)) {
          showAlert("Series key is empty.");
        } else {
          setSeriesOption(seriesKey);

       //  console.log("matchOption => ", matchOption);

          const matchName = matchOption?.trim();
         // console.log("matchName => ", matchName);

          if (isEmpty(matchName)) {
           // showAlert("Match name is empty.");
            console.log("Match name is empty.");
          } else {
            setMatchOption(matchName);

            const selectedSeries = jsonData[seriesKey];
           // console.log("selectedSeries => ", selectedSeries);
            if (isEmpty(selectedSeries) || selectedSeries.length === 0) {
              showAlert("Selected series data is empty.");
            } else {
              const selectedMatch = selectedSeries.filter(
                (obj) => obj.match_name === matchName
              );
             // console.log("selectedMatch => ", selectedMatch);

              if (
                isEmpty(selectedMatch) ||
                isEmpty(selectedMatch[0]) ||
                isEmpty(selectedMatch[0][matchName])
              ) {
                showAlert("Selected match data is empty.");
              } else {
                const selectedInningsData = selectedMatch[0][matchName].filter(
                  (obj) => obj.innings === inningsOption
                );

                if (
                  isEmpty(selectedInningsData) ||
                  isEmpty(selectedInningsData[0])
                ) {
                  showAlert("Selected innings data is empty.");
                } else {
                  setOvers(selectedInningsData[0]);
                }
              }
            }
          }
        }
      } catch (error) {
        showAlert("Invalid data file! Please contact support");
      }
    }
  }, [matchOption, inningsOption, seriesOption]);

 

  const handleSelectAll = async (event) => {
    const { checked } = event.target;
    const selected = [];
    if (checked) {
      Object.keys(overs)?.map((index) => {
        if (Array.isArray(overs[index])) {
          overs[index].map((ball) => {
            // set(
            //   selectedBalls,
            //   `${seriesOption}.${matchOption}.${inningsOption}.${ball.over}.${ball.ball}`,
            //   true
            // );
            selected.push(ball);
          });
        }
      });
    }

    setSelectedBalls(selected);
  };

  const resetBallTransfer = async () => {
    
    // await axios.post(
    //   `http://localhost:3001/files/transfer?entity=ball-json-hyperview`,
    //   []
    // );
    // await axios.post(
    //   `http://localhost:3001/files/transfer?entity=ball-json-middleman`,
    //   []
    // );
  }

  const handleBallTransfer = (isMiddlemanSystem = false) => async () => {
    try {
      const requiredKeys = [
        "onstrike_batsman",
        "offstrike_batsman",
        "bowler",
        "over",
        "bowl",
        "ball",
        "Bat_type",
        "result",
        "flip_from_BT",
        "flip",
        "field_position_status",
        "players",
      ];

      let transferSelectedBalls = [...selectedBalls];
      if (isMiddlemanSystem)
        transferSelectedBalls = [transferSelectedBalls.pop()];
      const specificKeysForSelectedBalls = transferSelectedBalls?.map(
        (selectedBall) => {
          switch (selectedBall.field_position_status) {
            case "BEFORE_BALL_RELEASED":
              return pick(selectedBall, [
                ...requiredKeys,
                "bbox_at_start_moment",
              ]);
            case "BEFORE_BALL_RELEASED_BT":
              return pick(selectedBall, [
                ...requiredKeys,
                "bbox_for_start_locations_using_BT",
              ]);
            case "AFTER_BALL_RELEASED_BT":
              return pick(selectedBall, [
                ...requiredKeys,
                "bbox_for_release_frame_using_BT",
              ]);
            case "AFTER_BALL_RELEASED":
              return pick(selectedBall, [
                ...requiredKeys,
                "bbox_at_release_moment",
              ]);
            case "AFTER_BALL_RELEASED_END_BT":
              return pick(selectedBall, [
                ...requiredKeys,
                "bbox_for_end_frame_using_BT",
              ]);
            default:
              break;
          }
        }
      );
      // await axios.post(
      //   `http://localhost:3001/files/transfer?entity=ball-json-${isMiddlemanSystem ? "middleman" : "hyperview"}`,
      //   specificKeysForSelectedBalls
      // );
      // // console.log("specificKeysForSelectedBalls =>  ",transferSelectedBalls)
      // toast.success("Ball data transfered successfully!");
    } catch (error) {
      // console.error(error);
      // toast.error("Ball data transfer failed!");
    }
  };

  const handlePlayerInfoTransfer = async (selectedPlayers) => {
    // try {
    //   await axios.post(
    //     "http://localhost:3001/files/transfer?entity=player",
    //     selectedPlayers
    //   );
    //   toast.success("Player data transfered successfully!");
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Player data transfer failed!");
    // }
  };

  const handleClickReset = () => {
    setOverOption(null);
    setBallOption(null);
    setBatsmenOption(null);
    setBowlerOption(null);
    setSelectedBalls([]);
    setSelectedPlayers([]);
    handlePlayerInfoTransfer([]);
    resetBallTransfer();
  };

  const filterItems = () => {
    let searchTerm = {};
    if (!isEmpty(overOption) && isNumber(+overOption.value))
      searchTerm = { ...searchTerm, over: +overOption.value };

    if (!isEmpty(ballOption))
      searchTerm = { ...searchTerm, ball: ballOption.value };

    if (!isEmpty(batsmenOption))
      searchTerm = { ...searchTerm, onstrike_batsman: batsmenOption.value };

    if (!isEmpty(bowlerOption))
      searchTerm = { ...searchTerm, bowler: bowlerOption.value };

    return searchTerm;
  };

  function handleSubmit(event) {
    event.preventDefault();
    const seriesOption = event.target.seriesselect.value;
    const matchOption = event.target.matchselect.value;
    const inningsOption = event.target.inningsselect.value;
    setSeriesOption(seriesOption);
    setMatchOption(matchOption);
    setInningsOption(inningsOption);
  }

  const showAlert = (message) => {
    //toast.error(message);
    console.log("error message => ",message);
  };

  return (
    <>
      <div className="carousel-header">
     
        <div className="select-match">
        {/* <img src={logo} alt="Quidich" style={{width:"5%", margin:"10px"}} /> */}
          <form id="user-form" onSubmit={handleSubmit}>
            <div id="app" className="select-match-options">
           
              <SeriesSelect
                seriesOptions={seriesOptions}
                seriesOption={seriesOption}
                setSeriesOption={setSeriesOption}
              />
              <MatchSelect
                matchOptions={matchOptions}
                matchOption={matchOption}
                setMatchOption={setMatchOption}
              />
              <InningsSelect
                inningsOption={inningsOption}
                setInningsOption={setInningsOption}
              />
              {/* <button disabled  type="submit" className="search-button">
                Search
              </button> */}
            </div>
          </form>
        </div>
        <FilterSelects
          overOption={overOption}
          ballOption={ballOption}
          batsmenOption={batsmenOption}
          bowlerOption={bowlerOption}
          setOverOption={setOverOption}
          setBallOption={setBallOption}
          setBatsmenOption={setBatsmenOption}
          setBowlerOption={setBowlerOption}
          handleClickReset={handleClickReset}
          overs={overs}
        />
        <div className="select-all">
          <FormControlLabel
            control={<Checkbox onChange={handleSelectAll} />}
            label="Select all"
          />
          {/* <button className="reset-button" onClick={handleBallTransfer(false)}>
            Transfer ball (H)
          </button>
          <button
            style={{ marginLeft: 5 }}
            className="reset-button"
            onClick={handleBallTransfer(true)}
          >
            Transfer ball (M)
          </button> */}
        </div>

        {/* <div style={{ display: "flex", alignItems: "center", border:"1px solid black",padding:"10px",margin:"10px" }}>
      
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload} // Attach the new handler
      />
      Upload db.json file
    </div> */}
      </div>
      {!isEmpty(overs) &&
        Object.keys(overs).length !== 0 &&
        Object.entries(overs).map((item) => {
          if (
            !(
              (overOption == null) &
              (ballOption == null) &
              (batsmenOption == null) &
              (bowlerOption == null)
            )
          ) {
            const filtered = filter(item[1], filterItems());
            return (
              <CarouselWrapper
                over={filtered}
                layer={layer}
                setLayer={setLayer}
                overnumber={item[0]}
                key={`${item[0]}`}
                selectedBalls={selectedBalls}
                setSelectedBalls={setSelectedBalls}
                handlePlayerInfoTransfer={handlePlayerInfoTransfer}
              />
            );
          }
          if (!overOption && !ballOption && !batsmenOption && !bowlerOption) {
            return (
              <CarouselWrapper
                over={item[1]}
                layer={layer}
                setLayer={setLayer}
                overnumber={item[0]}
                key={`${item[0]}`}
                selectedBalls={selectedBalls}
                setSelectedBalls={setSelectedBalls}
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
                handlePlayerInfoTransfer={handlePlayerInfoTransfer}
              />
            );
          }
          return null;
        })}
    </>
  );
}
