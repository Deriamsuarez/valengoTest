import React from 'react'

const InstrumentData = ({instrumentData}) => {

    return (
      <table className="chat-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>Volume</th>
            <th>Change %</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {instrumentData.map((instrument) => (
            <tr key={instrument.symbol}>
              <td>{instrument.symbol}</td>
              <td>{instrument.lastPrice}</td>
              <td>{instrument.volume}</td>
              <td>{instrument.changePct}</td>
              <td>{instrument.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


export default InstrumentData