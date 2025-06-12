import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import levelService from "../../api/LevelService";
import { Link } from "react-router-dom";
function Level() {
    const [levels, setLevels] = useState([]);
    const [modal, setModal] = useState(false);
    const [idUpdate, setIdUpdate] = useState(0);
    const [level, setLevel] = useState({});
    const fecthDatas = async () => {
        try {
            const response = await levelService.getAll(0, 10);
            console.log(" response : ", response);
            if (response.code === 200) {
                setLevels(response.data)
            }
        } catch (e) {
            console.log("lỗi : ", e);
        }

    }
    const handlerShowForm = (id, name, describes) => {
        setModal(true);
        setIdUpdate(id);
        console.log(" mota : ", describes);
        setLevel({
            "name": name,
            "describes": describes
        })
        console.log("level : ", level);

    }
    console.log(" level : ", level);

    const navigate = useNavigate();
    const handlerInput = (e) => {
        const { name, value } = e.target;
        setLevel({ ...level, [name]: value })
        console.log("level : ", level);
    }
    const handlerSubmit = async (e) => {
        e.preventDefault();
        console.log(" submit");
        try {
            const res = await levelService.update(idUpdate, level);
            if (res.code === 200) {
                alert(res.message)
                setModal(false)
                fecthDatas()
            }
            console.log("res : ", res);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {

        fecthDatas()

    }, [])
    return (
        <>
            {modal ? (
                <div className="w-full h-full p-6">
                    <div className="flex justify-center items-center pt-5 pb-8">
                        <h1 className="font-bold text-2xl text-gray-800">Cập nhật level</h1>
                    </div>
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Tên level
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={level.name}
                                        onChange={handlerInput}
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập tên level"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="describes" className="block text-sm font-medium text-gray-700">
                                    Mô tả
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        value={level.describes}
                                        onChange={handlerInput}
                                        id="describes"
                                        name="describes"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập mô tả level"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    onClick={() => setModal(false)}
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    onClick={handlerSubmit}
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Lưu lại
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className=" w-full h-full">
                    <div className=" flex justify-center items-center pt-5" >
                        <h1 className="font-bold text-2xl">Quản lý level học</h1>
                    </div >
                    <div className="flex justify-around items-center  pt-5">
                        <div className="w-3/6">
                            <input
                                type="text"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Tìm kiếm theo tên level..."
                            />
                        </div>
                        <Link
                            to="/level/add"
                            className="flex items-center gap-2 px-4 py-1
                    bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition duration-200 mr-10"
                        >
                            <i className="fas fa-plus"></i>
                            <span>Thêm</span>
                        </Link>
                    </div>
                    <div className="w-[80%] mx-auto overflow-x-auto pt-10">
                        <table className="w-full table-auto border-collapse rounded-xl shadow-md overflow-hidden">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="px-5 py-3 text-left text-sm font-semibold uppercase">STT</th>
                                    <th className="px-5 py-3 text-left text-sm font-semibold uppercase">NAME</th>
                                    <th className="px-5 py-3 text-left text-sm font-semibold uppercase">DESCRIBE</th>
                                    <th className="px-5 py-3 text-left text-sm font-semibold uppercase">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {levels.map(item => (
                                    <tr className="hover:bg-gray-50 transition duration-200" key={item.id}>
                                        <td className="px-5 py-4 text-sm text-gray-800">{item.id}</td>
                                        <td className="px-5 py-4 text-sm text-gray-800">{item.name}</td>
                                        <td className="px-5 py-4 text-sm text-gray-800">{item.describes}</td>
                                        <td className="px-5 py-4 text-sm">
                                            <button
                                                onClick={() => handlerShowForm(item.id, item.name, item.describes)}
                                                className="flex items-center gap-2 px-4 py-1 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition duration-200"
                                            >
                                                <i className="fas fa-pen"></i>
                                                <span>Sửa</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <div className="flex justify-center mt-6">
                    <nav class="inline-flex items-center space-x-1 rounded-xl bg-white p-2 shadow-xxl">
                        <a
                            href="#"
                            class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-white hover:bg-blue-500 rounded-lg transition"
                        >
                            <i class="fas fa-angle-left"></i>
                        </a>
                        <a
                            href="#"
                            class="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-white hover:bg-blue-500 rounded-lg transition"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-white hover:bg-blue-500 rounded-lg transition"
                        >
                            3
                        </a>
                        <span class="px-3 py-2 text-sm text-gray-400">...</span>
                        <a
                            href="#"
                            class="px-3 py-2 text-sm font-medium text-gray-500 hover:text-white hover:bg-blue-500 rounded-lg transition"
                        >
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </nav>
                </div> */}
                        <link
                            rel="stylesheet"
                            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                        />

                    </div>
                </div >
            )}
        </>
    );
}

export default Level;