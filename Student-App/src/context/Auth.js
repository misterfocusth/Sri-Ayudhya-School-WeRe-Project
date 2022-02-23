import React, { useState, useEffect } from "react";

// LINE LIFF
import liff from '@line/liff';

// Firebase
import firebaseApp from "../firebaseConfig"
import { doc, getDoc, getFirestore } from "firebase/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [studentDataContext, setStudentDataContext] = useState(null);

    // Firebase
    const db = getFirestore(firebaseApp);

    // LINE LIFF
    const LIFF_ID = "";

    useEffect(() => {
        async function initializeLiff() {
            liff.ready.then(() => {
                if (liff.isLoggedIn()) {
                    getStudentData();
                    setLoading(false)
                } else {
                    liff.login();
                }
            })
            await liff.init({ liffId: LIFF_ID })
        }
        initializeLiff()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getStudentData() {
        const profile = await liff.getProfile();
        const docSnapshot = await getDoc(doc(db, "students", profile.userId));
        if (docSnapshot.exists()) {
            setStudentDataContext(docSnapshot.data());
        }
        console.log("getStudentData() in AuthContext : " + docSnapshot.data());
    }

    if (loading) {
        return (
            <div>
                <h3
                    style={{
                        margin: "18px"
                    }}
                >
                    กำลังตรวจสอบข้อมูลการเข้าสู่ระบบ...
                </h3>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ studentDataContext }}>
            {children}
        </AuthContext.Provider>
    )
}