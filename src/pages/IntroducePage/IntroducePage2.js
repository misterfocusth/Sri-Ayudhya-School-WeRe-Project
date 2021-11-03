import React from "react";

// React Router Dom
import { useHistory } from 'react-router-dom'

// Material-UI Components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import GiftIcon from "../../images/Home_Icons_Images/gift.png"

export default function IntroducePage2() {
    let history = useHistory();

    document.title = "การเเนะนำเเอปพลิเคชั่น | Sri Ayudhya School - We Re(cycle)"

    return (
        <div>
            <div
                style={{
                    textAlign: "center",
                    margin: "24px"
                }}
            >
                <img src={GiftIcon} alt="Preview" width="150" height="150" />
            </div>

            <div style={{ marginBottom: 100 }}>
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", fontWeight: "bold" }}>
                        เราเชื่อว่าการมีส่วนร่วมของคุณ มีความหมายต่อโลก เเละสิ่งเเวดล้อม
                    </Typography>
                </div>

                <div>
                    <Typography variant="subtitle1" gutterBottom style={{ width: "80%", marginLeft: 40, marginRight: 40, marginTop: 16 }}>
                        ดังนั้นทุกการมีส่วนร่วมในการรีไซเคิลของคุณสามารถสะสมเเต้มคะเเนน เผื่อใช้ในการเเลกของรางวัลในภายหลังได้
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
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 24
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<HomeIcon />}
                    style={{ marginLeft: 16, width: "75%" }}
                    onClick={() => {
                        history.push("/")
                    }}
                >
                    เข้าสู่หน้าหลัก (เริ่มใช้งานเเอปฯ)
                </Button>
            </div>

            <div style={{ marginBottom: 50 }}></div>
        </div >
    )
}