import React from "react";
import Select from "react-select";

const MatchSelect = ({
  matchOptions,
  matchOption,
  setMatchOption
}) => {
  return (
    <div style={{ marginRight: 15 }}>
      <Select
        name="matchselect"
        className="select-match-div"
        placeholder="Match"
        value={matchOptions.find((f) => f.value === matchOption)}
        onChange={(selectedOption) => {
          setMatchOption(selectedOption.value);
        }}
        options={matchOptions}
      />
    </div>
  );
};

export default MatchSelect;
