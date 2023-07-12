import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { toDoState } from "../atoms"

interface IForm {
  toDo: string
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState)
  const { register, handleSubmit, setValue } = useForm<IForm>()
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [{ id: Date.now(), text: toDo, category: "TO_DO" }, ...oldTodos])
    setValue("toDo", "")
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("toDo", { required: "Please write a To Do" })} placeholder="Write a to do" />
      <button>Add</button>
    </form>
  )
}

export default CreateToDo
