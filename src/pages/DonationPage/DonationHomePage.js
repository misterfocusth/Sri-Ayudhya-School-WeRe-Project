import React, { useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider"
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';

// Context Provider
import { AuthContext } from '../../context/Auth'

// Images
import DonationIcon from "../../images/Donation_Page_Images/volunteer.png"
import DonateOrg01 from "../../images/Donation_Page_Images/Greenpeace-logo.png"
import DonateOrg02 from "../../images/Donation_Page_Images/wftt.jpg"
import DonateOrg03 from "../../images/Donation_Page_Images/aovFAh-X.jpg"

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

export default function DonationHomePage() {
    const history = useHistory();
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "การบริจาค | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <div>
                <img
                    src={DonationIcon}
                    className={clsx(classes.headerImage, classes.center)}
                    alt="Preview"
                    width="125"
                    height="125"
                />
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: 16, fontWeight: "bold" }}
                    className={classes.center}
                >
                    การบริจาค
                </Typography>

                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ marginTop: 10, width: "80%" }}
                    className={classes.center}
                >
                    นี่คือองค์กรที่รณรงค์ เเละขับเคลื่อนด้านสิ่งเเวดล้อม หากคุณสนใจเเละมี
                    ความประสงค์ที่จะร่วมบริจาค สามารถดเพื่อเข้าไปดูรายละเอียดบนหน้า
                    เว็บไซค์ขององกรณ์นั้นๆ ได้
                </Typography>
            </div>

            <div style={{ margin: 24 }} >
                <Grid container direction="row" alignItems="center" className={classes.center}>
                    <Grid item>
                        <img
                            src={DonateOrg01}
                            alt="Preview"
                            width="75"
                            height="50"
                        />
                    </Grid>
                    <Grid item style={{ marginLeft: 14, width: "70%" }}>
                        <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold" }}
                        >
                            กรีนพีซ - (Greenpeace Thailand)
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{ marginTop: 4 }}
                        >
                            กรีนพีซเป็นองค์กรรณรงค์ด้านสิ่งแวดล้อมที่เป็นอิสระ โดยใช้การเผชิญหน้าอย่างสร้างสรรค์และสันติวิธี เพื่อเปิดโปงปัญหาสิ่งแวดล้อมทั่วโลก และเสนอทางออกของปัญหา
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{ color: "#00a152", marginTop: 8 }}
                            onClick={() => {
                                history.push("/donation/0")
                            }}
                        >
                            ข้อมูลเพิ่มเติมเเละการรับบริจาค
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <Divider variant="middle" style={{ marginTop: 20, marginBottom: 20 }} />

            <div style={{ margin: 14 }} >
                <Grid container direction="row" alignItems="center" className={classes.center}>
                    <Grid item>
                        <img
                            src={DonateOrg02}
                            alt="Preview"
                            style={{ objectFit: "cover" }}
                            width="85"
                            height="85"
                        />
                    </Grid>
                    <Grid item style={{ marginLeft: 14, width: "70%" }}>
                        <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold" }}
                        >
                            มูลนิธิคุ้มครองสัตว์ป่าและพรรณพืช ฯ
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{ marginTop: 4 }}
                        >
                            มูลนิธิฯจะมีส่วนร่วมในการทำงานอนุรักษ์
                            ธรรมชาติ ทั้งในถิ่นกำเนิด (In-situ Conservation) และนอกถิ่นกำเนิด (Ex-situ Conservation) รวมถึงการมีส่วน ร่วมในการนำสัตว์ป่าและพืชป่าที่ใกล้สูญ
                            พันธุ์คืนสู่ธรรมชาติ
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{ color: "#00a152", marginTop: 8 }}
                            onClick={() => {
                                history.push("/donation/1")
                            }}
                        >
                            ข้อมูลเพิ่มเติมเเละการรับบริจาค
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <Divider variant="middle" style={{ marginTop: 20, marginBottom: 20 }} />

            <div style={{ margin: 14 }} >
                <Grid container direction="row" alignItems="center" className={classes.center}>
                    <Grid item>
                        <img
                            src={DonateOrg03}
                            alt="Preview"
                            style={{ objectFit: "cover" }}
                            width="85"
                            height="85"
                        />
                    </Grid>
                    <Grid item style={{ marginLeft: 14, width: "70%" }}>
                        <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold" }}
                        >
                            มูลนิธิโลกสีเขียว
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{ marginTop: 4 }}
                        >
                            มูลนิธิโลกสีเขียวก่อตั้งขึ้นโดยมีจุดประสงค์เพื่อเผยแพร่ความรู้ ต่อสาธารณชนในเรื่อง สิ่งแวดล้อมของไทย ผ่านสื่อหลากรูปแบบ เพื่อให้คนเข้าถึงได้ง่าย
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{ color: "#00a152", marginTop: 8 }}
                            onClick={() => {
                                history.push("/donation/2")
                            }}
                        >
                            ข้อมูลเพิ่มเติมเเละการรับบริจาค
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <div
                style={{ marginTop: 24 }}
                className={classes.center}
            >
                <Card style={{ width: "90%", borderRadius: 15 }}>
                    <CardContent style={{ padding: 16 }}>
                        <div>
                            <Grid container direction="row" alignItems="center">
                                <Grid item style={{ marginTop: 5 }}>
                                    <InfoIcon />
                                </Grid>
                                <Grid item style={{ marginLeft: 8 }}>
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>เกี่ยวกับการดำเนินการรับบริจาค</Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                การบริจาคเงินจะดำเนินการผ่านหน้าเว็บไซค์อย่างเป็นทางการของกรีนพืช (ประเทศไทย) เเอพพลิเคชั่น Sri Ayudhya School - We Re(cycle)
                                เพียงเเสดงรายละเอียดเกี่ยวกับองค์กรณ์เท่านั้น เเต่มิได้เป็นผู้ดำเนินการ หรือคนกลางในการรับบริจาค
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}