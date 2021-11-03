import React, { useContext } from "react";

// React Router Dom
import { Redirect } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider"
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardContent from '@material-ui/core/CardContent';
import InfoIcon from '@material-ui/icons/Info';

// LINE LIFF
import liff from '@line/liff';

// Context Provider
import { AuthContext } from '../../context/Auth'

// Images
import DonateOrg03 from "../../images/Donation_Page_Images/aovFAh-X.jpg"

const useStyles = makeStyles((theme) => ({
    center: {
        margin: "auto",
        display: "flex",
        justifyContent: "center"
    },
    media: {
        height: 140,
    },
}));

export default function Donation2Page() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "เกี่ยวกับมูลนิธิโลกสีเขียว | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>

            <div>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ marginTop: 24, fontWeight: "bold" }}
                    className={classes.center}
                >
                    เกี่ยวกับ
                </Typography>
                <img
                    src={DonateOrg03}
                    className={classes.center}
                    alt="Preview"
                    style={{ marginTop: 14, marginBottom: 14 }}
                    height="125"
                />
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ width: "90%", fontWeight: "bold" }}
                    className={classes.center}
                >
                    มูลนิธิโลกสีเขียว
                </Typography>
            </div>

            <div>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 20, width: "90%" }}
                    className={classes.center}
                >
                    มูลนิธิโลกสีเขียวก่อตั้งขึ้นเมื่อปีพุทธศักราช 2534 โดย ม.ร.ว.นริศรา จักรพงษ์ ได้รับพระกรุณาจาก สมเด็จพระเจ้าพี่นางเธอเจ้าฟ้ากัลยาณิวัฒนาทรงรับไว้ในพระอุปถัมภ์ โดยมีจุดประสงค์เพื่อเผยแพร่ความรู้ ต่อสาธารณชนในเรื่องสิ่งแวดล้อมของไทย ผ่านสื่อหลากรูปแบบ เพื่อให้คนเข้าถึงได้ง่าย
                </Typography>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 16, width: "90%" }}
                    className={classes.center}
                >
                    มูลนิธิฯ ทำงานร่วมกับคนหลายกลุ่ม ไม่ว่าจะเป็นโรงเรียน ชุมชนท้องถิ่น ครู เด็ก และครอบครัว โดยสร้าง กระบวนการเรียนรู้ผ่านประสบการณ์จริงในพื้นที่ เพื่อให้คนท้องถิ่นหรือประชาชนทั่วไปสามารถวิเคราะห์ สภาพแวดล้อมรอบตัวได้ด้วยตนเอง โดยไม่ต้องพึ่งผู้เชี่ยวชาญหรืออุปกรณ์ราคาแพง
                </Typography>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 16, width: "90%" }}
                    className={classes.center}
                >
                    ในช่วงทศวรรษที่ผ่านมามูลนิธิฯ จึงหันมามุ่งเน้นงานในเมืองมากขึ้น โดยฟื้นฟูความสัมพันธ์ของคนเมือง ให้กลับมาเชื่อมต่อกับธรรมชาติอีกครั้ง เราจัดกิจกรรมกลางแจ้งเป็นประจำ เพื่อให้คนเมืองได้เรียนรู้เกี่ยว กับสิ่งแวดล้อมรอบตัวและความหลากหลายทางชีวภาพที่แอบอาศัยอยู่ร่วมกับเราในเมือง หนึ่งในงานรณรงค์ หลักของเราคือการส่งเสริมให้กรุงเทพ เป็นเมืองจักรยาน เพื่อช่วยแก้ปัญหาหลายประการในเมือง ทั้งปัญหา สิ่งแวดล้อม เศรษฐกิจ และสังคม ทำให้กรุงเทพเป็นเมืองน่าอยู่ ทั้งสำหรับมนุษย์และชีวิตร่วมโลก
                </Typography>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 16, width: "90%" }}
                    className={classes.center}
                >
                    มูลนิธิฯ มุ่งมั่นที่จะคิดค้นและพัฒนาสร้างกระบวนการเรียนรู้กับชุมชนผ่านประสบการณ์จริง และเชื่อมโยง ความสัมพันธ์ระหว่างคนกับธรรมชาติเข้าด้วยกัน เพื่อหวังจะสร้างสิ่งแวดล้อมที่ยั่งยืน และท้ายสุดสามารถ สร้างสังคมที่แข็งแกร่งสืบต่อไปในอนาคต ด้วยความเชื่อมั่นว่า การแก้ปัญหาสิ่งแวดล้อมอย่างยั่งยืน ขับเคลื่อนได้ด้วยพลังจากพลเมือง
                </Typography>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 16, width: "90%" }}
                    className={classes.center}
                >
                    มูลนิธิฯ ทำงานร่วมกับคนหลายกลุ่ม ไม่ว่าจะเป็นโรงเรียน ชุมชนท้องถิ่น ครู เด็ก และครอบครัว โดยสร้าง กระบวนการเรียนรู้ผ่านประสบการณ์จริงในพื้นที่ เพื่อให้คนท้องถิ่นหรือประชาชนทั่วไปสามารถวิเคราะห์ สภาพแวดล้อมรอบตัวได้ด้วยตนเอง โดยไม่ต้องพึ่งผู้เชี่ยวชาญหรืออุปกรณ์ราคาแพง
                </Typography>
            </div>

            <div
                style={{ marginTop: 20 }}
                className={classes.center}
            >
                <Card style={{ width: "90%" }}>
                    <CardContent style={{ padding: 16 }}>
                        <div>
                            <Grid container direction="row" alignItems="center">
                                <Grid item style={{ marginTop: 5 }}>
                                    <InfoIcon />
                                </Grid>
                                <Grid item style={{ marginLeft: 8 }}>
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                        ช่องทางการรับบริจาค
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                โอนเงินเข้าบัญชีออมทรัพย์
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 4 }}
                            >
                                ชื่อบัญชี : <span style={{ fontWeight: "bold" }}>มูลนิธิโลกสีเขียว</span>
                            </Typography>

                            <Divider style={{ marginTop: 8, marginBottom: 8 }} />

                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 4 }}
                            >
                                <span style={{ fontWeight: "bold", color: "#2980B9" }}>
                                    ธนาคารกรุงเทพ
                                </span> สาขาสุขุมวิท 43
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 4 }}
                            >
                                เลขที่บัญชี : 172-0-98685-8
                            </Typography>

                            <Divider style={{ marginTop: 8, marginBottom: 8 }} />

                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 4 }}
                            >
                                <span style={{ fontWeight: "bold", color: "#8E44AD" }}>
                                    ธนาคารไทยพาณิชย์
                                </span> สาขาบางกะปิ (สุขุมวิท 45)
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 4 }}
                            >
                                เลขที่บัญชี : 009-283747-1
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Button
                variant="contained"
                color="primary"
                className={classes.center}
                style={{ width: "75%", marginTop: 20 }}
                onClick={() => {
                    liff.openWindow({
                        url: 'https://greenworld.or.th/',
                        external: true
                    });
                }}
            >
                ข้อมูลเเละรายละเอียดเพิ่มเติม
            </Button>

            <Divider variant="middle" style={{ marginTop: 20, marginBottom: 20 }} />

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
                                การบริจาคเงินจะดำเนินการผ่านหน้าเว็บไซค์เเละช่องทางการรับบริจาคอย่างเป็นทางการของมูลนิธิโลกสีเขียว เเอพพลิเคชั่น Sri Ayudhya School - We Re(cycle)
                                เพียงเเสดงรายละเอียดเกี่ยวกับองค์กรณ์เท่านั้น เเต่มิได้เป็นผู้ดำเนินการ หรือคนกลางในการรับบริจาค
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}