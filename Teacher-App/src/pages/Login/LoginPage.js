import React, { useState, useContext, useEffect } from "react";

// React Router Dom
import { Redirect } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    IconButton,
    InputAdornment,
    TextField,
    Backdrop,
    CircularProgress,
    Button,
    Typography,
    Card,
    CardContent,
    Grid,
} from "@material-ui/core"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import LockIcon from '@material-ui/icons/Lock';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';

// Firebase
import firebaseApp from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Context Provider
import { AuthContext } from "../../context/Auth"

// Login Images Assets
import PasswordLoginIcon from "../../images/Login_Page/password.png"

// Get Firebase Service
const auth = getAuth(firebaseApp)

// Window Local Storage
const localStorage = window.localStorage;

const useStyles = makeStyles((theme) => ({
    center: {
        margin: "auto",
        display: "flex",
        justifyContent: "center"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '90%',
    },
    textBox: {
        width: "90%"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

export default function LoginPage() {
    const classes = useStyles();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [isRememberChecked, setIsRememberChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    document.title = "เข้าสู่ระบบ | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    useEffect(() => {
        restoreRememberData()
    }, [])

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    const restoreRememberData = () => {
        const storageRememberCheck = localStorage.getItem("storageRememberCheck")
        const storageEmail = localStorage.getItem("storageEmail")
        const storagePassword = localStorage.getItem("storagePassword")

        setLoginData({ email: storageEmail, password: storagePassword });
        setIsRememberChecked(Boolean(storageRememberCheck));
    }

    const handleChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }

    const handleLogin = () => {
        setIsLoading(true)

        if (!loginData.email && !loginData.password) {
            alert("คุณกรอกข้อมูลการเข้าสู่ระบบไม่ครบ โปรดตรวจสอบข้อมูลก่อนเข้าสู่ระบบอีกครั้ง")
            setIsLoading(false)
        } else {
            const loginEmail = (loginData.email).trim();
            const loginPassword = (loginData.password).trim();

            signInWithEmailAndPassword(auth, loginEmail, loginPassword)
                .then(() => {
                    if (isRememberChecked) {
                        localStorage.setItem('storageRememberCheck', isRememberChecked);
                        localStorage.setItem('storageEmail', loginEmail);
                        localStorage.setItem('storagePassword', loginPassword);
                    } else {
                        localStorage.removeItem('storageEmail');
                        localStorage.removeItem('storagePassword');
                        localStorage.removeItem('storageRememberCheck');
                    }
                })
                .catch((error) => {
                    alert(error.code + " - " + error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <img src={PasswordLoginIcon} alt="Password Login Icon" style={{ width: 175, marginTop: 24 }} className={classes.center} />

            <h3 className={classes.center} style={{ marginTop: "24px" }}>เข้าสู่ระบบ สำหรับครูเเละผู้ดูเเลระบบ</h3>

            <p className={clsx(classes.center, classes.textBox)} style={{ margin: 24, marginTop: 16 }}>
                โปรดเข้าสู่ระบบด้วยอีเมลเเละรหัสผ่านสำหรับครูเเละผู้ดูเเลระบบ เพื่อเข้าใช้งานเเอปพลิเคชั่น
            </p>
            <div>
                <div className={classes.center} style={{ marginTop: "28px" }}>
                    <TextField
                        label="Email - อีเมล"
                        name="email"
                        value={loginData.email}
                        onChange={(event) => {
                            handleChange(event)
                        }}
                        className={clsx(classes.textField)}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <IconButton>
                                        <AccountCircleIcon />
                                    </IconButton>
                                </InputAdornment>,
                        }}
                        variant="outlined"
                    >
                    </TextField>
                </div>

                <div className={classes.center}>
                    <TextField
                        label="Password - รหัสผ่าน"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={(event) => {
                            handleChange(event)
                        }}
                        className={clsx(classes.textField)}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <IconButton>
                                        <LockIcon />
                                    </IconButton>
                                </InputAdornment>,
                        }}
                        variant="outlined"
                        style={{ marginTop: "24px" }}
                    >
                    </TextField>
                </div>
                <FormControlLabel
                    style={{
                        marginTop: "18px",
                        marginLeft: "14px",
                    }}
                    control={
                        <Checkbox
                            checked={isRememberChecked}
                            onChange={() => {
                                setIsRememberChecked(!isRememberChecked)
                            }}
                            color="primary"
                        />
                    }
                    label="จดจำข้อมูลการเข้าสู่ระบบ (อีเมลเเละรหัสผ่าน)"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.center}
                    style={{
                        marginTop: "24px",
                        width: "50%"
                    }}
                    endIcon={<NavigateNextIcon />}
                    onClick={handleLogin}
                >
                    เข้าสู่ระบบ
                </Button>

                <Divider variant="middle" style={{ marginTop: "24px" }} />

                <div
                    style={{ marginTop: 24 }}
                    className={classes.center}
                >
                    <Card style={{ width: "90%", borderRadius: 15 }}>
                        <CardContent style={{ padding: 16 }}>
                            <div>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item style={{ marginTop: 5 }}>
                                        <InfoIcon style={{ marginTop: 5, color: "#2196F3" }} />
                                    </Grid>
                                    <Grid item style={{ marginLeft: 8, width: "80%" }}>
                                        <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>เเจ้งปัญหาการใช้งานเเละเข้าสู่ระบบ</Typography>
                                    </Grid>
                                </Grid>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 16 }}
                                >
                                    ผู้พัฒนาโครงการ : นายศิลา ภักดีวงษ์
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 8 }}
                                >
                                    อีเมล : 41635@sriayudhya.ac.th
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 8 }}
                                >
                                    เบอร์โทรศัพท์ : 065-652-6769
                                </Typography>

                                <Divider variant="middle" style={{ margin: 24 }} />

                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 16 }}
                                >
                                    อาจารย์ที่ปรึกษา : อาจารย์ทองจันทร์ เต็มจิตร
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 8 }}
                                >
                                    อีเมล : thongjun.t@sriayudhya.ac.th
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 8 }}
                                >
                                    เบอร์โทรศัพท์ : 082-014-4473
                                </Typography>

                                <Divider variant="middle" style={{ margin: 24 }} />

                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 16 }}
                                >
                                    สถานที่ติดต่อ : โรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ 497 ถนนศรีอยุธยา แขวงถนนพญาไท เขตราชเทวี กรุงเทพมหานคร 10400
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}