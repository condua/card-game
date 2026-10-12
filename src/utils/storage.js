export const STORAGE_KEY = 'student_challenge_data';

export const saveToStorage = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Lỗi khi lưu dữ liệu", e);
    }
};

export const loadFromStorage = (defaultData) => {
    try {
        const item = localStorage.getItem(STORAGE_KEY);
        return item ? JSON.parse(item) : defaultData;
    } catch (e) {
        console.error("Lỗi khi tải dữ liệu", e);
        return defaultData;
    }
};