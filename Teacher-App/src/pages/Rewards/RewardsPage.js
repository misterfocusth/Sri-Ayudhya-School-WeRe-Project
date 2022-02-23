import React, { useEffect, useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory, Link } from 'react-router-dom'

// Material-UI Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    CircularProgress,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Card,
    CardActions,
    CardActionArea,
    CardMedia,
    CardContent
} from "@material-ui/core";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TimelineIcon from '@material-ui/icons/Timeline';
import Grid from "@material-ui/core/Grid";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import HistoryIcon from '@material-ui/icons/History';

// Firebase
import firebaseApp from "../../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

export default function RewardsPage() {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [rewardsData, setRewardsData] = useState([{}]);
    const [filteredRewardsData, setFilteredRewardsData] = useState([{}]);
    const [searchData, setSearchData] = useState({
        isUserSearched: false,
        searchKeyword: "",
        searchOptions: [{ reward_name: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }]
    });

    document.title = "จัดการของรางวัล | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    useEffect(() => {
        async function getRewards() {
            const querySnapshot = await getDocs(collection(db, "rewards"));
            let data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            console.log(data)
            let sortedListingItemsData = data.slice().sort((a, b) => b.id - a.id);
            setRewardsData(sortedListingItemsData);
            setFilteredRewardsData(sortedListingItemsData);
            setIsLoading(false)
        }
        getRewards()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!currentUser) {
        return <Redirect to="/login" />
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
        <div>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div>
                <div>
                    <div style={{ margin: "16px" }} >
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <Typography variant="h6" style={{ marginLeft: "8px" }}>จัดการของรางวัล</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" style={{ margin: "8px", marginBottom: 0 }}>
                                    จัดการกับรายการของรางวัล ไม่ว่าจะเป็นการเพิ่มของรางวัลใหม่ หรือเเก้ไขรายละเอียดเเละเงื่อนไขการเเลกของรางวัลชั้นนั้นๆ พร้อมกับดูประวัติ
                                    เเละรายละเอียดการเเลกของรางวัล
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>

                    {!isLoading ?
                        <div style={{ marginBottom: "75px" }}>

                            <div
                                style={{ marginTop: 0, marginBottom: 16 }}
                                onClick={() => {
                                    history.push("/reward/history/search")
                                }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item style={{ marginTop: 6, marginRight: 8 }}>
                                        <HistoryIcon style={{ color: "#2196F3" }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="subtitle1"
                                            gutterBottom
                                            style={{ margin: 0, color: "#2196F3", fontWeight: "bold" }}
                                        >
                                            ค้นหาประวัติการเเลกของรางวัล
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className={classes.center}>
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

                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddCircleIcon />}
                                className={classes.center}
                                style={{ marginTop: "16px", width: "75%" }}
                                onClick={() => {
                                    history.push("/rewards/add")
                                }}
                            >
                                เพิ่มของรางวัลชิ้นใหม่
                            </Button>

                            <div className={classes.center} style={{ margin: "16px" }}>
                                <Grid container>
                                    {filteredRewardsData.map((item, i) => {
                                        return (
                                            <Grid item xs={6} key={item.id} >
                                                <Card className={classes.cardRoot} >
                                                    <CardActionArea onClick={() => history.push("/rewards/edit/" + item.reward_id)}>
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
                                                        <CardContent style={{ paddingBottom: "0" }}>
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
                                                                    minHeight: "80px",
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
                                                                <CardGiftcardIcon style={{ fontSize: 20, color: "#2196F3" }} />
                                                                <Typography style={{ marginTop: "10px", marginLeft: "8px" }} variant="subtitle2" gutterBottom>
                                                                    {"ใช้ : " + item.reward_req_point + " เเต้ม"}
                                                                </Typography>
                                                            </div>

                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                flexWrap: 'wrap',
                                                                marginTop: "0"
                                                            }}>
                                                                <TimelineIcon style={{ fontSize: 20, color: "#2196F3" }} />
                                                                <Typography style={{ marginTop: "5px", marginLeft: "8px" }} variant="subtitle2" gutterBottom>
                                                                    {"เลเวลขั้นต่ำ : " + item.reward_req_level}
                                                                </Typography>
                                                            </div>
                                                        </CardContent>
                                                    </CardActionArea>

                                                    <CardActions>
                                                        <Link
                                                            to={'/rewards/edit/' + item.reward_id}
                                                            style={{ textDecoration: 'none' }}><Button size="small" color="primary"
                                                            >
                                                                เเก้ไขข้อมูล
                                                            </Button>
                                                        </Link>

                                                        <Link
                                                            to={"/rewards/history/" + item.reward_uuid}
                                                            style={{ textDecoration: 'none' }}
                                                        >
                                                            <Button size="small" color="primary">
                                                                ประวัติ
                                                            </Button>
                                                        </Link>
                                                    </CardActions>
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
            </div >
        </div >
    )
}