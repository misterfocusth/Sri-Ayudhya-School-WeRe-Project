import React, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';

// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { doc, getDoc, getFirestore } from "firebase/firestore";

// Context Provider
import { AuthContext } from '../../context/Auth'

// Images
import RecycleItem01 from "../../images/Recycle_Items_Images/Recycle_Item_01.png"
import RecycleItem02 from "../../images/Recycle_Items_Images/Recycle_Item_02.png"
import RecycleItem03 from "../../images/Recycle_Items_Images/Recycle-Item_03.png"
import RecycleItem04 from "../../images/Recycle_Items_Images/Recycle_Item_04.png"
import RecycleItem05 from "../../images/Recycle_Items_Images/Recycle_Item_05.jpg"

// QR Code
const QRCode = require('qrcode.react');

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

const db = getFirestore(firebaseApp);

export default function QRCodePage() {
    const classes = useStyles();
    const history = useHistory();
    const { studentDataContext } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [studentImageUrl, setStudentImageUrl] = useState("");
    const [studentData, setStudentData] = useState([{}]);
    const [pointsLeftToLevelUp, setPointsLeftToLevelUp] = useState(0);

    document.title = "QR Code ของฉัน | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getStudentData() {
            if (!pointsLeftToLevelUp) {
                const profile = await liff.getProfile();
                setStudentImageUrl(profile.pictureUrl);
                const docSnap = await getDoc(doc(db, "students", profile.userId));
                setStudentData(docSnap.data());

                // Cal Points Left To Level Up
                const LEVEL_POINTS_EXP_REQ = [51, 151, 301, 501, 801, 1201, 1701, 2301, 3001];
                if (studentData.student_points_exp >= 3001) {
                    setPointsLeftToLevelUp("0")
                } else {
                    setPointsLeftToLevelUp(LEVEL_POINTS_EXP_REQ[studentData.student_level] - studentData.student_points_exp);
                }
                console.log(pointsLeftToLevelUp);

                setIsLoading(false);
            }
        }
        getStudentData();
    }, [pointsLeftToLevelUp, studentData])

    if (!studentDataContext) {
        return <Redirect to="/" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {!isLoading ?
                <div>
                    <Typography
                        variant="h6"
                        gutterBottom
                        style={{ marginTop: 16, fontWeight: "bold" }}
                        className={classes.center}
                    >
                        QR Code ของฉัน
                    </Typography>

                    <div style={{ marginTop: 16 }}>
                        <div>
                            <Card
                                className={classes.center}
                                style={{
                                    width: "90%",
                                    display: "flex",
                                    backgroundColor: "rgba(46, 204, 113, 0.50)",
                                    borderRadius: 15
                                }}
                            >
                                <CardContent style={{ padding: 16 }}>
                                    <div>
                                        <div>
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item>
                                                    <Avatar
                                                        alt="Image"
                                                        src={studentImageUrl}
                                                        className={classes.large}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ margin: 16, fontWeight: "bold" }}
                                                    >
                                                        ชื่อ : {studentData.student_name_title + studentData.student_first_name + " " + studentData.student_last_name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>

                                        <div>
                                            <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                                style={{ marginTop: 16, fontWeight: "bold" }}
                                                className={classes.center}
                                            >
                                                ระดับชั้น : มัธยมศึกษาปีที่ {studentData.student_class_grade + 1} ห้อง {studentData.student_class_room + 1}
                                            </Typography>
                                        </div>

                                        <div style={{ marginTop: 16 }}>
                                            <QRCode
                                                value={studentData.student_id}
                                                className={classes.center}
                                                includeMargin={true}
                                                size={150}
                                            />
                                        </div>

                                        <div>
                                            <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                                style={{ marginTop: 16, fontWeight: "bold" }}
                                                className={classes.center}
                                            >
                                                เลขประจำตัวนักเรียน : {studentData.student_id}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <Grid container direction="row" alignItems="center" className={classes.center}>
                            <Grid item>
                                <InfoIcon />
                            </Grid>
                            <Grid item style={{ width: "75%", marginLeft: 16 }}>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    โปรดเเสดงข้อมูลประจำตัวนักเรียนหน้านี้เเก่คุณครู เพื่อเข้าร่วมกิจกรรมการรีไซเคิล หรือหากข้อมูลไม่ถูกต้องสามารถกดเพื่อไปยังหน้า
                                    <span
                                        style={{ fontWeight: "bold", color: "#00a152" }}
                                        onClick={() => {
                                            history.push("/edit-profile");
                                        }}
                                    >
                                        เเก้ไขข้อมูลของฉัน
                                    </span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ marginTop: 12, width: "90%" }} className={classes.center}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    style={{ margin: 0 }}
                                >
                                    สะสมอีก <span style={{ fontWeight: "bold", color: "#00a152" }}>{pointsLeftToLevelUp}</span> เเต้ม เพื่ออัพเลเวล
                                    ยิ่งเลเวลเยอะยิ่งเเลกของรางวัลได้หลากหลาย
                                    มากขึ้น
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{ fontWeight: "bold" }}
                            className={classes.center}
                        >
                            ประเภทของรีไซเคิลเเละจำนวนเเต้มสะสม
                        </Typography>

                        <div style={{ marginTop: 16 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img
                                        src={RecycleItem01}
                                        alt="Preview"
                                        height="75"
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: 16, width: "55%" }}>
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        ประเภท : ขวดน้ำดื่มพลาสติก
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        ขวดน้ำดื่ม / ขวดพลาสติดใส
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#00a152" }}>5</span> เเต้ม
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img
                                        src={RecycleItem02}
                                        alt="Preview"
                                        height="75"
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: 16, width: "55%" }}>
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        ประเภท : กระดาษ
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        กระดาษขาว-ดำ / กระดาษ A4 / กระดาษปอนด์ เเละกระดาษคอม ฯ
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#00a152" }}>10</span> เเต้ม
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img
                                        src={RecycleItem03}
                                        alt="Preview"
                                        height="75"
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: 16, width: "55%" }}>
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        ประเภท : กระดาษกล่อง
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        กระดาษคราฟท์ / กระดาษลัง / กระดาษน้ำตาล เเละกระดาษกล่อง
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#00a152" }}>15</span> เเต้ม
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img
                                        src={RecycleItem04}
                                        alt="Preview"
                                        height="75"
                                        width="75"
                                        style={{ objectFit: "cover" }}
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: 16, width: "55%" }}>
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        ประเภท : ซองไอศกรีมกระดาษ
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#00a152" }}>5</span> เเต้ม
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img
                                        src={RecycleItem05}
                                        alt="Preview"
                                        height="75"
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: 16, width: "55%" }}>
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        ประเภท : กล่องนม UHT
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#00a152" }}>5</span> เเต้ม
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>

                : <div></div>
            }
        </div>
    )
}