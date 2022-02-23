import React, { useContext } from "react";

// React Router Dom
import { Redirect } from 'react-router-dom'

// Material-UI Components
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Context Provider
import { AuthContext } from '../../context/Auth'

// Images
import LearnAbout5RIcons from "../../images/Learn_5R_Images/5R.png"

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

export default function LearnAbout5RPage() {
    const classes = useStyles();
    const { studentDataContext } = useContext(AuthContext);

    document.title = "เกี่ยวกับหลักการ 5R | Sri Ayudhya School - We Re(cycle)"

    if (!studentDataContext) {
        return <Redirect to="/register" />
    }

    return (
        <div style={{ marginBottom: 75 }}>
            <div>
                <img
                    src={LearnAbout5RIcons}
                    className={clsx(classes.headerImage, classes.center)}
                    alt="Preview"
                    width="100"
                    height="100"
                />
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: 16, fontWeight: "bold" }}
                    className={classes.center}
                >
                    เรียนรู้เกี่ยวกับหลักการ 5R
                </Typography>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 14, width: "90%" }}
                    className={classes.center}
                >
                    เรียนรู้เกี่ยวกับความหมาย เเละองค์ประกอบของหลักการ 5R ว่ามีอะไรบ้าง เเละเราจะสามารถปฎิบัติตามหลักการ 5R ได้อย่างไรบ้าง
                </Typography>
            </div>

            <div>
                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 14, width: "90%" }}
                    className={classes.center}
                >
                    ประเทศไทย พบปัญหาด้านขยะเป็นอันดับต้นๆ ที่ส่งผลเสียต่อสิ่ง แวดล้อม เพราะมีขยะจำนวนหลายล้านตัน ที่อยู่ในรูปของหีบห่อ ขวด กล่อง กระป๋อง และอื่นๆอีกมากมาย การลดปริมาณขยะที่จะเกิดขึ้นได้ เพื่อประสิทธิภาพ ที่ดีกว่า เราควรหาวิธีลดปริมาณขยะเหล่านี้ ให้เกิด ประโยชน์ เปลี่ยนสิ่งที่ไร้ ค่า ให้มีความหวัง โดยเริ่มเปลี่ยนพฤติกรรม ของเราตั้งแต่วันนี้ เพราะหาก เราไม่เริ่มที่จะลดปริมาณขยะที่เกิดขึ้น ต้นทุนทางเศรษฐกิจ และสังคม จากปัญหาขยะ จะยังคงเพิ่มขึ้นอย่าง ต่อเนื่อง
                </Typography>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    style={{ marginTop: 14, width: "90%" }}
                    className={classes.center}
                >
                    ดังนั้น พวกเราสามารถช่วยลดปริมาณขยะที่เกิดขึ้น โดยยึดหลัก 5R ดังต่อไปนี้
                </Typography>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                >
                    <div>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#00a152" }}>
                                1. Reduce
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: "8px" }}>
                                การลดการใช้ ลดการบริโภคทรัพยากรที่ไม่จำเป็นลง เช่น
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                                - ปิดไฟทุกครั้งเมื่อไม่ใช้ ถอดปลั๊กเครื่องใช้ไฟฟ้าทุกครั้งที่ไม่ใช้งาน
                            </Typography>
                            <Typography variant="subtitle1">
                                - หรือถ้าไปไหนไม่ไกล จะเดินไปเองก็ได้ เป็นต้น
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                                ด้วยวิธีนี้เราจะสามารถเก็บทรัพยากรด้านพลังงานไว้ใช้ได้นานมากขึ้น ประหยัดพลังงาน และอนุรักษ์สิ่งแวดล้อมให้อยู่ยั่งยืนยื่งขึ้น
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                >
                    <div>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#00a152" }}>
                                2. Refuse
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: "8px" }}>
                                การปฏิเสธ หรือไม่ใช้ของที่คิดว่าเป็นการทำลายทรัพยากร และสร้างมลพิษใหเ้เกิดขึ้นกับสิ่งแวดล้อม เช่น
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                                - เลือกใช้ ผลิตภัณฑ์ที่ไม่เป็นพิษ หรือมีพิษตกค้างน้อยกว่า เช่น ปลูกต้นดาวเรืองเพื่อช่วยในการไล่แมลง ดีกว่าจะซื้อยาฆ่าแมลง มาใช้ หรือนำกระดาษทรายมาขัด แทนที่จะหยอดน้ำมันหล่อลื่น
                            </Typography>
                            <Typography variant="subtitle1">
                                - ถ้าใช้ผลิตภัณฑ์อันตราย ให้ใช้ในปริมาณที่จำเป็นเท่านั้น และนำผลิตภัณฑ์ไปทิ้งอย่างถูกวิธี โดยไม่นำไปปนกับเศษอาหาร เป็นต้น
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                >
                    <div>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#00a152" }}>
                                3. Reuse
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: "8px" }}>
                                การใช้ทรัพยากรให้คุ้มค่ามากที่สุด โดยการนำสิ่งของเครื่องใช้มาใช้ซ้ำ เช่น
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                                - การใส่ชุดเดิมๆ ที่ยังมีคุณภาพดีอยู่
                            </Typography>
                            <Typography variant="subtitle1">
                                - การนำของไปบริจาคแทนที่จะนำไปทิ้ง
                            </Typography>
                            <Typography variant="subtitle1">
                                - หรือการใช้กระดาษให้หมดทั้งหน้าหลัง เป็นต้น
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                                หลักการนี้จะช่วยลดค่าใช้จ่าย ลดการใช้พลังงาน ช่วยรักษาสิ่งแวดล้อมได้อย่างมีประสิทธิภาพ
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                >
                    <div>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#00a152" }}>
                                4. Recycle
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: "8px" }}>
                                การนำทรัพยากรที่ใช้แล้ว กลับมาใช้ใหม่ ด้วยกระบวนการรีไซเคิล เช่น
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                                - นำเอาเศษกระดาษ กลับมาทำเป็นกล่องกระดาษ
                            </Typography>
                            <Typography variant="subtitle1">
                                - เอาฝากระป๋องน้ำอัดลมมาทำเป็นขาเทียม เป็นต้น
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                                วิธีนี้จะลดปริมาณขยะที่จะเพิ่มขึ้น ให้ลดน้อยลงอย่างเห็นได้ชัดที่สุด
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: 18 }}>
                <Card
                    className={clsx(classes.center)}
                    style={{ width: "90%", display: "flex", borderRadius: 15 }}
                >
                    <div>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#00a152" }}>
                                5. Repair
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: "8px" }}>
                                การซ่อมแซมสิ่งต่างๆ ให้สามารถใช้งานได้อย่างยาวนานมากขึ้น แทนที่จะนำไปทิ้งไปในทันที เช่น
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                                - เสื้อขาด ก็นำไปเย็บ
                            </Typography>
                            <Typography variant="subtitle1">
                                - คอมพิวเตอร์พัง ก็นำไปซ่อม เป็นต้น
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginTop: 18, width: "90%" }}
                className={classes.center}
            >
                “หลักการ 5R เป็นหลักการที่เราสามารถนำมาใช้ได้โดยตรงในวิถีชีวิตของเรา นี่ถือเป็นกระบวนการที่ดี และยั่งยืนต่อการดูแลรักษาสิ่งแวดล้อมของโลกในปัจจุบัน หรือในอนาคตอันอีกยาวนาน”
            </Typography>

            <Typography
                variant="subtitle2"
                gutterBottom
                style={{ marginTop: 18, width: "90%" }}
                className={classes.center}
            >
                ที่มา/ขอบคุณข้อมูล จาก : palmmade.com เเละ https://erdi.cmu.ac.th/?p=1987
            </Typography>
        </div>
    )
}