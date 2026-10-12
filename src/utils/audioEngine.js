// Sử dụng Web Audio API để tạo hiệu ứng âm thanh 8-bit/Arcade
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const playTone = (freq, type, duration, vol = 0.1) => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
};

export const sounds = {
    hover: () => playTone(600, 'sine', 0.1, 0.05),
    start: () => {
        playTone(300, 'square', 0.2, 0.1);
        setTimeout(() => playTone(400, 'square', 0.4, 0.1), 200);
    },
    flip: () => playTone(200, 'triangle', 0.3, 0.2),
    reveal: () => {
        playTone(523.25, 'square', 0.1, 0.1); // C5
        setTimeout(() => playTone(659.25, 'square', 0.1, 0.1), 100); // E5
        setTimeout(() => playTone(783.99, 'square', 0.3, 0.1), 200); // G5
        setTimeout(() => playTone(1046.50, 'square', 0.5, 0.1), 300); // C6
    },
    error: () => playTone(150, 'sawtooth', 0.3, 0.1)
};