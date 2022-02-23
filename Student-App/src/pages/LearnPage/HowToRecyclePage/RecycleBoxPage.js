import React, { useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// LINE LIFF
import liff from '@line/liff';

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Divider from "@material-ui/core/Divider"
import CardContent from '@material-ui/core/CardContent';
import EcoIcon from '@material-ui/icons/Eco';
import InfoIcon from '@material-ui/icons/Info';

// Context Provider
import { AuthContext } from '../../../context/Auth'

// Images
import RecycleItem03 from "../../../images/Recycle_Items_Images/Recycle-Item_03.png"

export default function RecycleBoxPage() {
    const useStyles = makeStyles((theme) => ({
        center: {
            margin: "auto",
            display: "flex",
            justifyContent: "center"
        },
        headerImage: {
            marginTop: 25
        },
        media: {
            height: 140,
        },
    }));

    const classes = useStyles();
    const history = useHistory();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "วิธีการรีไซเคิล (กระดาษกล่อง) | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <div style={{ marginBottom: 16 }}>
                <img
                    src={RecycleItem03}
                    className={clsx(classes.headerImage, classes.center)}
                    alt="Preview"
                    height="150"
                />
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: 16, fontWeight: "bold", width: "85%" }}
                    className={classes.center}
                >
                    กระดาษกล่อง
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ margin: 16, width: "90%" }}
                >
                    ประเภท : กระดาษคราฟท์ / กระดาษลัง / กระดาษน้ำตาล เเละกระดาษกล่อง
                </Typography>
            </div>

            <div style={{ marginLeft: 16, marginRight: 16, marginTop: 8 }}>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <EcoIcon style={{ color: "#00a152" }} />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{ marginLeft: 8, color: "#00a152" }}
                        >
                            รีไซเคิลสิ่งนี้ ดีต่อโลกเเค่ไหน
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginLeft: 16, marginRight: 16, marginTop: 8 }}
            >
                การรีไซเคิลกล่องลังกระดาษ สามารถลดการผลิตคาร์บอนไดออกไซด์ได้ <span style={{ color: "#00a152" }}>3.14</span> กิโลกรัม CO2e ต่อหนึ่งกิโลกรัม
            </Typography>
            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginLeft: 16, marginRight: 16, marginTop: 8 }}
            >
                หากได้นำไปรีไซเคิลเพียงวันละ 1 ลัง ใน 1 ปี จะเทียบเท่าการปลูกต้นไม้ <span style={{ color: "#00a152" }}>
                    11.4
                </span> ต้น
            </Typography>

            <div
                style={{ marginTop: 18 }}
                className={classes.center}
                onClick={() => {
                    liff.openWindow({
                        url: 'https://www.nestle.co.th/th/csv/environment/recycle-reduce-carbon',
                        external: true
                    });
                }}
            >
                <Card style={{ width: "90%" }}>
                    <CardContent style={{ padding: 8 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            style={{ margin: 4 }}
                        >
                            อ้างอิงข้อมูลผลกระทบด้านสิ่งเเวดล้อม
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            style={{ margin: 4, color: "#00a152" }}
                        >
                            https://www.nestle.co.th/th/csv/environment /recycle-reduce-carbon
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <Divider variant="middle" style={{ marginTop: 20, marginBottom: 20 }} />

            <div style={{ marginLeft: 16, marginRight: 16, marginTop: 8 }}>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <InfoIcon style={{ color: "#00a152" }} />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{ marginLeft: 8, color: "#00a152" }}
                        >
                            วิธีการ เเละคำเเนะนำในการรีไซเคิล
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginLeft: 20, marginRight: 16, marginTop: 8 }}
            >
                - กล่องไม่ควรมีรอยสกปรกหรือชำรุดเสียหาย
            </Typography>

            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginLeft: 20, marginRight: 16, marginTop: 8 }}
            >
                - ไม่ควรทำให้เปียกน้ำหรือเกิดความชื้น เพราะจะทำให้เส้นใยกระดาษอ่อนตัวลง
            </Typography>

            <div
                style={{ marginTop: 18 }}
                className={classes.center}
                onClick={() => {
                    history.push("/recycle-location")
                }}
            >
                <Card style={{ width: "90%" }}>
                    <CardContent style={{ padding: 8 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            style={{ margin: 4 }}
                        >
                            ต้องการรีไซเคิลขยะประเภทนี้ ?
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            style={{ margin: 4, color: "#00a152", fontWeight: "bold" }}
                        >
                            หาจุดรับรีไซเคิลรอบๆ บริเวณโรงเรียน
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}