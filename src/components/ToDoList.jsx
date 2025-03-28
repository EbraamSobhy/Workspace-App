import { useState } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [animation, setAnimation] = useState("");

    const handleAddTask = () => {
        if (task.trim()) {
            setTasks([...tasks, task]);
            setTask("");
            setAnimation("animate-bounce");
            setTimeout(() => setAnimation(""), 500);
        }
    };

    const handleRemoveTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
        setAnimation("animate-shake");
        setTimeout(() => setAnimation(""), 500);
    };

    const handleClearTasks = () => {
        setTasks([]);
        setAnimation("animate-pulse");
        setTimeout(() => setAnimation(""), 500);
    };

    return (
        <div className="px-1 py-5 bg-gray-100 rounded shadow-md max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl">
            <div className="p-6 bg-white rounded-xl shadow-2xl border border-blue-100 w-full max-w-lg">
                <h3 className="text-xl sm:text-2xl font-extrabold text-center mb-4 text-blue-900">
                    To-Do List
                </h3>
                <div className="flex mb-4 w-full max-w-md mx-auto">
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter a task"
                        className="flex-1 px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-w-0"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-lg shadow-md transform active:scale-95 transition-all duration-100 text-base"
                    >
                        Add
                    </button>
                </div>
                <ul className={`space-y-4 ${animation}`}>
                    {tasks.map((t, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow text-base sm:text-lg"
                        >
                            <span>{t}</span>
                            <button
                                onClick={() => handleRemoveTask(index)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow-md transform active:scale-95 transition-all duration-100 text-sm sm:text-base"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                {tasks.length > 0 && (
                    <button
                        onClick={handleClearTasks}
                        className="mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100 text-base sm:text-lg"
                    >
                        Clear All
                    </button>
                )}
                {tasks.length === 0 && (
                    <p className="text-center mt-6 text-sm sm:text-base text-gray-500 italic">
                        No tasks added yet. Start by adding a task above!
                    </p>
                )}
            </div>
        </div>
    );
}

export default ToDoList;
