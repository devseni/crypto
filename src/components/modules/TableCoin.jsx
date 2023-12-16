import React from "react";
import chrtUp from "../../assets/chart-up.svg";
import chrtDown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import { marketChart } from "../../services/cryptoApi";
import styles from "./TableCoin.module.css";

const TableCoin = ({ coins, isLoading, currency, setChart }) => {
  // console.log(coins);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" visible={true} />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableCoin;

const checkCurrency = (currency) => {
  switch (currency) {
    case "usd":
      return "$";
    case "eur":
      return "€";
    case "jpy":
      return "¥";
    default:
      break;
  }
};

//========================================================//
//*================| TABLE ROW COMPONENT |================//
//========================================================//

const TableRow = ({ coin, currency, setChart }) => {
  // Destruturing Coin
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    current_price,
    price_change_percentage_24h: price_change,
  } = coin;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };

  // Getting chart data from API

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>

      <td>
        {checkCurrency(currency)} {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chrtUp : chrtDown} alt={name} />
      </td>
    </tr>
  );
};
