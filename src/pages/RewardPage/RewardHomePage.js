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
import {
    IconButton,
    InputAdornment,
    TextField,
    CardActionArea,
    CardMedia,
} from "@material-ui/core";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import Autocomplete from '@material-ui/lab/Autocomplete';


// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../../firebaseConfig"
import { doc, getDocs, getDoc, getFirestore, collection } from "firebase/firestore";

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

export default function RewardHomePage() {
    const classes = useStyles();
    const history = useHistory();
    const { studentDataContext } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [rewardsData, setRewardsData] = useState([{}]);
    const [filteredRewardsData, setFilteredRewardsData] = useState([{}]);
    const [studentData, setStudentData] = useState([{}])
    const [searchData, setSearchData] = useState({
        isUserSearched: false,
        searchKeyword: "",
        searchOptions: [{ reward_name: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }]
    });


    document.title = "เเลกของรางวัล | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getRewardsData() {
            const querySnapshot = await getDocs(collection(db, "rewards"));
            let data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            let sortedListingItemsData = data.slice().sort((a, b) => b.id - a.id);
            setRewardsData(sortedListingItemsData);
            setFilteredRewardsData(sortedListingItemsData);
            setIsLoading(false);
        }
        async function getStudentData() {
            const profile = await liff.getProfile();
            const docSnap = await getDoc(doc(db, "students", profile.userId));
            setStudentData(docSnap.data());
        }
        getRewardsData();
        getStudentData();
    }, [])

    if (!studentDataContext) {
        return <Redirect to="/" />
    }

    const handleSearchKeywordChange = (value) => {
        if (!value) {
            handleClear();
        } else {
            var x = rewardsData.filter((element) => {
                return element.reward_name.toLowerCase().trim().match((value).toLowerCase().trim())
            });
            setSearchData({ ...searchData, isUserSearched: true, searchKeyword: value, searchOptions: x });
            setFilteredRewardsData(x)
        }
    }

    const handleClear = () => {
        setFilteredRewardsData(rewardsData);
        setSearchData({ ...searchData, isUserSearched: false, searchKeyword: "", searchOptions: [{ reward_name: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }] });
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
                        เเลกของรางวัล
                    </Typography>

                    <div style={{ margin: "16px" }}>
                        <Card style={{ backgroundColor: "#00a152", borderRadius: 15 }}>
                            <CardContent style={{ padding: 8 }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <div>
                                            <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                                style={{ color: "#FFFFFF", marginBottom: 4 }}
                                            >
                                                ชื่อ : {studentData.student_name_title +
                                                    studentData.student_first_name + " " + studentData.student_last_name}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                                style={{ color: "#FFFFFF", marginBottom: 8 }}
                                            >
                                                ระดับชั้น : มัธยมศึกษาปีที่ {(studentData.student_class_grade + 1 || 0)} ห้อง {(studentData.student_class_room + 1 || 0)}
                                            </Typography>
                                            <div style={{ backgroundColor: "#FFFFFF", padding: 0, borderRadius: 10 }}>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item style={{ marginTop: 6, marginRight: 8 }}>
                                                        <TimelineIcon style={{ color: "#00a152" }} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography
                                                            variant="subtitle1"
                                                            gutterBottom
                                                            style={{ margin: 0 }}
                                                        >
                                                            เลเวลการเข้าร่วม ฯ : <span style={{ color: "#00a152", fontWeight: "bold" }}>{studentData.student_level + 1}</span>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <div
                                            style={{
                                                margin: 8,
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: "#FFFFFF",
                                                borderRadius: 10
                                            }}
                                        >
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item style={{ marginTop: 6 }}>
                                                    <CardGiftcardIcon />
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ margin: 0, fontWeight: "bold", color: "#00a152" }}
                                                    >
                                                        {(studentData.student_points || 0).toLocaleString(undefined, {maximumFractionDigits:0})}
                                                    </Typography>
                                                </Grid>
                                                <Grid item style={{ marginBottom: 6 }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{ margin: 0, fontWeight: "bold" }}
                                                    >
                                                        เเต้มสะสม
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>

                    <div
                        onClick={() => {
                            history.push("/reward/history")
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item style={{ marginTop: 6, marginRight: 8 }}>
                                <HistoryIcon style={{ color: "#00a152" }} />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    style={{ margin: 0, color: "#00a152", fontWeight: "bold" }}
                                >
                                   ประวัติการเเลกเปลี่ยนของรางวัล
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.center} style={{ marginTop: 16 }}>
                        <Autocomplete
                            freeSolo
                            options={searchData.searchOptions.map(
                                (option) => option.reward_name
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
                                    placeholder={"ค้นหารายการของรางวัล..."}
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

                    <div className={classes.center} style={{ margin: 16 }}>
                        <Grid container>
                            {filteredRewardsData.map((item, i) => {
                                return (
                                    <Grid 
                                    item xs={6} 
                                    key={item.id}
                                    onClick={() => {
                                        history.push("/reward/info/" + item.reward_id)
                                    }}
                                    >
                                        <Card className={classes.cardRoot}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={item.reward_image_url}
                                                    title={item.reward_name}
                                                    style={{
                                                        borderRadius: "8px",
                                                        objectFit: "contain",
                                                        width: "100%"
                                                    }}
                                                />
                                                <CardContent style={{ padding: 16 }}>
                                                    <Typography
                                                        gutterBottom variant="subtitle2"
                                                        component="h3"
                                                        style={{ height: "50px" }}
                                                    >
                                                        {(item.reward_name).substr(0, 50) + "..."}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                        style={{
                                                            minHeight: "90px",
                                                            marginTop: "16px",
                                                            marginBottom: "16px"
                                                        }}
                                                    >
                                                        {(item.reward_desc).substr(0, 50) + "..."}
                                                    </Typography>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexWrap: 'wrap',
                                                        marginTop: "0"
                                                    }}>
                                                        <CardGiftcardIcon style={{ fontSize: 20, color: "#00a152" }} />
                                                        <Typography style={{ marginTop: "10px", marginLeft: "8px" }} variant="subtitle2" gutterBottom>
                                                            {"ใช้ : " + (item.reward_req_point  || 0).toLocaleString(undefined, {maximumFractionDigits:0}) + " เเต้ม"}
                                                        </Typography>
                                                    </div>

                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexWrap: 'wrap',
                                                        marginTop: "0"
                                                    }}>
                                                        <TimelineIcon style={{ fontSize: 20, color: "#00a152" }} />
                                                        <Typography style={{ marginTop: "5px", marginLeft: "8px" }} variant="subtitle2" gutterBottom>
                                                            {"เลเวลขั้นต่ำ : " + item.reward_req_level}
                                                        </Typography>
                                                    </div>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>

                </div>

                : <div></div>
            }
        </div>
    )
}