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
        <div className="p-4 sm:p-6 bg-gray-100 rounded shadow-md max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
            <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl border border-blue-100 w-full">
                <h3 className="text-xl sm:text-2xl font-extrabold text-center mb-2 sm:mb-4 text-blue-900">
                    Counter
                </h3>
                <div 
                    className={`text-3xl sm:text-5xl font-bold text-center mb-4 sm:mb-6 ${getCountColor()} ${animation}`}
                >
                    {count}
                </div>
                <div className="flex justify-center space-x-2 sm:space-x-3">
                    <button
                        onClick={handleDecrement}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group"
                    >
                        <span className="text-lg sm:text-xl">-</span>
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group"
                    >
                        <span className="text-md sm:text-lg">Reset</span>
                    </button>
                    <button
                        onClick={handleIncrement}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 group"
                    >
                        <span className="text-lg sm:text-xl">+</span>
                    </button>
                </div>
                {count !== 0 && (
                    <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 italic">
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