import { useState } from "react";
import levelService from "../../api/levelService";
import { useNavigate } from "react-router-dom";
import { FullScreenLoader } from "../../component/AnimationLoad"
// Loader toàn màn hình


function AddLevel() {
    const [level, setLevel] = useState({});
    const [isLoad, setIsLoad] = useState(false);
    const navigate = useNavigate();

    const handlerInput = (e) => {
        const { name, value } = e.target;
        setLevel({ ...level, [name]: value });
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoad(true);
            const res = await levelService.add(level);
            if (res.code === 200) {
                alert(res.message);
                navigate("/level");
            }
            console.log("res : ", res);
        } catch (e) {
            console.log(e);
        }
        setIsLoad(false);
    };

    const handlerBack = () => {
        navigate("/level");
    };

    return (
        <div className="w-full h-full p-6 relative">
            {isLoad && <FullScreenLoader />}
            <div className="flex justify-center items-center pt-5 pb-8">
                <h1 className="font-bold text-2xl text-gray-800">Thêm mới level</h1>
            </div>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Tên level
                        </label>
                        <div className="mt-1">
                            <input
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
                                onChange={handlerInput}
                                id="describes"
                                name="describes"
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mô tả level"
                            />
                        </div>
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
    );
}

export default AddLevel;
