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
import DonateOrg02 from "../../images/Donation_Page_Images/wftt.jpg"

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

export default function Donation1Page() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "เกี่ยวกับมูลนิธิคุ้มครองสัตว์ป่าและพรรณพืช ฯ | Sri Ayudhya School - We Re(cycle)"

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
                    src={DonateOrg02}
                    className={classes.center}
                    alt="Preview"
                    height="125"
                />
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ width: "90%", fontWeight: "bold", marginTop: 8 }}
                    className={classes.center}
                >
                    มูลนิธิคุ้มครองสัตว์ป่าและพรรณพืชแห่งประเทศไทยในพระบรมราชินูปถัมภ์
                </Typography>
            </div>

            <div>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 20, width: "90%" }}
                    className={classes.center}
                >
                    มูลนิธิฯจะมีส่วนร่วมในการทำงานอนุรักษ์ธรรมชาติ ทั้งในถิ่นกำเนิด (In-situ Conservation) และนอกถิ่นกำเนิด (Ex-situ Conservation) รวมถึงการมีส่วนร่วมในการนำสัตว์ป่าและพืชป่าที่ใกล้สูญพันธุ์คืนสู่ธรรมชาติ มูลนิธิฯ จะสนับสนุนแนวทางในการการจัดพื้นที่เพื่อเป็นที่อยู่และขยายพันธุ์สัตว์และพืช เพื่อการอยู่รอดและอยู่ร่วมกันอย่างกลมกลืนและเอื้อประโยชน์ระหว่าง คน ป่าไม้ และสัตว์ป่า เพื่อป้องกันการสูญพันธุ์ของสัตว์และพืชหายาก โดยเฉพาะสัตว์และพืชประจำถิ่นบางชนิด การช่วยเหลือสัตว์ป่าในกรณีฉุกเฉิน เฉพาะหน้า เช่น สัตว์ป่าที่ประสบปัญหาภัยธรรมชาติ และปัญหาจากการพัฒนาพื้นที่ที่เคยเป็นถิ่นที่อยู่ของสัตว์ป่าหรือพืชป่ามาแต่เดิม คณะกรรมการและเจ้าหน้าที่มีความเชื่อมั่นว่า เป้าหมายที่จำเพาะเจาะจงมากขึ้นนี้ จะเหมาะสมกับจำนวนทุนและจำนวนบุคลากรที่มีอยู่ในปัจจุบัน ส่วนอนาคตและความสำเร็จขององค์กรนั้น ขึ้นอยู่กับการสนับสนุนและความไว้วางใจที่เราจะได้รับจากทุกภาคส่วนของสังคมไทยและสังคมโลก
                </Typography>
            </div>

            <Button
                variant="contained"
                color="primary"
                className={classes.center}
                style={{ width: "75%", marginTop: 20 }}
                onClick={() => {
                    liff.openWindow({
                        url: 'https://www.wildlifefund.or.th/donateform.php',
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
                                การบริจาคเงินจะดำเนินการผ่านหน้าเว็บไซค์อย่างเป็นทางการของมูลนิธิคุ้มครองสัตว์ป่าและพรรณพืชแห่งประเทศไทยในพระบรมราชินูปถัมภ์ เเอพพลิเคชั่น Sri Ayudhya School - We Re(cycle)
                                เพียงเเสดงรายละเอียดเกี่ยวกับองค์กรณ์เท่านั้น เเต่มิได้เป็นผู้ดำเนินการ หรือคนกลางในการรับบริจาค
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}