// import React, { useState } from "react" // 방법1
import { useForm } from "react-hook-form" // 방법2

interface IForm {
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
  password1: string
}

function ToDoList() {
  // HOW-TO react-hook-form
  // [toDo, setToDo] = useState('') => {...(register("toDo")}
  // [toDoError, setToDoError] = useState('') => formState.errors
  // onChange() => watch()
  // onSubmit() => handleSubmit()

  /* 방법 1. useState, onChange, onSubmit
	const [toDo, setToDo] = useState('')
	const [toDoError, setToDoError] = useState('')
	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
	  const { currentTarget: { value } } = event
	  setToDoError('')
	  setToDo(value)
	}
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	  event.preventDefault()
	  if (toDo.length < 10) {
	  return setToDoError("to do should be longer")
	  }
	  console.log("submit");
	}
  */

  // 방법 2. useForm: register, watch, handleSubmit (react-hook-form)
  // register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref })
  // watch: form의 <input>값들의 변화를 관찰하여 반환하는 함수
  // prettier-ignore
  const {	register, handleSubmit, formState: { errors } } = useForm<IForm>({ 
		defaultValues: {
			email: "@naver.com"
		}
	})
  const onValid = (data: any) => {
    console.log(data)
  }

  // NOTE
  // register()가 반환하는 state 객체를 <input>의 props로 사용
  // => 각각의 input마다 따로 state 생성할 필요 없어짐 Awesome!
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed"
            }
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { required: "write here" })} placeholder="First name" />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: "write here" })} placeholder="Last Name" />
        <span>{errors?.lastName?.message}</span>
        <input {...register("username", { required: "write here", minLength: 10 })} placeholder="Username" />
        <span>{errors?.username?.message}</span>
        <input {...register("password", { required: "write here", minLength: 5 })} placeholder="Password" />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short."
            }
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>add</button>
      </form>
    </div>
  )
}

export default ToDoList