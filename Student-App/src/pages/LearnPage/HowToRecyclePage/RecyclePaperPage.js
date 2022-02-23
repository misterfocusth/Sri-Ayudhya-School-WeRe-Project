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
import RecycleItem02 from "../../../images/Recycle_Items_Images/Recycle_Item_02.png"

export default function RecyclePaperPage() {
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

    document.title = "วิธีการรีไซเคิล (กระดาษ) | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <div style={{ marginBottom: 16 }}>
                <img
                    src={RecycleItem02}
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
                    กระดาษ
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ margin: 16, width: "90%" }}
                >
                    ประเภท : กระดาษขาว-ดำ / กระดาษ A4 / กระดาษปอนด์ เเละกระดาษคอม ฯ
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
                กระดาษรีไซเคิลช่วยลดการใช้ทรัพยากรธรรมชาติที่เหลือน้อย เนื่องจากวัตถุดิบหลักในการผลิตกระดาชนิดต่าง ๆ นั้นคือต้นไม้ ดังนั้นการนำมารีไซเคิลจึงเป็นทางเลือกหนึ่งในการลดมลพิษจากการทำลายกระดา เข่น การเผา ที่ก่อให้เกิดมลพิษทางอากาศ ผลกระทบต่อระบบนิเวศ
            </Typography>
            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginLeft: 16, marginRight: 16, marginTop: 8 }}
            >
                เเละทางด้านเศรษฐกิจ กระดาษรีไซเคิลช่วยลดค่าใช้จ่ายในการผลิตกระดาษ เพราะสารเคมีบางประเภทต้องนำเข้าจากต่างประเทศ การนำกระดาษกลับมาใช้ใหม่ จึงช่วยให้รัฐบาลลดภาระการใช้จ่ายนำเข้าวัสดุที่จำเป็นในการผลิตกระดาษลงได้
            </Typography>

            <div
                style={{ marginTop: 18 }}
                className={classes.center}
                onClick={() => {
                    liff.openWindow({
                        url: 'https://goodboxpack.com/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A9%E0%B8%A3%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B9%80%E0%B8%84%E0%B8%B4%E0%B8%A5/',
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
                            https://goodboxpack.com/
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
                ควรเป็นกระดาษที่อยู่ในสภาพที่สามารถนำไปรีไซเคิลได้ กระดาษไม่ควรเปียกน้ำ หรืออยู่ในสภาพที่ไม่สมบูรณ์ (กระดาษสามารถยับได้ เเต่ไม่ควรอยู่ในสภาพที่เสียหายจนเกินไป) เเละตรวจสอบก่อนนำกระดาษมารีไซเคิลทุกครั้งว่ากระดาษไม่มีข้อมูลสำคัญ หรือข้อมูลที่ไม่สามารถเผยเเพร่ได้
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