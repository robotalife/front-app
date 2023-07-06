import { useContext } from "react";
import { Container, Grid } from "@mui/material";
import BotCard from "../../components/shared/BotCard/BotCard";
import Pagination from "../../components/shared/Pagination";
import Loader from "../../components/shared/Loader";
import BotFilters from "../../components/shared/BotFilter";
import PageTitle from "../../components/pageStructure/PageTitle";
import { StoreBotsContext } from "../../shared/providers/StoreBotsProvider";
import { IconCircleCheck, IconCopy } from "../../shared/icons/Icons";
import Button from "../../components/formElements/Button";
import { useNavigate } from "react-router-dom";
import routes from "../../shared/consts/routes";

const Store = () => {
  const navigate = useNavigate();
  const { botsList, setFilters, paginateData, loading, filters } =
    useContext(StoreBotsContext);

  return (
    <>
      <Container maxWidth={"xl"} sx={{ p: "0!important" }}>
        <Grid container>
          <Grid item xs={12} lg={"auto"}>
            <PageTitle title={"Bot Store"} />
          </Grid>
          <Grid item xs={12} lg>
            <BotFilters />
          </Grid>
        </Grid>
      </Container>

      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          {Array.isArray(botsList) && botsList.length ? (
            botsList.map((bot) => (
              <Grid item xs={12} sm={6} md={4} lg={"auto"} key={bot.id}>
                <BotCard data={bot}>
                  <Grid container justifyContent="start" flexWrap={"nowrap"}>
                    <Grid item xs={"auto"}>
                      {bot.isSubscribed ? (
                        <Button
                          size="small"
                          variant={"contained"}
                          onClick={() => {}}
                          sx={{
                            backgroundColor: "#F9F5FF",
                            color: "#6941C6",
                            borderWidth: 0,
                          }}
                        >
                          <IconCircleCheck style={{ marginRight: 5 }} />
                          Subscribed
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant={"outlined"}
                          onClick={() => {}}
                        >
                          <IconCopy style={{ marginRight: 5 }} />
                          Copy bot
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs={"auto"}>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() =>
                          navigate(`${routes.storeBotOverview}/${bot.id}`)
                        }
                      >
                        View bot detail
                      </Button>
                    </Grid>
                  </Grid>
                </BotCard>
              </Grid>
            ))
          ) : (
            <Grid item>There is no bots for you</Grid>
          )}
        </Grid>
      )}
      {botsList.length > 0 ? (
        <Pagination
          currentPage={paginateData.currentPage + 1}
          totalPages={paginateData.totalPages}
          hasNext={paginateData.hasNext}
          hasPrevious={paginateData.hasPrevious}
          next={() => setFilters({ ...filters, page: paginateData.nextPage })}
          previous={() =>
            setFilters({ ...filters, page: paginateData.previousPage })
          }
        />
      ) : (
        <> </>
      )}
    </>
  );
};

export default Store;