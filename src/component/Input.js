import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBarsStaggered, 
  faCalendar, 
  faCheck, 
  faEllipsisVertical, 
  faPen, 
  faPlus, 
  faTrash 
} from "@fortawesome/free-solid-svg-icons";

function Input() {
  const [name, setName] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isopen, setIsopen] = useState(null); // Track which dropdown is open
  const [editIndex, setEditIndex] = useState(null);
  // Load existing data from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos)); // Parse and set the saved list
    }
  }, []);

  // Handle input change and store the value in state
  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  // Add todo to the list and save it to localStorage
  const handleAddTodo = () => {
    if (name.trim() === "") return; // Prevent empty input
    const updatedList = [...todoList, { name, completed: false }]; // Add new todo to the list
    setTodoList(updatedList); // Update state
    localStorage.setItem("todoList", JSON.stringify(updatedList)); // Save to localStorage
    setName(""); // Clear the input field
  };

  // Toggle dropdown menu for a specific todo
  const handleDropdownToggle = (index) => {
    setIsopen(isopen === index ? null : index);
  };

  // Toggle checkbox state
  const handleCheckboxChange = (index) => {
    const updatedList = [...todoList];
    updatedList[index].completed = !updatedList[index].completed;
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList)); // Save to localStorage
  };
  const handleSort = () => {
    const sortedList = [...todoList].sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (a.dueDate) {
        return -1;
      } else if (b.dueDate) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    setTodoList(sortedList);
    setIsopen(null); // Close dropdown
  };
  const handleDelete = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList)); // Save to localStorage
    setIsopen(null); // Close dropdown
  };

  // Add or Update Due Date
  const handleDueDateChange = (index, date) => {
    const updatedList = [...todoList];
    updatedList[index].dueDate = date;
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList)); // Save to localStorage
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setName(todoList[index].name);
    setIsopen(null); // Close dropdown
  };

  const saveEdit = () => {
    if (editIndex !== null) {
      const updatedList = [...todoList];
      updatedList[editIndex].name = name;
      setTodoList(updatedList);
      localStorage.setItem("todoList", JSON.stringify(updatedList));
      setEditIndex(null);
      setName("");
    }
  };
  return (
    <>
      <div className="sm:ml-72">
        {/* Input Section */}
        <div className="m-2 relative">
          <input
            name="name"
            value={name}
            onChange={handleInputChange}
            type="text"
            className="w-full ring-1 ring-slate-300 h-14 rounded-md pl-10 pr-4"
            placeholder="Add Todo"
          />
          <span
            onClick={handleAddTodo}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>

        {/* Todo List Section */}
        <div className="mt-6">
          {todoList.length > 0 ? (
            todoList.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 mb-4  rounded-md "
              >
                <div className="flex items-center">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(index)}
                    className="mr-3 h-5 w-5"
                  />
                  <span className={`${todo.completed ? "line-through text-gray-400" : ""}`}>
                    {todo.name}
                  </span>
                </div>

                {/* Dropdown menu trigger */}
                <FontAwesomeIcon
                  onClick={() => handleDropdownToggle(index)}
                  icon={faEllipsisVertical}
                  className="text-green-500 text-xl cursor-pointer"
                />

                {/* Dropdown Menu */}
                {isopen === index && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <ul>
                      <li
                        onClick={() => handleEdit(index)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <FontAwesomeIcon className="mr-2" icon={faPen} />
                        Edit
                      </li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="date"
                          onChange={(e) =>
                            handleDueDateChange(index, e.target.value)
                          }
                          className="w-full text-sm"
                        />
                      </li>
                      <li
                        onClick={() => handleDelete(index)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <FontAwesomeIcon className="mr-2" icon={faTrash} />
                        Delete
                      </li>
                      <li
                        onClick={handleSort}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <FontAwesomeIcon className="mr-2" icon={faBarsStaggered} />
                        Sort
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-3xl font-medium text-blue-300 ml-96 mt-20">
              <FontAwesomeIcon className="text-9xl" icon={faCheck} />
              <h1>No Tasks</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Input;
