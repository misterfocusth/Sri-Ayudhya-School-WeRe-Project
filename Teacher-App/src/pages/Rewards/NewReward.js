import React, { useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Button,
    InputAdornment,
    TextField,
    Card,
    CardActionArea,
    CardContent
} from "@material-ui/core";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TimelineIcon from '@material-ui/icons/Timeline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from "@material-ui/core/Grid";
import ImageIcon from '@material-ui/icons/Image';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

// Firebase
import firebaseApp from "../../firebaseConfig";
import { getFirestore, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Context Provider
import { AuthContext } from "../../context/Auth";

// UUID
import { v4 as uuidv4 } from 'uuid';

// Compressor.js
import Compressor from "compressorjs";

// Get Firebase Services
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

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
        width: "90%",
        maxWidth: "100%",
        margin: theme.spacing(0.5),
    },
    media: {
        height: 250,
    },
    input: {
        display: 'none',
    },
    margin: {
        margin: theme.spacing(1),
    },
}))

export default function NewReward() {
    const classes = useStyles();
    const history = useHistory()
    const { currentUser } = useContext(AuthContext);
    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rewardData, setRewardData] = useState({
        rewardImage: "",
        rewardName: "",
        rewardDesc: "",
        rewardLocation: "",
        rewardReqPoint: 0,
        rewardReqLevel: 1
    });

    document.title = "เพิ่มของรางวัลใหม่ | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    const getId = async () => {
        const querySnapshot = await getDocs(collection(db, "rewards"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        return data.length + 1;
    }

    const getRewardId = () => {
        return uuidv4();
    }

    const handleTextFieldChange = (event) => {
        setRewardData({ ...rewardData, [event.target.name]: event.target.value })
    }

    const handleImageChange = (event) => {
        setRewardData({ ...rewardData, rewardImage: event.target.files[0] })
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }

    const handleClearImage = () => {
        setRewardData({ ...rewardData, rewardImage: "" });
        setPreviewImage("")
    }

    const handleAddNewReward = async () => {
        setIsLoading(true)
        const newRewardId = getRewardId();
        const newId = await getId();

        new Compressor(rewardData.rewardImage, {
            quality: 0.6,
            success(result) {
                const metadata = {
                    contentType: result.type
                }
                const imageStorageRef = ref(storage, "images/rewards/" + newRewardId);
                const uploadTask = uploadBytesResumable(imageStorageRef, result, metadata);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        console.error(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            const newRewardData = {
                                id: Number(newId),
                                reward_id: newRewardId,
                                reward_image_url: downloadURL,
                                reward_name: rewardData.rewardName,
                                reward_desc: rewardData.rewardDesc,
                                reward_location: rewardData.rewardLocation,
                                reward_req_level: Number(rewardData.rewardReqLevel),
                                reward_req_point: Number(rewardData.rewardReqPoint),
                                reward_uuid: newRewardId
                            }
                            setDoc(doc(db, "rewards", newRewardId), newRewardData).then(() => {
                                setIsLoading(false)
                                alert("เพิ่มของรางวัลชิ้นใหม่เข้ามาในระบบสำเร็จ (ของรางวัลชิ้นนี้ถูกเพิ่มเข้ามาในระบบ เเละพร้อมให้ทำการเเลกเเล้ว)")
                                history.push("/rewards")
                            })
                        })
                    }
                );
            }
        });
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{ margin: "16px" }} >
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" style={{ marginLeft: "8px" }}>เพิ่มของรางวัลชิ้นใหม่</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ margin: "8px" }}>
                            เพิ่มรายการของรางวัลชิ้นใหม่เข้าระบบ โดยหลังจากเพิ่มของรางวัลชิ้นนี้เเล้ว ข้อมูลจะไปเเสดงผลเเละพร้อมให้นักเรียนได้ทำการเเลกทันที
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <div className={classes.center}>
                <Card
                    className={classes.cardRoot}
                    style={{ borderRadius: 15 }}
                >
                    <CardActionArea>
                        <CardContent>
                            {previewImage ?
                                <div>
                                    <img
                                        src={previewImage}
                                        alt={"Preview"}
                                        height={200}
                                        className={classes.center}
                                        onClick={() => {
                                            window.open(previewImage, '_blank').focus();
                                        }}
                                        style={{
                                            borderRadius: "8px",
                                            objectFit: "contain",
                                            width: "100%"
                                        }}
                                    />
                                    <Typography variant="subtitle2" className={classes.center} style={{ marginTop: "8px" }}>
                                        (คลิกที่รูปภาพเพื่อดูภาพประกอบเเบบเต็มๆ)
                                    </Typography>
                                </div>

                                :
                                <h3>โปรดทำการเลือกรูปภาพ...</h3>
                            }
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

            <div
                style={{ marginTop: 16 }}
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
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>เกี่ยวกับการกดเพื่อดูรูปภาพ</Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                style={{ marginTop: 8 }}
                            >
                                โปรดเปิดเเอปพลิเคชั่นบนบราวเซอร์ หากต้องการกดเพื่อดูรูปภาพประกอบเเบบเต็ม หากไม่ต้องการสามารถดำเนินการต่อได้โดยไม่จำเป็นต้องเปิดเเอปพลิเคชั่นใหม่
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className={classes.center} style={{ margin: "16px" }}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={(event) => {
                        if ((event.target.files).length !== 0) {
                            handleImageChange(event);
                        } else {
                            alert("โปรดทำการเลือกรูปภาพ เพื่อใช้เป็นภาพประกอบของ ของรางวัลชิ้นนั้น ๆ")
                        }
                    }}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" startIcon={<ImageIcon />}>
                        เลือกรูปภาพ
                    </Button>
                </label>
                <Button color="secondary" disabled={!previewImage} onClick={handleClearImage} style={{ marginLeft: "8px" }}>ลบรูปภาพ</Button>
            </div>

            <div>
                <div className={classes.center} style={{ marginTop: "6px" }}>
                    <TextField
                        value={rewardData.rewardName}
                        onChange={(event) => {
                            handleTextFieldChange(event)
                        }}
                        name="rewardName"
                        label="ชื่อของรางวัล"
                        multiline
                        rows={3}
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                    />
                </div>

                <div className={classes.center} style={{ marginTop: "6px" }}>
                    <TextField
                        value={rewardData.rewardDesc}
                        onChange={(event) => {
                            handleTextFieldChange(event)
                        }}
                        name="rewardDesc"
                        multiline
                        rows={10}
                        label="คำอธิบาย รายละเอียดของรางวัล"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                    />
                </div>
            </div>

            <div>
                <div className={classes.center} style={{ marginTop: "6px" }}>
                    <TextField
                        value={rewardData.rewardLocation}
                        onChange={(event) => {
                            handleTextFieldChange(event)
                        }}
                        multiline
                        rows={3}
                        name="rewardLocation"
                        label="สถานที่รับเเลกของรางวัล (จุดรับของรางวัล)"
                        className={clsx(classes.margin, classes.textField)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"> <LocationOnIcon style={{ color: "#2196F3" }} /> </InputAdornment>,
                        }}
                        variant="outlined"
                    />
                </div>

                <div className={classes.center} style={{ margin: "8px" }}>
                    <TextField
                        style={{ width: "45%" }}
                        value={rewardData.rewardReqPoint}
                        onChange={(event) => {
                            handleTextFieldChange(event)
                        }}
                        name="rewardReqPoint"
                        type="number"
                        label="จำนวนเเต้มสะสม"
                        className={clsx(classes.margin, classes.textField)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"> <CardGiftcardIcon style={{ color: "#2196F3" }} /> </InputAdornment>,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ width: "45%" }}
                        value={rewardData.rewardReqLevel}
                        onChange={(event) => {
                            handleTextFieldChange(event)
                        }}
                        name="rewardReqLevel"
                        type="number"
                        label="เลเวลขั้นต่ำ"
                        className={clsx(classes.margin, classes.textField)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"> <TimelineIcon style={{ color: "#2196F3" }} /> </InputAdornment>,
                        }}
                        variant="outlined"
                    />
                </div>

                <div className={classes.center}>
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<AddCircleIcon />}
                        style={{ width: "75%" }}
                        onClick={async () => {
                            const isItemDataNotEmpty = () => {
                                const emptyData = [];
                                for (var item in rewardData) {
                                    if (rewardData[item] === "") {
                                        emptyData.push(rewardData[item]);
                                    }
                                }
                                if (emptyData.length !== 0) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }

                            // eslint-disable-next-line no-useless-escape
                            const regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/

                            if (!isItemDataNotEmpty()) {
                                alert("ข้อมูลของรางวัลไม่ครบถ้วน โปรดตรวจสอบข้อมูลของคุณก่อนเพิ่มของรางวัล !")
                            } else if (regex.test(rewardData.rewardName)) {
                                alert("ชื่อของรางวัลไม่สามารถประกอบด้วยตัวอักษรพิเศษ โปรดตรวจสอบชื่อของรางวัลเเละลองใหม่อีกครั้ง");
                            } else {
                                await handleAddNewReward();
                            }
                        }}>
                        เพิ่มของรางวัล
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
                    ยกเลิกการเพิ่มของรางวัล
                </Typography>

                <div style={{ marginBottom: "75px" }}></div>
            </div>
        </div>
    )
}