import React, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Redirect } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Card,
    CardContent,
    Grid,
    Typography,
    Divider
} from "@material-ui/core";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

// Context Provider
import { AuthContext } from '../../context/Auth'

// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { doc, getDoc, getDocs, collection, getFirestore, where, query } from "firebase/firestore";

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
}))

export default function TXsPage() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);
    const [TXsData, setTXsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const db = getFirestore(firebaseApp);

    document.title = "ประวัติการใช้เเละได้รับเเต้มสะสม | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getStudentTXsData() {
            const profile = await liff.getProfile();
            const docSnapshot = await getDoc(doc(db, "students", profile.userId));
            let txsDocArray = [];
            const txsQuerySnapshot = await getDocs(query(collection(db, "txs"), where("tx_by", "==", docSnapshot.data().student_id)));
            txsQuerySnapshot.forEach((doc) => {
                txsDocArray.push(doc.data())
            });
            let sortedTXs = txsDocArray.slice().sort((a, b) => b.tx_on - a.tx_on);
            setTXsData(sortedTXs);

            setIsLoading(false)
        }

        getStudentTXsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div style={{ margin: 24, marginBottom: 16 }} onClick={() => { console.log(TXsData) }}>
                <Grid container direction="row" alignItems="center">
                    <Grid item style={{ marginTop: 6 }}>
                        <CardGiftcardIcon style={{ color: "#00a152" }} />
                    </Grid>

                    <Grid item style={{ width: "85%", marginLeft: 8 }}>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            ประวัติการใช้เเละได้รับเเต้มสะสม
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <div style={{ margin: 16 }}>
                <Card style={{ borderRadius: 15 }}>
                    <CardContent style={{ padding: 16 }}>
                        {TXsData.map((item, i) => {
                            let date = new Date(item.tx_on);
                            date = date.toLocaleDateString("th-TH");
                            let txType = ""
                            let isDeductEvent = false;
                            let color = ""
                            if (item.tx_type === "deduct_redeem") {
                                txType = "เเลกของรางวัล"
                                isDeductEvent = true;
                                color = "#E74C3C"
                            } else if (item.tx_type === "receive_recycle") {
                                txType = "ได้รับเเต้มสะสม"
                                color = "#00a152";
                            }
                            console.log(i)
                            return (
                                <div key={i}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item style={{ width: "30%" }}>
                                            <Typography variant="subtitle2">
                                                {date}
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{ width: "40%" }}>
                                            <Typography variant="subtitle2">
                                                {txType}
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{ width: "20%" }}>
                                            <Typography
                                                variant="subtitle2"
                                                style={{
                                                    color: color,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {isDeductEvent ? ("- " + (item.tx_points_value).toLocaleString(undefined, { maximumFractionDigits: 0 })) : ("+ " + (item.tx_points_value).toLocaleString(undefined, { maximumFractionDigits: 0 }))}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Divider variant="middle" style={{ margin: 16 }} />
                                </div>

                            )
                        })}

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}