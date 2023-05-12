import { useContext } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import { Container, Grid } from "@mui/material";
import Loader from "../../components/shared/Loader";
import ExchangeCard from "../../components/shared/exchangeCard/ExchangeCard";
import AddExchangeCard from "../../components/shared/exchangeCard/AddExchangeCard";

const Exchanges = () => {
  const { exchangeList, loading } = useContext(ExchangeContext);

  return (
    <Container maxWidth="xl" sx={{ m: 0 }}>
      {loading && <Loader />}

      {!loading && (
        <Grid container spacing={3}>
          {exchangeList.length &&
            exchangeList.map((exchange) => (
              <Grid item xs={12} sm={6} md={4} key={exchange.exchangeId}>
                <ExchangeCard data={exchange} />
              </Grid>
            ))}
          <Grid item xs={12} sm={6} md={4}>
            <AddExchangeCard
              title={"Add Exchange"}
              description={"You can add unlimit account"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AddExchangeCard
              title={"Paper Trade"}
              description={"You can add unlimit account"}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Exchanges;
