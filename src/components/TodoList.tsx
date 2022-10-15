import { useNavigate } from "react-router-dom";
import { deleteTodoItem, getTodoList, updateTodoItem } from "../api/todos";
import { useTokenContext } from "../contexts/TokenContext";
import { useFetch } from "../hooks/useFetch";
import { TodoItem } from "../pages/TodoPage";
import Todo from "./Todo";

export default function TodoList() {
  const navigate = useNavigate();
  const { accessToken } = useTokenContext();
  const { data: todoList } = useFetch<TodoItem[]>(["getTodoList"], () => getTodoList(accessToken));

  const updateTodo = async ({ id, isCompleted, todo }: Omit<TodoItem, "userId">) => {
    await updateTodoItem(id, todo, isCompleted, accessToken);
    navigate(0);
  };

  const removeTodo = async (id: number) => {
    await deleteTodoItem(id, accessToken);
    navigate(0);
  };

  const checkComplete = async (id: number) => {
    const todoItem = todoList.find((x) => x.id === id);
    if (todoItem == null) {
      return;
    }

    await updateTodoItem(id, todoItem.todo, !todoItem.isCompleted, accessToken);
    navigate(0);
  };

  if (todoList.length === 0) {
    return <p>아직 등록된 할일이 없습니다.</p>;
  }

  return (
    <ul>
      {todoList.map((item) => (
        <Todo {...item} updateTodo={updateTodo} removeTodo={removeTodo} checkComplete={checkComplete} />
      ))}
    </ul>
  );
}
