import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { uploadFile } from "../../api/UploadFile";
import questionService from "../../api/QuestionService"
import AddAnswer from "../Answer/AddAnswer";
import { FullScreenLoader } from "../../component/AnimationLoad"
function AddQuestion() {
    const navigate = useNavigate();
    const [isLoad, setIsLoad] = useState(false)
    const [modal, setModal] = useState(false)
    const { id } = useParams();
    const [showImage, setShowImage] = useState(null)
    const [question, setQuestion] = useState({
        topicId: id,
        describes: "",
        title: "",
        imgUrl: "",
        score: "",
    });
    const handlerInput = (e) => {
        const { name, value } = e.target;
        setQuestion({ ...question, [name]: value });
    };
    const handlerSubmit = async (e) => {
        e.preventDefault();
        setIsLoad(true)
        try {
            let imageUrl = "";

            if (question.imgUrl instanceof File) {
                const result = await uploadFile(question.imgUrl);
                console.log("Thông tin tải ảnh:", result);
                if (result.url) {
                    imageUrl = result.url;
                }
            } else {
                imageUrl = question.imgUrl;
            }

            const updatedQuestion = {
                ...question,
                imgUrl: imageUrl,
                score: parseInt(question.score),
            };

            const res = await questionService.add(updatedQuestion);
            if (res.code === 200) {
                // ✅ Cập nhật toàn bộ state question (có imgUrl và id mới)
                setQuestion({
                    ...updatedQuestion,
                    id: res.data.id,
                });
                setIsLoad(false)
                // ✅ Sau khi set xong mới mở modal
                setModal(true);
            }
        } catch (e) {
            console.error("Lỗi khi thêm question:", e);
            alert("Lỗi khi thêm câu hỏi");
        }
    };
    const handlerBack = () => {
        navigate(`/question/${id}`); // 👈 Chuyển hướng khi nhấn Hủy
    };
    console.log("question : ", question);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            setQuestion((prev) => ({
                ...prev,
                imgUrl: file, // hoặc result.get("url") tùy server trả về
            }));
            reader.onloadend = () => {
                setShowImage(reader.result)
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            {isLoad && <FullScreenLoader />}
            <div className="w-full h-full p-6 overflow-y-scroll">
                {modal ? null : <div className="flex justify-center items-center pt-5 pb-8">
                    <h1 className="font-bold text-2xl text-gray-800">Thêm mới Question</h1>
                </div>}
                {modal
                    ? (
                        <AddAnswer question={question} />
                    )
                    : (<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Ảnh hiển thị bên trái */}
                            <div className="md:w-1/2 flex justify-center items-center">
                                {showImage ? (
                                    <img
                                        src={showImage}
                                        alt="Preview"
                                        className="w-80 h-auto rounded-md shadow-md"
                                    />
                                ) : (
                                    <div className="w-full h-64 border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                        Chưa chọn ảnh
                                    </div>
                                )}
                            </div>

                            {/* Form bên phải */}
                            <form onSubmit={handlerSubmit} className="space-y-4 md:w-1/2">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        onChange={handlerInput}
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={question.title}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        placeholder="Nhập tên question"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                                    <input
                                        onChange={handleImageChange}
                                        type="file"
                                        id="imgUrl"
                                        name="imgUrl"
                                        accept="image/*"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score</label>
                                    <input
                                        onChange={handlerInput}
                                        type="text"
                                        id="score"
                                        name="score"
                                        value={question.score}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="describes" className="block text-sm font-medium text-gray-700">Mô tả</label>
                                    <textarea
                                        onChange={handlerInput}
                                        id="describes"
                                        name="describes"
                                        value={question.describes}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        placeholder="Nhập mô tả question"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        onClick={handlerBack}
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Hủy bỏ
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 rounded-md text-sm text-white hover:bg-blue-700"
                                    >
                                        Tiếp Tục
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div >)
                }
            </div >
        </>
    );
}

export default AddQuestion;
