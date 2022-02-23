import React, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

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
    IconButton,
    InputAdornment,
    TextField,
    CardMedia,
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Autocomplete from '@material-ui/lab/Autocomplete';


// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";

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

export default function RewardHistoryPage() {
    const classes = useStyles();
    const history = useHistory();
    const { studentDataContext } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [rewardHistoryTXs, setRewardHistoryTXs] = useState([{}]);
    const [filteredRewardHistoryTXs, setFilteredRewardHistoryTXs] = useState([{}]);
    const [searchData, setSearchData] = useState({
        isUserSearched: false,
        searchKeyword: "",
        searchOptions: [{ redeem_tx_id: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }]
    });

    document.title = "ประวัติการเเลกของรางวัล | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getRewardHistoryTXs() {
            const profile = await liff.getProfile();
            const docArray = []
            const querySnapshot = await getDocs(query(collection(db, "redeem_transactions"), where("redeem_by_student_line_user_id", "==", profile.userId)));
            querySnapshot.forEach((doc) => {
                docArray.push(doc.data())
            });
            let sortedRewardHistoryTXsData = docArray.slice().sort((a, b) => b.id - a.id);
            setRewardHistoryTXs(sortedRewardHistoryTXsData);
            setFilteredRewardHistoryTXs(sortedRewardHistoryTXsData);
            setIsLoading(false);
        }
        getRewardHistoryTXs();
    }, []);

    if (!studentDataContext) {
        return <Redirect to="/" />
    }

    const handleSearchKeywordChange = (value) => {
        if (!value) {
            handleClear();
        } else {
            var x = rewardHistoryTXs.filter((element) => {
                return element.redeem_tx_id.toLowerCase().trim().match((value).toLowerCase())
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
                                let date = new Date(item.redeem_on);
                                date = date.toLocaleDateString("th-TH");
                                return (
                                    <div style={{ margin: 16 }} key={i} onClick={() => history.push("/reward/history/" + item.redeem_tx_id)}>
                                        <Card>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                            >
                                                <Grid item style={{ width: "30%", height: "100%" }}>
                                                    <CardMedia
                                                        image={item.reward_data.reward_image_url}
                                                        title={item.reward_data.reward_name}
                                                        style={{
                                                            height: 135,
                                                            width: "100%",
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                </Grid>
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
                                                                    ทำรายการเมื่อ : <span style={{ fontWeight: "bold", color: "#00a152" }}>{date}</span>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="subtitle2"
                                                                >
                                                                    หมายเลขลำดับการเเลก : <span style={{ fontWeight: "bold", color: "#00a152" }}>{item.redeem_tx_id}</span>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="subtitle2"
                                                                >
                                                                    เเต้มสะสมที่ใช้ไป : <span style={{ fontWeight: "bold", color: "#00a152" }}>{(item.reward_data.reward_req_point || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> เเต้ม
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                >
                                                                    สถานะ : {item.is_student_received ? <span style={{ fontWeight: "bold", color: "#00a152" }}>
                                                                        รับของรางวัลเเล้ว
                                                                    </span>
                                                                    :
                                                                    <span style={{ fontWeight: "bold", color: "#E74C3C" }}>
                                                                        ยังไม่ได้ไปรับของรางวัล !
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