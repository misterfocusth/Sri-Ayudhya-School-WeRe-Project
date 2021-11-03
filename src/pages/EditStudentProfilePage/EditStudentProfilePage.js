import React, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Redirect } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Button,
    InputAdornment,
    TextField,
    CardContent,
    Card,
    Divider
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InfoIcon from '@material-ui/icons/Info';
import Select from '@material-ui/core/Select';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { doc, getDoc, getFirestore, writeBatch, runTransaction } from "firebase/firestore";

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
    },
    formControl: {
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

export default function EditStudentProfilePage() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const nameTitles = ["เด็กชาย", "เด็กหญิง", "นาย", "นางสาว"];
    const [studentData, setStudentData] = useState([{}]);
    const [isCheckboxDisabled, setIsCheckboxDisabled] = useState([false, false, false, false]);
    const [isCheckboxNameTitleChecked, setIsCheckboxNameTitleChecked] = useState([false, false, false, false]);
    const [isStudentCanEditProfile, setIsStudentCanEditProfile] = useState(true);
    const [showConfirmEditProfileDialog, setShowConfirmEditProfileDialog] = useState(false);

    // Firebase
    const db = getFirestore(firebaseApp);

    document.title = "เเก้ไขข้อมูลนักเรียน | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getStudentData() {
            const profile = await liff.getProfile();
            const docSnapshot = await getDoc(doc(db, "students", profile.userId));
            if (docSnapshot.exists()) {
                setStudentData(docSnapshot.data());
                let newIsCheckboxNameTitleChecked = []
                let newDisableRules = [];
                for (let i = 0; i < isCheckboxNameTitleChecked.length; i++) {
                    if (i === docSnapshot.data().student_name_title_id) {
                        newIsCheckboxNameTitleChecked.push(true);
                    } else {
                        newIsCheckboxNameTitleChecked.push(false);
                    }
                }

                for (let i = 0; i < isCheckboxDisabled.length; i++) {
                    if (i !== docSnapshot.data().student_name_title_id) {
                        newDisableRules.push(true)
                    } else {
                        newDisableRules.push(false)
                    }
                }
                setIsCheckboxDisabled(newDisableRules);
                setIsCheckboxNameTitleChecked(newIsCheckboxNameTitleChecked);
                if (docSnapshot.data().student_profile_edit_left === 0) {
                    setIsStudentCanEditProfile(false);
                }
                setIsLoading(false);
            }
        }
        getStudentData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!studentDataContext) {
        return <Redirect to="/" />
    }

    async function handleUpdateStudentProfile() {
        setShowConfirmEditProfileDialog(false);
        setIsLoading(true);
        const profile = await liff.getProfile();
        const batch = writeBatch(db);
        
        const studentDataRef = doc(db, "students", profile.userId);
        batch.update(studentDataRef, {
            ...studentData,
            student_first_name: (studentData.student_first_name).trim(),
            student_last_name: (studentData.student_last_name).trim(),
            student_email: (studentData.student_email).trim(),
            student_phone_number: (studentData.student_phone_number).trim()
        });

        const recycleRankingRef = doc(db, "recycle_ranking", studentData.student_id);
        batch.update(recycleRankingRef, {
            student_classroom_id: "" + (studentData.student_class_grade + 1) + (studentData.student_class_room + 1)
        });

        batch.commit().then(() => {
            try {
                runTransaction(db, async (transaction) => {
                    const profile = await liff.getProfile();
                    const studentDocRef = doc(db, "students", profile.userId)
                    const studentDoc = await transaction.get(studentDocRef);

                    const new_student_profile_edit_left = (studentDoc.data().student_profile_edit_left - 1);
                    transaction.update(studentDocRef, { student_profile_edit_left: new_student_profile_edit_left });
                }).then(() => {
                    alert("เเก้ไขข้อมูลนักเรียนสำเร็จ ! ระบบได้บันทึกการเเก้ไขข้องคุณเเล้ว");
                    setIsLoading(false);
                    window.location.href = "/";
                });
            } catch (e) {
                console.log("Transaction failed: ", e);
            }
        }).catch((error) => console.error(error));
    }

    const handleNameTitleChange = (event) => {
        setStudentData({ ...studentData, student_name_title_id: Number(event.target.name), student_name_title: nameTitles[Number(event.target.name)] });

        const selectedIndex = Number(event.target.name);
        let newDisableRules = [];
        let newIsCheckboxNameTitleChecked = [];

        if (isCheckboxDisabled[0] === false && isCheckboxDisabled[1] === false && isCheckboxDisabled[2] === false && isCheckboxDisabled[3] === false) {
            for (let i = 0; i < isCheckboxDisabled.length; i++) {
                if (i === selectedIndex) {
                    newDisableRules.push(false);
                } else {
                    newDisableRules.push(true);
                }
            }

            for (let i = 0; i < isCheckboxNameTitleChecked.length; i++) {
                if (i === selectedIndex) {
                    newIsCheckboxNameTitleChecked.push(true);
                } else {
                    newIsCheckboxNameTitleChecked.push(false);
                }
            }
        } else {
            newDisableRules = [false, false, false, false];
            newIsCheckboxNameTitleChecked = [false, false, false, false];
        }

        setIsCheckboxDisabled(newDisableRules);
        setIsCheckboxNameTitleChecked(newIsCheckboxNameTitleChecked);
    }

    const handleChange = (event) => {
        setStudentData({ ...studentData, [event.target.name]: event.target.value })
    }

    const handleDialogClose = () => {
        setShowConfirmEditProfileDialog(false)
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={showConfirmEditProfileDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{"ยืนยันการเเก้ไขข้อมูล"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        คุณกำลังจะทำการเเก้ไขข้อมูลส่วนตัว เเละระบบจะทำการใช้จำนวนครั้ง ๆ นี้ ในการเเก้ไขข้อมูลของคุณ โปรดตรวจสอบความถูกต้องของข้อมูล ก่อนดำเนินการต่อ...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        ยกเลิก
                    </Button>
                    <Button onClick={handleUpdateStudentProfile} color="primary">
                        ดำเนินการต่อ
                    </Button>
                </DialogActions>
            </Dialog>

            {!isLoading ?
                <div style={{ marginBottom: 75 }}>
                    <div style={{ margin: 16 }}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <Grid container direction="row" alignItems="center">
                                    <AccountCircleIcon style={{ color: "#00a152", margin: "6px", fontSize: 35 }} />
                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>เเก้ไขข้อมูลนักเรียน</Typography>
                                </Grid>
                            </Grid>
                            <div>
                                <Card style={{ borderRadius: 15 }}>
                                    <CardContent style={{ padding: 16 }}>
                                        <Typography variant="subtitle2">
                                            ในหน้านี้นักเรียนสามารถเเก้ไขข้อมูลส่วนตัวที่ได้ให้ไว้ตอนที่สมัครสมาชิกได้ ไม่ว่าจะเป็นชื่อ-นามสกุล ระดับชั้นเรียน เเละรายละเอียดในการติดต่อกลับ
                                        </Typography>
                                        <Divider variant="middle" style={{ margin: 24 }} />
                                        <Typography variant="subtitle2">
                                            ขณะนี้ระบบยังไม่อนุญาตให้นักเรียนสามารถทำการเเก้ไขเลขประจำตัวนักเรียนเองได้ภายในหน้านี้ หากต้องการเเก้ไขเลขประจำตัวนักเรียน <span style={{ color: "#E74C3C", fontWeight: "bold" }}>
                                                จะต้องทำการลบข้อมูลผู้ใช้เเละสมัครสมาชิกใหม่เท่านั้น (ข้อมูลการเข้าร่วมกิจกรรมรีไซเคิล ไม่ว่าจะเป็นเลเวลการเข้าร่วม เเละจำนวนเเต้มสะสม จะถูกลบออกจากระบบด้วย)
                                            </span> โปรดติดต่อผู้ดูเเลระบบหากต้องการดำเนินการต่อ...
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </div>
                        </Grid>
                    </div>

                    <div style={{ margin: "24px" }}>
                        <Typography variant="body1" style={{ margin: "8px", fontWeight: "bold" }}>
                            คำนำหน้าชื่อ
                        </Typography>
                        <div style={{ margin: "8px" }}>
                            <Grid container direction="row" alignItems="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={isCheckboxDisabled[0]}
                                            onChange={handleNameTitleChange}
                                            checked={isCheckboxNameTitleChecked[0]}
                                            name="0"
                                            color="primary"
                                        />
                                    }
                                    label="เด็กชาย"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={isCheckboxDisabled[1]}
                                            onChange={handleNameTitleChange}
                                            checked={isCheckboxNameTitleChecked[1]}
                                            name="1"
                                            color="primary"
                                        />
                                    }
                                    label="เด็กหญิง"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={isCheckboxDisabled[2]}
                                            onChange={handleNameTitleChange}
                                            checked={isCheckboxNameTitleChecked[2]}
                                            name="2"
                                            color="primary"
                                        />
                                    }
                                    label="นาย"
                                />
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={Boolean(isCheckboxDisabled[3])}
                                            onChange={handleNameTitleChange}
                                            checked={isCheckboxNameTitleChecked[3]}
                                            name="3"
                                            color="primary"
                                        />
                                    }
                                    label="นางสาว"
                                />
                            </Grid>
                        </div>
                    </div>

                    <div style={{ margin: "16px" }}>
                        <Typography variant="body1" style={{ margin: "8px", fontWeight: "bold" }}>
                            ชื่อ-นามสกุลนักเรียน
                        </Typography>
                        <div className={classes.center} style={{ margin: "8px", marginTop: "20px" }}>
                            <TextField
                                value={studentData.student_first_name}
                                disabled={!isStudentCanEditProfile}
                                onChange={(event) => {
                                    handleChange(event)
                                }}
                                name="student_first_name"
                                fullWidth
                                label="ชื่อ"
                                variant="outlined"
                            />
                        </div>
                        <div className={classes.center} style={{ margin: "8px", marginTop: "20px" }}>
                            <TextField
                                value={studentData.student_last_name}
                                disabled={!isStudentCanEditProfile}
                                onChange={(event) => {
                                    handleChange(event)
                                }}
                                name="student_last_name"
                                fullWidth
                                label="นามสกุล"
                                variant="outlined"
                            />
                        </div>
                    </div>

                    <div style={{ margin: "16px" }}>
                        <Typography variant="body1" style={{ margin: "8px", fontWeight: "bold" }}>
                            ข้อมูลเกี่ยวกับนักเรียน
                        </Typography>
                        <div className={classes.center} style={{ margin: "8px", marginTop: "20px" }}>
                            <TextField
                                value={studentData.student_id}
                                disabled
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                                name="student_id"
                                type="number"
                                fullWidth
                                label="เลขประจำตัวนักเรียน"
                                variant="outlined"
                            />
                        </div>

                        <div style={{ margin: "8px", marginTop: "24px" }}>
                            <FormControl
                                variant="outlined"
                                style={{ width: "50%" }}
                            >
                                <InputLabel id="demo-simple-select-outlined-label">ระดับชั้น</InputLabel>
                                <Select
                                    value={studentData.student_class_grade}
                                    disabled={!isStudentCanEditProfile}
                                    onChange={handleChange}
                                    label="ระดับชั้น"
                                    name="student_class_grade"
                                >
                                    <MenuItem value={0}>มัธยมศึกษาปีที่ 1</MenuItem>
                                    <MenuItem value={1}>มัธยมศึกษาปีที่ 2</MenuItem>
                                    <MenuItem value={2}>มัธยมศึกษาปีที่ 3</MenuItem>
                                    <MenuItem value={3}>มัธยมศึกษาปีที่ 4</MenuItem>
                                    <MenuItem value={4}>มัธยมศึกษาปีที่ 5</MenuItem>
                                    <MenuItem value={5}>มัธยมศึกษาปีที่ 6</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                style={{ marginLeft: "16px", width: "30%" }}
                            >
                                <InputLabel id="demo-simple-select-outlined-label">ห้อง</InputLabel>
                                <Select
                                    value={studentData.student_class_room}
                                    disabled={!isStudentCanEditProfile}
                                    onChange={handleChange}
                                    label="ห้อง"
                                    name="student_class_room"
                                >
                                    <MenuItem value={0}>ห้อง 1</MenuItem>
                                    <MenuItem value={1}>ห้อง 2</MenuItem>
                                    <MenuItem value={2}>ห้อง 3</MenuItem>
                                    <MenuItem value={3}>ห้อง 4</MenuItem>
                                    <MenuItem value={4}>ห้อง 5</MenuItem>
                                    <MenuItem value={5}>ห้อง 6</MenuItem>
                                    <MenuItem value={6}>ห้อง 7</MenuItem>
                                    <MenuItem value={7}>ห้อง 8</MenuItem>
                                    <MenuItem value={8}>ห้อง 9</MenuItem>
                                    <MenuItem value={9}>ห้อง 10</MenuItem>
                                    <MenuItem value={10}>ห้อง 11</MenuItem>
                                    <MenuItem value={11}>ห้อง 12</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div style={{ margin: "16px" }}>
                        <Typography variant="body1" style={{ margin: "8px", fontWeight: "bold" }}>
                            ข้อมูลสำหรับการติดต่อ
                        </Typography>
                        <div className={classes.center} style={{ margin: "8px", marginTop: "20px" }}>
                            <TextField
                                value={studentData.student_email}
                                disabled={!isStudentCanEditProfile}
                                onChange={(event) => {
                                    handleChange(event)
                                }}
                                name="student_email"
                                fullWidth
                                label="อีเมล"
                                type="email"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"> <EmailIcon style={{ color: "#00a152" }} /> </InputAdornment>,
                                }}
                            />
                        </div>
                        <div className={classes.center} style={{ margin: "8px", marginTop: "20px" }}>
                            <TextField
                                value={studentData.student_phone_number}
                                disabled={!isStudentCanEditProfile}
                                onChange={(event) => {
                                    handleChange(event)
                                }}
                                name="student_phone_number"
                                fullWidth
                                type="number"
                                label="เบอร์โทรศัพท์"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"> <PhoneIcon style={{ color: "#00a152" }} /> </InputAdornment>,
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ margin: 16, borderRadius: 15 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <InfoIcon style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                เกี่ยวกับการเเก้ไขข้อมูลส่วนตัวนักเรียน
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" style={{ marginTop: 8 }}>
                                        คุณสามารถทำการเเก้ไขข้อมูลส่วนตัวได้อีก <span style={{ fontWeight: "bold", color: "#00a152" }}>{studentData.student_profile_edit_left}</span> ครั้ง
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginTop: 16 }}>
                                        ทั้งนี้ก็เพื่อเป็นการป้องกันการเเก้ไขข้อมูลที่อาจถูกนำไปใช้โดยไม่ถูกต้อง ระบบจึงจำเป็นต้องกำหนดจำนวนครั้งในการเเก้ไขข้อมูลส่วนตัวเอาไว้ โปรดตรวจสอบความถูกต้องของข้อมูลก่อนดำเนินการต่อทุกครั้ง
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.center}
                        disabled={!isStudentCanEditProfile}
                        onClick={async () => {
                            if (
                                studentData.student_first_name &&
                                studentData.student_last_name &&
                                studentData.student_email &&
                                studentData.student_phone_number &&
                                studentData.student_name_title &&
                                studentData.student_name_title_id
                            ) {
                                setShowConfirmEditProfileDialog(true);
                            } else {
                                alert("โปรดตรวจสอบข้อมูลที่คุณทำการเเก้ไขว่าคุณกรอกข้อมูลครบถ้วนทุกช่อง เเล้วลองใหม่อีกครั้ง !")
                            }
                        }}
                        style={{ width: "80%", marginTop: "24px" }}
                    >
                        บันทึกการเเก้ไขข้อมูลส่วนตัว
                    </Button>
                </div>
                :
                <div></div>
            }
        </div>
    )
}