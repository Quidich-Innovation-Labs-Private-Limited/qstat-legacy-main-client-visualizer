import React from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import "./dropdown.css";

const SelectBallForField = ({ changeBallReleaseStatus }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        defaultValue={"AFTER_BALL_RELEASED"}
        onChange={(e) => changeBallReleaseStatus(e.target.value)}
      >
        <MenuItem value="AFTER_BALL_RELEASED">After ball released</MenuItem>
        <MenuItem value="BEFORE_BALL_RELEASED">Before ball released</MenuItem>
        <MenuItem value="AFTER_BALL_RELEASED_BT">
          After ball released BT
        </MenuItem>
        <MenuItem value="AFTER_BALL_RELEASED_END_BT">
          After ball released end BT
        </MenuItem>
        <MenuItem value="BEFORE_BALL_RELEASED_BT">
          Before ball released BT
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectBallForField;
