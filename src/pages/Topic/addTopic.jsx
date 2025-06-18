import { useEffect, useState } from "react";
import levelService from "../../api/levelService";
import topicService from "../../api/topicService";
import { useNavigate } from "react-router-dom";
import { FullScreenLoader } from "../../component/AnimationLoad"
function AddTopic() {
    const [isLoad, setIsLoad] = useState(false);
    const [levels, setLevels] = useState([]);
    const [topic, setTopic] = useState({
        name: "",
        describes: "",
        levelId: ""
    });

    const navigate = useNavigate();

    const fetchLevels = async () => {
        try {
            const res = await levelService.findAll();
            setLevels(res.data);
        } catch (e) {
            console.log("Lỗi khi lấy danh sách level:", e);
        }
    };

    useEffect(() => {
        fetchLevels();
    }, []);

    const handlerInput = (e) => {
        const { name, value } = e.target;
        setTopic({ ...topic, [name]: value });
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoad(true)
            const res = await topicService.add(topic); // 👈 Giả sử có phương thức add trong topicService
            if (res.code === 200) {
                alert(res.message);
                navigate("/topic");
            }
        } catch (e) {
            console.log("Lỗi khi thêm topic:", e);
        }
        setIsLoad(false)
    };

    const handlerBack = () => {
        navigate("/topic");
    };

    return (
        <>
            {isLoad && <FullScreenLoader />}
            <div className="w-full h-full p-6">
                <div className="flex justify-center items-center pt-5 pb-8">
                    <h1 className="font-bold text-2xl text-gray-800">Thêm mới Topic</h1>
                </div>
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
                    <form className="space-y-6" onSubmit={handlerSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Tên topic
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handlerInput}
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={topic.name}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên topic"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="describes" className="block text-sm font-medium text-gray-700">
                                Mô tả
                            </label>
                            <div className="mt-1">
                                <textarea
                                    onChange={handlerInput}
                                    id="describes"
                                    name="describes"
                                    value={topic.describes}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mô tả topic"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="levelId" className="block text-sm font-medium text-gray-700">
                                Chọn level
                            </label>
                            <select
                                id="levelId"
                                name="levelId"
                                value={topic.levelId}
                                onChange={handlerInput}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">-- Chọn level --</option>
                                {levels.map((lv) => (
                                    <option key={lv.id} value={lv.id}>
                                        {lv.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                onClick={handlerBack}
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Lưu lại
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddTopic;
