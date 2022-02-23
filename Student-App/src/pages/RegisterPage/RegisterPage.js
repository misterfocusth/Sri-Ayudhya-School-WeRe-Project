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
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
import { doc, getDoc, getFirestore, writeBatch, getDocs, query, collection, where } from "firebase/firestore";

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

export default function RegisterPage() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const nameTitles = ["เด็กชาย", "เด็กหญิง", "นาย", "นางสาว"];
    const [isCheckboxDisabled, setIsCheckboxDisabled] = useState([false, false, false, false]);
    const [showStudentIdAlertDialog, setShowStudentIdAlertDialog] = useState(false);
    const [isAgreementAccepted, setIsAgreementAccepted] = useState({
        privacyPolicyAgreement: false,
        disclaimerAgreement: false
    });

    const [newStudentData, setNewStudentData] = useState({
        studentNameTitleId: 0,
        studentNameTitle: "",
        studentFirstName: "",
        studentLastName: "",
        studentSAId: "",
        studentClassGrade: 0,
        studentClassRoom: 0,
        studentEmail: "",
        studentPhoneNumber: "",
        isAcceptPrivacyPolicyAgreement: false,
        isAcceptDisclaimerAgreement: false,
    })

    // Firebase
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        document.title = "สมัครสมาชิกใหม่ | Sri Ayudhya School - We Re(cycle)"
        async function getStudentData() {
            const profile = await liff.getProfile();
            const docSnapshot = await getDoc(doc(db, "students", profile.userId));
            if (!docSnapshot.exists()) {
                alert("ดูเหมือนว่าคุณยังไม่เคยเป็นสมาชิก หรือว่าใช้บริการมาก่อน เพื่อให้คุณสามารถใช้งานตัวเเอปพลิเคชั่นได้อย่างเต็มประสิทธิภาพ เราจำเป็นต้องมีการขอข้อมูลส่วนตัวของคุณบางอย่างเพื่อดำเนินการต่อ")
                setIsLoading(false);
            }
        }
        getStudentData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (studentDataContext) {
        return <Redirect to="/" />
    }

    async function handleRegisterNewStudent() {
        const profile = await liff.getProfile();

        const docSnapshot = await getDocs(query(collection(db, "students"), where("student_id", "==", newStudentData.studentSAId)));
        if (docSnapshot.empty) {
            setIsLoading(true);
            const batch = writeBatch(db);

            const studentDataRef = doc(db, "students", profile.userId);
            batch.set(studentDataRef, {
                student_line_user_id: profile.userId,
                student_id: (newStudentData.studentSAId).trim(),
                student_name_title_id: (newStudentData.studentNameTitleId || 0),
                student_name_title: (newStudentData.studentNameTitle || ""),
                student_first_name: (newStudentData.studentFirstName).trim(),
                student_last_name: (newStudentData.studentLastName).trim(),
                student_class_grade: newStudentData.studentClassGrade,
                student_class_room: newStudentData.studentClassRoom,
                student_email: (newStudentData.studentEmail).trim(),
                student_phone_number: (newStudentData.studentPhoneNumber).trim(),
                student_points: 0,
                student_points_exp: 0,
                student_level: 0,
                isAcceptPrivacyPolicyAgreement: newStudentData.isAcceptPrivacyPolicyAgreement,
                isAcceptDisclaimerAgreement: newStudentData.isAcceptDisclaimerAgreement,
                student_profile_edit_left: 3,
                student_recycle_times: 0
            });

            const recycleRankingRef = doc(db, "recycle_ranking", newStudentData.studentSAId);
            batch.set(recycleRankingRef, {
                student_classroom_id: "" + (newStudentData.studentClassGrade + 1) + (newStudentData.studentClassRoom + 1),
                student_recycle_times: 0
            });

            await batch.commit().then(() => {
                alert("สมัครสมาชิกใหม่สำเร็จ !");
                setIsLoading(false);
                window.location.href = "/introduce/0";
            }).catch((error) => console.error(error));
        } else {
            alert("ไม่สามารถใช้เลขประจำตัวนักเรียนรหัสนี้ได้ เนื่องจากหมายเลขนี้ถูกใช้ไปเเล้ว โปรดติดต่อผู้ดูเเลระบบหากคิดว่านี่คือข้อผิดพลาด");
            setIsLoading(false);
        }
    }

    const handleNameTitleChange = (event) => {
        setNewStudentData({ ...newStudentData, studentNameTitleId: Number(event.target.name), studentNameTitle: nameTitles[Number(event.target.name)] });

        if (isCheckboxDisabled[0] === false && isCheckboxDisabled[1] === false && isCheckboxDisabled[2] === false && isCheckboxDisabled[3] === false) {
            let newDisableRules = [...isCheckboxDisabled];
            for (let i = 0; i < newDisableRules.length; i++) {
                console.log(i)
                if (i !== Number(event.target.name)) {
                    newDisableRules[i] = true
                    console.log(i + "false")
                }
            }
            setIsCheckboxDisabled(newDisableRules);
        } else {
            setIsCheckboxDisabled([false, false, false, false])
        }
    }

    const handleChange = (event) => {
        setNewStudentData({ ...newStudentData, [event.target.name]: event.target.value })
    }

    const handleDialogClose = () => {
        setShowStudentIdAlertDialog(false)
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={showStudentIdAlertDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{"โปรดตรวจสอบความถูกต้องของเลขประจำตัว"}</DialogTitle>
                <DialogContent>
                    <DialogContentText> 
                        โปรดกรอกข้อมูลเเละตรวจสอบเลขประจำตัวให้ถูกต้องก่อนดำเนินการสมัครสมาชิก หากมีข้อมูลเลขประจำตัวผิดพลาดภายหลังจากการสมัครสมาชิก การเเก้ไขจะต้องทำโดยการลบข้อมูลบัญชีผู้ใช้เเล้วสมัครใหม่ เท่านั้น !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        รับทราบ !
                    </Button>
                </DialogActions>
            </Dialog>

            <div>
                {!isLoading ?
                    <div>
                        <div>
                            <div style={{ margin: "16px" }} >
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <Grid container direction="row" alignItems="center">
                                            <AccountCircleIcon style={{ color: "#00a152", margin: "6px", fontSize: 35 }} />
                                            <Typography variant="h6">สมัครสมาชิกใหม่</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" style={{ margin: "8px" }}>
                                            ดูเหมือนว่าคุณยังไม่เคยเป็นสมาชิก หรือว่าใช้บริการมาก่อน เพื่อให้คุณสามารถใช้งานตัวเเอปพลิเคชั่นได้อย่างเต็มประสิทธิภาพ
                                            เราจำเป็นต้องมีการขอข้อมูลส่วนตัวของคุณบางอย่างเพื่อดำเนินการต่อ
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>

                            <div style={{ margin: "16px" }}>
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
                                        value={newStudentData.studentFirstName}
                                        onChange={(event) => {
                                            handleChange(event)
                                        }}
                                        name="studentFirstName"
                                        fullWidth
                                        label="ชื่อ"
                                        variant="outlined"
                                    />
                                </div>
                                <div className={classes.center} style={{ margin: "8px", marginTop: "20px" }}>
                                    <TextField
                                        value={newStudentData.studentLastName}
                                        onChange={(event) => {
                                            handleChange(event)
                                        }}
                                        name="studentLastName"
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
                                        value={newStudentData.studentSAId}
                                        onChange={(event) => {
                                            handleChange(event)
                                        }}
                                        onClick={() => {
                                            setShowStudentIdAlertDialog(true);
                                        }}
                                        name="studentSAId"
                                        type="number"
                                        fullWidth
                                        label="เลขประจำตัวนักเรียน (ตัวอย่าง : 12345)"
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
                                            value={newStudentData.studentClassGrade}
                                            onChange={handleChange}
                                            label="ระดับชั้น"
                                            name="studentClassGrade"
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
                                            value={newStudentData.studentClassRoom}
                                            onChange={handleChange}
                                            label="ห้อง"
                                            name="studentClassRoom"
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
                                        value={newStudentData.studentEmail}
                                        onChange={(event) => {
                                            handleChange(event)
                                        }}
                                        name="studentEmail"
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
                                        value={newStudentData.studentPhoneNumber}
                                        onChange={(event) => {
                                            handleChange(event)
                                        }}
                                        name="studentPhoneNumber"
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

                            <div style={{ margin: "16px" }}>
                                <Typography variant="body1" style={{ margin: "8px", fontWeight: "bold" }}>
                                    การยินยอมเเละข้อตกลงในการใช้บริการ
                                </Typography>
                                <Typography variant="body1" style={{ margin: "16px" }}>
                                    (นักเรียนสามารถคลิกเข้าไปในเเต่ละหัวข้อเพื่ออ่านรายละเอียดของหัวข้อนั้นๆ เเบบเต็มๆ ได้ หากมีการติ๊กถูกหน้าหัวข้อนั้นๆ ระบบจะถือว่าท่านได้อ่านเเละยอมรับหัวข้อนั้นๆ เเล้ว)
                                </Typography>
                                <div style={{ margin: "16px" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isAgreementAccepted.privacyPolicyAgreement}
                                                onChange={() => {
                                                    let prev = isAgreementAccepted.privacyPolicyAgreement;
                                                    setIsAgreementAccepted({ ...isAgreementAccepted, privacyPolicyAgreement: !prev })
                                                    setNewStudentData({ ...newStudentData, isAcceptPrivacyPolicyAgreement: !prev })
                                                }}
                                                name="privacyPolicyAgreement"
                                                color="primary"
                                            />
                                        }
                                        label="ฉันได้อ่านเเละยินยอมให้ตัวเเอปพลิเคชั่นจัดเก็บข้อมูลตามนโยบายการคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy)"
                                    />
                                    <Typography variant="subtitle2" style={{ margin: "14px", marginLeft: "30px", fontWeight: "bold", color: "#00a152" }} onClick={() => {
                                        liff.openWindow({
                                            url: 'https://drive.google.com/file/d/1w8sHY4BnpXab7kXBdEv1jlBF3i3NdP3L/view',
                                            external: true
                                        });
                                    }}>
                                        อ่านนโยบายคุ้มครองข้อมูลส่วนบุคคล...
                                    </Typography>
                                </div>

                                <div style={{ margin: "16px" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isAgreementAccepted.disclaimerAgreement}
                                                onChange={() => {
                                                    let prev = isAgreementAccepted.disclaimerAgreement;
                                                    setIsAgreementAccepted({ ...isAgreementAccepted, disclaimerAgreement: !prev })
                                                    setNewStudentData({ ...newStudentData, isAcceptDisclaimerAgreement: !prev })
                                                }}
                                                name="privacyPolicyAgreement"
                                                color="primary"
                                            />
                                        }
                                        label="ฉันได้อ่านเเละยอมรับข้อตกลงเเละข้อจำกัดความรับผิดชอบในการใช้ซอฟต์เเวร์"
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        style={{ margin: "14px", marginLeft: "30px", fontWeight: "bold", color: "#00a152" }}
                                        onClick={() => {
                                            liff.openWindow({
                                                url: 'https://drive.google.com/file/d/18Bad9Uu9vPAAODtqoJGhXqku1-kxJLra/view',
                                                external: true
                                            });
                                        }}
                                    >
                                        อ่านข้อตกลงเเละข้อจำกัด...
                                    </Typography>
                                </div>
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.center}
                                onClick={async () => {
                                    if (isAgreementAccepted.disclaimerAgreement && isAgreementAccepted.privacyPolicyAgreement) {
                                        const emptyData = [];
                                        for (var data in newStudentData) {
                                            if (!newStudentData[data]) {
                                                if (newStudentData[data] !== 0) {
                                                    emptyData.push(newStudentData[data]);
                                                }
                                            }
                                        }
                                        if (emptyData.length > 0) {
                                            alert("ข้อมูลที่คุณกรอกไม่ถูกต้อง โปรดตรวจสอบข้อมูลที่คุณกรอกเข้ามา เเล้วลองดำเนินการใหม่อีกครั้ง !")
                                        } else {
                                            await handleRegisterNewStudent();
                                        }
                                    } else {
                                        alert("โปรดอ่านรายละเอียดเเละยอมรับข้อตกลงในการใช้งานเเอปพลิเคชั่น");
                                    }
                                }}
                                style={{ width: "80%", marginTop: "16px" }}
                            >
                                ดำเนินการต่อเเละสมัครสมาชิก
                            </Button>
                        </div>
                    </div>
                    : <div></div>
                }
            </div>

            <div style={{ marginBottom: "75px" }}></div>
        </div>
    )
}