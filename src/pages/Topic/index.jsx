import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import topicService from "../../api/TopicService";
import levelService from "../../api/LevelService"; // <== Thêm dòng này
import { Link } from "react-router-dom";

function Topic() {
    const [topics, setTopics] = useState([]);
    const [levels, setLevels] = useState([]); // <== Thêm state levels
    const [modal, setModal] = useState(false);
    const [idUpdate, setIdUpdate] = useState(0);
    const [topic, setTopic] = useState({});

    const navigate = useNavigate();

    const fetchDatas = async () => {
        try {
            const response = await topicService.getAll(0, 10);
            if (response.code === 200) setTopics(response.data);
        } catch (e) {
            console.log("Lỗi fetch topic: ", e);
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
                fetchDatas();
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
        fetchDatas();
    }, []);

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
                                {topics.map(item => (
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
                                                <i className="fa-solid fa-eye"></i>
                                                <span>view</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <link
                            rel="stylesheet"
                            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Topic;
