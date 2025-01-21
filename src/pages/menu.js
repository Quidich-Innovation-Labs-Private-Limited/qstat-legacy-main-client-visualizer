import React from "react"

const menu = props =>{
return(
    <>
    <div className="menu">
    <div className="logo">
        <img src="https://uploads-ssl.webflow.com/6166abb5949e08122a37782c/6166abb5949e08095d37792f_QuidichVLR.png" alt="" />
    </div>
    <div className="menu-list">
        <h4>Menu</h4>
        <div>Dashboard</div>
        <div>Matches</div>
        {/* <div>Team</div>
        <div>Player</div>
        <div>Field Simulator</div> */}
    </div>
    {/* <div className="menu-list">
        <h4>Personal</h4>
        <div>Profile</div>
        <div>Settings</div>
        <div>Support</div>
    </div> */}

    {/* <button>log out</button> */}
    </div>

    </>
)
}

export default menu 