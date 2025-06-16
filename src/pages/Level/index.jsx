import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import levelService from "../../api/LevelService";

function Level() {
    const [levels, setLevels] = useState([]);
    const [modal, setModal] = useState(false);
    const [idUpdate, setIdUpdate] = useState(0);
    const [level, setLevel] = useState({});
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const fecthDatas = async (pageNumber = 0) => {
        try {
            const response = await levelService.getAll(pageNumber, pageSize);
            console.log("response: ", response);
            if (response.code === 200) {
                setLevels(response.data);
                setPage(response.currentPage);
                setTotalPages(response.totalPages);
            }
        } catch (e) {
            console.log("lỗi : ", e);
        }
    };

    const handlerShowForm = (id, name, describes) => {
        setModal(true);
        setIdUpdate(id);
        setLevel({
            name,
            describes
        });
    };

    const handlerInput = (e) => {
        const { name, value } = e.target;
        setLevel({ ...level, [name]: value });
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await levelService.update(idUpdate, level);
            if (res.code === 200) {
                alert(res.message);
                setModal(false);
                fecthDatas(page); // Tải lại trang hiện tại
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fecthDatas(page);
    }, [page]);

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
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên level</label>
                                <input
                                    value={level.name || ""}
                                    onChange={handlerInput}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên level"
                                />
                            </div>
                            <div>
                                <label htmlFor="describes" className="block text-sm font-medium text-gray-700">Mô tả</label>
                                <textarea
                                    value={level.describes || ""}
                                    onChange={handlerInput}
                                    id="describes"
                                    name="describes"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mô tả level"
                                />
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    onClick={() => setModal(false)}
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    onClick={handlerSubmit}
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                                >
                                    Lưu lại
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full">
                    <div className="flex justify-center items-center pt-5">
                        <h1 className="font-bold text-2xl">Quản lý level học</h1>
                    </div>
                    <div className="flex justify-around items-center pt-5">
                        <div className="w-3/6">
                            <input
                                type="text"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Tìm kiếm theo tên level..."
                            />
                        </div>
                        <Link
                            to="/level/add"
                            className="flex items-center gap-2 px-4 py-1 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition duration-200 mr-10"
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
                                {levels.map((item, index) => (
                                    <tr className="hover:bg-gray-50 transition duration-200" key={item.id}>
                                        <td className="px-5 py-4 text-sm text-gray-800">{page * pageSize + index + 1}</td>
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

                        {/* PHÂN TRANG */}
                        <div className="flex justify-center mt-6">
                            <nav className="inline-flex items-center space-x-1 rounded-xl bg-white p-2 shadow-xxl">
                                <button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                    disabled={page === 0}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition ${page === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-white hover:bg-blue-500"
                                        }`}
                                >
                                    <i className="fas fa-angle-left"></i>
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPage(index)}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg transition ${page === index ? "bg-blue-500 text-white shadow" : "text-gray-500 hover:text-white hover:bg-blue-500"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                                    disabled={page === totalPages - 1}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition ${page === totalPages - 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-white hover:bg-blue-500"
                                        }`}
                                >
                                    <i className="fas fa-angle-right"></i>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Level;
