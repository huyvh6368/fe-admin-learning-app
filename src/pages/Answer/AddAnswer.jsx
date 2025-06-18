import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import answerService from '../../api/answerService';
import { FullScreenLoader } from "../../component/AnimationLoad"
function AddAnswer({ question }) {
    const navigate = useNavigate();
    const [listAnswer, setListAnswer] = useState([1]);
    const [answers, setAnswers] = useState({});
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const handlerInputAnswer = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlerRadioChange = (e) => {
        setCorrectAnswer(parseInt(e.target.value));
    };

    const addMoreAnswer = () => {
        setListAnswer(prev => [...prev, prev.length + 1]);
    };

    const handlerSubmitAnswer = async (e) => {
        e.preventDefault();
        setIsLoad(true)
        const submittedAnswers = listAnswer.map(item => ({
            name: answers[`answers${item}`] || '',
            id_question: question.id,
            is_correct: item === correctAnswer
        }));

        console.log('Submitted Answers:', submittedAnswers);
        try {
            const results = await Promise.all(
                submittedAnswers.map(async (item) => {
                    const data = {
                        name: item.name,
                        questionId: item.id_question,
                        correct: item.is_correct
                    };
                    const res = await answerService.add(data);
                    return res;
                })
            );
            setIsLoad(false)
            // Kiểm tra nếu tất cả thành công (nếu backend trả về status code)
            if (results.every(res => res.code === 200)) {
                navigate(`/question/${question.topicId}`);
            }
        } catch (error) {
            console.log("Error submitting answers:", error);
        }
    };
    return (
        <>
            {isLoad && <FullScreenLoader />}
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cột trái - Thông tin câu hỏi */}
                    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">📘 Thông tin câu hỏi</h2>

                        <div className="space-y-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tiêu đề:</label>
                                <p className="text-lg font-medium text-gray-900 bg-gray-50 p-3 rounded">{question.title}</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Mô tả:</label>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded min-h-[80px]">{question.describes}</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Điểm:</label>
                                        <p className="text-gray-900 bg-gray-50 p-3 rounded">{question.score} điểm</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Chủ đề:</label>
                                        <p className="text-gray-800 bg-gray-50 p-3 rounded">#{question.topicId}</p>
                                    </div>
                                </div>
                                {question.imgUrl && (
                                    <div className="mb-4 ">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Hình ảnh:</label>
                                        <img
                                            src={question.imgUrl}
                                            alt="Hình ảnh câu hỏi"
                                            className="max-w-40 h-auto mt-2 rounded shadow border"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Cột phải - Thêm đáp án */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">✏️ Thêm đáp án</h2>

                        <form onSubmit={handlerSubmitAnswer} className="space-y-4">
                            {listAnswer.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-4 bg-blue-50 rounded-lg p-4"
                                >
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Đáp án {item}:
                                        </label>
                                        <input
                                            type="text"
                                            name={`answers${item}`}
                                            value={answers[`answers${item}`] || ''}
                                            onChange={handlerInputAnswer}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder={`Nhập nội dung đáp án ${item}`}
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center mt-6">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <span className="mr-2 text-sm font-medium text-gray-700">Đúng</span>
                                            <div className="relative">
                                                <input
                                                    type="radio"
                                                    name="correctAnswer"
                                                    value={item}
                                                    checked={correctAnswer === item}
                                                    onChange={handlerRadioChange}
                                                    className="sr-only"
                                                />
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center 
                                                ${correctAnswer === item ? 'border-green-500 bg-green-100' : 'border-gray-300'}`}>
                                                    {correctAnswer === item && (
                                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                    )}
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={addMoreAnswer}
                                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Thêm đáp án
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Lưu đáp án
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddAnswer;