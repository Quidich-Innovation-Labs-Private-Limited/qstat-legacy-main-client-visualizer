import React from "react";
import Select from "react-select";
import { isEmpty } from "lodash";

const FilterSelects = ({
  overOption,
  ballOption,
  batsmenOption,
  bowlerOption,
  setOverOption,
  setBallOption,
  setBatsmenOption,
  setBowlerOption,
  handleClickReset,
  overs
}) => {
  let overOptions = [];
  const ballOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
  ];
  let batsmenOptions = [];
  let bowlerOptions = [];

  if (!isEmpty(overs) && Object.keys(overs)?.length !== 0) {
    let batsman = [];
    let bowler = [];
    let overOption = [];
    Object.keys(overs).forEach((key) => {
      if (key !== "innings") {
        overOption.push({ value: key, label: key });
        batsman = batsman.concat(overs[key]?.map((bats) => bats.onstrike_batsman));
        bowler = bowler.concat(overs[key]?.map((bowl) => bowl.bowler));
      }
    });

    batsman = [...new Set(batsman)];
    bowler = [...new Set(bowler)];

    batsmenOptions = batsman.map((item) => {
      return { value: item, label: item };
    });

    bowlerOptions = bowler.map((item) => {
      return { value: item, label: item };
    });

    overOptions = overOption;

    // fixme: direct mutation happening in above function please use hooks
  }

  return (
    <>
      <div className="filters">
        <div style={{ marginRight: 15 }}>
          <Select
            name="overselect"
            className="select-match-div"
            placeholder="Over"
            value={overOption}
            onChange={(selectedOption) => {
              setOverOption(selectedOption);
            }}
            options={overOptions}
          />
        </div>
        <div style={{ marginRight: 15 }}>
          <Select
            name="ballselect"
            className="select-match-div"
            placeholder="Ball"
            value={ballOption}
            onChange={(selectedOption) => {
              setBallOption(selectedOption);
            }}
            options={ballOptions}
          />
        </div>
        <div style={{ marginRight: 15 }}>
          <Select
            name="batsmanselect"
            className="select-match-div"
            placeholder="Batsman"
            value={batsmenOption}
            onChange={(selectedOption) => {
              setBatsmenOption(selectedOption);
            }}
            options={batsmenOptions}
          />
        </div>
        <div style={{ marginRight: 15 }}>
          <Select
            name="bowlerselect"
            className="select-match-div"
            placeholder="Bowler"
            value={bowlerOption}
            onChange={(selectedOption) => {
              setBowlerOption(selectedOption);
            }}
            options={bowlerOptions}
          />
        </div>
        <button className="reset-button" onClick={handleClickReset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default FilterSelects;
