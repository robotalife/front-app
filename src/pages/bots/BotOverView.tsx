import {useParams} from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import {useCallback, useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import {IBotOverview, IChartData, IOverviewChart} from "../../shared/interfaces/bots";
import {Container, Grid, MenuItem, Typography} from "@mui/material";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import BotOverviewCard from "../../components/shared/BotOverviewCard";
import {Icon3DotsVertical, IconArrowDown, IconArrowUp, IconInfoCircle,} from "../../shared/icons/Icons";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";
import ToggleButtonGroup from "../../components/formElements/ToggleButtonGroup";
import {durations} from "../../shared/consts/durations";
import OverviewAreaChart from "../../components/shared/chart/OverviewAreaChart";
import Button from "../../components/formElements/Button";
import Select from "../../components/formElements/Select";

const buttonStyle = {
    borderRadius: "6px !important",
    fontSize: 14,
    fontWeight: 500,
    color: "#667085",
    marginRight: 2,
};

const activeButtonStyle = {
    backgroundColor: "#F9F5FF",
    color: "#6941C6",
};

const BotOverView = () => {
    const {botId} = useParams();
    const {axios} = useAxios();
    const [overview, setOverview] = useState<IBotOverview>({
        averageDailyProfit: "",
        averageWinrate: "",
    } as IBotOverview);
    const [overviewChart, setOverviewChart] = useState<IOverviewChart>({
        summaryProfitChart: {
            labels: [],
            data: [],
        },
        profitByDay: {
            labels: [],
            data: [],
        },
    });
    const [loading, setLoading] = useState(true);
    const [chartInput, setChartInput] = useState<IChartData>({
        labels: [],
        data: [],
    })

    const [activeButton, setActiveButton] = useState<"summary" | "day">(
        "summary"
    );

    const getOverviewData = useCallback(async () => {
        setLoading(true);

        try {
            const response: AxiosResponse<IBotOverview, any> = await axios.get(
                apiEndPoints.getBotOverview(botId as string)
            );

            console.log(response.data)

            const overview = response.data;
            setOverview(overview);
            setChartInput(overviewChart.summaryProfitChart)
        } catch (error) {
            // Handle error
        } finally {
            setLoading(false);
        }
    }, [setOverview, setLoading]);

    const getOverviewChart = useCallback(async () => {
        setLoading(true);

        try {
            const response: AxiosResponse<IOverviewChart, any> = await axios.get(
                apiEndPoints.getOverViewChart(botId as string)
            );

            console.log(response.data)

            setOverviewChart(response.data);
            setChartInput(overviewChart.summaryProfitChart);

        } catch (error) {
            // Handle error
        } finally {
            setLoading(false);
        }
    }, [ setLoading]);

    useEffect(() => {
        getOverviewData();
        getOverviewChart();
    }, [getOverviewData, getOverviewChart]);

    useEffect(() => {
        //action for active button
        console.log("active button changed", activeButton)
        setChartInput(activeButton=== "summary" ? overviewChart.summaryProfitChart : overviewChart.profitByDay)
    }, [activeButton, overviewChart]);



    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} sx={{mb: 3}}>
                <Grid xs={12} lg={4} item>
                    <WrapperBox fullHeight>
                        <WrapperBoxSection>
                            <BotOverviewCard
                                action={<IconInfoCircle/>}
                                hasChart
                                content={overview.totalProfit}
                                chartData={overview.pnlChartData}
                                description={
                                    <>
                                        {overview.averageDailyProfit.indexOf("-") === -1 ? (
                                            <>
                                                <IconArrowUp className="success"/>
                                                <Typography component={"span"} className="success" sx={{px: 1}}>
                                                    {overview.averageDailyProfit}
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <IconArrowDown className="error"/>
                                                <Typography component={"span"} className="error" sx={{px: 1}}>
                                                    {overview.averageDailyProfit}
                                                </Typography>
                                            </>
                                        )}
                                        <Typography component={"span"} className="description" sx={{px: 1}}>
                                            Avg. Daily Profit
                                        </Typography>
                                    </>
                                }
                                title={"Total Profit"}
                            />
                        </WrapperBoxSection>
                    </WrapperBox>
                </Grid>
                <Grid xs={12} lg={4} item>
                    <WrapperBox fullHeight>
                        <WrapperBoxSection>
                            <BotOverviewCard
                                action={<Icon3DotsVertical/>}
                                hasChart
                                chartData={overview.winRateChartData}
                                content={overview.winRate}
                                description={
                                    <>
                                        {overview.averageWinrate.indexOf("-") === -1 ? (
                                            <>
                                                <IconArrowUp className="success"/>
                                                <Typography component={"span"} className="success" sx={{px: 1}}>
                                                    {overview.averageWinrate}
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <IconArrowDown className="error"/>
                                                <Typography component={"span"} className="error" sx={{px: 1}}>
                                                    {overview.averageWinrate}
                                                </Typography>
                                            </>
                                        )}
                                        <Typography component={"span"} className="description" sx={{px: 1}}>
                                            Avg. Daily Winrate
                                        </Typography>
                                    </>
                                }
                                title={"Win rate"}/>
                        </WrapperBoxSection>
                    </WrapperBox>
                </Grid>
                <Grid xs={12} lg={4} item>
                    <WrapperBox fullHeight>
                        <WrapperBoxSection>
                            {/*TODO: @homam chartData is not provide*/}
                            <BotOverviewCard
                                action={""}
                                chartData={{
                                    labels: [],
                                    data: [],
                                }}
                                content={overview.closedDeals}
                                description={""}
                                title={"Closed Deals"}/>
                        </WrapperBoxSection>
                    </WrapperBox>
                </Grid>
            </Grid>
            <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{mb: 3}}
            >
                <Grid item xs={12} lg="auto">
                    <WrapperBoxHeader title="Overview" noBorder/>
                </Grid>
                <Grid item xs={12} lg="auto" sx={{mb: {xs: 2, lg: 0}}}>
                    <ToggleButtonGroup options={durations} noIndicator id="durations"/>
                </Grid>
                <Grid item xs={12} sx={{mb: 2, display: {xs: "none", lg: "block"}}}>
                    <Button
                        size="small"
                        sx={{
                            ...buttonStyle,
                            ...(activeButton === "summary" ? activeButtonStyle : {}),
                        }}
                        onClick={() => setActiveButton("summary")}
                    >
                        Summary Profit
                    </Button>
                    <Button
                        size="small"
                        onClick={() => setActiveButton("day")}
                        sx={{
                            ...buttonStyle,
                            ...(activeButton === "day" ? activeButtonStyle : {}),
                        }}
                    >
                        Profit by Day
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{mb: 2, display: {lg: "none"}}}>
                    <Select
                        onChange={(e) => setActiveButton(e.target.value as "summary" | "day")}
                        value={activeButton}
                        sx={{width: "100%"}}
                    >
                        <MenuItem value={"summary"}>Summary Profit</MenuItem>
                        <MenuItem value={"day"}>Profit by Day</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <OverviewAreaChart input={chartInput}/>
        </Container>
    );
};

export default BotOverView;
