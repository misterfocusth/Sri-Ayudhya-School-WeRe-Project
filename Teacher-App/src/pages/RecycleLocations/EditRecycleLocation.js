import React, { useEffect, useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory, useParams } from 'react-router-dom'

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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import Grid from "@material-ui/core/Grid";
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@material-ui/icons/Info';

// Firebase
import firebaseApp from "../../firebaseConfig";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

// Context Provider
import { AuthContext } from "../../context/Auth";

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

export default function EditRecycleLocation() {
    const classes = useStyles();
    const history = useHistory();
    const { recycleLocationId } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [previewImage, setPreviewImage] = useState("");
    const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recycleLocationData, setRecycleLocationData] = useState({
        recycleLocationImage: "",
        recycleLocationName: "",
        recycleLocationDesc: "",
        recycleLocation: ""
    });
    const [isUserEditImage, setIsUserEditImage] = useState(false);

    document.title = "เเก้ไขรายละเอียดจุดรับรีไซเคิล | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    useEffect(() => {
        setIsLoading(true);
        async function getRecycleLocationData() {
            const docSnapshot = await getDoc(doc(db, "recycle_locations", recycleLocationId));
            const docData = docSnapshot.data();
            setRecycleLocationData({
                ...docData,
                recycleLocationImage: docData.recycle_location_image_url,
                recycleLocationName: docData.recycle_location_name,
                recycleLocationDesc: docData.recycle_location_desc,
                recycleLocation: docData.recycle_location,
            });
            setPreviewImage(docData.recycle_location_image_url)
            setIsLoading(false);
        }
        getRecycleLocationData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    const handleTextFieldChange = (event) => {
        setRecycleLocationData({ ...recycleLocationData, [event.target.name]: event.target.value })
    }

    const handleImageChange = (event) => {
        setIsUserEditImage(true);
        setRecycleLocationData({ ...recycleLocationData, recycleLocationImage: event.target.files[0] })
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }

    const handleClearImage = () => {
        setRecycleLocationData({ ...recycleLocationData, recycleLocationImage: "" });
        setPreviewImage("")
    }

    const handleEditRecycleLocationData = async () => {
        setIsLoading(true);

        if (!isUserEditImage) {
            const newRecycleLocationData = {
                id: recycleLocationData.id,
                recycle_location_id: recycleLocationData.recycle_location_id,
                recycle_location_image_url: recycleLocationData.recycleLocationImage,
                recycle_location_name: recycleLocationData.recycleLocationName,
                recycle_location_desc: recycleLocationData.recycleLocationDesc,
                recycle_location: recycleLocationData.recycleLocation
            }
            setDoc(doc(db, "recycle_locations", recycleLocationId), newRecycleLocationData).then(() => {
                setIsLoading(false)
                alert("ระบบบันทึกข้อมูลการเเก้ไขของคุณเเล้ว การเเก้ไขข้อมูลเเละรายละเอียดของจุดรับรีไซเคิลสำเร็จ !")
                history.push("/recycle-location")
            })
            console.log("CON : 1")
        } else {
            console.log("CON : 2");

            new Compressor(recycleLocationData.recycleLocationImage, {
                quality: 0.6,
                success(result) {
                    const metadata = {
                        contentType: result.type
                    }
                    const imageStorageRef = ref(storage, "images/recycle_locations/" + recycleLocationId);
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
                                    id: recycleLocationData.id,
                                    recycle_location_id: recycleLocationData.recycle_location_id,
                                    recycle_location_image_url: downloadURL,
                                    recycle_location_name: recycleLocationData.recycleLocationName,
                                    recycle_location_desc: recycleLocationData.recycleLocationDesc,
                                    recycle_location: recycleLocationData.recycleLocation
                                }
                                setDoc(doc(db, "recycle_locations", recycleLocationId), newRecycleLocationData).then(() => {
                                    setIsLoading(false)
                                    alert("ระบบบันทึกข้อมูลการเเก้ไขของคุณเเล้ว การเเก้ไขข้อมูลเเละรายละเอียดของจุดรับรีไซเคิลสำเร็จ !")
                                    history.push("/recycle-location")
                                })
                            })
                        }
                    );
                }
            })
        }
    }

    const handleDialogClose = () => {
        setOpenDeleteAlertDialog(false)
    }

    const handleRecycleLocationDelete = async () => {
        setOpenDeleteAlertDialog(false);
        setIsLoading(true)
        await deleteDoc(doc(db, "recycle_locations", recycleLocationId));
        deleteObject(ref(storage, "images/recycle_locations/" + recycleLocationId)).then(() => {
            setIsLoading(false)
            alert("ลบจุดรับรีไซเคิลนี้ออกจากระบบสำเร็จ !")
            history.push("/recycle-location")
        }).catch((error) => console.error(error))
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={openDeleteAlertDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{"ยืนยันการลบจุดรับรีไซเคิล"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        คุณต้องการลบจุดรีไซเคิลนี้ออกจากระบบหรือไม่ ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        ยกเลิก
                    </Button>
                    <Button onClick={handleRecycleLocationDelete} color="primary" autoFocus>
                        ยืนยันการลบ
                    </Button>
                </DialogActions>
            </Dialog>

            <div style={{ margin: "16px" }} >
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" style={{ marginLeft: "8px" }}>เเก้ไขรายละเอียดจุดรับรีไซเคิล</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ margin: "8px" }}>
                            เเก้ไขรายละเอียดจุดรับรีไซเคิล โดยหลังจากเเก้ไขรายละเอียดจุดรับรีไซเคิลนี้เเล้ว ข้อมูลที่เเก้ไขจะไปเเสดงผลเเก่นักเรียนทันที
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
                        multiline
                        rows={2}
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
                        startIcon={<SaveIcon />}
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
                                alert("ข้อมูลของสถานที่รับรีไซเคิลไม่ครบถ้วน โปรดตรวจสอบข้อมูลก่อนทำการเเก้ไขข้อมูล !")
                            } else if (regex.test(recycleLocationData.recycleLocationName)) {
                                alert("ชื่อจุดรับรีไซเคิลไม่สามารถประกอบด้วยตัวอักษรพิเศษ โปรดตรวจสอบชื่อจุดรับรีไซเคิลเเละลองใหม่อีกครั้ง");
                            } else {
                                await handleEditRecycleLocationData();
                            }
                        }}>
                        บันทึกการเเก้ไข
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                        startIcon={<DeleteForeverIcon />}
                        style={{
                            margin: "8px"
                        }}
                        onClick={async () => {
                            setOpenDeleteAlertDialog(true)
                        }}>
                        ลบจุดรีไซเคิล
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
                        ยกเลิกการเเก้ไขจุดรับรีไซเคิล
                    </Typography>

                <div style={{ marginBottom: "75px" }}></div>
            </div>
        </div>
    )
}