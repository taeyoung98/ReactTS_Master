import { useRecoilValue } from "recoil"
import { toDoState } from "../atoms"
import CreateToDo from "./CreateTodo"
import ToDo from "./ToDo"

function ToDoList() {
  const toDos = useRecoilValue(toDoState)

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          // NOTE
          // toDos[](toDoState)의 아이템과 <ToDo>의 props가 둘 다 IToDo로 key 완전 일치하기 때문에
          // {...toDo} 로 props 전달 가능
          <ToDo key={toDo.id} {...toDo} />
          // <ToDo key={toDo.id} id={toDo.id} text={toDo.text} category={toDo.category} />
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
