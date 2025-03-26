import { useState, useEffect } from "react";

function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="p-6 bg-gray-100 rounded shadow-md max-w-xs mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-2xl border border-blue-100 w-full max-w-sm transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-extrabold text-center mb-4 text-blue-900">
                    Timer
                </h3>
                <div className="text-5xl font-bold text-center mb-6 text-gray-800">
                    {formatTime()}
                </div>
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={handleStart}
                        disabled={isRunning}
                        className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Start
                    </button>
                    <button
                        onClick={handleStop}
                        disabled={!isRunning}
                        className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Stop
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Timer;
