import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const [animation, setAnimation] = useState("");

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
        setAnimation("animate-bounce");
        setTimeout(() => setAnimation(""), 500);
    };

    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
        setAnimation("animate-shake");
        setTimeout(() => setAnimation(""), 500);
    };

    const handleReset = () => {
        setCount(0);
        setAnimation("animate-pulse");
        setTimeout(() => setAnimation(""), 500);
    };

    const getCountColor = () => {
        if (count > 0) return "text-green-600";
        if (count < 0) return "text-red-600";
        return "text-gray-800";
    };

    return (
        <div className="p-6 bg-gray-100 rounded shadow-md max-w-xs mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-2xl border border-blue-100 w-full max-w-sm transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-extrabold text-center mb-4 text-blue-900">
                    Counter
                </h3>
                <div 
                    className={`text-5xl font-bold text-center mb-6 ${getCountColor()} ${animation}`}
                >
                    {count}
                </div>
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={handleDecrement}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group"
                    >
                        <span className="text-xl">-</span>
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group"
                    >
                        <span className="text-lg">Reset</span>
                    </button>
                    <button
                        onClick={handleIncrement}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group"
                    >
                        <span className="text-xl">+</span>
                    </button>
                </div>
                {count !== 0 && (
                    <div className="text-center mt-6 text-sm text-gray-500 italic">
                        {count > 0 
                            ? `You've incremented ${count} time${count !== 1 ? 's' : ''}`
                            : `You've decremented ${Math.abs(count)} time${Math.abs(count) !== 1 ? 's' : ''}`
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default Counter;