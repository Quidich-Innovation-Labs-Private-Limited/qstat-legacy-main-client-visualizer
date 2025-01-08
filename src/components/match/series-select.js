import React from "react";
import Select from "react-select";

const SeriesSelect = ({
  seriesOptions,
  seriesOption,
  setSeriesOption
}) => {
  return (
    <div style={{ marginRight: 15 }}>
      <Select
        name="seriesselect"
        className="select-match-div"
        placeholder="Series"
        value={seriesOptions.find((f) => f.value === seriesOption)}
        onChange={(selectedOption) => {
          setSeriesOption(selectedOption.value);
        }}
        options={seriesOptions}
      />
    </div>
  );
};

export default SeriesSelect;
