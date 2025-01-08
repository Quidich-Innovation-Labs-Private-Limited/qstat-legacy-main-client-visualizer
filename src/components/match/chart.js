import React, { useRef } from 'react';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const Chart = ({ data, options, style = {}, handleElementClick }) => {
  const chartRef = useRef();

  const onClick = (event) => {
    const element = getElementAtEvent(chartRef.current, event)
    handleElementClick && handleElementClick(element);
  }

  return (
    <Scatter
      ref={chartRef}
      style={style}
      className="scatter-plot"
      options={options}
      data={data}
      onClick={onClick}
    />
  );
};

export default Chart;
