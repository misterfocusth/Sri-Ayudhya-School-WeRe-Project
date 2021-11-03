import React, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Redirect, useHistory, useParams } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InfoIcon from '@material-ui/icons/Info';
// Material-UI Components
import {
    Divider
} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';


// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { doc, getDoc, getFirestore } from "firebase/firestore";

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

export default function RecycleLocationInfoPage() {
    const { recycleLocationId } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const { studentDataContext } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [recycleLocationData, setRecycleLocationData] = useState([{}]);


    document.title = "รายละเอียดจุดรับรีไซเคิล | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getRecycleLocationData() {
            const querySnapshot = await getDoc(doc(db, "recycle_locations", recycleLocationId));
            setRecycleLocationData(querySnapshot.data());
            setIsLoading(false);
        }
        getRecycleLocationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!studentDataContext) {
        return <Redirect to="/" />
    }


    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {!isLoading ?
                <div>
                    <Typography
                        variant="h6"
                        gutterBottom
                        style={{ marginTop: 16, fontWeight: "bold" }}
                        className={classes.center}
                    >
                        รายละเอียดจุดรับรีไซเคิล
                    </Typography>

                    <div
                        style={{ margin: 18, borderRadius: 15 }}
                        className={classes.center}
                        onClick={() => {
                            liff.openWindow({
                                url: recycleLocationData.recycle_location_image_url,
                                external: true
                            });
                        }}
                    >
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 0, width: "100%", height: "100%" }}>
                                <img
                                    src={recycleLocationData.recycle_location_image_url}
                                    alt="Recycle Location"
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: 'cover'
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        style={{ margin: 24, marginBottom: 16, fontWeight: "bold" }}
                    >
                        {recycleLocationData.recycle_location_name}
                    </Typography>

                    <div style={{ margin: 16, borderRadius: 15 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <LocationOnIcon style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                ตำเเหน่ง / บริเวณใกล้เคียง
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" style={{ marginTop: 8, whiteSpace: "pre-line" }}>
                                        {recycleLocationData.recycle_location}
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
                                            <InfoIcon style={{ color: "#00a152" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                            รายละเอียดเพิ่มเติม
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Typography variant="subtitle2" style={{ marginTop: 8, whiteSpace: "pre-line" }}>
                                    {recycleLocationData.recycle_location_desc}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Divider variant="middle" style={{ margin: 24 }} />

                    <div
                        style={{ marginTop: 18 }}
                        className={classes.center}
                        onClick={() => {
                            history.push("/qr-code")
                        }}
                    >
                        <Card style={{ width: "90%", borderRadius: 15 }}>
                            <CardContent style={{ padding: 8 }}>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ margin: 4 }}
                                >
                                    ถึงจุดรับรีไซเคิลเเละพร้อมที่จะรีไซเคิลเเล้ว ?
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ margin: 4, color: "#00a152", fontWeight: "bold" }}
                                >
                                    เเสดงหน้า QR Code ของฉัน
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                : <div></div>
            }
        </div>
    )
}