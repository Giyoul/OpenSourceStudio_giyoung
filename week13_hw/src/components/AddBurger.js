import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./AddBurger.css";

function AddBurger() {
	const navigate = useNavigate();

	// input 값 상태 관리
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [kcal, setKcal] = useState("");
	const [hot, setHot] = useState("");

	// input 유효성 검사를 위한 useRef
	const nameRef = useRef(null);
	const priceRef = useRef(null);
	const kcalRef = useRef(null);
	const hotRef = useRef(null);

	// 유효성 검사 함수
	const validateInputs = () => {
		let isValid = true;

		// Name 검사: 빈 값이 아니어야 함
		if (!name.trim()) {
			isValid = false;
			nameRef.current.focus(); // 포커스를 주어 사용자에게 안내
			alert("Name cannot be empty.");
		}

		// Price 검사: 양의 숫자이어야 함
		if (isNaN(price) || price <= 0) {
			isValid = false;
			priceRef.current.focus();
			alert("Price must be a positive number.");
		}

		// Calories 검사: 양의 숫자이어야 함
		if (isNaN(kcal) || kcal <= 0) {
			isValid = false;
			kcalRef.current.focus();
			alert("Calories must be a positive number.");
		}

		// Spiciness 검사: 음수일 수 없음
		if (isNaN(hot) || hot < 0) {
			isValid = false;
			hotRef.current.focus();
			alert("Spiciness must be a non-negative number.");
		}

		return isValid;
	};

	// 입력 값이 변경될 때마다 바로 버거가 추가되도록 handleChange 추가
	const handleChange = (e, setter) => {
		const value = e.target.value;
		setter(value);
	};

	// 뒤로가기 버튼 클릭 시 유효성 검사 후 리스트 페이지로 이동
	const handleGoBack = () => {
		// 유효성 검사
		if (!validateInputs()) return;

		// 유효성 검사 통과 후 새로운 버거 객체 생성
		const newBurger = {
			name,
			price: parseFloat(price),
			kcal: parseFloat(kcal),
			hot: parseFloat(hot),
		};

		// API로 버거 추가 요청
		axios
			.post("https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers", newBurger)
			.then((response) => {
				alert("New burger added successfully!");
				navigate("/list"); // 추가 후 리스트 페이지로 이동
			})
			.catch((error) => {
				console.error("Error adding burger:", error);
				alert("Failed to add burger. Please try again.");
			});
	};

	return (
		<div className="container add-burger-container">
			<h1>Add New Burger</h1>
			<form>
				<div className="input-group">
					<label>Name:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => handleChange(e, setName)}
						ref={nameRef}
						placeholder="Enter burger name"
					/>
				</div>
				<div className="input-group">
					<label>Price:</label>
					<input
						type="number"
						value={price}
						onChange={(e) => handleChange(e, setPrice)}
						ref={priceRef}
						placeholder="Enter price"
					/>
				</div>
				<div className="input-group">
					<label>Calories:</label>
					<input
						type="number"
						value={kcal}
						onChange={(e) => handleChange(e, setKcal)}
						ref={kcalRef}
						placeholder="Enter calories"
					/>
				</div>
				<div className="input-group">
					<label>Spiciness:</label>
					<input
						type="number"
						value={hot}
						onChange={(e) => handleChange(e, setHot)}
						ref={hotRef}
						placeholder="Enter spiciness"
					/>
				</div>
			</form>
			<button onClick={handleGoBack} className="secondary">
				Go Back
			</button>
		</div>
	);
}

export default AddBurger;
