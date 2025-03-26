import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Edit2, Save, X } from 'lucide-react';

function Notes() {
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState({ show: false, index: null });
    const [searchTerm, setSearchTerm] = useState("");

    // Load notes from local storage on initial render
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    // Save notes to local storage whenever notes change
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleAddNote = () => {
        if (noteInput.trim()) {
            if (editingIndex !== null) {
                // Update existing note
                const updatedNotes = [...notes];
                updatedNotes[editingIndex] = noteInput.trim();
                setNotes(updatedNotes);
                setEditingIndex(null);
            } else {
                // Add new note
                setNotes([...notes, {
                    text: noteInput.trim(),
                    createdAt: new Date().toISOString()
                }]);
            }
            setNoteInput("");
        }
    };

    const handleDeleteNote = (index) => {
        setShowDeleteConfirm({ show: true, index });
    };

    const confirmDeleteNote = () => {
        setNotes(notes.filter((_, i) => i !== showDeleteConfirm.index));
        setShowDeleteConfirm({ show: false, index: null });
    };

    const handleEditNote = (index) => {
        setNoteInput(notes[index].text || notes[index]);
        setEditingIndex(index);
    };

    const cancelEdit = () => {
        setNoteInput("");
        setEditingIndex(null);
    };

    const filteredNotes = notes.filter(note => 
        (typeof note === 'string' ? note : note.text)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-xs mx-auto bg-blue-50 shadow-xl rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h1 className="text-2xl font-bold text-white text-center">
                    Notes
                </h1>
                <div className="mt-2">
                    <input 
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-1 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                    />
                </div>
            </div>

            <div className="p-4">
                <div className="mb-4">
                    <textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Write a note..."
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 resize-none text-sm"
                        rows={3}
                    />
                    <div className="flex space-x-2">
                        {editingIndex !== null ? (
                            <>
                                <button 
                                    onClick={handleAddNote}
                                    className="flex-1 bg-blue-500 text-white py-1 rounded-lg flex items-center justify-center hover:bg-blue-600 transition text-sm"
                                >
                                    <Save className="mr-1" size={16} /> Update
                                </button>
                                <button 
                                    onClick={cancelEdit}
                                    className="flex-1 bg-gray-300 text-gray-700 py-1 rounded-lg flex items-center justify-center hover:bg-gray-400 transition text-sm"
                                >
                                    <X className="mr-1" size={16} /> Cancel
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={handleAddNote}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
                                disabled={!noteInput.trim()}
                            >
                                <Plus className="mr-2" size={18} /> Add Note
                            </button>
                        )}
                    </div>
                </div>

                {filteredNotes.length === 0 ? (
                    <div className="text-center text-blue-500 italic py-4">
                        {searchTerm ? "No notes match your search" : "No notes yet. Start adding some!"}
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {filteredNotes.map((note, index) => {
                            const noteText = typeof note === 'string' ? note : note.text;
                            return (
                                <li 
                                    key={index} 
                                    className="bg-blue-100 rounded-lg p-3 flex justify-between items-center hover:bg-blue-200 transition"
                                >
                                    <span className="flex-grow mr-2 text-sm truncate">{noteText}</span>
                                    <div className="flex space-x-1">
                                        <button 
                                            onClick={() => handleEditNote(index)}
                                            className="text-blue-500 hover:text-blue-700 transition"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteNote(index)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {showDeleteConfirm.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full">
                        <h2 className="text-lg font-semibold mb-3 text-center">Confirm Deletion</h2>
                        <p className="text-center mb-4 text-gray-600 text-sm">
                            Are you sure you want to delete this note?
                        </p>
                        <div className="flex space-x-3">
                            <button 
                                onClick={confirmDeleteNote}
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => setShowDeleteConfirm({ show: false, index: null })}
                                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notes;