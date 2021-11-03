import React, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Avatar,
    Divider
} from "@material-ui/core";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import GroupIcon from '@material-ui/icons/Group';
import TimelineIcon from '@material-ui/icons/Timeline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ShareIcon from '@material-ui/icons/Share';

// Context Provider
import { AuthContext } from '../../context/Auth'

// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { doc, getDoc, getDocs, collection, getFirestore, where, query } from "firebase/firestore";

// Images
import Learn5RIcon from "../../images/Home_Icons_Images/earth.png"
import GiftIcon from "../../images/Home_Icons_Images/gift.png"
import QRCodeIcon from "../../images/Home_Icons_Images/qr-code.png"
import RecycleLocationIcon from "../../images/Home_Icons_Images/location.png"
import DonationIcon from "../../images/Home_Icons_Images/volunteer.png"

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

export default function HomePage() {
    let history = useHistory();
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);
    const [studentData, setStudentData] = useState([{}]);
    const [studentImageUrl, setStudentImageUrl] = useState("");
    const [TXsData, setTXsData] = useState([]);
    const [studentRank, setStudentRank] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showRecycleInfoDialog, setShowRecycleInfoDialog] = useState(false);
    const [showRankingInfoDialog, setShowRankingInfoDialog] = useState(false);
    const [showLevelInfoDialog, setShowLevelInfoDialog] = useState(false);
    const db = getFirestore(firebaseApp);

    document.title = "หน้าเเรก | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getStudentData() {
            const profile = await liff.getProfile();
            const docSnapshot = await getDoc(doc(db, "students", profile.userId));
            if (docSnapshot.exists()) {
                setStudentData(docSnapshot.data());
                setStudentImageUrl(profile.pictureUrl);
                // Get - Student TXs
                let txsDocArray = [];
                const txsQuerySnapshot = await getDocs(query(collection(db, "txs"), where("tx_by", "==", docSnapshot.data().student_id)));
                txsQuerySnapshot.forEach((doc) => {
                    txsDocArray.push(doc.data())
                });
                let sortedTXs = txsDocArray.slice().sort((a, b) => b.tx_on - a.tx_on);
                sortedTXs = sortedTXs.slice(0, 4);
                setTXsData(sortedTXs);

                // Get - Student Ranking in Classroom
                let rankingDocArray = [];
                const studentRoomId = "" + (docSnapshot.data().student_class_grade + 1) + (docSnapshot.data().student_class_room + 1);
                const querySnapshot = await getDocs(query(collection(db, "recycle_ranking"), where("student_classroom_id", "==", studentRoomId)));
                querySnapshot.forEach((doc) => {
                    rankingDocArray.push(doc.data())
                });
                rankingDocArray = rankingDocArray.filter((obj, pos, arr) => {
                    return arr
                        .map(mapObj => mapObj.student_recycle_times)
                        .indexOf(obj.student_recycle_times) === pos;
                });
                let sortedRanking = rankingDocArray.slice().sort((a, b) => b.student_recycle_times - a.student_recycle_times);
                let rank = 0;
                for (let i = 0; i < sortedRanking.length; i++) {
                    if (sortedRanking[i].student_recycle_times === docSnapshot.data().student_recycle_times) {
                        rank = i + 1
                    }
                }
                setStudentRank(rank);
            }
            setIsLoading(false);
        }

        getStudentData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    const RankingInfoDialog = () => {
        return (
            <Dialog
                open={showRankingInfoDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{"เกี่ยวกับการจัดอันดับ"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        นี่คืออันดับของคุณเมื่อเทียบกับนักเรียนคนอื่นๆ ภายในระดับชั้นเเละห้องเรียนเดียวกันกับคุณ โดยระบบได้ทำการจัดอันดับจากจำนวนครั้งที่นักเรียนเเต่ละคนได้เข้าร่วมกิจกรรมรีไซเคิล
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        ปิด
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const LevelInfoDialog = () => {
        return (
            <Dialog
                open={showLevelInfoDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{"เกี่ยวกับเลเวลการเข้าร่วมกิจกรรมรีไซเคิล"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        นี่คือเลเวลการเข้าร่วมกิจกรรมรีไซเคิลของคุณ โดยการเข้าร่วมในเเต่ละครั้งนักเรียนจะได้เเต้มสะสมเพื่อที่จะใช้ในการอัพเลเวลขึ้นไปในระดับสูงขึ้น สามารถตรวจสอบจำนวนเเต้มสะสมที่ต้องการเพื่ออัพเกรดเลเวลได้ที่หน้า QR-Code ของฉัน
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        ปิด
                    </Button>
                    <Button
                        onClick={() => {
                            history.push("qr-code")
                        }}
                        color="primary"
                    >
                        QR-Code ของฉัน
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const handleDialogClose = () => {
        setShowLevelInfoDialog(false);
        setShowRankingInfoDialog(false);
        setShowRecycleInfoDialog(false);
    }

    const RecycleTimesInfoDialog = () => {
        return (
            <Dialog
                open={showRecycleInfoDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{"เกี่ยวกับการเข้าร่วมกิจกรรมรีไซเคิล"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        นี่คือจำนวนครั้งการเข้าร่วมกิจกรรมรีไซเคิลของคุณ โดยการเข้าร่วมเเต่ละครั้งระบบจะนับว่าเป็นการเข้าร่วม 1 ครั้ง โดยนักเรียนสามารถเข้าร่วมกิจกรรมรีไซเคิลได้เพื่อสะสมจำนวนครั้ง เเละยังจะได้เลเวลการเข้าร่วมกิจกรรมเเละเเต้มสะสมเป็นสิ่งตอบเเทนในการเข้าร่วมกิจกรรมครั้งนั้นๆ อีกด้วย
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        ปิด
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <RankingInfoDialog />
            <RecycleTimesInfoDialog />
            <LevelInfoDialog />

            {!isLoading ?
                <div>
                    <div style={{ margin: 16, borderRadius: 10 }}>
                        <Card style={{ backgroundColor: "rgba(46, 204, 113, 0.50)", borderRadius: 10 }}>
                            <CardContent style={{ padding: 8, paddingTop: 16, paddingBottom: 16 }}>
                                <div>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Avatar
                                                alt="Image"
                                                src={studentImageUrl}
                                                className={classes.large}
                                            />
                                        </Grid>
                                        <Grid item style={{ marginLeft: 16 }}>
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="flex-start"
                                            >
                                                <Grid item>
                                                    <Typography
                                                        gutterBottom
                                                        variant="subtitle1"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        ชื่อ : {studentData.student_name_title + studentData.student_first_name + " " + studentData.student_last_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        gutterBottom
                                                        variant="subtitle1"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        ระดับชั้น : มัธยมศึกษาปีที่ {studentData.student_class_grade + 1} ห้อง {studentData.student_class_room + 1}
                                                    </Typography>
                                                </Grid>
                                                <Grid item style={{ width: "100%" }}>
                                                    <div
                                                        style={{
                                                            backgroundColor: "#FFFFFF",
                                                            marginTop: 6,
                                                            marginBottom: 6,
                                                            padding: 0,
                                                            borderRadius: 5
                                                        }}
                                                        onClick={() => {
                                                            setShowLevelInfoDialog(true);
                                                        }}
                                                    >
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                        >
                                                            <Grid item style={{ marginTop: 6, marginRight: 8 }}>
                                                                <TimelineIcon style={{ color: "#00a152" }} />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                >
                                                                    เลเวลการเข้าร่วมกิจกรรม : <span style={{ color: "#00a152", fontWeight: "bold" }}>{studentData.student_level + 1}</span>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div style={{ marginTop: 8 }}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-around"
                                        alignItems="center"
                                    >

                                        <Grid item style={{ width: "30%" }}>
                                            <div
                                                style={{
                                                    backgroundColor: "#FFFF",
                                                    borderRadius: 10,
                                                    padding: 12
                                                }}
                                                onClick={() => {
                                                    setShowRecycleInfoDialog(true);
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item>
                                                        <DataUsageIcon />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            variant="subtitle1"
                                                            style={{ color: "#00a152", fontWeight: "bold" }}
                                                        >
                                                            {studentData.student_recycle_times || 0}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            variant="subtitle2"
                                                        >
                                                            จำนวนครั้ง
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>

                                        <Grid item style={{ width: "30%" }}>
                                            <div
                                                style={{
                                                    backgroundColor: "#FFFF",
                                                    borderRadius: 10,
                                                    padding: 12
                                                }}
                                                onClick={() => {
                                                    setShowRankingInfoDialog(true)
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item>
                                                        <GroupIcon />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            variant="subtitle1"
                                                            style={{ color: "#00a152", fontWeight: "bold" }}
                                                        >
                                                            {studentRank}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            variant="subtitle2"
                                                        >
                                                            อันดับ
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>

                                        <Grid item style={{ width: "30%" }}>
                                            <div style={{ backgroundColor: "#FFFF", borderRadius: 10, padding: 12 }}>
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item>
                                                        <CardGiftcardIcon />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            variant="subtitle1"
                                                            style={{ color: "#00a152", fontWeight: "bold" }}
                                                        >
                                                            {(studentData.student_points || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            variant="subtitle2"
                                                        >
                                                            เเต้มสะสม
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>

                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div style={{ margin: 16 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item style={{ width: "49%" }}>
                                <div
                                    onClick={() => {
                                        history.push("/learn")
                                    }}
                                >
                                    <Card style={{ height: "100%", borderRadius: 30 }}>
                                        <CardContent style={{ padding: 16 }}>
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <img
                                                        src={Learn5RIcon}
                                                        alt="Preview"
                                                        width="45"
                                                        height="45"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="subtitle2"
                                                        style={{ fontWeight: "bold", marginTop: 8 }}
                                                        gutterBottom
                                                    >
                                                        เรียนรู้หลักการ 5R
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>

                            <Grid item style={{ width: "49%" }}>
                                <div
                                    onClick={() => {
                                        history.push("/reward")
                                    }}
                                >
                                    <Card style={{ height: "100%", borderRadius: 30 }}>
                                        <CardContent style={{ padding: 16 }}>
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <img
                                                        src={GiftIcon}
                                                        alt="Preview"
                                                        width="40"
                                                        height="40"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="subtitle2"
                                                        style={{ fontWeight: "bold", marginTop: 8 }}
                                                        gutterBottom
                                                    >
                                                        เเลกของรางวัล
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ margin: 16 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item style={{ width: "32%" }}>
                                <Card
                                    onClick={() => {
                                        history.push("/qr-code")
                                    }}
                                    style={{ height: "100%", borderRadius: 20 }}
                                >
                                    <CardContent style={{ padding: 8 }}>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <img
                                                    src={QRCodeIcon}
                                                    alt="Preview"
                                                    width="40"
                                                    height="40"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle2"
                                                    style={{ fontWeight: "bold", marginTop: 8, textAlign: "center" }}
                                                >
                                                    QR Code
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item style={{ width: "32%" }}>
                                <Card
                                    onClick={() => {
                                        history.push("/recycle-location")
                                    }}
                                    style={{ height: "100%", borderRadius: 20 }}
                                >
                                    <CardContent style={{ padding: 8 }}>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <img
                                                    src={RecycleLocationIcon}
                                                    alt="Preview"
                                                    width="40"
                                                    height="40"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle2"
                                                    style={{ fontWeight: "bold", marginTop: 8, textAlign: "center" }}
                                                >
                                                    หาจุดรับรีไซเคิล
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item style={{ width: "32%" }}>
                                <Card
                                    onClick={() => {
                                        history.push("/donation");
                                    }}
                                    style={{ height: "100%", borderRadius: 20 }}
                                >
                                    <CardContent style={{ padding: 8 }}>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <img
                                                    src={DonationIcon}
                                                    alt="Preview"
                                                    width="40"
                                                    height="40"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle2"
                                                    style={{ fontWeight: "bold", marginTop: 8, textAlign: "center" }}
                                                >
                                                    การบริจาค
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ margin: 24, marginBottom: 16 }} onClick={() => { console.log(TXsData) }}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item style={{ marginTop: 6 }}>
                                <CardGiftcardIcon style={{ color: "#00a152" }} />
                            </Grid>

                            <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                    ประวัติการใช้เเละได้รับเเต้มสะสม
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ margin: 16 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                {TXsData.length === 0 ?
                                    <div className={classes.center}>
                                        <Typography variant="subtitle2">
                                            คุณยังไม่มีประวัติการใช้เเละได้รับเเต้มสะสม
                                        </Typography>
                                    </div>
                                    :
                                    <div>
                                        {TXsData.map((item, i) => {
                                            let date = new Date(item.tx_on);
                                            date = date.toLocaleDateString("th-TH");
                                            let txType = ""
                                            let isDeductEvent = false;
                                            let color = ""
                                            if (item.tx_type === "deduct_redeem") {
                                                txType = "เเลกของรางวัล"
                                                isDeductEvent = true;
                                                color = "#E74C3C"
                                            } else if (item.tx_type === "receive_recycle") {
                                                txType = "ได้รับเเต้มสะสม"
                                                color = "#00a152";
                                            }

                                            return (
                                                <div key={i}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                    >
                                                        <Grid item style={{ width: "30%" }}>
                                                            <Typography variant="subtitle2">
                                                                {date}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{ width: "40%" }}>
                                                            <Typography variant="subtitle2">
                                                                {txType}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{ width: "20%" }}>
                                                            <Typography
                                                                variant="subtitle2"
                                                                style={{
                                                                    color: color,
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                {isDeductEvent ? ("- " + (item.tx_points_value).toLocaleString(undefined, { maximumFractionDigits: 0 })) : ("+ " + (item.tx_points_value).toLocaleString(undefined, { maximumFractionDigits: 0 }))}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Divider variant="middle" style={{ margin: 16 }} />

                                                    {i === (TXsData.length - 1) ?
                                                        <div onClick={() => history.push("/txs")}>
                                                            <Typography
                                                                variant="subtitle2"
                                                                className={classes.center}
                                                                style={{ color: "#00a152", fontWeight: "bold" }}
                                                            >
                                                                ดูประวัติการใช้เเต้มสะสมเพิ่มเติม
                                                            </Typography>
                                                        </div>
                                                        : <div></div>}
                                                </div>

                                            )

                                        })}
                                    </div>
                                }

                            </CardContent>
                        </Card>
                    </div>

                    <div style={{ margin: 24, marginBottom: 16 }} onClick={() => { console.log(TXsData) }}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item style={{ marginTop: 6 }}>
                                <ShareIcon style={{ color: "#00a152" }} />
                            </Grid>

                            <Grid item style={{ width: "85%", marginLeft: 14 }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                    เชิญเพื่อน ๆ มาเรียนรู้เเละมีส่วนร่วมกับกิจกรรมรีไซเคิล
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ margin: 16 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    ทุกคนสามารถมีส่วนร่วมในการช่วยกันลดปริมาณขยะ เเละสามารถสะสมเเต้มเพื่อเเลกเปลี่ยนเป็นของรางวัลได้
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    style={{ textAlign: "right", fontWeight: "bold", color: "#00a152", marginTop: 8 }}
                                    onClick={async () => {
                                        if (liff.isApiAvailable('shareTargetPicker')) {
                                            liff.shareTargetPicker([
                                                {
                                                    type: "text",
                                                    text: "สวัสดี มาลองใช้งาน Sri Ayudhya School - We Re(cycle) สำหรับนักเรียนโรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ สิ \n\nเพราะเราลองใช้เเล้วมันดีมาก ๆ เลย เเละภายในเเอป เราสามารถ"
                                                },
                                                {
                                                    type: "text",
                                                    text: "- เรียนรู้เกี่ยวกับหลักการ 5R เเละการจัดการกับขยะที่ถูกวิธี\n-การรีไซเคิลขยะประเภทต่างๆ เเละการเเยกขยะตามประเภทของถังขยะ\n- เรียนรู้เเละทำความรู้จักกับหน่วยงานเเละองค์กรณ์ที่ขับเคลื่อนเเละรณรงค์เกี่ยวกับธรรมชาติเเละสิ่งเเวดล้อม\n- ค้นหาจุดรับรีไซเคิล รอบๆ บริเวณโรงเรียน\n\nเเละยังสามารถเข้าร่วมกิจกรรมการรีไซเคิลนำขยะที่สามารถรีไซเคิลได้ มาเเลกเป็นเเต้มสะสมไว้เเลกของรางวัลไดด้วยน้า"
                                                },
                                                {
                                                    type: "text",
                                                    text: "มาลองใช้ได้ง่าย ๆ โดยการเเอดไลน์นี้ไปได้เลย @702vjzrb หรือ http://line.me/ti/p/~@702vjzrb"
                                                }
                                            ]).then((res) => {
                                                console.log(res)
                                                if (res !== undefined) {
                                                    alert("ส่งข้อความเชิญชวนเพื่อนสำเร็จ !")
                                                } else {
                                                    alert("ยกเลิกการส่งข้อความเเล้ว")
                                                }

                                            })
                                        } else {
                                            alert("ฟีเจอร์นี้ยังไม่พร้อมใช้งานบนอุปกรณ์ของคุณ ! โปรดตรวจสอบว่าคุณได้อัปเดทเวอร์ชั่นของเเอปพลิเคชั่น LINE เป็นเวอร์ชั่นล่าสุดเเล้ว")
                                        }
                                    }}
                                >
                                    ชวนเพื่อนมาใช้เลย !
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                    <Divider variant="middle" style={{ margin: 24 }} />

                    <div style={{ marginTop: 16 }}>
                        <Typography variant="subtitle2" className={classes.center}>
                            เเอปพลิเคชั่นเวอร์ชั่น : 1.0.0
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            className={classes.center}
                            style={{ fontWeight: "bold", color: "#00a152", marginTop: 8 }}
                            onClick={() => {
                                history.push("/about");
                            }}
                        >
                            ช่วยเหลือเเละเกี่ยวกับเเอปพลิเคชั่น
                        </Typography>
                    </div>

                </div>
                :
                <div></div>
            }


        </div >
    )
}