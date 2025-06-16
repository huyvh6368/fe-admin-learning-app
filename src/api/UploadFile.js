import axios from 'axios';

/**
 * Upload file ảnh lên server
 * @param {File} file - File ảnh cần upload
 * @returns {Promise<{ url: string }>} - Trả về object chứa link ảnh
 */
export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:8080/api/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // Ví dụ: { url: 'http://localhost:8080/images/abc.jpg' }
    } catch (error) {
        console.error('Lỗi khi upload ảnh:', error);
        throw error;
    }
};
