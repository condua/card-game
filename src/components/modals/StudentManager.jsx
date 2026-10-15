import React, { useState } from 'react';
import { X, UserPlus, Trash2, Save, RefreshCw } from 'lucide-react';

export function StudentManager({ studentsManager, onClose }) {
    const [inputText, setInputText] = useState('');
    const { students, removeStudent, importList, resetAllStatus } = studentsManager;

    const handleImport = () => {
        if (inputText.trim()) {
            importList(inputText);

        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-game-board border border-game-primary/30 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(139,92,246,0.2)]">

                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="text-2xl font-black text-game-glow">Quản Lý Lớp Học</h2>
                    <button onClick={onClose} className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Cột trái: Nhập danh sách  ----- */}
                    <div className="w-full md:w-1/3 p-6 border-r border-white/10 flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Nhập nhanh (Mỗi dòng 1 tên)</label>
                            <textarea
                                className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-game-primary resize-none placeholder-gray-600"
                                placeholder="Ví dụ copy từ Excel:&#10;Nguyễn Văn A&#10;Trần Thị B..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleImport}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-game-primary hover:bg-game-primary/80 text-white font-bold rounded-xl transition-colors"
                        >
                            <Save size={18} /> Lưu Danh Sách Mới
                        </button>
                        <p className="text-xs text-gray-500">*Lưu ý: Thao tác này sẽ ghi đè danh sách hiện tại.</p>
                    </div>

                    {/* Cột phải: Danh sách hiện tại */}
                    <div className="w-full md:w-2/3 p-6 flex flex-col h-full overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-white">
                                Tổng số: <span className="text-game-secondary">{students.length}</span> học sinh
                            </h3>
                            <button
                                onClick={resetAllStatus}
                                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                            >
                                <RefreshCw size={16} /> Reset Trạng Thái (Bắt đầu vòng mới)
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {students.map((student, index) => (
                                    <div key={student.id} className="flex items-center justify-between p-3 bg-black/30 border border-white/5 rounded-lg hover:border-white/20 group transition-colors">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <span className="text-gray-500 font-mono text-sm w-6">{index + 1}.</span>
                                            <span className="font-medium text-gray-200 truncate">{student.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {/* Badge trạng thái */}
                                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${student.status === 'done' ? 'bg-emerald-500/20 text-emerald-400' :
                                                student.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                                                    student.status === 'skip' ? 'bg-gray-500/20 text-gray-400' :
                                                        'bg-game-primary/20 text-game-glow'
                                                }`}>
                                                {student.status === 'idle' ? 'Chưa gọi' :
                                                    student.status === 'done' ? 'Đã gọi' :
                                                        student.status === 'absent' ? 'Vắng' : 'Gọi lại'}
                                            </span>
                                            <button
                                                onClick={() => removeStudent(student.id)}
                                                className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Xóa"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {students.length === 0 && (
                                    <div className="col-span-2 text-center text-gray-500 py-10">
                                        Danh sách đang trống. Vui lòng nhập từ cột bên trái.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}