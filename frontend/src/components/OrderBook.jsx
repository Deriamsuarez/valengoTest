import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const OrderBook = ({ orderBookData }) => {
  const [sellData, setSellData] = useState([]);
  const [buyData, setBuyData] = useState([]);

  useEffect(() => {
    const filteredSellData = orderBookData.filter(
      (order) => order.side === "Sell"
    );
    const filteredBuyData = orderBookData.filter(
      (order) => order.side === "Buy"
    );

    setSellData((prevSellData) => {
      const newSellData = [...prevSellData];
      filteredSellData.forEach((newItem) => {
        const existingIndex = newSellData.findIndex(
          (existingItem) => existingItem.id === newItem.id
        );
        if (existingIndex !== -1) {
          newSellData[existingIndex] = newItem;
        } else if (newSellData.length < 10) {
          newSellData.push(newItem);
        }
      });
      return newSellData.slice(-10);
    });

    setBuyData((prevBuyData) => {
      const newBuyData = [...prevBuyData];
      filteredBuyData.forEach((newItem) => {
        const existingIndex = newBuyData.findIndex(
          (existingItem) => existingItem.id === newItem.id
        );
        if (existingIndex !== -1) {
          newBuyData[existingIndex] = newItem;
        } else if (newBuyData.length < 10) {
          newBuyData.push(newItem);
        }
      });
      return newBuyData.slice(-10);
    });
  }, [orderBookData]);

  return (
    <Grid spacing={2} container>
      <Grid xs={6} sm={12} item>
      <Paper sx={{ padding: 2 }}>
  
          <Stack pb={1} flexDirection={"row"} justifyContent={"space-between"}>
            <Typography
              color={"success.main"}
              variant="body1"
              fontWeight="bold"
            >
              Buy size
            </Typography>
            <CurrencyExchangeIcon color="success" fontSize="16px"/>

            <Typography
              color={"success.main"}
              variant="body1"
              fontWeight="bold"
            >
              Price
            </Typography>
          </Stack>
          <Divider />
          <Stack>
            {buyData.map((data, index) => (
              <Stack
                key={`dataBuy-${data.id}-${index}`}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Typography color={"success.main"} variant="overline">
                  {data.size}
                </Typography>
                <Typography color={"success.main"} variant="overline">
                  {data.price}
                </Typography>
              </Stack>
            ))}
          </Stack>
   
      </Paper>
      </Grid>

      <Grid xs={6} sm={12} item>

      <Paper sx={{ padding: 2 }}>

          <Stack pb={1} flexDirection={"row"} justifyContent={"space-between"} alignItems={'center'}>
            <Typography color={"error.main"} variant="body1" fontWeight="bold">
              Sell size
            </Typography>
           <CurrencyExchangeIcon color="error" fontSize="16px"/>
            <Typography color={"error.main"} variant="body1" fontWeight="bold">
              Price
            </Typography>
          </Stack>
          <Divider />

          <Stack>
            {sellData.map((data, index) => (
              <Stack
                key={`dataSell-${data.id}-${index}`}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Typography color={"error.main"} variant="overline">
                  {data.size}
                </Typography>
                <Typography color={"error.main"} variant="overline">
                  {data.price}
                </Typography>
              </Stack>
            ))}
          </Stack>

      </Paper>
      </Grid>
    </Grid>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
      <table className="chat-table">
        <thead>
          <tr>
            <th style={{ minWidth: 100 }}>Price</th>
            <th style={{ minWidth: 100 }}>Sell</th>
          </tr>
        </thead>
        <tbody>
          {sellData.map((order, index) => (
            <tr key={`sell-${order.id}-${index}`}>
              <td className={"bid-price"}>{order.price}</td>
              <td className="bid-size">{order.size}</td>
            </tr>
          ))}
          {sellData.length < 10 && (
            <tr>
              <td className="bid-price" colSpan="2"></td>
            </tr>
          )}
        </tbody>
      </table>
      <table className="chat-table">
        <thead>
          <tr>
            <th style={{ minWidth: 100 }}>Buy</th>
            <th style={{ minWidth: 100 }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {buyData.map((order, index) => (
            <tr key={`buy-${order.id}-${index}`}>
              <td style={{ height: 20 }} className={`ask-size`}>
                {order.size}
              </td>
              <td style={{ height: 20 }} className={`ask-price`}>
                {order.price}
              </td>
            </tr>
          ))}
          {buyData.length < 10 && (
            <tr>
              <td className="ask-size" colSpan="2"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
