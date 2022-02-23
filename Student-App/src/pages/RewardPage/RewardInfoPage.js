import React, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Redirect, useHistory, useParams } from 'react-router-dom'

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
    Button
} from "@material-ui/core";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TimelineIcon from '@material-ui/icons/Timeline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { doc, getDoc, getFirestore, collection, getDocs, runTransaction, writeBatch } from "firebase/firestore";

// Context Provider
import { AuthContext } from '../../context/Auth'

// Axios
const axios = require("axios").default;

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

export default function RewardInfoPage() {
    const { rewardId } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const { studentDataContext } = useContext(AuthContext);
    const [studentData, setStudentData] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const [rewardData, setRewardData] = useState([{}]);
    const [openRedeemConfirmDialog, setOpenRedeemConfirmDialog] = useState(false);


    document.title = "รายละเอียดของรางวัล | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getRewardData() {
            const querySnapshot = await getDoc(doc(db, "rewards", rewardId));
            setRewardData(querySnapshot.data())
        }
        async function getStudentData() {
            const profile = await liff.getProfile();
            const docSnap = await getDoc(doc(db, "students", profile.userId));
            setStudentData(docSnap.data());
            setIsLoading(false);
        }
        getRewardData();
        getStudentData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!studentDataContext) {
        return <Redirect to="/" />
    }

    async function getNewTXId() {
        const querySnapshot = await getDocs(collection(db, "redeem_transactions"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        })
        let newTXId = ""
        if (data.length >= 0 && data.length <= 9) {
            newTXId += "0000" + (data.length + 1)
        } else if (data.length >= 10 && data.length <= 99) {
            newTXId += "000" + (data.length + 1)
        } else if (data.length >= 100 && data.length <= 999) {
            newTXId += "00" + (data.length + 1)
        } else if (data.length >= 1000 && data.length <= 9999) {
            newTXId += "0" + (data.length + 1)
        } else {
            newTXId += (data.length + 1)
        }
        return newTXId;
    }

    var newStudentRemainingPoints = 0
    const USED_POINTS = rewardData.reward_req_point

    async function handleRedeemReward() {
        setOpenRedeemConfirmDialog(false);
        setIsLoading(true);
        const newTXId = await getNewTXId();

        // Deduct Student Points
        try {
            await runTransaction(db, async (transaction) => {
                const profile = await liff.getProfile();
                const studentDocRef = doc(db, "students", profile.userId)
                const studentDoc = await transaction.get(studentDocRef);

                const newStudentPoints = studentDoc.data().student_points - rewardData.reward_req_point;
                transaction.update(studentDocRef, { student_points: newStudentPoints });
                newStudentRemainingPoints = newStudentPoints;
            });
        } catch (e) {
            console.log("Transaction failed: ", e);
        }

        const date = Date.now();
        const dateString = new Date(date).toLocaleString("th-TH");
        const batch = writeBatch(db);

        // Make new Redeem Transactions
        const redeemTransactionsRef = doc(db, "redeem_transactions", newTXId);
        batch.set(redeemTransactionsRef, {
            id: Number(newTXId),
            redeem_tx_id: newTXId,
            redeem_by: studentData.student_id,
            redeem_by_student_line_user_id: studentData.student_line_user_id,
            redeem_on: date,
            redeem_reward_uuid: rewardData.reward_uuid,
            is_student_received: false,
            student_data: studentData,
            reward_data: rewardData,
        });
        const txRef = doc(db, "txs", String(date));
        batch.set(txRef, {
            tx_on: date,
            tx_type: "deduct_redeem",
            tx_by: studentData.student_id,
            tx_points_value: rewardData.reward_req_point
        });

        await batch.commit().then(() => {
            pushMessageTXSuccess(dateString, USED_POINTS, newStudentRemainingPoints);
            alert("ทำรายการเเลกของรางวัลสำเร็จ ! อย่าลืมไปติดต่อรับของรางวัลที่จุดรับเเล้วของรางวัล");
            setIsLoading(false);
            history.push("/reward/history")
        });
    }

    async function pushMessageTXSuccess(date, usedPoints, remainingPoints) {
        let BACKEND_ENDPOINT = ""
        BACKEND_ENDPOINT += ("?studentLINEUserId=" + studentData.student_line_user_id + "&deductedRedeemPoints=" + (usedPoints || 0).toLocaleString("th-TH", { maximumFractionDigits: 0 }) + "&newRemainingPoints=" + (remainingPoints || 0).toLocaleString("th-TH", { maximumFractionDigits: 0 }) + "&dateString=" + date);

        // Push Message to student's line.
        await axios({
            url: BACKEND_ENDPOINT,
            method: "POST"
        }).catch((error) => console.error(error));
    }

    const handleDialogClose = () => {
        setOpenRedeemConfirmDialog(false)
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={openRedeemConfirmDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{"ยืนยันการเเลกของรางวัล"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        คุณกำลังจะทำรายการเเลกของรางวัล {rewardData.reward_name} ระบบจะทำการตัดเเต้มสะสมของคุณจำนวน {(rewardData.reward_req_point || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })} เเต้ม เพื่อใช้ในการเเลกของรางวัล ยืนยันที่จะทำรายการต่อหรือไม่ ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        ยกเลิก
                    </Button>
                    <Button onClick={handleRedeemReward} color="primary">
                        ยืนยันการเเลก
                    </Button>
                </DialogActions>
            </Dialog>

            {!isLoading ?
                <div>
                    <Typography
                        variant="h6"
                        gutterBottom
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
                                url: rewardData.reward_image_url,
                                external: true
                            });
                        }}
                    >
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 0, width: "100%", height: "100%" }}>
                                <img
                                    src={rewardData.reward_image_url}
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
                        {rewardData.reward_name}
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
                                        {rewardData.reward_desc}
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
                                            <LocationOnIcon style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                สถานที่รับเเลกของรางวัล
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" style={{ marginTop: 8, whiteSpace: "pre-line" }}>
                                        {rewardData.reward_location}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div style={{ margin: 16, borderRadius: 15 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        เงื่อนไขการเเลกของรางวัล
                                    </Typography>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <TimelineIcon style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle2">
                                                จำนวนเลเวลการเข้าร่วม : <span style={{ fontWeight: "bold", color: "#00a152" }}>{rewardData.reward_req_level}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <CardGiftcardIcon style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle2">
                                                จำนวนเเต้มสะสม : <span style={{ fontWeight: "bold", color: "#00a152" }}>{(rewardData.reward_req_point || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>

                                <Divider variant="middle" style={{ marginTop: 16, marginBottom: 16 }} />

                                <div>
                                    <div>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item style={{ marginTop: 6 }}>
                                                {(studentData.student_level + 1) >= rewardData.reward_req_level ?
                                                    <CheckCircleIcon style={{ color: "#00a152" }} />
                                                    :
                                                    <CancelIcon style={{ color: "#E74C3C" }} />
                                                }
                                            </Grid>
                                            <Grid item style={{ width: "80%", marginLeft: 8 }}>
                                                <Typography variant="subtitle2">
                                                    {(studentData.student_level + 1) >= rewardData.reward_req_level ?
                                                        <span style={{ color: "#00a152" }}>{("เลเวลการเข้าร่วมกิจกรรมของคุณ คือ " + (studentData.student_level + 1) + " ผ่านเงื่อนไขการเเลกของรางวัล")}</span>
                                                        :
                                                        <span style={{ color: "#E74C3C" }}>{("เลเวลการเข้าร่วมกิจกรรมของคุณ คือ " + (studentData.student_level + 1) + " ไม่ผ่านเงื่อนไขการเเลกของรางวัล")}</span>
                                                    }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" alignItems="center" style={{ marginTop: 16 }}>
                                            <Grid item style={{ marginTop: 6 }}>
                                                {studentData.student_points >= rewardData.reward_req_point ?
                                                    <CheckCircleIcon style={{ color: "#00a152" }} />
                                                    :
                                                    <CancelIcon style={{ color: "#E74C3C" }} />
                                                }
                                            </Grid>
                                            <Grid item style={{ width: "80%", marginLeft: 8 }}>
                                                <Typography variant="subtitle2">
                                                    {studentData.student_points >= rewardData.reward_req_point ?
                                                        <span style={{ color: "#00a152" }}>{("เเต้มสะสมของคุณ คือ " + (studentData.student_points || 0).toLocaleString(undefined, { maximumFractionDigits: 0 }) + " ผ่านเงื่อนไขการเเลกของรางวัล")}</span>
                                                        :
                                                        <span style={{ color: "#E74C3C" }}>{("เเต้มสะสมของคุณ คือ " + (studentData.student_points || 0).toLocaleString(undefined, { maximumFractionDigits: 0 }) + " ไม่ผ่านเงื่อนไขการเเลกของรางวัล")}</span>
                                                    }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.center}
                        style={{ marginTop: 24, marginBottom: 24, width: "80%" }}
                        disabled={!(studentData.student_points >= rewardData.reward_req_point) || !((studentData.student_level + 1) >= rewardData.reward_req_level)}
                        onClick={() => {
                            setOpenRedeemConfirmDialog(true)
                        }}
                    >
                        ดำเนินการเเลกของรางวัล
                    </Button>

                    {!(studentData.student_points >= rewardData.reward_req_point) || !((studentData.student_level + 1) >= rewardData.reward_req_level)
                        ?
                        <div className={classes.center} style={{ width: "80%", color: "#E74C3C" }}>
                            <Typography variant="subtitle2">
                                ไม่สามารถทำการเเลกของรางวัลชิ้นนี้ได้ เนื่องจาก เลเวลการเข้าร่วมกิจกรรมของคุณ เเละ/หรือ เเต้มสะสมของคุณ ไม่ผ่านเงื่อนไขการเเลกของรางวัล
                            </Typography>
                        </div>
                        :
                        <div className={classes.center} style={{ width: "80%", color: "#00a152" }}>
                            <Typography variant="subtitle2">
                                คุณสามารถเเลกของรางวัลชิ้นนี้ได้ !
                            </Typography>
                        </div>
                    }

                </div>

                : <div></div>
            }
        </div>
    )
}