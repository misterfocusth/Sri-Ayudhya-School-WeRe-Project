import React, { useContext } from "react";

// React Router Dom
import { Redirect } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Divider
} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

// Context Provider
import { AuthContext } from '../../context/Auth'

// LINE LIFF
import liff from '@line/liff';

const useStyles = makeStyles((theme) => ({
    center: {
        margin: "auto",
        display: "flex",
        justifyContent: "center"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    textBox: {
        marginLeft: "16px",
        marginRight: "16px"
    },
    formControl: {
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}))

export default function AboutPage() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "ช่วยเหลือเเละเกี่ยวกับเเอปพลิเคชั่น | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <div
                style={{ marginTop: 24 }}
                className={classes.center}
            >
                <Card style={{ width: "90%", borderRadius: 15 }}>
                    <CardContent style={{ padding: 16 }}>
                        <div>
                            <Grid container direction="row" alignItems="center">
                                <Grid item style={{ marginTop: 5, color: "#00a152" }}>
                                    <InfoIcon />
                                </Grid>
                                <Grid item style={{ marginLeft: 8 }}>
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>เกี่ยวกับเเอปพลิเคชั่น</Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                Sri Ayudhya School - We Re(cycle) คือ เว็บเเอปพลิเคชั่นสำหรับเรียนรู้การมีส่วนร่วมในการจัดการขยะเเละรักษาสิ่งเเวดล้อม เเละส่งเสริมการมีส่วนร่วมในการรีไซเคิล (นักเรียนสามารถนำเอาขยะที่สามารถรีไซเคิลได้มาเปลี่ยนเป็นเเต้มสะสมได้)
                            </Typography>
                            <Divider variant="middle" style={{ margin: 24 }} />
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 16, fontWeight: "bold", color: "#00a152" }}
                                onClick={() => {
                                    liff.openWindow({
                                        url: 'https://drive.google.com/file/d/18Bad9Uu9vPAAODtqoJGhXqku1-kxJLra/view',
                                        external: true
                                    });
                                }}
                            >
                                ข้อตกลงในการใช้ซอฟต์แวร์
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8, fontWeight: "bold", color: "#00a152" }}
                                onClick={() => {
                                    liff.openWindow({
                                        url: 'https://drive.google.com/file/d/1w8sHY4BnpXab7kXBdEv1jlBF3i3NdP3L/view',
                                        external: true
                                    });
                                }}
                            >
                                นโยบายการคุ้มครองข้อมูลส่วนบุคคล
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div
                style={{ marginTop: 24 }}
                className={classes.center}
            >
                <Card style={{ width: "90%", borderRadius: 15 }}>
                    <CardContent style={{ padding: 16 }}>
                        <div>
                            <Grid container direction="row" alignItems="center">
                                <Grid item style={{ marginTop: 5, color: "#00a152" }}>
                                    <MenuBookIcon />
                                </Grid>
                                <Grid item style={{ marginLeft: 8 }}>
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>กิตติกรรมประกาศ</Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                ในฐานะนักเรียนผู้พัฒนาโปรแกรมเพื่อบริหารการเปลี่ยนแปลงสภาพภูมิอากาศและสิ่งแวดล้อม “Sri Ayudhya School - We Re(cycle)”      ขอกราบขอบพระคุณผู้สนับสนุนทุกท่านที่เป็นส่วนหนึ่งในการทำให้โปรแกรมนี้พัฒนาออกมาสำเร็จลุล่วงไปได้ด้วยดี ไม่ว่าจะเป็นทุนอุดหนุนโครงการการแข่งขันพัฒนาโปรแกรมคอมพิวเตอร์แห่งประเทศไทย ครั้งที่ 24 จากสำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ โรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ ที่เอื้อเฟื้อสถานที่ในการทำโครงการ และ อาจารย์ที่ปรึกษา อาจารย์ทองจันทร์ เต็มจิตร ที่เป็นผู้คอยให้คำปรึกษาและคำแนะนำที่ดีตลอดระยะเวลาในการพัฒนาโครงการ
                            </Typography>

                            <Divider variant="middle" style={{ margin: 24 }} />
                        </div>
                        <div>
                            <Grid container direction="row" alignItems="center">
                                <Grid item style={{ marginTop: 5, color: "#00a152" }}>
                                    <CollectionsBookmarkIcon />
                                </Grid>
                                <Grid item style={{ marginLeft: 8 }}>
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>กิตติกรรมประกาศด้านซอฟต์เเวร์</Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                เว็บเเอปพลิเคชั่น Sri Ayudhya School - We Re(cycle) จะไม่สามารถเกิดขึ้นได้เลย หากไม่มีซอฟต์เเวร์เเละไลบรารี่เเบบโอเพนซอร์ส ดังต่อไปนี้
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 16 }}
                            >
                                ReactJS / react / react-dom / react-router-dom / react-scripts / @line/liff / @material-ui/core / @material-ui/lab / axios / firebase / qrcode.react / compressorjs เเละ uuidv4
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 16 }}
                            >
                                เเละไอคอนเเทนสัญลักษณ์ที่ใช้ภายในเว็บเเอปพลิเคชั่น โดย เว็บไซค์ Flaticon เเละเพ็คเกจ @material-ui/icons
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
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
                                    <InfoIcon style={{ marginTop: 5, color: "#00a152" }} />
                                </Grid>
                                <Grid item style={{ marginLeft: 8, width: "80%" }}>
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>เเจ้งปัญหาการใช้งาน ข้อเสนอเเนะ หรือติดต่อผู้พัฒนาโครงการเเละอาจารย์ที่ปรึกษา</Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 16 }}
                            >
                                ผู้พัฒนาโครงการ : นายศิลา ภักดีวงษ์
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                อีเมล : 41635@sriayudhya.ac.th
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                เบอร์โทรศัพท์ : 065-652-6769
                            </Typography>

                            <Divider variant="middle" style={{ margin: 24 }} />

                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 16 }}
                            >
                                อาจารย์ที่ปรึกษา : อาจารย์ทองจันทร์ เต็มจิตร
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                อีเมล : thongjun.t@sriayudhya.ac.th
                            </Typography>

                            <Divider variant="middle" style={{ margin: 24 }} />

                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 16 }}
                            >
                                สถานที่ติดต่อ : โรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ 497 ถนนศรีอยุธยา แขวงถนนพญาไท เขตราชเทวี กรุงเทพมหานคร 10400
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}