import React, { useContext } from "react";

// React Router Dom
import { Redirect, useHistory } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Context Provider
import { AuthContext } from '../../context/Auth'

// Images
import Learn5RIcons from "../../images/Learn_5R_Images/earth.png"
import LearnAbout5RIcons from "../../images/Learn_5R_Images/5R.png"
import LearnHowToRecycle from "../../images/Learn_5R_Images/recycle-bin.png"
import LearnHowGood from "../../images/Learn_5R_Images/ecological.png"

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

export default function LearnHomePage() {
    const history = useHistory();
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "เรียนรู้หลักการ 5R | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div>
            <div>
                <img
                    src={Learn5RIcons}
                    className={clsx(classes.headerImage, classes.center)}
                    alt="Preview"
                    width="125"
                    height="125"
                />
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: 16, fontWeight: "bold" }}
                    className={classes.center}
                >
                    เรียนรู้หลักการ 5R
                </Typography>

                <Typography
                    variant="subtitle1"
                    gutterBottom
                    style={{ marginTop: 10, width: "80%" }}
                    className={classes.center}
                >
                    หลักการง่ายๆ ในการจัดการขยะ ช่วยเหลือโลกเเละรักษาสิ่งเเวดล้อม
                </Typography>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                    onClick={() => {
                        history.push("/learn/about-5r")
                    }}
                >
                    <div>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#00a152" }}>
                                เกี่ยวกับหลักการ 5R
                            </Typography>
                            <Typography variant="subtitle2" style={{ marginTop: "8px" }}>
                                เรียนรู้เกี่ยวกับความหมาย เเละองค์ประกอบของหลักการ 5R ว่ามีอะไรบ้าง เเละเราจะสามารถปฎิบัติตามหลักการ 5R ได้อย่างไรบ้าง
                            </Typography>
                        </CardContent>
                    </div>
                    <div style={{ height: "100%", marginTop: 25, marginBottom: 25, padding: 8 }}>
                        <img
                            src={LearnAbout5RIcons}
                            alt="Preview"
                            width="90"
                            height="90"
                        />
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                    onClick={() => {
                        history.push("/learn/how-to-recycle")
                    }}
                >
                    <div>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#00a152" }}>
                                วิธีการรีไซเคิลขยะเเต่ละประเภท
                            </Typography>
                            <Typography variant="subtitle2" style={{ marginTop: "8px" }}>
                                เรียนรู้การมีส่วนร่วมในการนำเอาขยะเเต่ละประเภทมารีไซเคิลยังไงให้ถูกวิธี เเละมีขยะประเภทไหนบ้างที่เราสามารถรีไซเคิลได้
                            </Typography>
                        </CardContent>
                    </div>
                    <div style={{ height: "100%", marginTop: 30, marginBottom: 30, padding: 8 }}>
                        <img
                            src={LearnHowToRecycle}
                            alt="Preview"
                            width="90"
                            height="90"
                        />
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                    onClick={() => {
                        history.push("/learn/how-good")
                    }}
                >
                    <div>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#00a152" }}>
                                การจัดการขยะกับการช่วยโลก เเละสิ่งเเวดล้อมของเรา
                            </Typography>
                            <Typography variant="subtitle2" style={{ marginTop: "8px" }}>
                                เรียนรู้วิธีการจัดการขยะที่ถูกต้อง เเละการจัดการขยะที่ถูกต้อง เเละการลดปริมาณขยะต่อดีต่อโลกของเรายังไง
                            </Typography>
                        </CardContent>
                    </div>
                    <div style={{ height: "100%", marginTop: 30, marginBottom: 30, padding: 8 }}>
                        <img
                            src={LearnHowGood}
                            alt="Preview"
                            width="90"
                            height="90"
                        />
                    </div>
                </Card>
            </div>

            <div style={{ marginBottom: 75 }}></div>
        </div>
    )
}