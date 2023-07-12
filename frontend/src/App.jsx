import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import SearchInput from "./components/SearchInput";
import Blogs from "./components/Blogs";
import InfoSide from "./components/InfoSide";

const App = () => {
  const [instrumentData, setInstrumentData] = useState([]);
  const [orderBookData, setOrderBookData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    console.log(text);
    setSearchText(text);
  };

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBTUSD"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.table === "instrument") {
        setInstrumentData(data.data);
      } else if (data.table === "orderBookL2_25") {
        setOrderBookData(data.data);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Grid spacing={2} container>
      <Grid xs={12} sm={8} md={8} lg={10} item>
      Valego Consulting | Frontend Test
      </Grid>

      <Grid xs={12} sm={4} md={4} lg={2} item>
        <SearchInput onSearch={handleSearch} search={setSearchText} />
      </Grid>

      <Grid xs={12} sm={8} md={8} lg={10} item>
        <Blogs searchText={searchText} />
      </Grid>
      <Grid xs={12} sm={4} md={4} lg={2} item>
        <InfoSide orderBookData={orderBookData} instrumentData={instrumentData} />
      </Grid>
    </Grid>
  );
};

export default App;
