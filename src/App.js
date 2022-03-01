import React, { useState, useReducer } from "react";
import "./App.scss";

//uuid
import { v4 as uuid } from "uuid";

const initialState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalNotes: state.notes.length + 1,
        notes: [...state.notes, action.payload],
      };
      console.log(newState);
      return newState;
    }

    case "DELETE_NOTE" : {
      const newState = {
        ...state ,
        totalNotes : state.notes.length - 1 ,
        notes : state.notes.filter(note => note.id !== action.payload.id)
      }

      return newState
    }

    default:
      return state;
  }
};

const App = () => {
  const [noteInput, setNoteInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNote = (event) => {
    event.preventDefault();

    if (!noteInput) {
      return;
    }

    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 20),
    };

    dispatch({ type: "ADD_NOTE", payload: newNote });
    setNoteInput("");
  };

  const dropNote = (event) => {
    event.target.style.left = `${event.pageX - 50}px`;
    event.target.style.top = `${event.pageY - 50}px`;
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className="app" onDragOver={dragOver}>
      <h1>Sticky Notes ({state.totalNotes})
      <span> {state.totalNotes > 0 ? `Last note created : ${state.lastNoteCreated}` : ''} </span>
       </h1>

      <form onSubmit={addNote} className="note-form">
        <textarea
          placeholder="Create a new note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        ></textarea>
        <button>Add</button>
      </form>

      {state.notes.map((note) => (
        <div
          className="note"
          key={note.id}
          style={{ transform: `rotate(${note.rotate}deg)` }}
          draggable="true"
          onDragEnd={dropNote}
        >
          <div className="close" onClick={() => dispatch({type : 'DELETE_NOTE' , payload : note})}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <pre className="text">{note.text}</pre>
        </div>
      ))}
    </div>
  );
};

export default App;
