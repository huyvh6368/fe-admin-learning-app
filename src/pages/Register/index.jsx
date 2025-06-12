// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../../api/service/authService";

function RegisterPage() {
    // const navigate = useNavigate();
    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: '',
    //     name: '',
    //     gender: true,
    //     address: '',
    //     phone: '',
    //     roles: 'USER'
    // });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleGenderChange = (e) => {
    //     setFormData(prev => ({
    //         ...prev,
    //         gender: e.target.value === 'true'
    //     }));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await authService.register(formData);
    //         console.log("Registration successful:", response);
    //         alert("Bạn đăng ký thành công")
    //         navigate("/login")
    //         // Xử lý sau khi đăng ký thành công (redirect hoặc hiển thị thông báo)
    //     } catch (error) {
    //         console.error("Registration failed:", error);
    //         // Xử lý lỗi
    //     }
    // };

    return (
        // <div className="w-screen min-h-screen bg-sky-300 flex flex-col justify-center items-center p-4">
        //     <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        //         <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký Tài Khoản</h2>

        //         <form onSubmit={handleSubmit} className="space-y-4">
        //             {/* Email */}
        //             <div>
        //                 <label className="block text-sm font-medium mb-1">Email</label>
        //                 <input
        //                     type="text"
        //                     name="email"
        //                     value={formData.email}
        //                     onChange={handleInputChange}
        //                     className="w-full px-3 py-2 border rounded-md"
        //                 />
        //             </div>

        //             {/* Password */}
        //             <div>
        //                 <label className="block text-sm font-medium mb-1">Mật khẩu</label>
        //                 <input
        //                     type="password"
        //                     name="password"
        //                     value={formData.password}
        //                     onChange={handleInputChange}
        //                     className="w-full px-3 py-2 border rounded-md"
        //                 />
        //             </div>

        //             {/* Tên */}
        //             <div>
        //                 <label className="block text-sm font-medium mb-1">Họ và tên</label>
        //                 <input
        //                     type="text"
        //                     name="name"
        //                     value={formData.name}
        //                     onChange={handleInputChange}
        //                     className="w-full px-3 py-2 border rounded-md"
        //                 />
        //             </div>

        //             {/* Giới tính */}
        //             <div>
        //                 <label className="block text-sm font-medium mb-1">Giới tính</label>
        //                 <div className="flex space-x-4">
        //                     <label className="inline-flex items-center">
        //                         <input
        //                             type="radio"
        //                             name="gender"
        //                             value="true"
        //                             checked={formData.gender === true}
        //                             onChange={handleGenderChange}
        //                             className="mr-2"
        //                         />
        //                         Nam
        //                     </label>
        //                     <label className="inline-flex items-center">
        //                         <input
        //                             type="radio"
        //                             name="gender"
        //                             value="false"
        //                             checked={formData.gender === false}
        //                             onChange={handleGenderChange}
        //                             className="mr-2"
        //                         />
        //                         Nữ
        //                     </label>
        //                 </div>
        //             </div>

        //             {/* Địa chỉ */}
        //             <div>
        //                 <label className="block text-sm font-medium mb-1">Địa chỉ</label>
        //                 <input
        //                     type="text"
        //                     name="address"
        //                     value={formData.address}
        //                     onChange={handleInputChange}
        //                     className="w-full px-3 py-2 border rounded-md"
        //                 />
        //             </div>

        //             {/* Số điện thoại */}
        //             <div>
        //                 <label className="block text-sm font-medium mb-1">Số điện thoại</label>
        //                 <input
        //                     type="text"
        //                     name="phone"
        //                     value={formData.phone}
        //                     onChange={handleInputChange}
        //                     className="w-full px-3 py-2 border rounded-md"
        //                 />
        //             </div>

        //             {/* Vai trò (Role) */}
        //             {/* <div>
        //                 <label className="block text-sm font-medium mb-1">Vai trò</label>
        //                 <select
        //                     name="roles"
        //                     value={formData.roles}
        //                     onChange={handleInputChange}
        //                     className="w-full px-3 py-2 border rounded-md"
        //                 >
        //                     <option value="USER">Người dùng</option>
        //                     <option value="ADMIN">Quản trị viên</option>
        //                 </select>
        //             </div> */}

        //             <button
        //                 type="submit"
        //                 className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        //             >
        //                 Đăng Ký
        //             </button>
        //         </form>
        //     </div>
        // </div>
        <h1 className="text-red-500">Form register</h1>
    );
}

export default RegisterPage;