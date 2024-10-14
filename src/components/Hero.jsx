import { useState } from "react";

export const Hero = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editInput } : todo
      )
    );
    setEditingTodoId(null);
    setEditInput("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#1E3E62] rounded-3xl p-[100px]">
        <h1 className="text-3xl font-bold text-center text-blue-200 uppercase mb-6">
          todo list 📝
        </h1>
        <div className="mb-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            type="text"
            placeholder="Add new task"
          />
          <button
            onClick={addTodo}
            className="bg-red-600 text-white rounded-r-lg px-4 py-2 hover:opacity-[90%] duration-200 hover:scale-105"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200"
            >
              {editingTodoId === todo.id ? (
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="mr-2 w-5 h-5 text-blue-600"
                  />
                  <span
                    className={`flex-grow ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </span>
                </>
              )}

              {editingTodoId === todo.id ? (
                <button
                  className="ml-2 border-none p-2 rounded-lg bg-green-600 text-white hover:opacity-[90%] duration-200 hover:scale-105"
                  onClick={() => saveEdit(todo.id)}
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="ml-2 border-none p-2 rounded-lg bg-yellow-500 text-white hover:opacity-[90%] duration-200 hover:scale-105"
                    onClick={() => {
                      setEditingTodoId(todo.id);
                      setEditInput(todo.text);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="ml-2 border-none p-2 rounded-lg bg-red-600 text-white hover:opacity-[90%] duration-200 hover:scale-105"
                    onClick={() =>
                      setTodos(todos.filter((t) => t.id !== todo.id))
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
