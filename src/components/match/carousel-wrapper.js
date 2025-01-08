import React from "react";
import CarouselComponent from "./carousel-component";
import Carousel from "./carousel";
import { isEmpty, get, set } from "lodash";
import "./match.css";

export default function CarouselWrapper({
  over,
  layer,
  setLayer,
  overnumber,
  selectedBalls,
  setSelectedBalls,
  selectedPlayers,
  setSelectedPlayers,
  handlePlayerInfoTransfer,
}) {
  return (
    <>
      {!isEmpty(over) && over?.length > 0 && (
        <div className="overcover">
          <Carousel show={over.length}>
            {Array.isArray(over) &&
              over.map((oneball) => {
                return (
                  <CarouselComponent
                    layer={layer}
                    key={`${oneball?.over}.${oneball?.ball}`}
                    bowlerName={oneball?.bowler}
                    setLayer={setLayer}
                    afterBallReleasedData={{
                      _id: `${oneball?.over}.${oneball?.ball}`,
                      ...oneball,
                      field_position_status: 'AFTER_BALL_RELEASED'
                    }}
                    afterBallReleasedBTData={{
                      _id: `${oneball?.over}.${oneball?.ball}`,
                      ...oneball,
                      players: oneball?.players_location_at_release_using_BT ?? [],
                      field_position_status: 'AFTER_BALL_RELEASED_BT'
                    }}
                    afterBallReleasedEndBTData={{
                      _id: `${oneball?.over}.${oneball?.ball}`,
                      ...oneball,
                      players: oneball?.players_location_at_end_using_BT ?? [],
                      field_position_status: 'AFTER_BALL_RELEASED_END_BT'
                    }}
                    beforeBallReleasedData={{
                      _id: `${oneball?.over}.${oneball?.ball}`,
                      ...oneball,
                      players: oneball?.ball_start_locations ?? [],
                      field_position_status: 'BEFORE_BALL_RELEASED'
                    }}
                    beforeBallReleasedBTData={{
                      _id: `${oneball?.over}.${oneball?.ball}`,
                      ...oneball,
                      players: oneball?.ball_start_locations_using_BT ?? [],
                      field_position_status: 'BEFORE_BALL_RELEASED_BT'
                    }}
                    selectedBalls={selectedBalls}
                    setSelectedBalls={setSelectedBalls}
                    selectedPlayers={selectedPlayers}
                    setSelectedPlayers={setSelectedPlayers}
                    handlePlayerInfoTransfer={handlePlayerInfoTransfer}
                  />
                );
              })}
          </Carousel>
          <div className="overnumber">{overnumber}</div>
        </div>
      )}
    </>
  );
}
