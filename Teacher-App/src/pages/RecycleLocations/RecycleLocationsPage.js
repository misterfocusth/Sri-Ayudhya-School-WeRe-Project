import React, { useEffect, useState, useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from "@material-ui/core/Grid";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';

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

export default function RecycleLocationsPage() {
    const classes = useStyles();
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [recycleLocationsData, setRecycleLocationData] = useState([{}]);
    const [filteredRecycleLocationData, setFilteredRecycleLocationData] = useState([{}]);
    const [searchData, setSearchData] = useState({
        isUserSearched: false,
        searchKeyword: "",
        searchOptions: [{ recycle_location_name: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }]
    });

    document.title = "จัดการจุดรับรีไซเคิล | Sri Ayudhya School - We Re(cycle) | สำหรับครูเเละผู้ดูเเลระบบ"

    useEffect(() => {
        async function getRecycleLocations() {
            const querySnapshot = await getDocs(collection(db, "recycle_locations"));
            let data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            console.log(data)
            let sortedRecycleLocationData = data.slice().sort((a, b) => b.id - a.id);
            setRecycleLocationData(sortedRecycleLocationData);
            setFilteredRecycleLocationData(sortedRecycleLocationData);
            setIsLoading(false)
        }
        getRecycleLocations()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    const handleSearchKeywordChange = (value) => {
        if (!value) {
            handleClear();
        } else {
            var x = recycleLocationsData.filter((element) => {
                return element.recycle_location_name.toLowerCase().trim().match((value).toLowerCase().trim())
            });
            setSearchData({ ...searchData, isUserSearched: true, searchKeyword: value, searchOptions: x });
            setFilteredRecycleLocationData(x)
        }
    }

    const handleClear = () => {
        setFilteredRecycleLocationData(recycleLocationsData);
        setSearchData({ ...searchData, isUserSearched: false, searchKeyword: "", searchOptions: [{ recycle_location_name: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }] });
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
                                <Typography variant="h6" style={{ marginLeft: "8px" }}>จัดการจุดรับรีไซเคิล</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" style={{ margin: "8px" }}>
                                    จัดการกับจุดรับรีไซเคิล ไม่ว่าจะเป็นการเเก้ไขรายละเอียดของจุดรับรีไซเคิล เพิ่มจุดรับรีไซเคิลใหม่ หรือลบจุดรีไซเคิลเดิมออกจากระบบ
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid style={{ display: "flex", margin: "8px" }} className={classes.center}>
                            <LocationOnIcon style={{ color: "#2196F3" }} />
                            <Typography variant="subtitle2" style={{ marginLeft: "6px" }}>รอบๆ บริเวณโรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ</Typography>
                        </Grid>
                    </div>

                    {!isLoading ?
                        <div style={{ marginBottom: "75px" }}>

                            <div className={classes.center}>
                                <Autocomplete
                                    freeSolo
                                    options={searchData.searchOptions.map(
                                        (option) => option.recycle_location_name
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
                                            placeholder={"ค้นหาจุดรับรีไซเคิล..."}
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
                                    history.push("/recycle-location/new")
                                }}
                            >
                                เพิ่มจุดรับรีไซเคิลใหม่
                            </Button>

                            <div style={{ margin: "16px" }}>
                                {filteredRecycleLocationData.map((item, i) => {
                                    return (
                                        <Card
                                            className={classes.cardRoot}
                                            key={i}
                                            style={{ marginTop: 18, borderRadius: 15 }}
                                            onClick={() => {
                                                history.push("/recycle-location/edit/" + item.recycle_location_id)
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    image={item.recycle_location_image_url}
                                                    title="Recycle Location Preview Image"
                                                    style={{
                                                        height: 200,
                                                        width: "100%",
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="h2">
                                                        {item.recycle_location_name}
                                                    </Typography>

                                                    <Grid container direction="row" alignItems="center" style={{ marginTop: 6 }}>
                                                        <Grid item>
                                                            <LocationOnIcon style={{ fontSize: 18, marginRight: "6px", color: "#2196F3" }} />
                                                        </Grid>

                                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                สถานที่ : {item.recycle_location}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container direction="row" alignItems="center" style={{ marginTop: 8 }}>
                                                        <Grid item>
                                                            <InfoIcon style={{ fontSize: 18, marginRight: "6px", color: "#2196F3" }} />
                                                        </Grid>

                                                        <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                รายละเอียดเพิ่มเติม : {item.recycle_location_desc}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        history.push("/recycle-location/edit/" + item.recycle_location_id)
                                                    }}
                                                >
                                                    เเก้ไขรายละเอียด
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        : <div></div>
                    }
                </div>
            </div>
        </div >
    )
}