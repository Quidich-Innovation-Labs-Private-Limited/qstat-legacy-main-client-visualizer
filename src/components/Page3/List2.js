import React from "react";
import "./Page3.css";
import Player2 from "./Player2";
function List({ players, selectedPlayer, player2 }) {

  var sortidlist = players;
  sortidlist.sort((a, b) => (parseInt(a.identities) > parseInt(b.identities)) ? 1 : -1);

  return (
    <>
      <div className="list-containerpage3">
        {sortidlist.map((player, index) => {
          return (
            <Player2
              number={index}
              id={player.identities}
              player={player}
              selectedPlayer={selectedPlayer}
              player2={player2}
            />
          );
        })}
      </div>
    </>
  );
}

export default List;
