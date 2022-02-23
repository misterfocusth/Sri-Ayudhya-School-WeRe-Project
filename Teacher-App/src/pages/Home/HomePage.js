import React, { useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Button
} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

// Firebase
import firebaseApp from '../../firebaseConfig'
import { getAuth, signOut } from "firebase/auth";

// Context Provider
import { AuthContext } from '../../context/Auth'

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
    }
}))

// Get Firebase Service
const auth = getAuth(firebaseApp);

export default function HomePage() {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    document.title = "หน้าเเรก | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const handleSignOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            alert("ออกจากระบบสำเร็จเเล้ว !")
            setIsLoading(true);
            window.location.pathname = "/";
        }).catch((error) => alert(error.message))
    }
    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div>
                <div>
                    <div style={{ margin: "16px" }} >
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <Typography variant="h6" style={{ margin: "8px" }}>ยินดีต้อนรับคุณครูเเละผู้ดูเเลระบบ</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" style={{ margin: "8px" }}>
                                    กำลังเข้าสู่ระบบในฐานะครูเเละผู้ดูเเลระบบ โปรดเลือกเมนูที่คุณต้องการใช้งาน ไม่ว่าจะเป็นการจัดการของรางวัล
                                    / เพิ่มเเต้มสะสมเเก่นักเรียน หรือเเก้ไขรายละเอียดจุดรีไซเคิล
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Card
                            className={clsx(classes.center)}
                            style={{ width: "90%", display: "flex", borderRadius: 15 }}
                            onClick={() => {
                                history.push("/rewards")
                            }}
                        >
                            <div>
                                <CardContent>
                                    <Typography variant="h6">
                                        จัดการของรางวัล
                                    </Typography>
                                    <Typography variant="body2" style={{ marginTop: "8px" }}>
                                        ไม่ว่าจะเป็นเพิ่มหรือเเก้ไขรายละเอียดของรางวัล หรือดูประวัติเเละรายละเอียดการเเลก
                                        ของรางวัล
                                    </Typography>
                                </CardContent>
                            </div>
                            <div style={{ padding: "0px" }}>
                                <CardContent style={{ margin: "8px", padding: "0px" }}>
                                    <CardGiftcardIcon style={{ fontSize: 80, color: "#2196F3", padding: "16px" }} />
                                </CardContent>
                            </div>
                        </Card>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                        <Card
                            className={clsx(classes.center)}
                            style={{ width: "90%", display: "flex", borderRadius: 15 }}
                            onClick={() => {
                                history.push("/add-point")
                            }}
                        >
                            <div>
                                <CardContent>
                                    <Typography variant="h6">
                                        เพิ่มเเต้มสะสม
                                    </Typography>
                                    <Typography variant="body2" style={{ marginTop: "8px" }}>
                                        เพิ่มเเต้มสะสมตอบเเทนให้เเก่นักเรียนที่นำขยะมาร่วมกิจกรรมการรีไซเคิล
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent style={{ margin: "8px", padding: "0px" }}>
                                    <AddCircleIcon style={{ fontSize: 80, color: "#2196F3", padding: "16px" }} />
                                </CardContent>
                            </div>
                        </Card>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                        <Card
                            className={clsx(classes.center)}
                            style={{ width: "90%", display: "flex", borderRadius: 15 }}
                            onClick={() => {
                                history.push("/recycle-location")
                            }}
                        >
                            <div>
                                <CardContent>
                                    <Typography variant="h6">
                                        จัดการจุดรีไซเคิล
                                    </Typography>
                                    <Typography variant="body2" style={{ marginTop: "8px" }}>
                                        เพิ่ม / เเก้ไขรายละเอียดจุดรีไซเคิล บริเวณรอบๆ โรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent style={{ margin: "8px", padding: "0px" }}>
                                    <LocationOnIcon style={{ fontSize: 80, color: "#2196F3", padding: "16px" }} />
                                </CardContent>
                            </div>
                        </Card>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                        <Card
                            className={clsx(classes.center)}
                            style={{ width: "90%", display: "flex", borderRadius: 15 }}
                            onClick={() => {
                                history.push("/student-account-delete")
                            }}
                        >
                            <div>
                                <CardContent>
                                    <Typography variant="h6">
                                        ลบบัญชีผู้ใช้ของนักเรียน
                                    </Typography>
                                    <Typography variant="body2" style={{ marginTop: "8px" }}>
                                        ดำเนินการลบบัญชีผู้ใช้เเก่นักเรียน ในกรณีที่นักเรียนต้องการเเก้ไขเลขประจำตัวนักเรียน หรือต้องการลบข้อมูลเเละบัญชีผู้ใช้ออกจากระบบ
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent style={{ margin: "8px", padding: "0px" }}>
                                    <DeleteIcon style={{ fontSize: 80, color: "#2196F3", padding: "16px" }} />
                                </CardContent>
                            </div>
                        </Card>
                    </div>

                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ExitToAppIcon />}
                    className={classes.center}
                    style={{ marginTop: "24px", width: "75%" }}
                    onClick={handleSignOut}
                >
                    ออกจากระบบ
                </Button>

                <Typography variant="subtitle2" className={classes.center} style={{ marginTop: "24px", marginBottom: 24, color: "#2196F3", fontWeight: "bold" }} onClick={() => history.push("/about")}>
                    เกี่ยวกับเเอปพลิเคชั่นเเละเเจ้งปัญหาการใช้งาน
                </Typography>
            </div>
        </div>
    )
}