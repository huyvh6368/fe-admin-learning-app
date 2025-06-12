import { Link } from "react-router-dom";
import { useState } from "react";

function MenuApp() {
    const menus = [
        { name: "DashBoard", path: "/" },
        { name: "Level", path: "/level" },
        { name: "Topic", path: "/topic" },
        { name: "Learner", path: "/learner" }
    ]
    const [isActive, setIsActive] = useState('DashBoard')
    const handlerActive = (e) => {
        setIsActive(e)
    }
    return (
        <aside className="w-1/6 h-full  border-r-4 border-r-black shadow-lg p-4 bg-white rounded-md">
            <ul className="w-full h-96 flex flex-col justify-around items-center">
                {menus.map(item => (
                    <Link
                        key={item.name}
                        onClick={() => handlerActive(item.name)}
                        className={`font-semibold text-lg w-2/4 uppercase hover:text-pink-500 py-2 px-2
                            ${isActive === item.name ? 'text-pink-500' : 'text-gray-800'} `}
                        to={item.path}>{item.name}</Link>
                ))}
            </ul>
        </aside>
    );
}

export default MenuApp;