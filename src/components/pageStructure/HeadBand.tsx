import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";

import classes from "./HeadBand.module.scss";
import { BotContext } from "../../shared/providers/BotProvider";
import { IconArrowDownRight, IconArrowUpRight } from "../../shared/icons/Icons";

const HeadBand = () => {
  const { botData } = useContext(BotContext);

  return (
    <Box className={classes.headBand}>
      <Grid container>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Name</Typography>
          <div className={classes.item}>
            <div>{botData.name}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Price</Typography>
          <div className={classes.item}>
            <div>{botData.price}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Exchange</Typography>
          <div className={classes.item}>
            <div>{botData.exchangeType}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Pair</Typography>
          <div className={classes.item}>
            <div>{botData.pair}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Strategy</Typography>
          <div className={classes.item}>
            <div>
              {botData.strategy}
              {botData.strategy === "LONG" ? (
                <>
                  Long{" "}
                  <IconArrowUpRight
                    style={{ marginLeft: 10, height: 8, width: 8 }}
                  />
                </>
              ) : (
                <>
                  Short{" "}
                  <IconArrowDownRight
                    style={{ marginLeft: 10, height: 8, width: 8 }}
                  />
                </>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Created by</Typography>
          <div className={classes.item}>
            <div>{botData.createdBy}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Started at</Typography>
          <div className={classes.item}>
            <div>{botData.createdAt}</div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeadBand;
