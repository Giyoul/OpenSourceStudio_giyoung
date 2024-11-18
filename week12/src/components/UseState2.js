import {useState} from "react";

export default function UseState2() {
	const [name, setName] = useState('이름');
	const [gender, setGender] = useState('male');
	const onChangeName = (e) => {
		setName(e.target.value);
	}

	const onChangeGender = (e) => {
		setGender(e.target.value);
	};

	return(
		<>
			<div/>
			<input
				value={name}
				placeholder={"입력하세요!"}
				onChange={onChangeName}
				type={"text"}
			/>
				<div>{name}</div>


			<select onChange={onChangeGender}>
				<option value="male">male</option>
				<option value="female">female</option>
			</select>
			<div>{gender}</div>
		</>
	)
};