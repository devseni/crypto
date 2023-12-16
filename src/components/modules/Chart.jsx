import React, { useState } from "react";
import styles from "./Chart.module.css";
import { convertData } from "../../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ chart, setChart }) => {
  const [type, setType] = useState("prices");

  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.value;
      setType(type);
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.chart}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
        <div className={styles.name}>
          <img src={chart.coin.image} alt="" />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button
            className={type === "prices" ? styles.selected : null}
            value="prices"
          >
            Prices
          </button>
          <button
            className={type === "market_caps" ? styles.selected : null}
            value="market_caps"
          >
            Market Caps
          </button>
          <button
            className={type === "total_volumes" ? styles.selected : null}
            value="total_volumes"
          >
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>$ {chart.coin.current_price}</span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>{chart.coin.market_cap}</span>
          </div>
          <div>
            <p>Prices:</p>
            <span>$ {chart.coin.current_price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;

//========================================================//
//*==================| ChartComponent |===================//
//========================================================//

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
