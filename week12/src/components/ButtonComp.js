import React from 'react';

export default function ButtonComp(props) {

	// function msg(obj_1, event) {
	//
	// }

	const msg = (obj_1, event) => {
		alert(obj_1 + "//" + event.target.id);
		alert(event);
	}

	return (
		<>
			<div>22000053 : {props.title}</div>
			<button id={"button1"} onClick={(e) => {msg("haha", e)}}>안녕하세요!</button>
		</>
	)
}