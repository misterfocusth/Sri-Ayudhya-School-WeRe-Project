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

import RecycleLocationIcon from "../../images/Home_Icons_Images/location.png"

export default function IntroducePage1() {
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
                <img src={RecycleLocationIcon} alt="Preview" width="175" height="175" />
            </div>

            <div style={{ marginBottom: 150 }}>
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", fontWeight: "bold" }}>
                        ค้นหาจุดรับรีไซเคิลรอบๆ บริเวณโรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ ได้ง่ายๆ
                    </Typography>
                </div>

                <div>
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40, marginTop: 16 }}>
                        หากคุณต้องการรีไซเคิลไม่ว่าจะเป็น ขวดน้ำ กระดาษเหลือใช้ กระดาษลัง หรือสิ่งของต่างๆ ที่สามารถรีไซเคิลได้ ภายในบริเวณรอบๆ โรงเรียนศรีอยุธยา ในพระอุปถัมภ์ ฯ คุณสามารถใช้เเอปพลิเคชั่นนี้ในการช่วย หาจุดรับรีไซเคิลได้
                    </Typography>
                </div>
            </div>

            <div
                style={{
                    marginTop: 14,
                    backgroundColor: "#ffff",
                    overflow: "hidden",
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                }}
            >
                <Grid container direction="row" alignItems="center" style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
                        หน้าที่ 2 จาก 3
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<NavigateNextIcon />}
                        style={{ marginLeft: 16, width: "50%" }}
                        onClick={() => {
                            history.push("/introduce/2")
                        }}
                    >
                        หน้าถัดไป
                    </Button>
                </Grid>

                <div style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 16,
                    marginBottom: 14
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

            <div style={{ marginBottom: 50 }}></div>
        </div >
    )
}