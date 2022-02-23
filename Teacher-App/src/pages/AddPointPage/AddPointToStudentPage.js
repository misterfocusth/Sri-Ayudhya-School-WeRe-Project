import React, { useEffect, useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory, useParams } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Button,
    TextField,
    Card,
    CardContent,
    Divider
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

// Firebase
import firebaseApp from "../../firebaseConfig";
import { getFirestore, collection, getDocs, where, query, runTransaction, doc, setDoc } from "firebase/firestore";

// Context Provider
import { AuthContext } from "../../context/Auth";

// Recycle Items Images
import RecycleImage01 from "../../images/Recycle_Items/Recycle_Item_01.png"
import RecycleImage02 from "../../images/Recycle_Items/Recycle_Item_02.png"
import RecycleImage03 from "../../images/Recycle_Items/Recycle-Item_03.png"
import RecycleImage04 from "../../images/Recycle_Items/Recycle_Item_04.png"
import RecycleImage05 from "../../images/Recycle_Items/Recycle_Item_05.jpg"

// Get Firebase Services
const db = getFirestore(firebaseApp);

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

export default function AddPointToStudentPage() {
    const classes = useStyles();
    const history = useHistory();
    const { studentId } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [studentData, setStudentData] = useState([{}]);
    const [pointsValue, setPointsValue] = useState(5);

    document.title = "เพิ่มเเต้มสะสม | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    useEffect(() => {
        async function getStudentData() {
            const studentArray = []
            const docSnapshot = await getDocs(query(collection(db, "students"), where("student_id", "==", studentId)));
            docSnapshot.forEach((doc) => {
                studentArray.push(doc.data());
            });
            setStudentData(studentArray[0]);
            console.log(studentArray);
            setIsLoading(false);
        }
        getStudentData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    const handleAddPointToStudent = async () => {
        setIsLoading(true);

        // Add Points, EXPs, Recycle Times and Student Ranking, to Student.
        try {
            await runTransaction(db, async (transaction) => {
                const studentDocRef = doc(db, "students", studentData.student_line_user_id);
                const studentDoc = await transaction.get(studentDocRef);

                const date = Date.now();
                let dateString = new Date(date);
                dateString = dateString.toLocaleString("th-TH");

                const numberPointsValue = Number(pointsValue);

                const newStudentPoints = studentDoc.data().student_points + numberPointsValue;
                const newStudentEXPs = studentDoc.data().student_points_exp + numberPointsValue;
                const newStudentRecycleTimes = studentDoc.data().student_recycle_times + 1;

                let BACKEND_ENDPOINT = ""
                BACKEND_ENDPOINT += ("?studentLINEUserId=" + studentData.student_line_user_id + "&receivedRecyclePoints=" + (numberPointsValue || 0).toLocaleString("th-TH", { maximumFractionDigits: 0 }) + "&newRemainingPoints=" + (newStudentPoints || 0).toLocaleString("th-TH", { maximumFractionDigits: 0 }) + "&dateString=" + dateString);

                // Push Message to student's line.
                await axios({
                    url: BACKEND_ENDPOINT,
                    method: "POST"
                }).catch((error) => console.error(error));

                // Calculate is Student's EXPs enough to up level.
                const LEVEL_POINTS_EXP_REQ = [51, 151, 301, 501, 801, 1201, 1701, 2301, 3001];
                if (newStudentPoints > (LEVEL_POINTS_EXP_REQ[studentData.student_level] - 1)) {
                    if (studentData.student_level !== 9) {
                        let newStudentLevel;
                        for (let i = 0; i < LEVEL_POINTS_EXP_REQ.length; i++) {
                            if (newStudentPoints > (LEVEL_POINTS_EXP_REQ[i] - 1)) {
                                newStudentLevel = i + 1
                            }
                        }
                        transaction.update(studentDocRef, {
                            student_level: newStudentLevel,
                            student_points: newStudentPoints,
                            student_points_exp: newStudentEXPs,
                            student_recycle_times: newStudentRecycleTimes
                        });
                    }
                } else {
                    transaction.update(studentDocRef, {
                        student_points: newStudentPoints,
                        student_points_exp: newStudentEXPs,
                        student_recycle_times: newStudentRecycleTimes
                    });
                }

                // Add New TX
                const txRef = doc(db, "txs", String(date));
                setDoc(txRef, {
                    tx_on: date,
                    tx_type: "receive_recycle",
                    tx_by: studentData.student_id,
                    tx_points_value: numberPointsValue
                });
            });

            await runTransaction(db, async (transaction) => {
                const studentDocRef = doc(db, "recycle_ranking", studentId)
                const studentDoc = await transaction.get(studentDocRef);
                const newStudentRecycleTimes = studentDoc.data().student_recycle_times + 1;
                transaction.update(studentDocRef, {
                    student_recycle_times: newStudentRecycleTimes
                });
            });
        } catch (e) {
            console.error("Transaction failed: ", e);
        }

        setIsLoading(false);
        alert("เพิ่มเเต้มสะสมให้กับนักเรียนสำเร็จ !");
        history.push("/add-point");
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {!isLoading ?
                <div>
                    <Typography variant="h6" className={classes.center} style={{ marginTop: 16, fontWeight: "bold", marginBottom: 16 }}>
                        เพิ่มเเต้มสะสมให้นักเรียน
                    </Typography>

                    <div style={{ margin: 16, borderRadius: 15, marginTop: 24, marginBottom: 24 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <InfoIcon style={{ color: "#2196F3" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                ข้อมูลเกี่ยวกับนักเรียน
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        ชื่อ : {studentData.student_name_title + studentData.student_first_name + " " + studentData.student_last_name}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        ระดับชั้น : มัธยมศึกษาปีที่ {studentData.student_class_grade + 1} ห้อง {studentData.student_class_room + 1}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        เลขประจำตัวนักเรียน : {studentData.student_id}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Typography variant="h6" className={classes.center} style={{ marginTop: 16, fontWeight: "bold", marginBottom: 16 }}>
                        รายละเอียดเเละจำนวนเเต้มสะสม
                    </Typography>

                    <div>
                        <div style={{ marginTop: 24 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img
                                        src={RecycleImage01}
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
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#2196F3" }}>5</span> เเต้ม
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
                                        src={RecycleImage02}
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
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#2196F3" }}>10</span> เเต้ม
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
                                        src={RecycleImage03}
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
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#2196F3" }}>15</span> เเต้ม
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
                                        src={RecycleImage04}
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
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#2196F3" }}>5</span> เเต้ม
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
                                        src={RecycleImage05}
                                        alt="Preview"
                                        height="75"
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: 16, width: "55%" }}>
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                        ประเภท : กล่องนม UHT
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 4 }}>
                                        จำนวนเเต้ม/ชิ้น : <span style={{ fontWeight: "bold", color: "#2196F3" }}>5</span> เเต้ม
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <Divider variant="middle" style={{ margin: "24px" }} />

                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<RemoveCircleIcon />}
                                    onClick={() => {
                                        if (Number(pointsValue) > 5) {
                                            setPointsValue(Number(pointsValue) - 5)
                                        }
                                    }}
                                >
                                    ลด
                                </Button>
                            </Grid>
                            <Grid item style={{ width: "35%" }}>
                                <TextField
                                    id="outlined-basic"
                                    value={pointsValue}
                                    label="จำนวนเเต้มสะสม"
                                    variant="outlined"
                                    autoComplete="off"
                                    type="number"
                                    onChange={(event) => {
                                        setPointsValue(event.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<AddCircleIcon />}
                                    onClick={() => {
                                        setPointsValue(Number(pointsValue) + 5);
                                    }}
                                >
                                    เพิ่ม
                                </Button>
                            </Grid>
                        </Grid>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<AddCircleIcon />}
                        className={classes.center}
                        style={{ width: "75%", marginTop: 16 }}
                        onClick={async () => {
                            await handleAddPointToStudent();
                        }}>
                        ดำเนินการเพิ่มเเต้มสะสม
                    </Button>

                    <Typography
                        variant="subtitle2"
                        style={{ marginTop: 16, color: "#2196F3" }}
                        className={classes.center}
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        ยกเลิก
                    </Typography>
                </div>
                :
                <div></div>
            }

        </div>
    )
}