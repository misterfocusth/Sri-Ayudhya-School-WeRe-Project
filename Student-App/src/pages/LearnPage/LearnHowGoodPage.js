import React, { useContext } from "react";

// React Router Dom
import { Redirect } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Context Provider
import { AuthContext } from '../../context/Auth'

// Images
import LearnHowGood from "../../images/Learn_5R_Images/ecological.png"
import WhyIcon from "../../images/Learn_5R_Images/question.png"
import HowGoodIcon from "../../images/Learn_5R_Images/tree.png"
import Bin from "../../images/Learn_5R_Images/recycling.png"
import Green from "../../images/Learn_5R_Images/Green.png"
import Blue from "../../images/Learn_5R_Images/Blue.png"
import Yellow from "../../images/Learn_5R_Images/Yellow.png"
import Red from "../../images/Learn_5R_Images/Red.png"

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

export default function LearnHowGoodPage() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "การจัดการขยะกับการช่วยโลกเเละสิ่งเเวดล้อมของเรา | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <div style={{ marginBottom: 16 }}>
                <img
                    src={LearnHowGood}
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
                    การจัดการขยะกับการช่วยโลก
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: 0, fontWeight: "bold", width: "85%" }}
                    className={classes.center}
                >
                    เเละสิ่งเเวดล้อมของเรา
                </Typography>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 14, width: "90%" }}
                    className={classes.center}
                >
                    เรียนรู้วิธีการจัดการขยะที่ถูกต้อง เเละการจัดการขยะที่ถูกต้อง เเละการลดปริมาณขยะต่อดีต่อโลกของเรายังไง
                </Typography>
            </div>

            <div>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                >
                    <div>
                        <CardContent style={{ padding: 16 }}>
                            <div>
                                <div>
                                    <Grid container direction="row" alignItems="center" style={{ margin: 8 }}>
                                        <Grid item>
                                            <img
                                                src={WhyIcon}
                                                alt="Preview"
                                                width="50"
                                                height="50"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" style={{ marginLeft: 12, color: "#00a152", fontWeight: "bold" }}>ทำไมเราต้องเเยกขยะก่อนทิ้ง ?</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 14 }}
                                >
                                    หลังจากที่เราทิ้งขยะลงไปในถังแล้ว เราไม่รู้เลยว่าขยะเหล่านั้นอาจจะไปส่ง ผลกระทบต่อผู้อื่นรวมถึงระบบนิเวศได้ง่าย ๆ
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    style={{ marginTop: 14 }}
                                >
                                    ขยะที่รวมกันส่งผลเสียหลายทางทั้งด้านระบบนิเวศ กลิ่นของเสีย หรือสะสมเชื้อแบคทีเรียขนาดใหญ่ที่สามารถแพร่เชื้อให้กับผู้ที่สัมผัสกับขยะเหล่านี้โดยตรง
                                    ได้ ปัญหาเหล่านี้จะเกิดขึ้นน้อยลง หากเราทุกคนช่วยกันแยกขยะก่อนทิ้ง
                                </Typography>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <div style={{ margin: 16 }}>
                <Grid container direction="row" alignItems="center" style={{ margin: 8 }}>
                    <Grid item>
                        <img
                            src={Bin}
                            alt="Preview"
                            width="50"
                            height="50"
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ marginLeft: 12, color: "#00a152", fontWeight: "bold" }}>การเเยกขยะตามประเภทหรือสีของถังขยะ</Typography>
                    </Grid>
                </Grid>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", backgroundColor: "rgba(46, 204, 113, 0.25)", borderRadius: 15 }}
                >
                    <div>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold", margin: 16, marginBottom: 8 }}>
                            ถังขยะสำหรับ ขยะอินทรีย์ ขยะเปียก (สีเขียว)
                        </Typography>
                        <div>
                            <div>
                                <CardContent style={{ padding: 0, marginBottom: 8 }}>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item>
                                            <img
                                                src={Green}
                                                alt="Preview"
                                                width="95"
                                                height="125"
                                            />
                                        </Grid>
                                        <Grid item style={{ width: "70%", padding: 8 }}>
                                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                ขยะอินทรีย์ คือ ขยะที่เน่าเสียและย่อยสลายได้เร็ว เช่น เศษอาหาร เปลือกผลไม้ เศษผัก เนื้อสัตว์ เศษใบไม้แห้ง
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ marginTop: 18 }}>
                                                <span style={{ fontWeight: "bold" }}>ประโยชน์จากการแยกขยะ : </span>นำไปทำปุ๋ยหมักชีวภาพ ใส่ต้นไม้ แปลงผักสวนครัวได้
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", backgroundColor: "rgba(84, 153, 199, 0.25)", borderRadius: 15 }}
                >
                    <div>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold", margin: 16, marginBottom: 8 }}>
                            ถังขยะสำหรับ ขยะทั่วไป (สีน้ำเงิน)
                        </Typography>
                        <div>
                            <div>
                                <CardContent style={{ padding: 0, marginBottom: 8 }}>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item>
                                            <img
                                                src={Blue}
                                                alt="Preview"
                                                width="95"
                                                height="125"
                                            />
                                        </Grid>
                                        <Grid item style={{ width: "70%", padding: 8 }}>
                                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                เป็นขยะที่มักจะย่อยสลายไม่ได้ หรือย่อยสลายยากแต่ไม่ เป็นพิษและไม่คุ้มค่าต่อการรีไซเคิล จำเป็นต้องหาวิธีกำจัด อย่างถูกวิธี เช่น ซองขนม กล่องโฟม ถุงพลาสติก

                                            </Typography>
                                            <Typography variant="subtitle2" style={{ marginTop: 18 }}>
                                                <span style={{ fontWeight: "bold" }}>ประโยชน์จากการแยกขยะ : </span>นำผ่านเทคโนโลยีการผลิตเพื่อนำกลับมาใช้เป็นวัสดุใหม่
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", backgroundColor: "rgba(244, 208, 63, 0.25)", borderRadius: 15 }}
                >
                    <div>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold", margin: 16, marginBottom: 8 }}>
                            ถังขยะสำหรับ ขยะรีไซเคิล (สีเหลือง)
                        </Typography>
                        <div>
                            <div>
                                <CardContent style={{ padding: 0, marginBottom: 8 }}>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item>
                                            <img
                                                src={Yellow}
                                                alt="Preview"
                                                width="95"
                                                height="125"
                                            />
                                        </Grid>
                                        <Grid item style={{ width: "70%", padding: 8 }}>
                                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                ขยะรีไซเคิลก็คือขยะที่เราทิ้งไปแล้วสามารถนำกลับมาใช้ซ้ำอีกครั้งได้ ไม่ใช่ใช้ครั้งเดียวแล้วทิ้ง เช่น ขวดพลาสติก, ถุงพลาสติก, ขวดแก้ว, กระป๋อง, กล่องกระดาษ, กระดาษ

                                            </Typography>
                                            <Typography variant="subtitle2" style={{ marginTop: 18 }}>
                                                <span style={{ fontWeight: "bold" }}>ประโยชน์จากการแยกขยะ : </span>ประโยชน์จากการแยกขยะ: ผลิตขาเทียม ผลิตหลังคารีไซเคิล ผลิตหลอดไฟ ผลิตจีวรพระสงฆ์
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", backgroundColor: "rgba(231, 76, 60, 0.25)", borderRadius: 15 }}
                >
                    <div>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold", margin: 16, marginBottom: 8 }}>
                            ถังขยะสำหรับ ขยะอันตราย (สีแดง)
                        </Typography>
                        <div>
                            <div>
                                <CardContent style={{ padding: 0, marginBottom: 8 }}>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item>
                                            <img
                                                src={Red}
                                                alt="Preview"
                                                width="95"
                                                height="125"
                                            />
                                        </Grid>
                                        <Grid item style={{ width: "70%", padding: 8 }}>
                                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                ขยะอันตราย คือ ขยะที่มีสารปนเปื้อนวัตถุอันตรายชนิด ต่างๆ  เช่น สารพิษ วัตถุติดเชื้อได้ วัตถุกัดกร่อน เช่น ถ่านไฟฉาย, อุปกรณ์อิเล็กทรอนิกส์, ยาหมดอายุ, วัตถุไวไฟ, กระป๋องเสปรย์

                                            </Typography>
                                            <Typography variant="subtitle2" style={{ marginTop: 18 }}>
                                                <span style={{ fontWeight: "bold" }}>ประโยชน์จากการแยกขยะ : </span> แยกขยะเพื่อนำไปกำจัดอย่าง
                                                ถูกวิธีตาม เพื่อไม่ไห้รั่วซึมลงแหล่งน้ำ หรือชั้นผิวดิน
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 16 }}>
                <Grid container direction="row" alignItems="center" className={classes.center}>
                    <Grid item>
                        <img
                            src={HowGoodIcon}
                            alt="Preview"
                            width="75"
                            height="75"
                        />
                    </Grid>
                    <Grid style={{ marginLeft: 18 }} item>
                        <Typography variant="body1" style={{ color: "#00a152", fontWeight: "bold" }}>ส่วนข้อดีของการแยกขยะ</Typography>
                        <Typography variant="body1" style={{ marginTop: 0, color: "#00a152", fontWeight: "bold" }}>ก็มีมากมาย ! ไม่ว่าจะเป็น</Typography>
                    </Grid>
                </Grid>
            </div>

            <div>
                <ul>
                    <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20, color: "#00a152" }}>ช่วยลดปริมาณขยะ</li>
                </ul>
                <Typography variant="subtitle2" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                    การแยกขยะเพิ่มการนำกลับมารีไซเคิล เราจะเหลือ
                    ขยะที่ต้องกำจัดน้อยลง ขยะบนโลกก็จะลดลงด้วย
                </Typography>
            </div>

            <div>
                <ul>
                    <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20, color: "#00a152" }}>ประหยัดงบในการกำจัดขยะ</li>
                </ul>
                <Typography variant="subtitle2" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                    นำงบส่วนนี้ไปพัฒนาด้านอื่นๆ เพื่อคุณภาพชีวิตที่ดีขึ้นได
                </Typography>
            </div>

            <div>
                <ul>
                    <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20, color: "#00a152" }}>
                        ลดการสิ้นเปลืองพลังงานและทรัพยากร</li>
                </ul>
                <Typography variant="subtitle2" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                    ของที่สามารถกลับมารีไซเคิลได้จะช่วยเพิ่มรายได้
                    และลดทรัพยากรโลกในการผลิตใหม่อีกครั้งด้วยนะ
                </Typography>
            </div>

            <div>
                <ul>
                    <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20, color: "#00a152" }}>รักษาสิ่งแวดล้อมลดมลพิษในโลก
                    </li>
                </ul>
                <Typography variant="subtitle2" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                    การแยกขยะ ทำให้เรากำจัดขยะได้ถูกวิธีมากขึ้น
                    ลดมลพิษต่อสิ่งแวดล้อม
                </Typography>
            </div>

        </div>
    )
}