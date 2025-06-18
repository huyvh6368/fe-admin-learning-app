import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import topicService from "../../api/topicService";
import levelService from "../../api/levelService"; // <== Thêm dòng này
import { Link } from "react-router-dom";
import React from "react";
function Topic() {
    const [topics, setTopics] = useState([]);
    const [levels, setLevels] = useState([]); // <== Thêm state levels
    const [modal, setModal] = useState(false);
    const [idUpdate, setIdUpdate] = useState(0);
    const [topic, setTopic] = useState({});
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const fecthDatas = async (pageNumber = 0) => {
        try {
            const response = await topicService.getAll(pageNumber, pageSize);
            if (response.code === 200) {
                setTopics(response.data);
                setPage(response.currentPage);
                setTotalPages(response.totalPages);
            }
        } catch (e) {
            console.log("lỗi : ", e);
        }
    };

    const fetchLevels = async () => {
        try {
            const res = await levelService.findAll();
            setLevels(res.data);
        } catch (e) {
            console.log("Lỗi fetch level: ", e);
        }
    };

    const handlerShowForm = (id, name, describes, levelId) => {
        setModal(true);
        setIdUpdate(id);
        setTopic({ name, describes, levelId });
        fetchLevels(); // <== Lấy levels khi mở form
    };

    const handlerInput = (e) => {
        const { name, value } = e.target;
        setTopic({ ...topic, [name]: value });
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await topicService.update(idUpdate, topic);
            if (res.code === 200) {
                alert(res.message);
                setModal(false);
                fecthDatas(page)
            }
        } catch (e) {
            console.log("Lỗi update: ", e);
        }
    };
    const handlerShowQuestion = (id) => {
        console.log(" id : ", id);

        navigate(`/question/${id}`)
    }
    useEffect(() => {
        fecthDatas(page);
    }, [page]);
    // 1. Group topics theo levelName
    const groupedTopics = topics.reduce((acc, topic) => {
        if (!acc[topic.levelName]) {
            acc[topic.levelName] = [];
        }
        acc[topic.levelName].push(topic);
        return acc;
    }, {});
    console.log("topics : ", topics);

    return (
        <>
            {modal ? (
                <div className="w-full h-full p-6">
                    <div className="flex justify-center items-center pt-5 pb-8">
                        <h1 className="font-bold text-2xl text-gray-800">Cập nhật chủ đề</h1>
                    </div>
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Tên chủ đề
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={topic.name}
                                        onChange={handlerInput}
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập tên chủ đề"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="describes" className="block text-sm font-medium text-gray-700">
                                    Mô tả
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        value={topic.describes}
                                        onChange={handlerInput}
                                        id="describes"
                                        name="describes"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập mô tả chủ đề"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="levelId" className="block text-sm font-medium text-gray-700">
                                    Cấp độ (Level)
                                </label>
                                <div className="mt-1">
                                    <select
                                        value={topic.levelId || ""}
                                        onChange={handlerInput}
                                        id="levelId"
                                        name="levelId"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">-- Chọn cấp độ --</option>
                                        {levels.map(level => (
                                            <option key={level.id} value={level.id}>
                                                {level.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
                        <h1 className="font-bold text-2xl">Quản lý Topic</h1>
                    </div>
                    <div className="flex justify-around items-center pt-5">
                        <div className="w-3/6">
                            <input
                                type="text"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Tìm kiếm theo tên chủ đề..."
                            />
                        </div>
                        <Link
                            to="/topic/add"
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
                                    <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Level</th>
                                    <th className="px-5 py-3 text-left text-sm font-semibold uppercase pl-24">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {/* {topics.map(item => (
                                    <tr className="hover:bg-gray-50 transition duration-200" key={item.id}>
                                        <td className="px-5 py-4 text-sm text-gray-800">{item.id}</td>
                                        <td className="px-5 py-4 text-sm text-gray-800">{item.name}</td>
                                        <td className="px-5 py-4 text-sm text-gray-800">{item.describes}</td>
                                        <td className="px-5 py-4 text-sm text-gray-800">{item.levelName}</td>
                                        <td className="px-5 py-4 text-sm flex justify-around items-center">
                                            <button
                                                onClick={() => handlerShowForm(item.id, item.name, item.describes, item.levelId)}
                                                className="flex items-center gap-2 px-4 py-1 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition duration-200"
                                            >
                                                <i className="fas fa-pen"></i>
                                                <span>Sửa</span>
                                            </button>
                                            <button
                                                onClick={() => handlerShowQuestion(item.id)}
                                                className="flex items-center gap-2 px-4 py-1 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition duration-200"
                                            >
                                                <i className="fa-solid fa-list"></i>
                                                <span>List Questions</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))} */}
                                {Object.entries(groupedTopics).map(([levelName, topicsByLevel]) => {
                                    // 🎨 Random màu nền cho từng group level
                                    const bgColors = ["bg-pink-400", "bg-yellow-300", "bg-green-300", "bg-blue-300", "bg-purple-300"];
                                    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

                                    return (
                                        <React.Fragment key={levelName}>
                                            <tr className={randomBg}>
                                                <td colSpan="5" className="px-5 py-1 text-lg font-semibold text-center text-gray-700 uppercase">
                                                    {levelName}
                                                </td>
                                            </tr>

                                            {topicsByLevel.map(item => (
                                                <tr className="hover:bg-gray-50 transition duration-200" key={item.id}>
                                                    <td className="px-5 py-4 text-sm text-gray-800">{item.id}</td>
                                                    <td className="px-5 py-4 text-sm text-gray-800">{item.name}</td>
                                                    <td className="px-5 py-4 text-sm text-gray-800">{item.describes}</td>
                                                    <td className="px-5 py-4 text-sm text-gray-800">{item.levelName}</td>
                                                    <td className="px-5 py-4 text-sm flex justify-around items-center">
                                                        <button
                                                            onClick={() => handlerShowForm(item.id, item.name, item.describes, item.levelId)}
                                                            className="flex items-center gap-2 px-4 py-1 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition duration-200"
                                                        >
                                                            <i className="fas fa-pen"></i>
                                                            <span>Sửa</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handlerShowQuestion(item.id)}
                                                            className="flex items-center gap-2 px-4 py-1 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition duration-200"
                                                        >
                                                            <i className="fa-solid fa-list"></i>
                                                            <span>List Questions</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
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
            )}
        </>
    );
}

export default Topic;
