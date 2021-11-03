import React, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Redirect, useParams } from 'react-router-dom'

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
import InfoIcon from '@material-ui/icons/Info';
import {
    Divider
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Context Provider
import { AuthContext } from '../../context/Auth'
import LocationOn from "@material-ui/icons/LocationOn";

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
    cardRoot: {
        maxWidth: "100%",
        margin: theme.spacing(0.5),
    },
    media: {
        height: 150,
    },
}))

const db = getFirestore(firebaseApp);

export default function RewardHistoryInfoPage() {
    const { redeemTXId } = useParams();
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [rewardHistoryTX, setRewardHistoryTX] = useState([{}]);
    const [redeemOnDate, setRedeemOnDate] = useState(null)

    document.title = "รายละเอียดประวัติการเเลกของรางวัล | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getRewardHistoryTX() {
            const docSnapshot = await getDoc(doc(db, "redeem_transactions", redeemTXId));
            setRewardHistoryTX(docSnapshot.data());
            const date = new Date(docSnapshot.data().redeem_on);
            setRedeemOnDate(date.toLocaleString("th-TH"));
            setIsLoading(false);
        }
        getRewardHistoryTX();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        style={{ marginTop: 16, fontWeight: "bold" }}
                        className={classes.center}
                    >
                        ประวัติการเเลกของรางวัล
                    </Typography>

                    <div style={{ margin: 16 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                        >
                            หมายเลขลำดับการเเลก : <span style={{ fontWeight: "bold", color: "#00a152" }}>{rewardHistoryTX.redeem_tx_id}</span>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                        >
                            วันเเละเวลาที่ทำรายการ : <span style={{ fontWeight: "bold", color: "#00a152" }}>{redeemOnDate}</span>
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="subtitle2"
                        >
                            จำนวนเเต้มสะสมที่ใช้ไป : <span style={{ fontWeight: "bold", color: "#00a152" }}>{(rewardHistoryTX.reward_data.reward_req_point || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> เเต้มสะสม
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                        >
                            สถานะการรับของรางวัล : {rewardHistoryTX.is_student_received ? <span style={{ fontWeight: "bold", color: "#00a152" }}>
                                รับของรางวัลเเล้ว
                            </span>
                                :
                                <span style={{ fontWeight: "bold", color: "#E74C3C" }}>
                                    ยังไม่ได้ไปรับของรางวัล !
                                </span>
                            }
                        </Typography>
                    </div>

                    <div style={{ margin: 16, borderRadius: 15 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <AccountCircleIcon style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                เเลกของรางวัลโดย
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 8 }}>
                                        ชื่อ : {rewardHistoryTX.student_data.student_name_title + rewardHistoryTX.student_data.student_first_name + " " + rewardHistoryTX.student_data.student_last_name}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 8 }}>
                                        ระดับชั้น : มัธยมศึกษาปีที่ {rewardHistoryTX.student_data.student_class_grade + 1} ห้อง {rewardHistoryTX.student_data.student_class_room + 1}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 8 }}>
                                        เลขประจำตัวนักเรียน : {rewardHistoryTX.student_data.student_id}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div style={{ margin: 16, borderRadius: 15 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <LocationOn style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                สถานที่รับของรางวัล
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 8 }}>
                                        {rewardHistoryTX.reward_data.reward_location}
                                    </Typography>
                                    {!rewardHistoryTX.is_student_received ?
                                        <Grid item style={{ marginTop: 8 }}>
                                            <Typography variant="subtitle2" style={{ fontWeight: "bold", color: "#E74C3C" }}>
                                                (ดูเหมือนว่าคุณยังไม่ได้ไปรับของรางวัล อย่าลืมไปรับของรางวัลที่เเลกไว้ตามสถานที่นี้ !)
                                            </Typography>
                                        </Grid>
                                        :
                                        <div></div>
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Typography
                        variant="h6"
                        style={{ marginTop: 16, fontWeight: "bold" }}
                        className={classes.center}
                    >
                        รายละเอียดของรางวัล
                    </Typography>

                    <div
                        style={{ margin: 18, borderRadius: 15 }}
                        className={classes.center}
                        onClick={() => {
                            liff.openWindow({
                                url: rewardHistoryTX.reward_data.reward_image_url,
                                external: true
                            });
                        }}
                    >
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 0, width: "100%", height: "100%" }}>
                                <img
                                    src={rewardHistoryTX.reward_data.reward_image_url}
                                    alt="Recycle Location"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: 'cover'
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        style={{ margin: 24, marginBottom: 18, fontWeight: "bold" }}
                    >
                        {rewardHistoryTX.reward_data.reward_name}
                    </Typography>

                    <div style={{ margin: 16, borderRadius: 15 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <InfoIcon style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                รายละเอียดของรางวัล
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" style={{ marginTop: 8, whiteSpace: "pre-line" }}>
                                        {rewardHistoryTX.reward_data.reward_desc}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Divider variant="middle" style={{ margin: 24 }} />

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
                                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>เกี่ยวกับการเเสดงผลข้อมูล</Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                        style={{ marginTop: 8 }}
                                    >
                                        ข้อมูลที่เเสดงเป็นข้อมูลที่ถูกบันทึก ณ วันที่นักเรียนทำรายการเเลกของรางวัล หากข้อมูลที่ระบบทำการบันทึกไว้มีข้อผิดพลาด  โปรดติดต่อผู้ดูเเลระบบเพื่อทำการเเก้ไขข้อมูล ให้ถูกต้องเเละเป็นปัจจุบัน
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
                :
                <div></div>
            }
        </div>
    )
}