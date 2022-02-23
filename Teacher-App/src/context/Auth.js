import React, { useState, useEffect } from "react";

// Firebase
import firebaseApp from "../firebaseConfig"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth(firebaseApp)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}