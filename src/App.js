import React, { useReducer, useState } from "react";
import "./App.scss";

const initialState ={
  lastNoteCreated: null ,
  totalNotes : 0 ,
  notes : [] ,
}

const reducer = (state , action) => {
  switch(action.type) {
    case 'ADD_NOTE' : {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0 , 8) ,
        totalNotes : state.notes.length + 1 ,
        notes : [...state , action.payload] ,
      }

      return newState
    }
    default : return state
  }
}

function App() {
  const [noteInput, setNoteInput] = useState("");
  const [notesState , dispatch] = useReducer(reducer , initialState)

  const addNote = () => {};

  return (
    <div className="app">
      <h1>Sticky Notes</h1>
      <form onSubmit={addNote} className="note-form">
        <textarea
          value={noteInput}
          onChange={(event) => setNoteInput(event.target.value)}
          placeholder="Create a new note..."
        ></textarea>
        <button>Add</button>
      </form>
      {noteInput}
    </div>
  );
}

export default App;
