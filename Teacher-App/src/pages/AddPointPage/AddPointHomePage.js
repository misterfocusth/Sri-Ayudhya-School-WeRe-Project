import React, {  useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory, } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Button,
    TextField,
    Divider
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CropFreeIcon from '@material-ui/icons/CropFree';

// Firebase
import firebaseApp from "../../firebaseConfig";
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";

// Context Provider
import { AuthContext } from "../../context/Auth";

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

export default function AddPointHomePage() {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [studentId, setStudentId] = useState("");

    document.title = "เพิ่มเเต้มสะสม | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    const handleTextFieldChange = (event) => {
        setStudentId((event.target.value).trim());
    }

    const handleFindStudentById = async () => {
        setIsLoading(true);
        const studentArray = []
        const docSnapshot = await getDocs(query(collection(db, "students"), where("student_id", "==", studentId)));
        docSnapshot.forEach((doc) => {
            studentArray.push(doc.data());
        });
        if (docSnapshot.empty) {
            setIsLoading(false);
            alert("หมายเลขประจำตัวนักเรียนนี้ยังไม่ถูกลงทะเบียนเข้าใช้งานในระบบ");
            setStudentId("");
        } else {
            setIsLoading(false);
            console.log(studentArray);
            history.push("/add-point/student/" + studentArray[0].student_id);
        }
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div>
                <Typography variant="h6" className={classes.center} style={{ marginTop: 16, fontWeight: "bold" }}>
                    เพิ่มเเต้มสะสม
                </Typography>
                <Typography variant="subtitle1" className={classes.center} style={{ marginTop: 8 }}>
                    เพิ่มเเต้มสะสมให้กับนักเรียนที่เข้าร่วมการรีไซเคิล
                </Typography>
            </div>

            <div className={classes.center} style={{ marginTop: 24 }}>
                <TextField
                    value={studentId}
                    onChange={(event) => {
                        handleTextFieldChange(event);
                    }}
                    type="number"
                    label="เลขประจำตัวนักเรียน (ตัวอย่าง : 12345)"
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
                    onClick={async () => {
                        await handleFindStudentById();
                    }}>
                    ต่อไป
                </Button>
            </div>

            <Divider variant="middle" style={{ margin: 32 }} />

            <div>
                <CropFreeIcon style={{ fontSize: 75 }} className={classes.center} />
                <Typography variant="subtitle1" className={classes.center} style={{ marginTop: 16 }}>
                    หรือสเเกน QR Code
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    endIcon={<NavigateNextIcon />}
                    style={{ width: "50%", marginTop: 16 }}
                    className={classes.center}
                    onClick={() => {
                        history.push("/add-point/qr-code-scanner")
                    }}>
                    สเเกน QR Code
                </Button>
            </div>
        </div>
    )
}