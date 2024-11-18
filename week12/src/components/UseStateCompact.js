import {useState} from "react";

export default function UseState2() {
	const [input, setInput] = useState({
		name : "",
		gender : ""
	});


	const onChangeInput = (e) => {
		setInput({
			input, [e.target.name] : e.target.value
		})
	};

	// const [name, setName] = useState('이름');
	// const [gender, setGender] = useState('male');
	// const onChangeName = (e) => {
	// 	setInput({input, name : e.target.value});
	// }
	//
	// const onChangeGender = (e) => {
	// 	setInput({input, gender: e.target.value});
	// };

	return(
		<>
			<div/>
			<input
				value={input.name}
				name = "name"
				placeholder={"입력하세요!"}
				onChange={onChangeInput}
				type={"text"}
			/>
			<div>{input.name}</div>


			<select name = "gender" onChange={onChangeInput}>
				<option value="male">male</option>
				<option value="female">female</option>
			</select>
			<div>{input.gender}</div>
		</>
	)
};