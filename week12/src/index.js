import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 1. 일반
// const myElement = <div>Hi</div>

// 2. without JSX
// const myElement = React.createElement('h1', {}, 'I do not use JSX!');

// 3. 삼항연산자
// const x = 5;
// const myElement = <h1>{(x) < 10 ? "Hello" : "Goodbye"}</h1>

// 4. n줄 근데 분모 요소가 꼭 있어야 해서, <>를 쓴거임
{/*const myElement = (*/
} // 여러개는 이렇게 ()로 감싸줌
{/*	<>*/
}
{/*		<p>I am a paragraph.</p>*/
}
{/*		<p>I am a paragraph too.</p>*/
}
// 스타일을 줄때는 아래처럼 {{}}로 감싸줘야 함
// <h1 style={{color: "red"}}>Hello Style!</h1>
{/*	</>*/
}
{/*);*/
}

// 5. CSS
const CSSSample = () => {
	const myStyle = {
		color: "white"
		,
		backgroundColor: "DodgerBlue"
		,
		padding: "10px"
		,
		fontFamily: "Sans-Serif"
	};
	return (
		<>
			<h1 style={myStyle}>Hello Style!</h1>
			<p>Add a little style!</p>
		</>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	  <App />
	// myElement
	// CSSSample()
);


reportWebVitals();
