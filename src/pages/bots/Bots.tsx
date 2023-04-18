import { useContext } from "react";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import { Link } from "react-router-dom";
import routes from "../../shared/consts/routes";
import { Grid } from "@mui/material";
import BotCard from "../../components/shared/BotCard/BotCard";

const Bots = () => {
  const { botsList } = useContext(MyBotsContext);

  return (
    <div>
      <Grid container spacing={3}>
        {Array.isArray(botsList) && botsList.length ? (
          botsList.map((bot) => (
            <Grid item xs={12} sm={6} lg={4} xl={"auto"} key={bot.id}>
              <BotCard data={bot} />
            </Grid>
          ))
        ) : (
          <Grid item>"There is no bots for you"</Grid>
        )}
      </Grid>
    </div>
  );
};

export default Bots;
