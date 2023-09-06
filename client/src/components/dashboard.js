import { useState } from "react";
import { Link } from "react-router-dom";




function Dashboard() {
    const storageUser = window.localStorage.getItem('user');

    const logout = async () => {
        try {
            await fetch("http://localhost:3001/logout", {
                method: "GET", 
                credentials: "include"
            });
            window.localStorage.setItem('user', ''); 
            window.location.href = '/'; 
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    




    return (
        <div className="dashboard">

            {storageUser ? (
                <div className="loggedin">
                    <i>Welcome {storageUser}</i>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div className="not-loggedin">
                    <p>You are not logged in.</p>
                    <Link to="/">Log in</Link>
                </div>
            )}
        </div>
    )
};
export default Dashboard;