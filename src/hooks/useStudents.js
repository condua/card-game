import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const DEFAULT_STUDENTS = [
    'An', 'Bình', 'Chi', 'Dũng', 'Hà', 'Lan', 'Minh', 'Ngọc', 'Phúc', 'Quân', 'Thảo', 'Tuấn'
].map(name => ({ id: crypto.randomUUID(), name, status: 'idle' })); // status: idle, done, absent, skip

export function useStudents() {
    const [students, setStudents] = useState(() => {
        const data = loadFromStorage(null);
        return data && data.students ? data.students : DEFAULT_STUDENTS;
    });

    useEffect(() => {
        saveToStorage({ students });
    }, [students]);

    const addStudent = (name) => {
        if (!name.trim()) return;
        setStudents(prev => [...prev, { id: crypto.randomUUID(), name: name.trim(), status: 'idle' }]);
    };

    const removeStudent = (id) => {
        setStudents(prev => prev.filter(s => s.id !== id));
    };

    const updateStatus = (id, status) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };

    const importList = (textList) => {
        const names = textList.split('\n').map(n => n.trim()).filter(n => n !== '');
        const newStudents = names.map(name => ({ id: crypto.randomUUID(), name, status: 'idle' }));
        setStudents(newStudents); // Replace current list
    };

    const resetAllStatus = () => {
        setStudents(prev => prev.map(s => ({ ...s, status: 'idle' })));
    };

    const getEligibleStudents = () => students.filter(s => s.status === 'idle');

    return {
        students,
        addStudent,
        removeStudent,
        updateStatus,
        importList,
        resetAllStatus,
        getEligibleStudents,
        setStudents // Exposed for full reset/import
    };
}