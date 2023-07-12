// import React, { useState } from "react" // 방법1
import { useForm } from "react-hook-form" // 방법2

function ToDoList() {
	/* 방법1. useState, onChange, onSubmit
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

	// 방법2. useForm: register, watch, handleSubmit (react-hook-form)

	// register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref })
	// watch: form의 <input>값들의 변화를 관찰하여 반환하는 함수
	const { register, watch } = useForm()
	console.log(watch())

	// register()가 반환하는 state 객체를 <input>의 props로 사용
	// => 각각의 input마다 따로 state 생성할 필요 없어짐 Awesome!
	return (
		<div>
			<form>
				<input {...register("email")} placeholder="Email" />
				<input {...register("firstname")} placeholder="First name" />
				<input {...register("lastName")} placeholder="Last Name" />
				<input {...register("username")} placeholder="Username" />
				<input {...register("password")} placeholder="Password" />
				<input {...register("password1")} placeholder="Password1" />
				<button>add</button>
			</form>
		</div>
	)
}

export default ToDoList
