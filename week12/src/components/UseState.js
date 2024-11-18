import React from 'react';

// 아래 꼭 선언해줘야 함.
import {useState} from "react";

export default function UseState(props) {

	// 첫 번째는 실제 값, 두 번째는 set 함수
	// 지금 파라미터는 초기값 설정해주는거임.
	// const arrayState = useState(0);

	const [count, setCount] = useState(0);
	const [light, setLight] = useState("OFF");

	return(
		<>
			<div>useCount임! : {count}</div>
			<button onClick={() => setCount(count + 2)}>변하는지 확인</button>

			<div>useLight임! : {light}</div>
			<button onClick={() => setLight(light === "ON" ? "OFF" : "ON")}>{light}</button>
		</>
	)
}