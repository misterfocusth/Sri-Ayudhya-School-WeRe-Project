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
    TextField,
    Card,
    CardActionArea,
    CardContent
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from "@material-ui/core/Grid";
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';

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

export default function NewRecycleLocation() {
    const classes = useStyles();
    const history = useHistory()
    const { currentUser } = useContext(AuthContext);
    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recycleLocationData, setRecycleLocationData] = useState({
        recycleLocationImage: "",
        recycleLocationName: "",
        recycleLocationDesc: "",
        recycleLocation: ""
    });

    document.title = "เพิ่มจุดรับรีไซเคิลใหม่ | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    const getId = async () => {
        const querySnapshot = await getDocs(collection(db, "recycle_locations"));
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        return data.length + 1;
    }

    const getRecycleLocationId = () => {
        return uuidv4();
    }

    const handleTextFieldChange = (event) => {
        setRecycleLocationData({ ...recycleLocationData, [event.target.name]: event.target.value })
    }

    const handleImageChange = (event) => {
        setRecycleLocationData({ ...recycleLocationData, recycleLocationImage: event.target.files[0] })
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }

    const handleClearImage = () => {
        setRecycleLocationData({ ...recycleLocationData, recycleLocationImage: "" });
        setPreviewImage("")
    }

    const handleAddNewRecycleLocation = async () => {
        setIsLoading(true)
        const newRecycleLocationId = await getRecycleLocationId();
        const newId = await getId();

        new Compressor(recycleLocationData.recycleLocationImage, {
            quality: 0.6,
            success(result) {
                const metadata = {
                    contentType: result.type
                }
                const imageStorageRef = ref(storage, "images/recycle_locations/" + newRecycleLocationId);
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
                            const newRecycleLocationData = {
                                id: Number(newId),
                                recycle_location_id: newRecycleLocationId,
                                recycle_location_image_url: downloadURL,
                                recycle_location_name: recycleLocationData.recycleLocationName,
                                recycle_location_desc: recycleLocationData.recycleLocationDesc,
                                recycle_location: recycleLocationData.recycleLocation
                            }
                            setDoc(doc(db, "recycle_locations", newRecycleLocationId), newRecycleLocationData).then(() => {
                                setIsLoading(false)
                                alert("เพิ่มจุดรับรีไซเคิลใหม่เข้าระบบสำเร็จ !")
                                history.push("/recycle-location")
                            })
                        })
                    }
                );
            }
        })
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{ margin: "16px" }} >
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" style={{ marginLeft: "8px" }}>เพิ่มจุดรับรีไซเคิลใหม่</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ margin: "8px" }}>
                            เพิ่มจุดรับรีไซเคิลใหม่เข้าระบบ โดยหลังจากเพิ่มเเล้วข้อมูลของจุดรีไซเคิลจะอัพเดทเเละเเสดงผลเเก่นักเรียนทันที
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
                            alert("โปรดทำการเลือกรูปภาพ เพื่อใช้เป็นภาพประกอบของ ของจุดรับรีไซเคิล")
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
                        value={recycleLocationData.recycleLocationName}
                        onChange={(event) => {
                            handleTextFieldChange(event)
                        }}
                        name="recycleLocationName"
                        label="ชื่อจุดรับรีไซเคิล"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                    />
                </div>

                <div className={classes.center} style={{ marginTop: "6px" }}>
                    <TextField
                        value={recycleLocationData.recycleLocation}
                        onChange={(event) => {
                            handleTextFieldChange(event)
                        }}
                        name="recycleLocation"
                        multiline
                        rows={3}
                        label="ตำเเหน่ง หรือบริเวณใกล้เคียง"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                    />
                </div>
            </div>

            <div>
                <div className={classes.center} style={{ marginTop: "6px" }}>
                    <TextField
                        value={recycleLocationData.recycleLocationDesc}
                        onChange={(event) => {
                            handleTextFieldChange(event)
                        }}
                        multiline
                        rows={5}
                        name="recycleLocationDesc"
                        label="รายละเอียดเพิ่มเติม (หากไม่มีให้ใส่ - โดยห้ามเว้นว่าง)"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                    />
                </div>

                <div className={classes.center}>
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<AddCircleIcon />}
                        style={{
                            margin: "8px"
                        }}
                        onClick={async () => {
                            const isItemDataNotEmpty = () => {
                                const emptyData = [];
                                for (var item in recycleLocationData) {
                                    if (recycleLocationData[item] === "") {
                                        emptyData.push(recycleLocationData[item]);
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
                                alert("ข้อมูลของสถานที่รับรีไซเคิลไม่ครบถ้วน โปรดตรวจสอบข้อมูลเเล้วลองใหม่อีกครั้ง !")
                            } else if (regex.test(recycleLocationData.recycleLocationName)) {
                                alert("ชื่อจุดรับรีไซเคิลไม่สามารถประกอบด้วยตัวอักษรพิเศษ โปรดตรวจสอบชื่อจุดรับรีไซเคิลเเละลองใหม่อีกครั้ง");
                            } else {
                                await handleAddNewRecycleLocation();
                            }
                        }}>
                        เพิ่มจุดรับรีไซเคิลใหม่
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
                        ยกเลิกการเพิ่มจุดรับรีไซเคิล
                    </Typography>

                <div style={{ marginBottom: "75px" }}></div>
            </div>
        </div>
    )
}