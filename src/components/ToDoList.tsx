import { useForm } from "react-hook-form"
import { atom, useRecoilState } from "recoil"

interface IForm {
  toDo: string
}
interface IToDo {
  id: number
  text: string
  category: "TO_DO" | "DOING" | "DONE"
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: []
})

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const { register, handleSubmit, setValue } = useForm<IForm>()
  const onValid = ({ toDo }: IForm) => {
    setToDos((old) => [{ id: Date.now(), text: toDo, category: "TO_DO" }, ...old])
    setValue("toDo", "")
  }

  // NOTE
  // register()가 반환하는 state 객체를 <input>의 props로 사용
  // => 각각의 input마다 따로 state 생성할 필요 없어짐 Awesome!
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: "Please write a To Do" })} placeholder="Write a to do" />
        <button>add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
