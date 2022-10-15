import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodoItem, updateTodoItem, getTodoList, deleteTodoItem } from "../api/todos";
import Button from "../components/Button";
import TodoModifySection from "../components/TodoModifySection";
import { useTokenContext } from "../contexts/TokenContext";
import useFormField from "../hooks/useFormField";

interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export default function Todo() {
  const navigate = useNavigate();
  const { isLogin, accessToken } = useTokenContext();

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const [isModify, setIsModify] = useState(false);
  const [modifyId, setModifyId] = useState(0);

  const [content, onChangeContent, contentErrorMessage, setContent] = useFormField([
    { ok: (value) => value !== "", message: "오늘의 할 일을 입력해주세요!" },
  ]);

  const handleTodoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (contentErrorMessage != null) {
      return;
    }

    e.preventDefault();

    await createTodoItem(content, accessToken);

    navigate(0);
  };

  const handleModifyButtonClick = (id: number) => {
    setIsModify(true);
    setModifyId(id);
    setContent(todoList.find((item) => item.id === id)?.todo || "");
  };

  const handleModifySubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const todoItem = await updateTodoItem(modifyId, content, false, accessToken);

    setTodoList((prev) => {
      return prev.map((item) => (item.id !== todoItem.id ? item : { ...item, ...todoItem }));
    });
    setIsModify(false);
  };

  const handleCompletedButtonClick = async ({ id, todo, isCompleted }: TodoItem) => {
    const todoItem = await updateTodoItem(id, todo, !isCompleted, accessToken);

    setTodoList((prev) => {
      return prev.map((item) => (item.id !== todoItem.id ? item : { ...item, ...todoItem }));
    });
  };

  const handleDeleteButtonClick = async (id: number) => {
    await deleteTodoItem(id, accessToken);
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    (async () => {
      const todoList = await getTodoList(accessToken);
      setTodoList(todoList);
    })();
  }, []);

  return (
    <>
      <h1>isLogin: {String(isLogin)}</h1>
      <form onSubmit={handleTodoSubmit}>
        <input type='text' onChange={onChangeContent} />
        <p>{contentErrorMessage}</p>
        <Button type='submit'>추가</Button>
      </form>
      {todoList == null ? (
        <p>아직 등록된 Todo가 없네요!!</p>
      ) : (
        <ul>
          {todoList.map((item) => (
            <li key={item.id}>
              {modifyId === item.id && isModify ? (
                <TodoModifySection
                  content={content}
                  setIsModify={setIsModify}
                  onChangeContent={onChangeContent}
                  handleModifySubmit={handleModifySubmit}
                />
              ) : (
                <>
                  <label htmlFor={`todo-${item.id}`}>
                    <input
                      id={`todo-${item.id}`}
                      type='checkbox'
                      checked={item.isCompleted}
                      onChange={() => handleCompletedButtonClick(item)}
                    />
                    <span>{item.todo}</span>
                  </label>
                  <Button onClick={() => handleModifyButtonClick(item.id)}>수정</Button>
                  <Button onClick={() => handleDeleteButtonClick(item.id)}>삭제</Button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
