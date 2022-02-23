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
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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

export default function RewardHistorySearchPage() {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [redeemTXId, setRedeemTXId] = useState("");

    document.title = "ค้นหาประวัติการเเลกของรางวัล | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    const handleTextFieldChange = (event) => {
        setRedeemTXId((event.target.value).trim());
    }

    const handleSearchHistoryByTXId = async () => {
        setIsLoading(true);
        const redeemTXArray = []
        const docSnapshot = await getDocs(query(collection(db, "redeem_transactions"), where("redeem_tx_id", "==", redeemTXId)));
        docSnapshot.forEach((doc) => {
            redeemTXArray.push(doc.data());
        });
        if (docSnapshot.empty) {
            setIsLoading(false);
            alert("ไม่พบหมายเลขลำดับการเเลกของรางวัลนี้ โปรดลองใหม่อีกครั้ง !");
        } else {
            setIsLoading(false);
            history.push("/rewards/history/info/" + redeemTXArray[0].redeem_tx_id);
        }
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div>
                <Typography variant="h6" className={classes.center} style={{ marginTop: 16, fontWeight: "bold" }}>
                    ค้นหาประวัติการเเลกของรางวัล
                </Typography>
                <Typography variant="subtitle1" style={{ margin: 16, textAlign: "center" }}>
                    ค้นหารายละเอียดเกี่ยวกับประวัติการเเลกของรางวัล โดยใช้หมายเลขลำดับการเเลกของรางวัล
                </Typography>
            </div>

            <div className={classes.center} style={{ marginTop: 50 }}>
                <TextField
                    value={redeemTXId}
                    onChange={(event) => {
                        handleTextFieldChange(event);
                    }}
                    type="number"
                    label="หมายเลขลำดับการเเลกของรางวัล (ตัวอย่าง : 00099)"
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
                        await handleSearchHistoryByTXId();
                    }}>
                    ต่อไป
                </Button>
            </div>
        </div>
    )
}