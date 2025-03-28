import React ,{ useState, useRef } from "react";
import Draggable from "react-draggable";
import { FaPlus, FaList, FaStopwatch, FaStickyNote } from "react-icons/fa";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import Counter from "./components/Counter";
import ToDoList from "./components/ToDoList";
import Timer from "./components/Timer";
import Notes from "./components/Notes";

function Workspace() {
    const [isOpen, setIsOpen] = useState(false);
    const [widgets, setWidgets] = useState([]);
    const draggableRefs = useRef({});

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const addWidget = (type) => {
        const id = Date.now();
        draggableRefs.current[id] = React.createRef();
        setWidgets([...widgets, { id, type }]);
    };

    // Function to remove a widget
    const removeWidget = (id) => {
        delete draggableRefs.current[id]; // Remove the ref for the widget
        setWidgets(widgets.filter((widget) => widget.id !== id));
    };

    return (
        <div>
            <h1 className="absolute top-4 left-4 text-xl font-bold text-stone-50">My Workspace</h1>
            <div className="fixed bottom-10 right-10 flex flex-col items-center space-y-2 md:space-y-4">
                {widgets.map((widget) => (
                    <Draggable key={widget.id} nodeRef={draggableRefs.current[widget.id]}>
                        <div ref={draggableRefs.current[widget.id]} className="absolute p-4 bg-white shadow-lg rounded-lg w-64 md:w-80">
                            <button
                                className="absolute top-1 right-2 text-red-500"
                                onClick={() => removeWidget(widget.id)}
                            >
                                ✖
                            </button>
                            {widget.type === "counter" && <Counter />}
                            {widget.type === "todolist" && <ToDoList />}
                            {widget.type === "timer" && <Timer />}
                            {widget.type === "notes" && (
                                    <Notes />

                            )}
                        </div>
                    </Draggable>
                ))}

                {isOpen && (
                    <div className="flex flex-col items-center space-y-2 mb-2 md:space-y-4">
                        <button onClick={() => addWidget("counter")} className="bg-blue-600 p-3 rounded-full shadow-lg" title="Counter">
                            <PiClockCounterClockwiseBold className="text-white" />
                        </button>
                        <button onClick={() => addWidget("todolist")} className="bg-yellow-600 p-3 rounded-full shadow-lg" title="To-Do List">
                            <FaList className="text-white" />
                        </button>
                        <button onClick={() => addWidget("timer")} className="bg-red-600 p-3 rounded-full shadow-lg" title="Timer">
                            <FaStopwatch className="text-white" />
                        </button>
                        <button onClick={() => addWidget("notes")} className="bg-green-600 p-3 rounded-full shadow-lg" title="Notes">
                            <FaStickyNote className="text-white" />
                        </button>
                    </div>
                )}

                <button onClick={toggleMenu} className="bg-white p-4 rounded-full shadow-lg border border-gray-300 md:p-5" title="Toggle Menu">
                    <FaPlus className="text-black" />
                </button>
            </div>
        </div>
    );
}

export default Workspace;
