import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import answerService from '../../api/answerService';
import AddAnswer from './AddAnswer'
import questionService from '../../api/questionService';

function Answer() {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState({})
    const { id } = useParams();
    console.log("id : ", id);

    const findQuestionById = async (id) => {
        try {
            const res = await questionService.getById(id)
            console.log("res : ", res)
            setQuestion(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDatas = async (questionId) => {
        try {
            const res = await answerService.getAll(questionId);
            console.log("res: ", res);
            if (res.code === 200) {
                setAnswers(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDatas(id);
        findQuestionById(id)
    }, []);

    const handlerDelete = async (idDelete) => {
        try {
            const res = await answerService.delete(idDelete);
            if (res.code === 200) {
                alert(res.message);
                fetchDatas(id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = (answer) => {
        setCurrentAnswer(answer);
        setEditModal(true);
    };

    const handleUpdateAnswer = async (e) => {
        e.preventDefault();
        try {
            const res = await answerService.update(currentAnswer.id, currentAnswer);
            if (res.code === 200) {
                fetchDatas(id); // Refresh the list
                setEditModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentAnswer({
            ...currentAnswer,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <>
            {modal ? (
                <AddAnswer question={question} />
            ) : (
                <div className="w-full h-full">
                    {/* Edit Modal */}
                    {editModal && currentAnswer && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg w-1/3">
                                <h2 className="text-xl font-bold mb-4">Edit Answer</h2>
                                <form onSubmit={handleUpdateAnswer}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={currentAnswer.name || ''}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 flex items-center">
                                        <input
                                            type="checkbox"
                                            id="correct"
                                            name="correct"
                                            checked={currentAnswer.correct || false}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="correct" className="text-gray-700 text-sm font-bold">
                                            Correct Answer
                                        </label>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setEditModal(false)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center items-center pt-5">
                        <h1 className="font-bold text-2xl">Quản lý Answer</h1>
                    </div>
                    <div className="flex justify-around items-center pt-5">
                        <div className="w-3/6">
                            <input
                                type="text"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Tìm kiếm theo tên câu trả lời..."
                            />
                        </div>
                        <button
                            onClick={() => setModal(true)}
                            className="flex items-center gap-2 px-4 py-1 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition duration-200 mr-10"
                        >
                            <i className="fas fa-plus"></i>
                            <span>Thêm</span>
                        </button>
                    </div>
                    <div className="w-[80%] mx-auto overflow-x-auto pt-10">
                        <table className="w-full table-auto border-collapse bg-white rounded-xl">
                            <thead className="bg-black text-white rounded-t-xl">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">STT</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">question</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Đáp án đúng</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase pl-24">Acctions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {answers.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-sm text-gray-800">{item.id}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800">{item.questionName}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800">{item.correct ? "chính xác" : "Sai"}</td>
                                        <td className="px-4 py-3 text-sm flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => handleEditClick(item)}
                                                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                                            >
                                                <i className="fas fa-pen"></i>
                                                <span>Sửa</span>
                                            </button>
                                            <button
                                                onClick={() => handlerDelete(item.id)}
                                                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default Answer;