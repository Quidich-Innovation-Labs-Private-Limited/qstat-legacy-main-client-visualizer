import React, { useState } from "react";
import Select from "react-select";
import Feild from "./FieldSelect"
import MagnifiedImage from "./MagnifiedImage";
import List from "./List";
import List2 from "./List2";
import "./Page2.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Page2(props) {
  const options1 = [
    { value: "Ind Vs WI", label: "Ind Vs WI"},
    { value: "Ind Vs RSA", label: "Ind Vs RSA" },
  ];
  const options2 = [
    { value: "T20", label: "T20" },
    { value: "ODI", label: "ODI" },
    { value: "Test", label: "Test" },
  ];
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  const { selectedBalls } = (props.location && props.location.state) || {};
  const [player, setPlayer] = useState([]);
  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  const [basket, setBasket] = useState(new Array(Object.keys(selectedBalls).length).fill([]))
  const [swich, setSwitch] = useState({status: false, item: null})

  const removeList1 = (data) =>{
    let newList = list1.filter(item => item.identities != data.identities)
    let newplayerList = player.filter(item => (item.identities != data.identities) && (item.homo_track[0] != data.homo_track[0]))
    let originalData = selectedBalls[Object.keys(selectedBalls)[0]].players
    let originalItem = originalData.find(item=>item.identities == data.identities)
    let filterData = player.filter(i=>i != originalItem)
    setPlayer(filterData)
    setList1(newList)
  }
  const removeList2 = (data) =>{
    let newList = list2.filter(item => item.identities != data.identities)
    let newplayerList = player.filter(item => (item.identities != data.identities) && (item.homo_track[0] != data.homo_track[0] ))
    let originalData = selectedBalls[Object.keys(selectedBalls)[1]].players
    let originalItem = originalData.find(item=>item.identities == data.identities)
    let filterData = player.filter(i=>i != originalItem)
    setPlayer(filterData)
    setList2(newList)
  }

  const changeList1 = (data) => {
    if(swich.status && swich.item.list === 1){
      const item = list1.find(val => val.identities === swich.item.value)
      let originalData = selectedBalls[Object.keys(selectedBalls)[0]].players
      let originalItem = originalData.find(item=>item.identities == data.identities)
      let reItem = originalData.find(item=>item.identities == swich.item.value)    
      console.log(player.indexOf(reItem), reItem)
      let updated = list1
      let updatePlayer = player 
      updated[list1.indexOf(item)] = data
      updatePlayer[player.indexOf(reItem)] = originalItem
      setList1(updated)
      setPlayer(updatePlayer)
      setSwitch({status: false, item: null})
    }
    else{ 
    setList1([...list1, data]) 
    setPlayer([...player, selectedBalls[Object.keys(selectedBalls)[0]].players.find(item=> item.identities == data.identities)]) 
  }
  }
  const changeList2 = (data) => {
    if(swich.status && swich.item.list === 2){
      const item = list2.find(val => val.identities === swich.item.value)
      let originalData = selectedBalls[Object.keys(selectedBalls)[1]].players
      let originalItem = originalData.find(item=>item.identities == data.identities)
      let reItem = originalData.find(item=>item.identities == swich.item.value)    
      console.log(player.indexOf(reItem), reItem)
      let updated = list2
      let updatePlayer = player 
      updated[list2.indexOf(item)] = data
      updatePlayer[player.indexOf(reItem)] = originalItem
      setList2(updated)
      setPlayer(updatePlayer)
      setSwitch({status: false, item: null})
    }
    else{
    setList2([...list2, data]) 
    setPlayer([...player, selectedBalls[Object.keys(selectedBalls)[1]].players.find(item=> item.identities == data.identities)])
  }}


  const holdItem = (id,list) =>{
    setSwitch({status: true, item:{list:list, value:id}})
    console.log(swich)
  } 

  const selectedFilter = (fielder) =>{
    let data = {identities:fielder.id, homo_track:[fielder.x,fielder.y]}
    console.log(data, player)
    return player.some(item => item.identities === player.id)
  }
  const handleClick = () => {

    console.log("Player data is", player);
    console.log(
      "Other Players",
      selectedBalls ? selectedBalls[Object.keys(selectedBalls)[0]].players.filter(val => !player.includes(val)) : ""
    );
    const list1id = list1.map(item => {return( item.identities)})
    
    let unselected_players = []
    let launchdata = {}  
    let selectData = []
          Object.values(selectedBalls).map(item=>{
            let data = {over: item.over, ball: item.ball, flip:item.flip, batType: item.Bat_type}
            selectData.push(data)
        })


    if(Object.values(selectedBalls).length !==2 ){
      
      let allPlayers = Object.values(selectedBalls).map(item=>{
        return(item.players)
      })
    unselected_players = allPlayers.flat()
    }
    else {
      if(player.length === 0) {
            let allPlayers = Object.values(selectedBalls).map(item=>{
              return(item.players)
            })
          unselected_players = allPlayers.flat()
      }
      else
      unselected_players = selectedBalls ? selectedBalls[Object.keys(selectedBalls)[0]].players.filter(val => ! list1id.includes(val.identities)) : "";

    }
    launchdata = {player, unselected_players, selectData}
    console.log(launchdata)

  };

  let colorCode = (id,arr) =>{      
    let list = arr.map(item => {return(item.identities)})
    let index = list.indexOf(id)
    let colors = ['yellow','purple', 'green', 'brown', 'skyblue','green','gray','black','white','darkblue','pink']
    return colors[index]
  }
  return (
    <>
      <div className="tableheaderpage2">
        <div className="header-container-page2">
          {/* <div className="launch-screen-div">Launch Screen</div> */}
          <div>
            <Link to={"/match"}>
              <button className="live-screen-button">Match Screen </button>
            </Link>
          </div>
        </div>

        <div className="selectdivPage2">
          <div>
            <Select
              className="select-div-item"
              placeholder="Series"
              onChange={setSelectedOption1}
              options={options1}
            />
          </div>
          <div>
            <Select
              className="select-div-item"
              placeholder="Match"
              onChange={setSelectedOption2}
              options={options2}
            />
          </div>

          <button className="search-button">Search</button>
        </div>
        
      </div>

      <div>
      <div className="main-content">

      {Object.values(selectedBalls).length!==2? Object.values(selectedBalls).map(item =>{return(
        <>
        <Feild ball={item} index={Object.values(selectedBalls).indexOf(item)} total={Object.values(selectedBalls).length}
        player={player} selectedFilter={selectedFilter} selectFielder={changeList1} selected={basket[Object.values(selectedBalls).indexOf(item)]} />
        </>
      )
      })
      :(<>
      <Feild ball={selectedBalls ? selectedBalls[Object.keys(selectedBalls)[0]] : {}} 
        player={player} remove={removeList1} selectedFilter={selectedFilter} selectFielder={changeList1} selected={list1} />

      <Feild ball={selectedBalls ? selectedBalls[Object.keys(selectedBalls)[1]] : {}}
        player={player} remove={removeList2} selectedFilter={selectedFilter} selectFielder={changeList2} selected={list2} />
      </>)
      }

      </div>

      {player.length>0 ?
      <div className="pairs">
        <div className="pair-list">{list1.length>0 ?list1.map(item=>{
          return( 
            <div className="pair" style={swich.status && swich.item.value === item.identities && swich.item.list === 1? {backgroundColor:'white'}: {backgroundColor:colorCode(item.identities,list1)}} onClick={()=>{holdItem(item.identities, 1);}}>
              {swich.status && swich.item.value === item.identities && swich.item.list === 1 ? '.':  item.identities}
            </div>
          )
          }):''}
        </div>
        <div className="pair-list">{list2.length>0 ?list2.map(item=>{
          return( 
            <div className="pair" style={swich.status && swich.item.value === item.identities && swich.item.list === 2? {backgroundColor:'white'}: {backgroundColor:colorCode(item.identities,list2)}} onClick={()=>{holdItem(item.identities, 2);}}>
              {swich.status && swich.item.value === item.identities && swich.item.list === 2 ? '.':  item.identities}
            </div>
          )
          }):''}
        </div>
      </div> :''}
    </div>
      

    </>
  );
}

export default Page2;
