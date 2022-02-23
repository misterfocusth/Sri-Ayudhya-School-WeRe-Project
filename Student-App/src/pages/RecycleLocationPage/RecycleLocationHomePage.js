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
    Button,
    IconButton,
    InputAdornment,
    TextField,
    CardActions,
    CardActionArea,
    CardMedia,
} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';



// Firebase
import firebaseApp from "../../firebaseConfig"
import { getDocs, getFirestore, collection } from "firebase/firestore";

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

export default function RecycleLocationHomePage() {
    const classes = useStyles();
    const history = useHistory();
    const { studentDataContext } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [recycleLocationsData, setRecycleLocationData] = useState([{}]);
    const [filteredRecycleLocationData, setFilteredRecycleLocationData] = useState([{}]);
    const [searchData, setSearchData] = useState({
        isUserSearched: false,
        searchKeyword: "",
        searchOptions: [{ recycle_location_name: "โปรดพิมพ์คำค้นหาเพื่อดูผลลัพธ์..." }]
    });


    document.title = "ค้นหาจุดรับรีไซเคิล | Sri Ayudhya School - We Re(cycle)"

    useEffect(() => {
        async function getRecycleLocationData() {
            const querySnapshot = await getDocs(collection(db, "recycle_locations"));
            let data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            console.log(data)
            let sortedRecycleLocationData = data.slice().sort((a, b) => b.id - a.id);
            setRecycleLocationData(sortedRecycleLocationData);
            setFilteredRecycleLocationData(sortedRecycleLocationData);
            setIsLoading(false);
        }
        getRecycleLocationData();
    }, [])

    if (!studentDataContext) {
        return <Redirect to="/" />
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
                        ค้นหาจุดรับรีไซเคิล
                    </Typography>

                    <div style={{ marginTop: 16 }}>
                        <Grid style={{ display: "flex", margin: "8px" }} className={classes.center}>
                            <LocationOnIcon style={{ color: "#00a152" }} />
                            <Typography variant="subtitle2" style={{ marginLeft: "6px" }}>รอบๆ บริเวณโรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ</Typography>
                        </Grid>
                    </div>

                    <div className={classes.center} style={{ marginTop: 16 }}>
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

                    <div style={{ margin: "16px" }}>
                        {filteredRecycleLocationData.map((item, i) => {
                            return (
                                <Card
                                    className={classes.cardRoot}
                                    key={i}
                                    style={{ marginTop: 18, borderRadius: 15 }}
                                    onClick={() => {
                                        history.push("/recycle-location/info/" + item.recycle_location_id)
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

                                            <Grid container direction="row" alignItems="center">
                                                <Grid item>
                                                    <LocationOnIcon style={{ fontSize: 18, marginRight: "6px", color: "#00a152" }} />
                                                </Grid>

                                                <Grid item style={{ width: "85%", marginLeft: 8 }}>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        สถานที่ : {item.recycle_location}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container direction="row" alignItems="center" style={{ marginTop: 8 }}>
                                                <Grid item>
                                                    <InfoIcon style={{ fontSize: 18, marginRight: "6px", color: "#00a152" }} />
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
                                            style={{ color: "#00a152" }}
                                            onClick={() => {
                                                history.push("/recycle-location/info/" + item.recycle_location_id)
                                            }}
                                        >
                                            รายละเอียดจุดรับรีไซเคิล
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
    )
}