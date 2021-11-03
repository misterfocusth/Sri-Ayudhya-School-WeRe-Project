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
import DonateOrg01 from "../../images/Donation_Page_Images/Greenpeace-logo.png"

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

export default function Donation0Page() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "เกี่ยวกับกรีนพีซ (Greenpeace Thailand) | Sri Ayudhya School - We Re(cycle)"

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
                    src={DonateOrg01}
                    className={classes.center}
                    alt="Preview"
                    height="100"
                />
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ width: "90%", fontWeight: "bold" }}
                    className={classes.center}
                >
                    กรีนพืช (ประเทศไทย)
                </Typography>
            </div>

            <div>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 20, width: "90%" }}
                    className={classes.center}
                >
                    กรีนพีซเป็นองค์กรรณรงค์อิสระระดับโลกที่ลงมือทำเพื่อเปลี่ยนแปลงทัศนคติ และพฤติกรรม ปกป้องสิ่งแวดล้อม และส่งเสริมสันติภาพ  บางคนอาจเห็น ป่าและมหาสมุทรเป็นเพียงแหล่งทรัพยากรที่ทำเงิน เป็นท่อนซุงและปลา จำนวนมาก แต่สำหรับคนอีกนับล้าน ป่าและทะเลเป็นทั้งบ้าน มรดกทาง ธรรมชาติและวัฒนธรรมและยังเป็นอนาคต กรีนพีซยืนหยัดเพื่อชุมชนทั่วโลก เราเรียกร้องให้รัฐบาลและบรรษัทมีความรับผิดชอบต่อนโยบายและกิจกรรมที่สร้างหายนะทางสิ่งแวดล้อม
                </Typography>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 16, width: "90%" }}
                    className={classes.center}
                >
                    กรีนพีซ ประเทศไทย
                    กรีนพีซ ประเทศไทยทำงานรณรงค์เพื่อปกป้องสิทธิทางสิ่งแวดล้อมซึ่งเป็น สิทธิขั้นพื้นฐานของทุกคนในสังคม นับตั้งแต่ปี พ.ศ. 2543 กรีนพีซประเทศ ไทยทำงานเคียงข้างกับชุมชน และเครือข่ายประชาชนที่หลากหลาย เพื่อสร้าง การเปลี่ยนผ่านระบบพลังงานหมุนเวียนที่สะอาด ผลักดันความเป็นธรรมด้าน สภาพภูมิอากาศ ต่อกรการทำประมงที่ผิดกฏหมายและร่วมปกป้องทะเลไทย ส่งเสริมเกษตรกรรมเชิงนิเวศและเปิดโปงอาชญากรรมสิ่งแวดล้อม
                </Typography>
            </div>

            <Button
                variant="contained"
                color="primary"
                className={classes.center}
                style={{ width: "75%", marginTop: 20 }}
                onClick={() => {
                    liff.openWindow({
                        url: 'https://www.greenpeace.org/thailand/act/donate/',
                        external: true
                    });
                }}
            >
                บริจาคเงินสนับสนุน
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