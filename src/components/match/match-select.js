import React ,{useEffect}from "react";
import Select from "react-select";

const MatchSelect = ({
  matchOptions,
  matchOption,
  setMatchOption
}) => {


  useEffect(() => {
    // Set the first match as default if no match is selected
    if (matchOptions.length > 0 && !matchOption) {
      setMatchOption(matchOptions[0].value);
    }
  }, [matchOptions, matchOption, setMatchOption]);
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
