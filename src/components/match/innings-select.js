import React from "react";
import Select from "react-select";

const InningsSelect = ({
  inningsOption,
  setInningsOption
}) => {
  const inningsOptions = [
    { value: 1, label: "Innings 1" },
    { value: 2, label: "Innings 2" },
    { value: 3, label: "Innings 3" },
    { value: 4, label: "Innings 4" },
  ];

  return (
    <div style={{ marginRight: 15 }}>
      <Select
        name="inningsselect"
        className="select-match-div"
        placeholder="Innings"
        value={inningsOptions.find((f) => f.value === inningsOption)}
        onChange={(selectedOption) => {
          setInningsOption(selectedOption.value);
        }}
        options={inningsOptions}
      />
    </div>
  );
};

export default InningsSelect;
