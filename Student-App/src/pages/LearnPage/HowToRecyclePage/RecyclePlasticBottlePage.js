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
import RecycleItem01 from "../../../images/Recycle_Items_Images/Recycle_Item_01.png"

export default function RecyclePlasticBottlePage() {
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

    document.title = "วิธีการรีไซเคิล (ขวดน้ำพลาสติก) | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <div style={{ marginBottom: 16 }}>
                <img
                    src={RecycleItem01}
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
                    ขวดน้ำดื่มพลาสติก
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ margin: 16, width: "90%" }}
                >
                    ประเภท : ขวดน้ำดื่ม / ขวดพลาสติกใส
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
                การรีไซเคิลขวดน้ำพลาสติด สามารถ ลดการผลิตคาร์บอนไดออกไซด์ได้ <span style={{ color: "#00a152" }}>1.04</span> กิโลกรัม CO2e ต่อหนึ่งกิโลกรัม
            </Typography>
            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginLeft: 16, marginRight: 16, marginTop: 8 }}
            >
                หากได้นำไปรีไซเคิลเพียงวันละ 1 ลัง ใน 1 ปี จะเทียบเท่าการปลูกต้นไม้ <span style={{ color: "#00a152" }}>
                0.7
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
                - ควรดื่มน้ำให้หมด เเละไม่ควรให้มีของเหลวอยู่ในขวด
            </Typography>

            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginLeft: 20, marginRight: 16, marginTop: 8 }}
            >
                - ควรลอกฉลากออกจากขวดก่อนนำมารีไซเคิล
            </Typography>

            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginLeft: 20, marginRight: 16, marginTop: 8 }}
            >
                - ควรบิดขวดก่อนรีไซเคิลทุกครั้ง เพราะจะเป็นการ ลดพื้นที่ที่ใช้ในการบรรจุขยะ ให้สามารถใช้พื้นที่น้อย เเละบรรจุขยะได้มากขึ้น
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