import React, { useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Context Provider
import { AuthContext } from '../../../context/Auth'

// Images
import LearnHowToRecycle from "../../../images/Learn_5R_Images/recycle-bin.png"
import RecycleItem01 from "../../../images/Recycle_Items_Images/Recycle_Item_01.png"
import RecycleItem02 from "../../../images/Recycle_Items_Images/Recycle_Item_02.png"
import RecycleItem03 from "../../../images/Recycle_Items_Images/Recycle-Item_03.png"
import RecycleItem04 from "../../../images/Recycle_Items_Images/Recycle_Item_04.png"
import RecycleItem05 from "../../../images/Recycle_Items_Images/Recycle_Item_05.jpg"

const useStyles = makeStyles((theme) => ({
    center: {
        margin: "auto",
        display: "flex",
        justifyContent: "center"
    },
    headerImage: {
        marginTop: 25
    },
    media: {
        height: 140,
    },
}));

export default function HowToRecycleHomePage() {
    const history = useHistory();
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "วิธีการรีไซเคิลขยะเเต่ละประเภท | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <div style={{ marginBottom: 16 }}>
                <img
                    src={LearnHowToRecycle}
                    className={clsx(classes.headerImage, classes.center)}
                    alt="Preview"
                    width="100"
                    height="100"
                />
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: 16, fontWeight: "bold", width: "85%" }}
                    className={classes.center}
                >
                    วิธีการรีไซเคิลขยะเเต่ละประเภท
                </Typography>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 14, width: "90%" }}
                    className={classes.center}
                >
                    เรียนรู้การมีส่วนร่วมในการนำเอาขยะเเต่ละประเภทมารีไซเคิลยังไงให้ถูกวิธี เเละมีขยะประเภทไหนบ้างที่เราสามารถรีไซเคิลได้
                </Typography>
            </div>

            <div style={{ marginTop: 18 }} className={classes.center}>
                <Card style={{ width: "90%", borderRadius: 15 }} onClick={() => history.push("/learn/how-to-recycle/0")}>
                    <CardContent style={{ padding: 16 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    src={RecycleItem01}
                                    alt="Preview"
                                    height="75"
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: 16 }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                    ประเภท : ขวดน้ำพลาสติก
                                </Typography>
                                <Typography variant="subtitle2" style={{ marginTop: 6 }}>
                                    ขวดน้ำดื่ม / ขวดพลาสติดใส
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>

            <div
                style={{ marginTop: 18 }}
                className={classes.center}
                onClick={() => history.push("/learn/how-to-recycle/paper")}
            >
                <Card style={{ width: "90%", borderRadius: 15 }}>
                    <CardContent style={{ padding: 16 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    src={RecycleItem02}
                                    alt="Preview"
                                    height="75"
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: 16, width: "70%" }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                    ประเภท : กระดาษ
                                </Typography>
                                <Typography variant="subtitle2" style={{ marginTop: 6 }}>
                                    กระดาษขาว-ดำ / กระดาษ A4 / กระดาษปอนด์ เเละกระดาษคอม ฯ
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>

            <div style={{ marginTop: 18 }} className={classes.center}
                onClick={() => history.push("/learn/how-to-recycle/box")}>
                <Card style={{ width: "90%", borderRadius: 15 }}>
                    <CardContent style={{ padding: 16 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    src={RecycleItem03}
                                    alt="Preview"
                                    height="75"
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: 16, width: "70%" }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                    ประเภท : กระดาษกล่อง
                                </Typography>
                                <Typography variant="subtitle2" style={{ marginTop: 6 }}>
                                    กระดาษคราฟท์ / กระดาษลัง / กระดาษน้ำตาล เเละกระดาษกล่อง
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>

            <div style={{ marginTop: 18 }} className={classes.center} onClick={() => history.push("/learn/how-to-recycle/ice-cream-wrap")}>
                <Card style={{ width: "90%", borderRadius: 15 }}>
                    <CardContent style={{ padding: 16 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    src={RecycleItem04}
                                    alt="Preview"
                                    style={{ objectFit: "cover" }}
                                    width="75"
                                    height="75"
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: 16, width: "70%" }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                    ประเภท : ซองไอศกรีมกระดาษ
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>

            <div style={{ marginTop: 18 }} className={classes.center} onClick={() => history.push("/learn/how-to-recycle/milk-box-uht")}>
                <Card style={{ width: "90%", borderRadius: 15 }}>
                    <CardContent style={{ padding: 16 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    src={RecycleItem05}
                                    alt="Preview"
                                    style={{ objectFit: "cover" }}
                                    width="75"
                                    height="75"
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: 16, width: "70%" }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                    ประเภท : กล่องนม UHT
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}