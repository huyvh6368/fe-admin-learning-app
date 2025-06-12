// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function HeaderApp() {

    const navigate = useNavigate();

    const handlerLogout = () => {
        const confirmed = window.confirm("do you want to logout ?");
        if (confirmed) {
            // Người dùng chọn "OK"
            ['accessToken', 'refreshToken'].forEach(key => localStorage.removeItem(key));
            navigate("/login")
        } else {
            // Người dùng chọn "Cancel"
            console.log("Đã hủy");
        }
    }


    return (
        <header className="w-full h-16 flex flex-row justify-between items-center border-b-4 border-b-black shadow-lg p-4 bg-white rounded-md">
            <section className="w-1/5  flex flex-row justify-center items-center">
                <span className="font-bold text-3xl"><i className="fa-brands fa-apple"></i></span>
            </section>
            <section className="w-4/5 flex flex-row justify-end items-center">
                <div className=" mr-10 px-2 py-2 rounded-2xl font-sans flex flex-row justify-between items-center w-96">
                    <span>
                        {/* <i className="fa-solid fa-user"></i> {userLogin.email} */}
                    </span>
                    <span>
                        {/* <i className="fa-solid fa-star"></i> {userLogin.roles} */}
                    </span>
                    <span className="cursor-pointer text-2xl" onClick={handlerLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </span>
                </div>
            </section>
        </header>
    );
}

export default HeaderApp;