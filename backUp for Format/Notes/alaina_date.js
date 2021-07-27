/*


Alaina Date : 01-06-2021

Statistics (index.tsx)

import React, { useEffect, useState } from "react";
import { Container, Grid, makeStyles, Paper, Typography, Input } from "@material-ui/core";
import StatisticsBarChart from "./StatisticsBarChart";
import { useQuery } from "@apollo/react-hooks";
import { GET_STATISTICS_CONTENT } from "../../graphql/queries/getStatisticsContent";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import CrazyChart from "./CrazyChart";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useLazyQuery } from "@apollo/react-hooks";
import toDate from "date-fns/esm/fp/toDate/index.js";

const rand = () => Math.floor(Math.random() * 255);

const useStyles = makeStyles((theme) => ({
    container_root: {
        width: "100%",
        backgroundColor: "#ffffff",
        margin: "16px",
        minHeight: "680px",
        borderRadius: "4px",
        padding: "20px",
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    paperBox: {
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#EBD8F4",
    },
    pieGraphPaperBox: {
        backgroundColor: "#EBD8F4",
        marginTop: "30px",
        padding: 20,
        [theme.breakpoints.down("sm")]: {
            padding: "10px",
            height: "unset",
        },
        height: "510px",
    },
    pieChartFull: {
        height: "auto",
    },
    barGraphPaperBox: {
        // height: "550px",
        backgroundColor: "#EBD8F4",
        marginTop: "30px",
        paddingTop: "15px",
    },
    dataNotFoundPaperBox: {
        height: "110px",
        backgroundColor: "#FFA500",
        marginTop: "140px",
        textAlign: "center",
        [theme.breakpoints.up("xs")]: {
            marginTop: "0",
            height: "unset",
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: "0",
            height: "unset",
        },
        [theme.breakpoints.up("md")]: {
            marginTop: "140px",
            height: "110px",
        },
    },
    name: {
        padding: "10px 10px 5px 10px",
        paddingTop: "30px",
        textAlign: "center",
    },
    noData: {
        padding: "10px 10px 5px 10px",
        paddingTop: "44px",
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            padding: "20px 10px",
        },
    },
    number: {
        padding: "10px 10px 5px 10px",
        textAlign: "center",
    },
    chartWrap: {
        margin: "0 auto",
        textAlign: "center",
        maxWidth: 400,
        width: "100%",
        display: "table",
        marginBottom: "15px",
    },
}));

const Statistics = () => {
    const [date_status, setDate_status] = useState({
        fromDate: "",
        toDate: "",
    });
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    //const [date, setDate] = useState()

    //     useEffect(() => {})
    // const start_date = new Date(state[0].startDate.toISOString());
    // const end_date = new Date(state[0].startDate.toISOString());
    // let sdd = start_date.getDate();
    // let smm = start_date.getMonth() + 1;
    // const syyyy = start_date.getFullYear();
    // let sDate: any;
    // let eDate: any;
    // sdd < 10 ? (sDate = `${0}${sdd}-${smm}-${syyyy}`) : (sDate = `${sdd}-${smm}-${syyyy}`);
    // smm < 10 ? (sDate = `${sdd}-${0}${smm}-${syyyy}`) : (sDate = `${sdd}-${smm}-${syyyy}`);

    // let edd = end_date.getDate();
    // let emm = end_date.getMonth() + 1;
    // const eyyyy = end_date.getFullYear();

    // edd < 10 ? (eDate = "0" + edd + "-" + emm + "-" + eyyyy) : (eDate = edd + "-" + emm + "-" + eyyyy);
    // emm < 10 ? (eDate = edd + "-" + "0" + emm + "-" + eyyyy) : (eDate = edd + "-" + emm + "-" + eyyyy);

    // console.log("state : ", state);
    // console.log("Start date : ", start_date);
    // console.log("End date : ", end_date);
    // console.log("sDate : ", sDate);
    // console.log("eDate : ", eDate);

//console.log(`Start date DD/MM/YYYY : ${sdd}-${smm}-${syyyy}`);
//console.log(`Start date DD/MM/YYYY : ${edd}-${emm}-${eyyyy}`);

// const { data, loading, error } = useQuery(GET_STATISTICS_CONTENT);

// data && console.log("Data : ", data);

const [chatData, { loading, data }] = useLazyQuery(GET_STATISTICS_CONTENT, {
    fetchPolicy: "network-only",
    //onCompleted: (res) => res.getOrderChats.data,
});

data && console.log("Data : ", data);

// if (loading) return <p>Loading...</p>;
// if (error) return <p>Data Not Found or Network Error...</p>;

const [orderStatusData, setOrderStatusData] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        {
            type: "bar",
            label: "Approved",
            backgroundColor: `rgba(0,128,0,0.8)`,
            // data: [23, 15, 34, 26, 21, 35, 22],
            data: [],
        },
        {
            type: "bar",
            label: "Pending",
            backgroundColor: `rgba(255,255,0,0.6)`,
            // data: [33, 25, 14, 56, 41, 25, 12],
            data: [],
        },
        {
            type: "bar",
            label: "Rejected",
            backgroundColor: `rgba(255,0,0,0.8)`,
            // data: [43, 27, 12, 26, 41, 27, 19],
            data: [],
        },
    ],
});

const [numOfOrderByCategory, setNumOfOrderByCategory] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        {
            type: "bar",
            label: "Ask For Service",
            backgroundColor: `rgba(255,102,0,0.8)`,
            // data: [23, 15, 34, 26, 21, 35, 22],
            data: [],
        },
        {
            type: "bar",
            label: "Goods",
            backgroundColor: `rgba(255,153,204,0.8)`,
            // data: [33, 25, 14, 56, 41, 25, 12],
            data: [],
        },
        {
            type: "bar",
            label: "Send Anything",
            backgroundColor: `rgba(102,2,102,0.8)`,
            // data: [43, 27, 12, 26, 41, 27, 19],
            data: [],
        },
        {
            type: "bar",
            label: "Where and How much",
            backgroundColor: `rgba(0,0,128,0.8)`,
            // data: [13, 20, 17, 39, 23, 37, 18],
            data: [],
        },
    ],
});

const [totalPriceForEachCategory, setTotalPriceForEachCategory] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        // {
        //     type: "line",
        //     label: "Line",
        //     borderColor: `rgba(${rand()}, ${rand()}, ${rand()},${rand()})`,
        //     borderWidth: 2,
        //     fill: false,
        //     data: [13, 35, 24, 36, 11, 45, 32],
        // },
        {
            type: "bar",
            label: "Ask For Service",
            backgroundColor: `rgba(0,255,0,0.6)`,
            // data: [23, 15, 34, 26, 21, 35, 22],
            data: [],
        },
        {
            type: "bar",
            label: "Goods",
            backgroundColor: `rgba(128,128,0,0.9)`,
            // data: [33, 25, 14, 56, 41, 25, 12],
            data: [],
        },
        {
            type: "bar",
            label: "Send Anything",
            backgroundColor: `rgba(255,0,255,0.8)`,
            // data: [43, 27, 12, 26, 41, 27, 19],
            data: [],
        },
        {
            type: "bar",
            label: "Where and How much",
            backgroundColor: `rgba(225,102,0,0.8)`,
            // data: [18, 29, 38, 8, 24, 40, 17],
            data: [],
        },
    ],
});

const [numberOfUsers, setNumberOfUsers] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        {
            type: "line",
            label: "Number of Users",
            borderColor: `rgba(0,0,0,0.8)`,
            borderWidth: 1,
            fill: false,
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
        },
        {
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
            label: "Number of Users",
            // backgroundColor:'green',
            backgroundColor: ["rgba(255, 99, 132, 0.6)"],
        },
    ],
});

const [numberOfDrivers, setNumberOfDrivers] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        {
            type: "line",
            label: "Number of Drivers",
            borderColor: `rgba(255,0,0,0.9)`,
            borderWidth: 1,
            fill: false,
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
        },
        {
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
            label: "Number of Drivers",
            backgroundColor: ["rgba(115, 99, 32, 0.6)"],
        },
    ],
});

const [numberOfDiscountedOrders, setNumberOfDiscountedOrders] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        {
            type: "line",
            label: "Number of Discounted Orders",
            borderColor: `rgba(0,0,0,0.8)`,
            borderWidth: 1,
            fill: false,
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
        },
        {
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
            label: "Number of Discounted Orders",
            // backgroundColor:'green',
            backgroundColor: ["rgba(55, 199, 132, 0.6)"],
        },
    ],
});

const [totalTodayEarning, setTotalTodayEarning] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        {
            type: "line",
            label: "Total Today Earning",
            borderColor: `rgba(255,0,0,0.9)`,
            borderWidth: 1,
            fill: false,
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
        },
        {
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
            label: "Total Today Earning",
            backgroundColor: ["rgba(25, 9, 132, 0.6)"],
        },
    ],
});

const [appProfits, setAppProfits] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        {
            type: "line",
            label: "App Profits",
            borderColor: `rgba(0,0,0,0.8)`,
            borderWidth: 1,
            fill: false,
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
        },
        {
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
            label: "App Profits",
            backgroundColor: ["rgba(25, 99, 32, 0.6)"],
        },
    ],
});

const [appCost, setAppCost] = useState({
    // labels: ["05/05/2021", "06/05/2021", "07/05/2021", "08/05/2021", "09/05/2021", "10/05/2021", "11/05/2021"],
    labels: [],
    datasets: [
        {
            type: "line",
            label: "App Cost",
            borderColor: `rgba(255,0,0,0.9)`,
            borderWidth: 1,
            fill: false,
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
        },
        {
            // data: [15, 42, 18, 26, 32, 14, 19],
            data: [],
            label: "App Cost",
            backgroundColor: ["rgba(5, 9, 12, 0.6)"],
        },
    ],
});

const classes = useStyles();

// tslint:disable-next-line:no-any
// tslint:disable-next-line:no-any

const NUMBER_OF_USER_LABEL: any = [];
const NUMBER_OF_USER_COUNT: any = [];

const NUMBER_OF_DRIVERS_LABEL: any = [];
const NUMBER_OF_DRIVERS_COUNT: any = [];

const NUMBER_OF_DISCOUNTED_ORDER_LABEL: any = [];
const NUMBER_OF_DISCOUNTED_ORDER_COUNT: any = [];

const TOTAL_TODAY_EARNING_LABEL: any = [];
const TOTAL_TODAY_EARNING_COUNT: any = [];

const TOTAL_APP_PROFIT_LABEL: any = [];
const TOTAL_APP_PROFIT_COUNT: any = [];

const TOTAL_APP_COST_LABEL: any = [];
const TOTAL_APP_COST_COUNT: any = [];

const TOTAL_ORDERS_BY_STATUS_LABEL: any = [];
const TOTAL_ORDERS_BY_STATUS_APPROVED: any = [];
const TOTAL_ORDERS_BY_STATUS_PENDING: any = [];
const TOTAL_ORDERS_BY_STATUS_REJECTED: any = [];

const TOTAL_ORDERS_BY_CATEGORY_LABEL: any = [];
const TOTAL_ORDERS_BY_CATEGORY_ASK_FOR_SERVICE: any = [];
const TOTAL_ORDERS_BY_CATEGORY_GOODS: any = [];
const TOTAL_ORDERS_BY_CATEGORY_SEND_ANYTHING: any = [];
const TOTAL_ORDERS_BY_CATEGORY_HOW_MUCH: any = [];

const PRICE_BY_CATEGORY_LABEL: any = [];
const PRICE_BY_CATEGORY_ASK_FOR_SERVICE: any = [];
const PRICE_BY_CATEGORY_GOODS: any = [];
const PRICE_BY_CATEGORY_SEND_ANYTHING: any = [];
const PRICE_BY_CATEGORY_HOW_MUCH: any = [];

useEffect(() => {
    data &&
        data.getDashboard.totalUsers.map((item: any) => {
            NUMBER_OF_USER_LABEL.push(item.date);
            NUMBER_OF_USER_COUNT.push(item.count);
        });
    const cloneTotalUsers = { ...numberOfUsers };
    cloneTotalUsers.labels = NUMBER_OF_USER_LABEL;
    cloneTotalUsers.datasets[0].data = NUMBER_OF_USER_COUNT;
    cloneTotalUsers.datasets[1].data = NUMBER_OF_USER_COUNT;
    setNumberOfUsers(cloneTotalUsers);

    data &&
        data.getDashboard.totalDrivers.map((item: any) => {
            NUMBER_OF_DRIVERS_LABEL.push(item.date);
            NUMBER_OF_DRIVERS_COUNT.push(item.count);
        });
    const cloneTotalDrivers = { ...numberOfDrivers };
    cloneTotalDrivers.labels = NUMBER_OF_DRIVERS_LABEL;
    cloneTotalDrivers.datasets[0].data = NUMBER_OF_DRIVERS_COUNT;
    cloneTotalDrivers.datasets[1].data = NUMBER_OF_DRIVERS_COUNT;
    setNumberOfDrivers(cloneTotalDrivers);

    data &&
        data.getDashboard.totalDiscountOrders.map((item: any) => {
            NUMBER_OF_DISCOUNTED_ORDER_LABEL.push(item.date);
            NUMBER_OF_DISCOUNTED_ORDER_COUNT.push(item.count);
        });
    const cloneDiscountedOrders = { ...numberOfDiscountedOrders };
    cloneDiscountedOrders.labels = NUMBER_OF_DISCOUNTED_ORDER_LABEL;
    cloneDiscountedOrders.datasets[0].data = NUMBER_OF_DISCOUNTED_ORDER_COUNT;
    cloneDiscountedOrders.datasets[1].data = NUMBER_OF_DISCOUNTED_ORDER_COUNT;
    setNumberOfDiscountedOrders(cloneDiscountedOrders);

    data &&
        data.getDashboard.totalEarning.map((item: any) => {
            TOTAL_TODAY_EARNING_LABEL.push(item.date);
            TOTAL_TODAY_EARNING_COUNT.push(item.count);
        });
    const cloneTotalTodayEarning = { ...totalTodayEarning };
    cloneTotalTodayEarning.labels = TOTAL_TODAY_EARNING_LABEL;
    cloneTotalTodayEarning.datasets[0].data = TOTAL_TODAY_EARNING_COUNT;
    cloneTotalTodayEarning.datasets[1].data = TOTAL_TODAY_EARNING_COUNT;
    setTotalTodayEarning(cloneTotalTodayEarning);

    data &&
        data.getDashboard.totalAppProfit.map((item: any) => {
            TOTAL_APP_PROFIT_LABEL.push(item.date);
            TOTAL_APP_PROFIT_COUNT.push(item.count);
        });
    const CloneTotalAppProfit = { ...appProfits };
    CloneTotalAppProfit.labels = TOTAL_APP_PROFIT_LABEL;
    CloneTotalAppProfit.datasets[0].data = TOTAL_APP_PROFIT_COUNT;
    CloneTotalAppProfit.datasets[1].data = TOTAL_APP_PROFIT_COUNT;
    setAppProfits(CloneTotalAppProfit);

    data &&
        data.getDashboard.totalAppCost.map((item: any) => {
            TOTAL_APP_COST_LABEL.push(item.date);
            TOTAL_APP_COST_COUNT.push(item.count);
        });
    const CloneTotalAppCost = { ...appCost };
    CloneTotalAppCost.labels = TOTAL_APP_COST_LABEL;
    CloneTotalAppCost.datasets[0].data = TOTAL_APP_COST_COUNT;
    CloneTotalAppCost.datasets[1].data = TOTAL_APP_COST_COUNT;
    setAppCost(CloneTotalAppCost);

    data &&
        data.getDashboard.totalOrdersByStatus.map((item: any) => {
            TOTAL_ORDERS_BY_STATUS_LABEL.push(item.date);
            TOTAL_ORDERS_BY_STATUS_APPROVED.push(item.approved);
            TOTAL_ORDERS_BY_STATUS_PENDING.push(item.pending);
            TOTAL_ORDERS_BY_STATUS_REJECTED.push(item.rejected);
        });
    const CloneOrderByStatus = { ...orderStatusData };
    CloneOrderByStatus.labels = TOTAL_ORDERS_BY_STATUS_LABEL;
    CloneOrderByStatus.datasets[0].data = TOTAL_ORDERS_BY_STATUS_APPROVED;
    CloneOrderByStatus.datasets[1].data = TOTAL_ORDERS_BY_STATUS_PENDING;
    CloneOrderByStatus.datasets[2].data = TOTAL_ORDERS_BY_STATUS_REJECTED;
    setOrderStatusData(CloneOrderByStatus);

    data &&
        data.getDashboard.totalOrdersByCategory.map((item: any) => {
            TOTAL_ORDERS_BY_CATEGORY_LABEL.push(item.date);
            TOTAL_ORDERS_BY_CATEGORY_ASK_FOR_SERVICE.push(item.ask_for_service);
            TOTAL_ORDERS_BY_CATEGORY_GOODS.push(item.goods);
            TOTAL_ORDERS_BY_CATEGORY_SEND_ANYTHING.push(item.send_anything);
            TOTAL_ORDERS_BY_CATEGORY_HOW_MUCH.push(item.where_and_how_much);
        });
    const CloneOrderByCategory = { ...numOfOrderByCategory };
    CloneOrderByCategory.labels = TOTAL_ORDERS_BY_CATEGORY_LABEL;
    CloneOrderByCategory.datasets[0].data = TOTAL_ORDERS_BY_CATEGORY_ASK_FOR_SERVICE;
    CloneOrderByCategory.datasets[1].data = TOTAL_ORDERS_BY_CATEGORY_GOODS;
    CloneOrderByCategory.datasets[2].data = TOTAL_ORDERS_BY_CATEGORY_SEND_ANYTHING;
    CloneOrderByCategory.datasets[3].data = TOTAL_ORDERS_BY_CATEGORY_HOW_MUCH;
    setNumOfOrderByCategory(CloneOrderByCategory);

    data &&
        data.getDashboard.totalPriceByCategory.map((item: any) => {
            PRICE_BY_CATEGORY_LABEL.push(item.date);
            PRICE_BY_CATEGORY_ASK_FOR_SERVICE.push(item.ask_for_service);
            PRICE_BY_CATEGORY_GOODS.push(item.goods);
            PRICE_BY_CATEGORY_SEND_ANYTHING.push(item.send_anything);
            PRICE_BY_CATEGORY_HOW_MUCH.push(item.where_and_how_much);
        });
    const ClonePiceByCategory = { ...totalPriceForEachCategory };
    ClonePiceByCategory.labels = PRICE_BY_CATEGORY_LABEL;
    ClonePiceByCategory.datasets[0].data = PRICE_BY_CATEGORY_ASK_FOR_SERVICE;
    ClonePiceByCategory.datasets[1].data = PRICE_BY_CATEGORY_GOODS;
    ClonePiceByCategory.datasets[2].data = PRICE_BY_CATEGORY_SEND_ANYTHING;
    ClonePiceByCategory.datasets[3].data = PRICE_BY_CATEGORY_HOW_MUCH;
    setTotalPriceForEachCategory(ClonePiceByCategory);
}, [data]);

const getDatePickerData = (e: any) => {
    if (e.value !== null) {
        const from_date = new Date(e?.value[0].toISOString());
        const to_date = new Date(e?.value[1].toISOString());

        let fdd = from_date.getDate();
        let fmm = from_date.getMonth() + 1;
        const fyyyy = from_date.getFullYear();

        let sDayDate: any;
        let sMonthDate: any;
        let sDate: any;
        fdd < 10 ? (sDayDate = `${0}${fdd}`) : (sDayDate = `${fdd}`);
        fmm < 10 ? (sMonthDate = `${0}${fmm}`) : (sMonthDate = `${fmm}`);
        sDate = `${sDayDate}-${sMonthDate}-${fyyyy}`;

        let tdd = to_date.getDate();
        let tmm = to_date.getMonth() + 1;
        const tyyyy = to_date.getFullYear();

        let eDayDate: any;
        let eMonthDate: any;
        let eDate: any;

        tdd < 10 ? (eDayDate = `${0}${tdd}`) : (eDayDate = `${tdd}`);
        tmm < 10 ? (eMonthDate = `${0}${tmm}`) : (eMonthDate = `${tmm}`);
        eDate = `${eDayDate}-${eMonthDate}-${tyyyy}`;

        setDate_status({
            ...date_status,
            fromDate: sDate,
            toDate: eDate,
        });
    }
};
console.log("fromDate: ", date_status.fromDate);
console.log("toDate : ", date_status.toDate);

useEffect(() => {
    chatData({
        variables: {
            fromDate: date_status.fromDate,
            toDate: date_status.toDate,
        },
    });
}, [date_status]);

return (
    <>
        <div className={classes.container_root}>
            <Grid container spacing={3} justify="center">
                <Grid item sm={3}>
                    <DateRangePickerComponent
                        format="dd-MM-yyyy"
                        //onChange={(e: any) => console.log("e : ", e.value)}
                        //onChange={(e: any) => setDate_status({ ...date_status, fromDate: "", toDate: "" })}
                        onChange={getDatePickerData}
                    ></DateRangePickerComponent>
                </Grid>
            </Grid>


            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} sm={6}>
                        <Paper className={classes.paperBox}>
                            <div className={classes.name}> Number of order </div>

                            {data && <div className={classes.number}> {data.getDashboard.totalOrders}</div>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <Paper className={classes.paperBox}>
                            <div className={classes.name}>total number of shops</div>

                            {data && <div className={classes.number}> {data.getDashboard.totalShops}</div>}
                        </Paper>
                    </Grid>
                </Grid>


                <Grid container spacing={3}>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.pieGraphPaperBox}>
                            <h2 className={classes.chartWrap}>Number of users</h2>
                            <StatisticsBarChart
                                newDriversData={numberOfUsers}
                                displayLegend={false}
                            ></StatisticsBarChart>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.pieGraphPaperBox}>
                            <h2 className={classes.chartWrap}>Number of Drivers</h2>
                            <StatisticsBarChart
                                newDriversData={numberOfDrivers}
                                displayLegend={false}
                            ></StatisticsBarChart>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.pieGraphPaperBox}>
                            <h2 className={classes.chartWrap}>Number of Discounted Orders</h2>
                            <StatisticsBarChart
                                newDriversData={numberOfDiscountedOrders}
                                displayLegend={false}
                            ></StatisticsBarChart>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.pieGraphPaperBox}>
                            <h2 className={classes.chartWrap}>Total Today Earning</h2>
                            <StatisticsBarChart
                                newDriversData={totalTodayEarning}
                                displayLegend={false}
                            ></StatisticsBarChart>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.pieGraphPaperBox}>
                            <h2 className={classes.chartWrap}>App Profits</h2>
                            <StatisticsBarChart
                                newDriversData={appProfits}
                                displayLegend={false}
                            ></StatisticsBarChart>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper className={classes.pieGraphPaperBox}>
                            <h2 className={classes.chartWrap}>App Cost</h2>
                            <StatisticsBarChart newDriversData={appCost} displayLegend={false}></StatisticsBarChart>
                        </Paper>
                    </Grid>
                </Grid>


                <Grid container spacing={3} justify="center">

                    <Grid item xs={10}>
                        <Paper className={`${classes.pieGraphPaperBox} ${classes.pieChartFull}`}>
                            <h2 className={classes.chartWrap}> Total Number Of Orders</h2>
                            <CrazyChart multiBarData={orderStatusData} />
                        </Paper>
                    </Grid>


                    <Grid item xs={10}>
                        <Paper className={`${classes.pieGraphPaperBox} ${classes.pieChartFull}`}>
                            <h2 className={classes.chartWrap}>Number of Orders </h2>
                            <CrazyChart multiBarData={numOfOrderByCategory} />
                        </Paper>
                    </Grid>


                    <Grid item xs={10}>
                        <Paper className={`${classes.pieGraphPaperBox} ${classes.pieChartFull}`}>
                            <h2 className={classes.chartWrap}>Total Price </h2>
                            <CrazyChart multiBarData={totalPriceForEachCategory} />
                        </Paper>
                    </Grid>
                </Grid>

                {

                    // <Grid container spacing={3}>
                    //         <Grid item xs={12} md={6}>
                    //             <Paper className={classes.pieGraphPaperBox}>
                    //                 {data.getDashboard.totalDrivers.length > 0 ? (
                    //                     <div className={classes.chartWrap}>
                    //                         <h2>Number of drivers </h2>
                    //                         <StatisticsPieChart diversData={diversData}></StatisticsPieChart>
                    //                     </div>
                    //                 ) : (
                    //                     <div className={classes.chartWrap}>
                    //                         <h2>Number of drivers </h2>
                    //                         <Paper className={classes.dataNotFoundPaperBox}>
                    //                             <h2 className={classes.noData}> Data Not Found</h2>
                    //                         </Paper>
                    //                     </div>
                    //                 )}
                    //             </Paper>
                    //         </Grid>
                    //         <Grid item xs={12} md={6}>
                    //             <Paper className={classes.pieGraphPaperBox}>
                    //                 {data.getDashboard.totalOrdersByStatus.length > 0 ? (
                    //                     <div className={classes.chartWrap}>
                    //                         <h2>Number of orders </h2>
                    //                         <StatisticsPieChart diversData={ordersData}></StatisticsPieChart>
                    //                     </div>
                    //                 ) : (
                    //                     <div className={classes.chartWrap}>
                    //                         <h2>Number of orders </h2>
                    //                         <Paper className={classes.dataNotFoundPaperBox}>
                    //                             <h2 className={classes.noData}> Data Not Found</h2>
                    //                         </Paper>
                    //                     </div>
                    //                 )}
                    //             </Paper>
                    //         </Grid>
                    //         <Grid item xs={12} md={6}>
                    //             <Paper className={classes.barGraphPaperBox}>
                    //                 {data && (
                    //                     <div>
                    //                         <h2 className={classes.chartWrap}>Number of orders (For each category)</h2>
                    //                         <StatisticsBarChart
                    //                             newDriversData={categoryWiseOrdersData1}
                    //                         ></StatisticsBarChart>
                    //                     </div>
                    //                 )}
                    //             </Paper>
                    //         </Grid>
                    //         <Grid item xs={12} md={6}>
                    //             <Paper className={classes.barGraphPaperBox}>
                    //                 <div>
                    //                     <h2 className={classes.chartWrap}>Total price for each category per Day</h2>
                    //                     <StatisticsBarChart
                    //                         newDriversData={categoryWisePriceData}
                    //                         displayLegend={false}
                    //                     ></StatisticsBarChart>
                    //                 </div>
                    //             </Paper>
                    //         </Grid>
                    //     </Grid>

                }
            </div>
        </div>
    </>
);
};
export default Statistics;
function e(e: any) {
    throw new Error("Function not implemented.");
}





* /