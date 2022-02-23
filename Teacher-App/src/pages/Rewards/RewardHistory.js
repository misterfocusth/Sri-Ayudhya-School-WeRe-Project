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
import {
    IconButton,
    InputAdornment,
    TextField,
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HistoryIcon from '@material-ui/icons/History';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";

// Context Provider
import { AuthContext } from "../../context/Auth";

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

export default function RewardHistoryPage() {
    const classes = useStyles();
    const history = useHistory();
    const { rewardUUID } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [rewardHistoryTXs, setRewardHistoryTXs] = useState([{}]);
    const [rewardData, setRewardData] = useState([{}]);
    const [filteredRewardHistoryTXs, setFilteredRewardHistoryTXs] = useState([{}]);
    const [searchData, setSearchData] = useState({
        isUserSearched: false,
        searchKeyword: "",
        searchOptions: [{ redeem_tx_id: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }]
    });

    document.title = "ประวัติการเเลกของรางวัล | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    useEffect(() => {
        async function getRewardHistoryTXs() {
            const redeemHistoryArray = [];
            const rewardArray = [];
            const querySnapshot = await getDocs(query(collection(db, "redeem_transactions"), where("redeem_reward_uuid", "==", rewardUUID)));
            querySnapshot.forEach((doc) => {
                redeemHistoryArray.push(doc.data())
            });

            const rewardQuerySnapshot = await getDocs(query(collection(db, "rewards"), where("reward_uuid", "==", rewardUUID)));
            rewardQuerySnapshot.forEach((doc) => {
                rewardArray.push(doc.data())
            });

            let sortedRewardHistoryTXsData = redeemHistoryArray.slice().sort((a, b) => b.id - a.id);
            setRewardHistoryTXs(sortedRewardHistoryTXsData);
            setFilteredRewardHistoryTXs(sortedRewardHistoryTXsData);
            setRewardData(rewardArray[0]);
            setIsLoading(false);
        }
        getRewardHistoryTXs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!currentUser) {
        return <Redirect to="/" />
    }

    const handleSearchKeywordChange = (value) => {
        if (!value) {
            handleClear();
        } else {
            var x = rewardHistoryTXs.filter((element) => {
                return element.redeem_tx_id.toLowerCase().trim().match((value).toLowerCase().trim())
            });
            setSearchData({ ...searchData, isUserSearched: true, searchKeyword: value, searchOptions: x });
            setFilteredRewardHistoryTXs(x)
        }
    }

    const handleClear = () => {
        setFilteredRewardHistoryTXs(rewardHistoryTXs);
        setSearchData({ ...searchData, isUserSearched: false, searchKeyword: "", searchOptions: [{ redeem_tx_id: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }] });
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
                        onClick={() => {
                        }}
                    >
                        ประวัติการเเลกของรางวัล
                    </Typography>

                    <div style={{ margin: 16, borderRadius: 15, marginTop: 16, marginBottom: 24 }}>
                        <Card style={{ borderRadius: 15 }}>
                            <CardContent style={{ padding: 16 }}>
                                <div>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item style={{ marginTop: 6 }}>
                                            <HistoryIcon style={{ color: "#2196F3" }} />
                                        </Grid>

                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                ประวัติการเเลกของรางวัล
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        ชื่อของรางวัล : {rewardData.reward_name}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div style={{ margin: 18 }}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <InfoIcon />
                            </Grid>
                            <Grid item style={{ width: "85%", marginLeft: 16 }}>
                                <Typography
                                    variant="subtitle2"
                                >
                                    หากต้องการดูรายละเอียดเกี่ยวกับประวัติการเเลกเพิ่มเติม โปรดกดเข้าไปที่รายการเเลกของรางวัลนั้น ๆ
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.center} style={{ marginTop: 16 }}>
                        <Autocomplete
                            freeSolo
                            options={searchData.searchOptions.map(
                                (option) => option.redeem_tx_id
                            )}
                            value={searchData.searchKeyword}
                            onChange={(event, value) => {
                                handleSearchKeywordChange(value)
                            }}
                            style={{
                                width: "90%",
                                margin: "0"
                            }}
                            renderInput={(params) => (
                                <TextField
                                    style={{
                                        margin: "0"
                                    }}
                                    fullWidth
                                    value={searchData.searchKeyword}
                                    placeholder={"ค้นหาโดยใช้หมายเลขลำดับการเเลกของรางวัล..."}
                                    type="number"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={(event) => {
                                        handleSearchKeywordChange(event.target.value)
                                    }}
                                    {...params}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {searchData.isUserSearched ?
                                                    <IconButton
                                                        onClick={() => {
                                                            handleClear();
                                                        }}
                                                        style={{ padding: "0" }}
                                                    >
                                                        <HighlightOffIcon />
                                                    </IconButton>
                                                    : <div></div>
                                                }
                                            </InputAdornment>
                                        ),
                                    }}
                                />)}
                        ></Autocomplete>
                    </div>

                    {filteredRewardHistoryTXs ?
                        <div>
                            {filteredRewardHistoryTXs.map((item, i) => {
                                return (
                                    <div style={{ margin: 16 }} key={i} onClick={() => history.push("/rewards/history/info/" + item.redeem_tx_id)}>
                                        <Card style={{ borderRadius: 15 }}>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <CardContent style={{ padding: 16, width: "100%", height: "100%" }}>
                                                        <Grid
                                                            container
                                                            direction="column"
                                                            justifyContent="center"
                                                            alignItems="flex-start"
                                                        >
                                                            <Grid item>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="subtitle2"
                                                                >
                                                                    หมายเลขลำดับการเเลก : <span style={{ fontWeight: "bold", color: "#2196F3" }}>{item.redeem_tx_id}</span>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="subtitle2"
                                                                >
                                                                    เเลกของรางวัลโดย : <span style={{ fontWeight: "bold", color: "#2196F3" }}>{item.student_data.student_name_title + item.student_data.student_first_name + " " + item.student_data.student_last_name}</span>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="subtitle2"
                                                                >
                                                                    เลขประจำตัวนักเรียน : <span style={{ fontWeight: "bold", color: "#2196F3" }}>{item.student_data.student_id}</span>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                >
                                                                    สถานะ : {item.is_student_received ? <span style={{ fontWeight: "bold", color: "#00a152" }}>
                                                                        นักเรียนได้รับของรางวัลเเล้ว
                                                                    </span>
                                                                        :
                                                                        <span style={{ fontWeight: "bold", color: "#E74C3C" }}>
                                                                            นักเรียนยังไม่ได้มารับของรางวัล !
                                                                        </span>
                                                                    }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        <div></div>
                    }
                </div>
                :
                <div>

                </div>
            }
        </div>
    )
}