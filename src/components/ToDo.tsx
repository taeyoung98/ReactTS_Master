import { useSetRecoilState } from "recoil"
import { Categories, IToDo, toDoState } from "../atoms"

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState)

  // HOW-TO const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  const onClick = (clickCategory: IToDo["category"]) => {
    // HOW-TO const { currentTarget: { name }} = event

    // 1. 수정하려는 아이템 (인덱스) 찾기
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)
      const oldToDos_front = oldToDos.slice(0, targetIndex)
      const oldToDos_back = oldToDos.slice(targetIndex + 1)
      const newToDo = { id, text, category: clickCategory }

      return [...oldToDos_front, newToDo, ...oldToDos_back]
    })
  }
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>}
      {category !== Categories.DOING && <button onClick={() => onClick(Categories.DOING)}>Doing</button>}
      {category !== Categories.DONE && <button onClick={() => onClick(Categories.DONE)}>Done</button>}
    </li>
  )
}

export default ToDo
