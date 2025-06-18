import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import rankService from "../../api/rankService";

function Rank() {
    const [modal, setModal] = useState(false);
    const [isAddMode, setIsAddMode] = useState(true);
    const [currentRank, setCurrentRank] = useState({
        id: 0,
        name: "",
        score: 0,
        describes: ""
    });
    const [ranks, setRanks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const fecthDatas = async (pageNumber = 0) => {
        try {
            const response = await rankService.getAll(pageNumber, pageSize);
            if (response.code === 200) {
                setRanks(response.data);
                setPage(response.currentPage);
                setTotalPages(response.totalPages);
            }
        } catch (e) {
            console.log("lỗi : ", e);
        }
    };

    const handleShowAddModal = () => {
        setIsAddMode(true);
        setCurrentRank({
            id: 0,
            name: "",
            score: 0,
            describes: ""
        });
        setModal(true);
    };

    const handleShowEditModal = (rank) => {
        setIsAddMode(false);
        setCurrentRank({
            id: rank.id,
            name: rank.name,
            score: rank.score,
            describes: rank.describes
        });
        setModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentRank(prev => ({
            ...prev,
            [name]: name === 'score'? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (isAddMode) {
                res = await rankService.add(currentRank);
            } else {
                res = await rankService.update(currentRank.id, currentRank);
            }

            if (res.code === 200) {
                alert(res.message);
                setModal(false);
                fecthDatas(page);
            }
        } catch (e) {
            console.log(e);
            alert("Có lỗi xảy ra khi thực hiện thao tác");
        }
    };

    useEffect(() => {
        fecthDatas(page);
    }, [page]);

    return (
        <>
            <div className="w-full h-full">
                <div className="flex justify-center items-center pt-5">
                    <h1 className="font-bold text-2xl">Quản lý Rank</h1>
                </div>
                <div className="flex justify-end items-center pt-5">
                    <button
                        onClick={handleShowAddModal}
                        className="flex items-center gap-2 px-4 py-1 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition duration-200 mr-10"
                    >
                        <i className="fas fa-plus"></i>
                        <span>Thêm</span>
                    </button>
                </div>
                <div className="w-[80%] mx-auto overflow-x-auto pt-10">
                    <table className="w-full table-auto border-collapse rounded-xl shadow-md overflow-hidden">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-5 py-3 text-left text-sm font-semibold uppercase">STT</th>
                                <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Rank name</th>
                                <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Score</th>
                                <th className="px-5 py-3 text-left text-sm font-semibold uppercase">DESCRIBE</th>
                                <th className="px-5 py-3 text-left text-sm font-semibold uppercase">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {ranks.map((item, index) => (
                                <tr className="hover:bg-gray-50 transition duration-200" key={item.id}>
                                    <td className="px-5 py-4 text-sm text-gray-800">{page * pageSize + index + 1}</td>
                                    <td className="px-5 py-4 text-sm text-gray-800">{item.name}</td>
                                    <td className="px-5 py-4 text-sm text-gray-800">{item.score}</td>
                                    <td className="px-5 py-4 text-sm text-gray-800">{item.describes}</td>
                                    <td className="px-5 py-4 text-sm">
                                        <button
                                            onClick={() => handleShowEditModal(item)}
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

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {isAddMode ? "Thêm Rank mới" : "Cập nhật Rank"}
                            </h2>
                            <button
                                onClick={() => setModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Tên Rank
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={currentRank.name}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minScore">
                                        Điểm
                                    </label>
                                    <input
                                        type="number"
                                        id="score"
                                        name="score"
                                        value={currentRank.score}
                                        onChange={handleInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="describes">
                                    Mô tả
                                </label>
                                <textarea
                                    id="describes"
                                    name="describes"
                                    value={currentRank.describes}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setModal(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    {isAddMode ? "Thêm" : "Cập nhật"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Rank;