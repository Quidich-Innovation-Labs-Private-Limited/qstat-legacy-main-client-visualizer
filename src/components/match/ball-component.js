import React, { useEffect, useState } from "react";
import Chart from "./chart";
import { options } from "./chart-options";
import { get, isEmpty } from "lodash";
import { v4 as uuidv4 } from 'uuid';

// TODO: important fix, please use datasets instead of rendering two Charts. 
// i.e. if there is a overlap needed can add another index in datasets array that will render required points

const getDataSet = (data) => {
  // const backgroundColor =
  //   fieldPositionStatus === "AFTER_BALL_RELEASED"
  //     ? "rgb(250, 37, 0)"
  //     : "blue";
  // const borderColor =
  //   fieldPositionStatus === "AFTER_BALL_RELEASED"
  //     ? "rgb(250, 37, 0)"
  //     : "#101086";

  return {
    datasets: [
      {
        backgroundColor: data?.map(() => ('blue')),
        // borderColor,
        data,
        pointRadius: 3.5,
      },
    ],
    players: data.map(d => {
      d.client_id = uuidv4();
      return d;
    }),
  };
};

const Ball = ({
  ballData,
  layer,
  setLayer,
  playerData,
  ballNumber,
  isSelected,
  handleToggle,
  selectedPlayers,
  setSelectedPlayers,
  fieldPositionStatus,
  handlePlayerInfoTransfer,
}) => {
  const [chartData, setChartData] = useState(getDataSet(playerData));

  useEffect(() => {
    setChartData(getDataSet(playerData));
  }, [playerData]);

  useEffect(() => {
    if(Array.isArray(selectedPlayers) && selectedPlayers.length === 0) setChartData(getDataSet(playerData));
  }, [playerData, selectedPlayers]);

  // const [playerOrgData, setPlayerOrgData] = useState(getDataSet(playerData));

  // useEffect(() => {
  //   setPlayerOrgData(getDataSet(playerData));
  // }, [fieldPositionStatus, playerData]);

  const handleElementClick = (element) => {
    if(Array.isArray(element) && element?.length > 0) {
      const datasetIndex = element[0].datasetIndex;
      const index = element[0].index;

      const selectedPlayer = chartData.players[index];
      const isSelected = selectedPlayers.find(label => label.client_id === selectedPlayer.client_id);

      const backgroundColors = [...chartData.datasets[datasetIndex].backgroundColor];
      backgroundColors[index] = isSelected ? 'blue' : 'red';

      const updatedData = {
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[datasetIndex],
            backgroundColor: backgroundColors,
          },
        ],
      };

      setChartData(updatedData);

      let players = []
      if (isSelected) {
        players = selectedPlayers.filter(label => label.client_id !== selectedPlayer.client_id);
      } else {
        players = [...selectedPlayers, selectedPlayer];
      }

      console.log(players)
  
      setSelectedPlayers(players)
      handlePlayerInfoTransfer(players)
    }
    // setSelect(false);
    // const id = ballData._id;
    // setSelectedBalls({ ...selectedBalls, [id]: ballData });
  };

  const handleRemove = () => {
    // setSelect(true);
    // let temp = { ...selectedBalls };
    // delete temp[ballData._id];
    // setSelectedBalls(temp);
  };

  const colorCode = (result) => {
    switch (result) {
      case "w":
        return "red";
      case "wd":
      case "e":
        return "orange";
      case 4:
        return "blue";
      case 6:
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="outer">
      <Chart
        normalized={true}
        className="scatter-plot"
        options={{ ...options, animation: false }}
        data={chartData}
        handleElementClick={handleElementClick}
      />
      {layer.length > 0 && (
        <Chart
          className="scatter-plot"
          style={{ marginTop: "-12vw", display: "block" }}
          options={{ ...options, animation: false }}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(255, 246, 0,1)",
                borderColor: "rgba(255, 246, 0,1)",
                data: layer,
                pointRadius: 3.4,
              },
            ],
          }}
        />
      )}
      {!isSelected ? (
        <div
          className="inner-select"
          onClick={() => {
            handleToggle();
            setLayer(playerData);
          }}
        >
          <button className="select-button">Select</button>
        </div>
      ) : (
        <div
          className="inner-remove"
          onClick={() => {
            handleToggle();
            setLayer([]);
          }}
        >
          <button className="remove-button">Remove</button>
        </div>
      )}
      <div className="inner2">
        {ballNumber}
        <div
          className="result"
          style={{ backgroundColor: colorCode(ballData.result) }}
        >
          {ballData.result}
        </div>
      </div>
    </div>
  );
};

export default Ball;
