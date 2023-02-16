import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加する。
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name, completed: false }];
    });
    todoNameRef.current.value = null;
  }

  const toggleTodo = (id) => {
    // 直接配列を触らないようにするために、todosを複製する
    const newTodos = [...todos];

    // newTodosから、指定されたIDを持つToDoアイテムを検索する
    // 引数'id'は、この関数の呼び出し元の'todo.id'を指す。（Todo.jsで定義してある）
    // 引数'id'とマッチする、NewTodosの'todo.id'をfindで検索している
    const newTodo = newTodos.find((todo) => todo.id === id);

    // 見つかったToDoアイテムのcompletedプロパティを反転させる
    newTodo.completed = !newTodo.completed;

    // setToDosを使って、newTodosの結果をtodosに反映させる
    setTodos(newTodos);
  }

  const handleClear = () => {
    const clearTodos = todos.filter((todo) => !todo.completed);
    setTodos(clearTodos);
  }

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
