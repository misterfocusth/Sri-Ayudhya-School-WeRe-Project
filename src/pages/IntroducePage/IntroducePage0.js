import React, { useState } from "react";

// React Router Dom
import { useHistory } from 'react-router-dom'

// Material-UI Components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import EarthIcon from "../../images/Home_Icons_Images/earth.png"

export default function IntroducePage0() {
    let history = useHistory();
    const [showAlertDialog, setShowAlertDialog] = useState(false);

    document.title = "การเเนะนำเเอปพลิเคชั่น | Sri Ayudhya School - We Re(cycle)"

    const handleClose = () => {
        setShowAlertDialog(false)
    }

    const handleSkip = async () => {
        history.push("/");
    }

    return (
        <div>
            <Dialog
                open={showAlertDialog}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        คุณยืนยันที่จะข้ามขั้นตอนการเเนะนำนี้หรือไม่ ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        ยกเลิก
                    </Button>
                    <Button onClick={async () => {
                        await handleSkip();
                    }} color="primary">
                        ข้ามการเเนะนำ
                    </Button>
                </DialogActions>
            </Dialog>

            <div
                style={{
                    textAlign: "center",
                    margin: "24px"
                }}
            >
                <img src={EarthIcon} alt="Preview" width="175" height="175" />
            </div>

            <div>
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", fontWeight: "bold" }}>
                        คุณเองก็สามารถช่วยโลกของเราได้ง่ายๆ โดยใช้หลักการ 5R ดังต่อไปนี้
                    </Typography>
                </div>

                <div>
                    <ul>
                        <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20 }}>Reduce (การลดการใช้)</li>
                    </ul>
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                        การลดการใช้ ลดการบริโภคทรัพยากรที่ไม่จำเป็นลง เช่น ปิดไฟทุกครั้งเมื่อไม่ใช้ ถอดปลั๊กเครื่องใช้ไฟฟ้าทุกครั้งที่ไม่ใช้งาน หรือถ้าไปไหนไม่ไกล จะเดินไปเองก็ได้ เป็นต้น ด้วยวิธีนี้เราจะสามารถเก็บทรัพยากรด้านพลังงานไว้ใช้ได้นานมากขึ้น ประหยัดพลังงาน และอนุรักษ์สิ่งแวดล้อมให้อยู่ยั่งยืนยื่งขึ้น
                    </Typography>
                </div>

                <div>
                    <ul>
                        <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20 }}>Refuse (การปฏิเสธ)</li>
                    </ul>
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                        การปฏิเสธ หรือไม่ใช้ของที่คิดว่าเป็นการทำลายทรัพยากร และสร้างมลพิษใหเ้เกิดขึ้นกับสิ่งแวดล้อม
                    </Typography>
                </div>

                <div>
                    <ul>
                        <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20 }}>Reuse (การใช้ทรัพยากรให้คุ้มค่ามากที่สุด)</li>
                    </ul>
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                        การใช้ทรัพยากรให้คุ้มค่ามากที่สุด โดยการนำสิ่งของเครื่องใช้มาใช้ซ้ำ เช่นการใส่ชุดเดิมๆ ที่ยังมีคุณภาพดีอยู่ การนำของไปบริจาคแทนที่จะนำไปทิ้ง หรือการใช้กระดาษให้หมดทั้งหน้าหลัง หลักการนี้จะช่วยลดค่าใช้จ่าย ลดการใช้พลังงาน ช่วยรักษาสิ่งแวดล้อมได้อย่างมีประสิทธิภาพ
                    </Typography>
                </div>

                <div>
                    <ul>
                        <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20 }}>Recycle (การนำทรัพยากรที่ใช้แล้ว)</li>
                    </ul>
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                        การนำทรัพยากรที่ใช้แล้ว กลับมาใช้ใหม่ ด้วยกระบวนการรีไซเคิล เช่นนำเอาเศษกระดาษ กลับมาทำเป็นกล่องกระดาษ เอาฝากระป๋องน้ำอัดลมมาทำเป็นขาเทียมเป็นต้น วิธีนี้จะลดปริมาณขยะที่จะเพิ่มขึ้น ให้ลดน้อยลงอย่างเห็นได้ชัดที่สุด
                    </Typography>
                </div>

                <div>
                    <ul>
                        <li style={{ fontWeight: "bold", padding: 0, marginLeft: 20 }}>Repair (การซ่อมแซมสิ่งต่างๆ)</li>
                    </ul>
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40 }}>
                        การซ่อมแซมสิ่งต่างๆ ให้สามารถใช้งานได้อย่างยาวนานมากขึ้น แทนที่จะนำไปทิ้งไปในทันที เช่น เสื้อขาด ก็นำไปเย็บ คอมพิวเตอร์พัง ก็นำไปซ่อมเป็นต้น
                    </Typography>
                </div>
            </div>

            <div style={{ marginTop: 28 }}>
                <Grid container direction="row" alignItems="center" style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
                        หน้าที่ 1 จาก 3
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<NavigateNextIcon />}
                        style={{ marginLeft: 16, width: "50%" }}
                        onClick={() => {
                            history.push("/introduce/1")
                        }}
                    >
                        หน้าถัดไป
                    </Button>
                </Grid>

                <div style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 16
                }}>
                    <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ color: "#00a152" }}
                        onClick={() => {
                            setShowAlertDialog(true)
                        }}
                    >
                        ต้องการข้ามการเเนะนำ ?
                    </Typography>
                </div>
            </div>

            <div style={{ marginBottom: 25 }}></div>
        </div>
    )
}