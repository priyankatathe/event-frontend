import React from "react";
import { useSelector } from "react-redux";
import LoginAdmin from "../admin/LoginAdmin";

const AdminProtector = ({ compo }) => {
    const { admin } = useSelector((state) => state.Auth);

    return (
        <div>
            {admin ? (
                <>{compo}</>
            ) : (
                // ✅ Directly login form dikhao, dusri screen pe navigate nahi karega
                <LoginAdmin />
            )}
        </div>
    );
};

export default AdminProtector;
