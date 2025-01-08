import React, { useEffect, useMemo, useState } from "react";
import BallComponent from "./ball-component";
import BatsmanBowlerInfo from "./batsman-bowler-info";
import FieldPositionSelect from "../../component-tools/fieldPositionSelct";

export default function CarouselComponent({
  layer,
  bowlerName,
  setLayer,
  beforeBallReleasedData,
  beforeBallReleasedBTData,
  afterBallReleasedData,
  afterBallReleasedBTData,
  afterBallReleasedEndBTData,
  selectedBalls,
  setSelectedBalls,
  selectedPlayers,
  setSelectedPlayers,
  handlePlayerInfoTransfer,
}) {
  const [fieldPositionStatus, setFieldPositionStatus] = useState(
    "AFTER_BALL_RELEASED"
  );

  const index = selectedBalls?.findIndex(
    (item) => item._id === afterBallReleasedData._id
  );

  const isSelected = index !== -1;

  const handleToggle = () => {
    if (index === -1) {
      setSelectedBalls((prevArray) => [...prevArray, ballData]);
    } else {
      setSelectedBalls((prevArray) =>
        prevArray.slice(0, index).concat(prevArray.slice(index + 1))
      );
    }
  };

  const handleRemove = () => {
    if (index !== -1) {
      setSelectedBalls((prevArray) =>
        prevArray.slice(0, index).concat(prevArray.slice(index + 1))
      );
    }
  };

  const [ballData, setBallData] = useState(afterBallReleasedData);

  useEffect(() => {
    let updatedBallData;
    switch (fieldPositionStatus) {
      case "BEFORE_BALL_RELEASED":
        updatedBallData = { ...beforeBallReleasedData };
        break;
      case "AFTER_BALL_RELEASED":
        updatedBallData = { ...afterBallReleasedData };
        break;
      case "BEFORE_BALL_RELEASED_BT":
        updatedBallData = { ...beforeBallReleasedBTData };
        break;
      case "AFTER_BALL_RELEASED_BT":
        updatedBallData = { ...afterBallReleasedBTData };
        break;
        case "AFTER_BALL_RELEASED_END_BT":
          updatedBallData = { ...afterBallReleasedEndBTData };
          break;
      default:
        break;
    }

    setBallData(updatedBallData);
  }, [
    afterBallReleasedBTData,
    afterBallReleasedData,
    afterBallReleasedEndBTData,
    beforeBallReleasedBTData,
    beforeBallReleasedData,
    fieldPositionStatus,
  ]);

  const playerLocationList = useMemo(() => {
    let playerLocationData = [];
    if (Array.isArray(ballData.players)) {
      const getPlayerLocationList = (players) => {
        return players.map((player) => {
          const { homo_track, identities, player_name, player_position } = player;
          let x = homo_track[0];
          let y = homo_track[1];

          if (ballData.flip) {
            if (x > 1506) x = 1506 - (x - 1506);
            else x = 1506 - x + 1506;
            if (y > 1511) y = 1511 - (y - 1511);
            else y = 1511 - y + 1511;
            // x = 1506 - Math.abs(x - 1506);
            // y = 1511 - Math.abs(y - 1511);
          }

          return {
            x,
            y: -1 * y,
            id: identities,
            identities,
            homo_track,
            player_name,
            player_position,
            bowler_name: bowlerName
          };
        });
      };
      playerLocationData = getPlayerLocationList(ballData.players);
    }
    return playerLocationData;
  }, [ballData.flip, ballData.players]);

  const changeBallReleaseStatus = (ballReleased) => {
    let updatedBallData = {};

    switch (ballReleased) {
      case "BEFORE_BALL_RELEASED":
        updatedBallData = { ...beforeBallReleasedData };
        break;
      case "AFTER_BALL_RELEASED":
        updatedBallData = { ...afterBallReleasedData };
        break;
      case "BEFORE_BALL_RELEASED_BT":
        updatedBallData = { ...beforeBallReleasedBTData };
        break;
      case "AFTER_BALL_RELEASED_BT":
        updatedBallData = { ...afterBallReleasedBTData };
        break;

      default:
        break;
    }

    setBallData(updatedBallData);
    setFieldPositionStatus(ballReleased);
    handleRemove();
  };

  return (
    <div className="ball-table">
      <table>
        <tr>
          <td>
            <BallComponent
              layer={layer}
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
              setLayer={setLayer}
              ballData={ballData}
              playerData={playerLocationList}
              ballNumber={`${ballData.over}.${ballData.ball}`}
              isSelected={isSelected}
              handleToggle={handleToggle}
              fieldPositionStatus={fieldPositionStatus}
              handlePlayerInfoTransfer={handlePlayerInfoTransfer}
            />
          </td>
        </tr>
        <tr>
          <td>
            <BatsmanBowlerInfo
              result={ballData.result}
              batsman={ballData.onstrike_batsman}
              bowler={ballData.bowler}
              type={ballData.Bat_type}
            />
          </td>
        </tr>
        <FieldPositionSelect
          changeBallReleaseStatus={changeBallReleaseStatus}
        />
      </table>
    </div>
  );
}
