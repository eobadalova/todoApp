import React from "react";
import "./App.css";
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { FaSave } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, 
  []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {

    e.preventDefault();

    const newTodo = {

      id: new Date().getTime(),
      text: todo,
      completed: false,

    };


    if (newTodo.text == "") {
      alert("Zadejte text úkolu");
      return;
    }
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }

      if (todo.text == "") {
        alert("Zadejte text úkolu");
        
      }

      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Úkolovník</h1>
      <form onSubmit={handleSubmit}>
        <input
        placeholder="Nový úkol..."
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />

      
        <button type="submit"><AiOutlineFileAdd className="icon-add"/></button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
            
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}

          <div className="todo-actions">
            {todo.id === todoEditing ? (
               <FaSave onClick={() => submitEdits(todo.id)} className='icon'/>
              
            ) : (

              <FiEdit
              onClick={() => setTodoEditing(todo.id)}
              className='icon'
            />
              
            )}

            
            <FaTrashAlt onClick={() => deleteTodo(todo.id)} className="icon"/>
         
          </div>



          </div>

        </div>
      ))}
    </div>
  );
};

export default App;