import React from "react";
import "./Page3.css";
import Player from "./Player";
function List({ players, selectedPlayer, player1 }) {

  var sortidlist = players;
  sortidlist.sort((a, b) => (parseInt(a.identities) > parseInt(b.identities)) ? 1 : -1);

  return (
    <>
      <div className="list-containerpage3">

        {sortidlist.map((player, index) => {
          return (
            <Player
              number={index}
              id={player.identities}
              player={player}
              selectedPlayer={selectedPlayer}
              player1={player1}
            />
          );
        })}
      </div>
    </>
  );
}

export default List;
