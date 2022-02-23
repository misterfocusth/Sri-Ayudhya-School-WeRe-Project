import React, { useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory, } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Grid
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InfoIcon from '@material-ui/icons/Info';

// Firebase
import firebaseApp from "../../firebaseConfig";
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";

// Context Provider
import { AuthContext } from "../../context/Auth";

// QR-Code Scanner
import QrReader from 'react-qr-reader'

// Get Firebase Services
const db = getFirestore(firebaseApp);

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
    textField: {
        width: '90%',
    },
    cardRoot: {
        maxWidth: "100%",
        margin: theme.spacing(0.5),
    },
    media: {
        height: 150,

    },
}))

export default function AddPointQRCodeScanner() {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    document.title = "สเเกน QR Code | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    const handleFindStudentById = async (data) => {
        setIsLoading(true);

        const studentArray = []
        const docSnapshot = await getDocs(query(collection(db, "students"), where("student_id", "==", data)));
        docSnapshot.forEach((doc) => {
            studentArray.push(doc.data());
        });
        if (docSnapshot.empty) {
            setIsLoading(false);
            alert("หมายเลขประจำตัวนักเรียนนี้ยังไม่ถูกลงทะเบียนเข้าใช้งานในระบบ");
        } else {
            setIsLoading(false);
            console.log(studentArray);
            history.push("/add-point/student/" + studentArray[0].student_id);
        }
    }

    const handleOnScan = async (data) => {
        if (data) {
            await handleFindStudentById(data);
        }
    }

    const handleOnScanError = (error) => {
        alert(error)
    }

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Typography variant="h6" className={classes.center} style={{ marginTop: 16, fontWeight: "bold", marginBottom: 16 }}>
                ดำเนินการต่อด้วยการสเเกน QR Code
            </Typography>

            <QrReader
                delay={10}
                onError={handleOnScanError}
                onScan={handleOnScan}
                style={{ width: '100%' }}
            />

            <Typography variant="subtitle1" style={{ margin: 16 }}>
                โปรดสเเกน QR Code ของนักเรียน ที่เเสดงอยู่ภายในหน้า <span style={{ fontWeight: "bold" }}>"QR Code ของฉัน"</span> เพื่อดำเนินการเพิ่มเเต้มสะสมให้เเก้นักเรียน
            </Typography>

            <div
                style={{ marginTop: 16 }}
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
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>เกี่ยวกับการเข้าถึงกล้องถ่ายรูป</Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                การใช้งานฟีเจอร์สเเกน QR Code นี้ เนื่องด้วยข้อจำกัดของเเอปพลิเคชั่น LINE ทำให้การเข้าถึงกล้องถ่ายรูปของตัวเครื่อง เพื่อใช้ในการสเเกน QR Code อาจใช้ไม่ได้บนอุปกรณ์บางรุ่น
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 16 }}
                            >
                                เพื่อให้การใช้งานฟีเจอร์การสเเกน QR Code สามารถใช้งานได้บนอุปกรณ์บางรุ่นที่พบปัญหานี้ ให้กดที่ปุ่ม 3 จุดด้านบนขวา จากนั้นเลือกเปิดเเอปพลิเคชั่นจากบราวเซอร์ตัวอื่นภายในเครื่อง (บราวเซอร์ที่เเนะนำ Google Chrome) เเละกดอนุญาติให้ตัวเเอปพลิเคชั่นสามารถเข้าถึงกล้องถ่ายรูป
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}