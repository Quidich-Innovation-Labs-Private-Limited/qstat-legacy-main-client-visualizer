import React, { useEffect, useState } from "react";
import "./Page2.css";

function Player({ number, id, player, selectedPlayer, player2 }) {
  const [playerclass, setPlayerClass] = useState();
  const [add, setAdd] = useState(false);
  const handleClick = () => {
    if (!add) {
      selectedPlayer(player2 => [...player2, player]);
      setPlayerClass("selected-player");
      console.log("Player data is", player);
    }
    if (add) {
      const apps = player2;
      // get index of object with id
      var removeIndex = apps.map(function(item) { return item.identities; }).indexOf(id);
      // remove object
      apps.splice(removeIndex, 1);
      console.log(apps);
      
      selectedPlayer(apps);
      setPlayerClass("");
    }
    setAdd(!add);
  };

  return (
    <>
      {add ? (
        <div
          className={`player-container ${playerclass}`}
          onClick={handleClick}
        >
          <div className="player-id"></div>
          <div className="player-name">{id}</div>
        </div>
      ) : (
        <div className={`player-container`} onClick={handleClick}>
          <div className="player-id"></div>
          <div className="player-name">{id}</div>
        </div>
      )}
    </>
  );
}

export default Player;
