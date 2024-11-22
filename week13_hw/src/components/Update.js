import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Update.css";

function Update() {
	const location = useLocation();
	const navigate = useNavigate();
	const initialBurgers = location.state?.burgers || [];

	const [burgers, setBurgers] = useState(initialBurgers);
	const [editCount, setEditCount] = useState(0);

	// 각 input 요소를 참조하는 useRef 설정
	const nameRefs = useRef([]);
	const priceRefs = useRef([]);
	const kcalRefs = useRef([]);
	const hotRefs = useRef([]);

	// 필드 값 변경 시 호출
	const handleInputChange = (id, field, value) => {
		setBurgers((prevBurgers) =>
			prevBurgers.map((burger) =>
				burger.id === id ? { ...burger, [field]: value } : burger
			)
		);
		setEditCount((prevCount) => prevCount + 1); // 수정 횟수 증가
	};

	// 유효성 검사 함수
	const validateInputs = () => {
		let isValid = true;

		// name이 빈 문자열일 경우
		nameRefs.current.forEach((ref) => {
			if (!ref.value) {
				isValid = false;
				alert("Name cannot be empty.");
			}
		});

		// price, kcal, hot이 숫자가 아닐 경우
		priceRefs.current.forEach((ref) => {
			if (isNaN(ref.value) || ref.value <= 0) {
				isValid = false;
				alert("Price must be a positive number.");
			}
		});

		kcalRefs.current.forEach((ref) => {
			if (isNaN(ref.value) || ref.value <= 0) {
				isValid = false;
				alert("Calories must be a positive number.");
			}
		});

		hotRefs.current.forEach((ref) => {
			if (isNaN(ref.value) || ref.value < 0) {
				isValid = false;
				alert("Spiciness must be a positive number.");
			}
		});

		return isValid;
	};

	// 뒤로가기 버튼 클릭 시 변경 사항 저장 후 리스트 페이지로 이동
	const handleGoBack = () => {
		// 유효성 검사
		if (!validateInputs()) return;

		const updatePromises = burgers.map((burger) =>
			axios.put(`https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers/${burger.id}`, burger)
		);

		Promise.all(updatePromises)
			.then(() => {
				alert("All changes have been saved successfully!");
				navigate("/list");
			})
			.catch((error) => console.error("Error saving changes:", error));
	};

	useEffect(() => {
		// 컴포넌트가 마운트될 때, 또는 상태가 업데이트될 때마다 서버에 저장하도록 설정
		return () => {
			const updatePromises = burgers.map((burger) =>
				axios.put(`https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers/${burger.id}`, burger)
			);

			Promise.all(updatePromises)
				.then(() => {
					// 자동으로 저장되므로 별도의 알림이 필요할 수 있음.
				})
				.catch((error) => console.error("Error saving changes:", error));
		};
	}, [burgers]);

	return (
		<div className="container update-container">
			<h1>Edit All Burgers</h1>
			<p>Total Edits: {editCount}</p> {/* 수정 횟수 표시 */}
			<ul>
				{burgers.map((burger, index) => (
					<li key={burger.id}>
						<input
							type="text"
							name="name"
							value={burger.name}
							onChange={(e) => handleInputChange(burger.id, "name", e.target.value)}
							placeholder="Name"
							ref={(el) => (nameRefs.current[index] = el)}
						/>
						<input
							type="number"
							name="price"
							value={burger.price}
							onChange={(e) => handleInputChange(burger.id, "price", e.target.value)}
							placeholder="Price"
							ref={(el) => (priceRefs.current[index] = el)}
						/>
						<input
							type="number"
							name="kcal"
							value={burger.kcal}
							onChange={(e) => handleInputChange(burger.id, "kcal", e.target.value)}
							placeholder="Calories"
							ref={(el) => (kcalRefs.current[index] = el)}
						/>
						<input
							type="number"
							name="hot"
							value={burger.hot}
							onChange={(e) => handleInputChange(burger.id, "hot", e.target.value)}
							placeholder="Spiciness"
							ref={(el) => (hotRefs.current[index] = el)}
						/>
					</li>
				))}
			</ul>
			<button onClick={handleGoBack} className="secondary">
				Go Back
			</button>
		</div>
	);
}

export default Update;
