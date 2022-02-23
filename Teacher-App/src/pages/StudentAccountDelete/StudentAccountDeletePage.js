import React, { useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
    Divider,
    Button,
    TextField
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { getFirestore, collection, getDocs, where, query, doc, writeBatch } from "firebase/firestore";

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
    textField: {
        width: '90%',
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

export default function StudentAccountDeletePage() {
    const history = useHistory();
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [showAccountDeleteConfirmDialog, setShowAccountDeleteConfirmDialog] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
    })

    document.title = "ลบบัญชีผู้ใช้ของนักเรียน | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    if (!currentUser) {
        return <Redirect to="/" />
    }

    async function getStudentData() {
        setIsLoading(true);
        let studentArray = [];
        const querySnapshot = await getDocs(query(collection(db, "students"), where("student_id", "==", studentId)));
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                studentArray.push(doc.data());
            });
            setStudentData(studentArray[0]);
        } else {
            alert("หมายเลขประจำตัวนักเรียนนี้ยังไม่ถูกลงทะเบียนเข้าใช้งานในระบบ");
        }
        setIsLoading(false);
    }

    async function handleDeleteStudentAccount() {
        setShowAccountDeleteConfirmDialog(false);
        setIsLoading(true);
        const batch = writeBatch(db);

        const querySnapshot = await getDocs(query(collection(db, "txs"), where("tx_by", "==", studentId)));
        querySnapshot.forEach((queryData) => {
            batch.delete(doc(db, "txs", String(queryData.data().tx_on)));
        });

        batch.delete(doc(db, "students", studentData.student_line_user_id));
        batch.delete(doc(db, "recycle_ranking", studentData.student_id));

        await batch.commit().then(async () => {
            setIsLoading(false);

            let BACKEND_ENDPOINT = ""
            BACKEND_ENDPOINT += ("?studentLINEUserId=" + studentData.student_line_user_id);

            // Push Message to student's line.
            await axios({
                url: BACKEND_ENDPOINT,
                method: "POST"
            }).catch((error) => console.error(error));

            alert("ระบบดำเนินการลบบัญชีผู้ใช้เเละข้อมูลของนักเรียนออกจากระบบเรียบร้อยเเล้ว !");
            setStudentData([]);
            setStudentId("");
            setIsCheckboxChecked({
                checkbox1: false,
                checkbox2: false,
                checkbox3: false,
            });
        }).catch(error => console.error(error));
    }

    const handleDialogClose = () => {
        setShowAccountDeleteConfirmDialog(false)
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={showAccountDeleteConfirmDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{"ยืนยันการลบบัญชีผู้ใช้ของนักเรียน"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        โปรดทราบว่าการลบบัญชีผู้ใช้ไม่สามารถยกเลิก หรือกู้คืนข้อมูลของนักเรียนภายหลังจากการลบได้ โปรดดำเนินการอย่างระมัดระวัง
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        ยกเลิก
                    </Button>
                    <Button onClick={handleDeleteStudentAccount} color="secondary" autoFocus>
                        ดำเนินการต่อ
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
                <Typography variant="h6" className={classes.center} style={{ marginTop: 16, fontWeight: "bold" }}>
                    ลบบัญชีผู้ใช้ของนักเรียน
                </Typography>
                <Typography variant="subtitle1" style={{ margin: 16 }}>
                    การดำเนินการลบบัญชีผู้ใช้ของนักเรียน ในกรณีที่นักเรียนต้องการลบบัญชีเพื่อสมัครสมาชิกด้วยเลขประจำตัวนักเรียนใหม่ หรือในกรณีที่นักเรียนไม่ต้องการใช้งานเว็บเเอปพลิเคชั่นต่อไปเเล้ว
                </Typography>
            </div>

            <div className={classes.center} style={{ marginTop: 24 }}>
                <TextField
                    value={studentId}
                    onChange={(event) => {
                        setStudentId(event.target.value);
                    }}
                    type="number"
                    label="เลขประจำตัวนักเรียน (ตัวอย่าง : 12345)"
                    disabled={studentData.length !== 0 ? true : false}
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                />
            </div>

            <div className={classes.center}>
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    endIcon={<NavigateNextIcon />}
                    style={{ width: "50%", marginTop: 24 }}
                    disabled={studentData.length !== 0 ? true : false}
                    onClick={async () => {
                        if (studentData) {
                            setStudentData([]);
                        }
                        await getStudentData();
                    }}>
                    ต่อไป
                </Button>
            </div>

            <Typography
                variant="subtitle2"
                style={{ marginTop: 16, color: "#2196F3" }}
                className={classes.center}
                onClick={() => {
                    history.goBack();
                }}
            >
                ยกเลิกเเละกลับหน้าหลัก
            </Typography>

            <Divider variant="middle" style={{ margin: 24 }} />

            {studentData.length !== 0 ?
                <div>
                    <div style={{ margin: 16, borderRadius: 15 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <AccountCircleIcon style={{ color: "#2196F3" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                ข้อมูลเกี่ยวกับนักเรียน
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 8 }}>
                                        ชื่อ : {studentData.student_name_title + studentData.student_first_name + " " + studentData.student_last_name}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 8 }}>
                                        ระดับชั้น : มัธยมศึกษาปีที่ {studentData.student_class_grade + 1} ห้อง {studentData.student_class_room + 1}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 8 }}>
                                        เลขประจำตัวนักเรียน : {studentData.student_id}
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
                                            <ErrorIcon style={{ color: "#e57373" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                เกี่ยวกับการลบบัญชีผู้ใช้
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 8 }}>
                                        การดำเนินการลบบัญชีผู้ใช้ของนักเรียน ระบบจะทำการลบข้อมูลของนักเรียนที่บันทึกเเละจัดเก็บอยู่ภายในฐานข้อมูล ดังต่อไปนี้
                                    </Typography>

                                    <div style={{ marginTop: 16 }}>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item style={{ marginTop: 6 }}>
                                                <WarningIcon style={{ color: "#e57373" }} />
                                            </Grid>

                                            <Grid item style={{ width: "85%", marginLeft: 16 }}>
                                                <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                    ข้อมูลส่วนตัวของนักเรียน (ชื่อ-นามสกุล ระดับชั้นเรียน เเละข้อมูลการติดต่อ)
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <div style={{ marginTop: 16 }}>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item style={{ marginTop: 6 }}>
                                                <WarningIcon style={{ color: "#e57373" }} />
                                            </Grid>

                                            <Grid item style={{ width: "85%", marginLeft: 16 }}>
                                                <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                    ข้อมูลการเข้าร่วมกิจกรรมรีไซเคิล (จำนวนครั้งการเข้าร่วม ระดับการเข้าร่วม เเละจำนวนเเต้มสะสม)
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <div style={{ marginTop: 16 }}>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item style={{ marginTop: 6 }}>
                                                <WarningIcon style={{ color: "#e57373" }} />
                                            </Grid>

                                            <Grid item style={{ width: "85%", marginLeft: 16 }}>
                                                <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                    ข้อมูลรายละเอียดเเละประวัติการเเลกของรางวัล (โปรดตรวจสอบว่านักเรียนได้รับของรางวัลที่เเลกไว้เเล้ว ก่อนดำเนินการต่อ)
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <div style={{ marginTop: 16 }}>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item style={{ marginTop: 6 }}>
                                                <WarningIcon style={{ color: "#e57373" }} />
                                            </Grid>

                                            <Grid item style={{ width: "85%", marginLeft: 16 }}>
                                                <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                    ข้อมูลประวัติการใช้เเละได้รับเเต้มสะสมทั้งหมด
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 16 }}>
                                        โปรดทราบว่าการลบบัญชีผู้ใช้ไม่สามารถยกเลิก หรือกู้คืนข้อมูลของนักเรียนภายหลังจากการลบได้ โปรดดำเนินการอย่างระมัดระวัง
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div style={{ margin: 24 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isCheckboxChecked.checkbox1}
                                    onChange={() => {
                                        let prev = isCheckboxChecked.checkbox1;
                                        setIsCheckboxChecked({ ...isCheckboxChecked, checkbox1: !prev });
                                    }}
                                    name="checkbox1"
                                    color="secondary"
                                />
                            }
                            label="ในฐานะครูหรือผู้ดูเเลระบบ ได้เเจ้งให้นักเรียนทราบถึงเกี่ยวกับการลบบัญชีผู้ใช้ เเละข้อมูลนักเรียนที่จะถูกลบเเล้ว"
                        />
                    </div>
                    <div style={{ margin: 24 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isCheckboxChecked.checkbox2}
                                    onChange={() => {
                                        let prev = isCheckboxChecked.checkbox2;
                                        setIsCheckboxChecked({ ...isCheckboxChecked, checkbox2: !prev });
                                    }}
                                    name="checkbox3"
                                    color="secondary"
                                />
                            }
                            label="นักเรียนได้รับทราบข้อมูลเกี่ยวกับการลบบัญชีผู้ใช้ เเละการลบข้อมูลของนักเรียนออกจากระบบเเล้ว"
                        />
                    </div>
                    <div style={{ margin: 24 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isCheckboxChecked.checkbox3}
                                    onChange={() => {
                                        let prev = isCheckboxChecked.checkbox3;
                                        setIsCheckboxChecked({ ...isCheckboxChecked, checkbox3: !prev });
                                    }}
                                    name="checkbox3"
                                    color="secondary"
                                />
                            }
                            label="คุณครู เเละ/หรือ ผู้ดูเเลระบบ เเละนักเรียนได้รับทราบเเล้วว่าการดำเนินการลบบัญชีผู้ใช้ของนักเรียนดังต่อไปนี้ ไม่สามารถดำเนินการย้อนกลับ กู้คืน เเละยกเลิกการกระทำนี้ได้ ภายหลังจากระบบดำเนินการลบข้อมูลนักเรียนเเล้ว"
                        />
                    </div>

                    <div className={classes.center}>
                        <Button
                            variant="contained"
                            color="secondary"
                            component="span"
                            endIcon={<DeleteForeverIcon />}
                            style={{ width: "75%", marginTop: 8 }}
                            onClick={() => {
                                if (isCheckboxChecked.checkbox1 && isCheckboxChecked.checkbox2 && isCheckboxChecked.checkbox3) {
                                    setShowAccountDeleteConfirmDialog(true);
                                } else {
                                    alert("โปรดอ่านรายละเอียดเเละยืนยันก่อนดำเนินการต่อ โปรดลองใหม่อีกครั้ง")
                                }

                            }}>
                            ดำเนินการลบบัญชีผู้ใช้ของนักเรียน
                        </Button>
                    </div>

                    <Typography
                        variant="subtitle2"
                        style={{ marginTop: 16, color: "#2196F3" }}
                        className={classes.center}
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        ยกเลิกเเละกลับหน้าหลัก
                    </Typography>

                </div>
                :
                <div></div>
            }
        </div>
    )
}