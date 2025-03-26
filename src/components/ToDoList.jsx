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
        <div className="p-6 bg-gray-100 rounded shadow-md min-w-sm mx-auto">
            <div className="p-8 bg-white rounded-xl shadow-2xl border border-blue-100 w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <h3 className="text-3xl font-extrabold text-center mb-6 text-blue-900">
                    To-Do List
                </h3>
                <div className="flex mb-6">
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter a task"
                        className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-lg shadow-md transform active:scale-95 transition-all duration-100"
                    >
                        Add
                    </button>
                </div>
                <ul className={`space-y-4 ${animation}`}>
                    {tasks.map((t, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow"
                        >
                            <span>{t}</span>
                            <button
                                onClick={() => handleRemoveTask(index)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-md transform active:scale-95 transition-all duration-100"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                {tasks.length > 0 && (
                    <button
                        onClick={handleClearTasks}
                        className="mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transform active:scale-95 transition-all duration-100"
                    >
                        Clear All
                    </button>
                )}
                {tasks.length === 0 && (
                    <p className="text-center mt-6 text-sm text-gray-500 italic">
                        No tasks added yet. Start by adding a task above!
                    </p>
                )}
            </div>
        </div>
    );
}

export default ToDoList;
