import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { uploadFile } from "../../api/UploadFile";
import QuestionService from '../../api/QuestionService';
function Question() {
    const [modal, setModal] = useState(false)
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({})
    const { id } = useParams();
    const [showImage, setShowImage] = useState(null)
    const navigator = useNavigate();
    const fetchDatas = async (topicId) => {
        try {
            const res = await QuestionService.getAll(topicId);
            console.log("ress : ", res);
            if (res.code === 200) {
                setQuestions(res.data)
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchDatas(id)
    }, [])
    console.log("questions: ", questions);
    const handlerShowForm = (id) => {
        let question = questions.find(item => {
            return item.id === id
        })
        setQuestion(question)
        setModal(true)
        console.log(" question : ", question);
    }
    const handlerBack = () => {
        setModal(false)
    }
    //  ham cua modal update 
    const handlerInput = (e) => {
        const { name, value } = e.target;
        setQuestion({ ...question, [name]: value });
    };
    const handlerSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = "";
            if (question.imgUrl instanceof File) {
                // Trường hợp là file
                const result = await uploadFile(question.imgUrl);
                console.log("Thông tin tải ảnh:", result);
                if (result.url) {
                    imageUrl = result.url;
                }
            } else {
                // Nếu đã là URL (trường hợp update chẳng hạn)
                imageUrl = question.imgUrl;
            }

            // Tạo biến mới chứa ảnh đã upload
            const updatedQuestion = {
                ...question,
                imgUrl: imageUrl,
                score: parseInt(question.score), // đảm bảo đúng kiểu
            };

            const res = await QuestionService.update(question.id, updatedQuestion);
            if (res.code === 200) {
                alert(res.message)
                fetchDatas(id)
                setModal(false)
            }
        } catch (e) {
            console.error("Lỗi khi thêm question:", e);
            alert("Lỗi khi thêm câu hỏi");
        }
    };
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
    console.log("question : ", question);

    return (

        <>
            {modal
                ? (
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Ảnh hiển thị bên trái */}
                            <div className="md:w-1/2 flex justify-center items-center">
                                <img
                                    src={showImage != null ? showImage : question.imgUrl}
                                    alt="url-img"
                                    className="w-80 h-auto rounded-md shadow-md"
                                />
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
                    </div >
                ) : (
                    <div className="w-full h-full">
                        <div className="flex justify-center items-center pt-5">
                            <h1 className="font-bold text-2xl">Quản lý Question</h1>
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
                                to={`/question/add/${id}`}
                                className="flex items-center gap-2 px-4 py-1 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition duration-200 mr-10"
                            >
                                <i className="fas fa-plus"></i>
                                <span>Thêm</span>
                            </Link>
                        </div>
                        <div className="w-[80%] mx-auto overflow-x-auto pt-10 ">
                            <table className="w-full table-auto border-collapse bg-white rounded-xl">
                                <thead className="bg-black text-white rounded-t-xl">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase">STT</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase">IMG</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Title</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Score</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Topic</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase pl-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {questions.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-sm text-gray-800">{item.id}</td>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={item.imgUrl}
                                                    alt="img"
                                                    className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{item.title}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{item.score}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{item.topicName}</td>
                                            <td className="px-4 py-3 text-sm flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => handlerShowForm(item.id)}
                                                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                                                >
                                                    <i className="fas fa-pen"></i>
                                                    <span>Sửa</span>
                                                </button>
                                                <Link
                                                    to={`/answer/${item.id}`}
                                                    className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
                                                >
                                                    <i className="fa-solid fa-list"></i>
                                                    <span>List Answer</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }

        </>
    );
}

export default Question;
