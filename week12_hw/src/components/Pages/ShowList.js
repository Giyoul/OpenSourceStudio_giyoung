import React, { useState, useEffect, useCallback } from "react";
import "./ShowList.css";

function ShowList() {
	const [burgers, setBurgers] = useState([]);
	const [isAddModalOpen, setAddModalOpen] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		kcal: "",
		hot: "",
		id: null
	});

	// 데이터를 가져오는 함수
	const fetchData = useCallback(() => {
		console.log("Fetching data...");
		fetch("https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers")
			.then((response) => response.json())
			.then((data) => {
				console.log("Fetched data:", data);
				setBurgers(data);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	// 데이터 로드 (컴포넌트가 마운트될 때)
	useEffect(() => {
		fetchData();
	}, [fetchData]); // 여기서 fetchData가 useCallback으로 초기화된 후 호출됩니다.

	// 새로운 데이터를 추가하는 함수
	const createDataToJSONFile = useCallback(() => {
		console.log("Creating data with formData:", formData); // 입력 데이터 확인
		fetch("https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: formData.name,
				price: formData.price,
				kcal: formData.kcal,
				hot: formData.hot
			})
		})
			.then((response) => {
				if (response.ok) {
					console.log("Data successfully created");
					alert("등록 성공!");
					closeModal("addModal");
					fetchData(); // 데이터를 갱신
				}
			})
			.catch((error) => console.error("Error creating data:", error));
	}, [formData, fetchData]);

	// 데이터를 수정하는 함수
	const updateDataToJSONFile = useCallback(() => {
		console.log("Updating data with formData:", formData); // 수정 데이터 확인
		fetch(`https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers/${formData.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: formData.name,
				price: formData.price,
				kcal: formData.kcal,
				hot: formData.hot
			})
		})
			.then((response) => {
				if (response.ok) {
					alert("수정 성공!");
					closeModal("editModal");
					fetchData();
				}
			})
			.catch((error) => console.error("Error updating data:", error));
	}, [formData, fetchData]);

	// 데이터를 삭제하는 함수
	const deleteDataFromJSONFile = useCallback((id) => {
		console.log("Deleting burger with ID:", id); // 삭제할 ID 확인
		fetch(`https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers/${id}`, {
			method: "DELETE"
		})
			.then((response) => {
				if (response.ok) {
					alert("삭제 성공!");
					fetchData();
				}
			})
			.catch((error) => console.error("Error deleting data:", error));
	}, [fetchData]);

	// 모달을 여는 함수
	const openModal = (modalId) => {
		console.log(`Opening modal: ${modalId}`); // 모달 열기 로그
		if (modalId === "addModal") {
			// Add Burger 모달을 열 때 formData를 초기화
			setFormData({ name: "", price: "", kcal: "", hot: "", id: null });
			setAddModalOpen(true);
		} else if (modalId === "editModal") {
			setEditModalOpen(true);
		}
	};

	// 모달을 닫는 함수
	const closeModal = (modalId) => {
		console.log(`Closing modal: ${modalId}`); // 모달 닫기 로그
		if (modalId === "addModal") {
			setAddModalOpen(false);
		} else if (modalId === "editModal") {
			setEditModalOpen(false);
		}
	};

	// 입력값을 처리하는 함수
	const handleInputChange = (e) => {
		console.log(`Input changed: ${e.target.id} = ${e.target.value}`); // 입력값 로그
		setFormData({
			...formData,
			[e.target.id]: e.target.value
		});
	};

	// 수정 모달을 위한 데이터 로드 함수
	const loadEditModal = (burger) => {
		console.log("Loading edit modal with burger:", burger); // 수정할 버거 데이터 확인
		setFormData(burger);
		openModal("editModal");
	};

	return (
		<div id="container">
			<h1>Burger Management</h1>
			<button onClick={() => openModal("addModal")}>Add Burger</button>

			<div id="div_burgers">
				{burgers.map((burger) => (
					<div className="burger-item" key={burger.id}>
						<span>
							ID: {burger.id} >> {burger.name} - {burger.price}원, {burger.kcal}kcal, {burger.hot}단계
						</span>
						<div className="actions">
							<button onClick={() => loadEditModal(burger)}>Edit</button>
							<button onClick={() => deleteDataFromJSONFile(burger.id)}>Delete</button>
						</div>
					</div>
				))}
			</div>

			{/* Add Burger Modal */}
			{isAddModalOpen && (
				<div className={`modal ${isAddModalOpen ? 'show' : ''}`} id="addModal">
					<div className="modal-content">
						<span className="close" onClick={() => closeModal("addModal")}>&times;</span>
						<h2>Add Burger</h2>
						<input
							type="text"
							id="name"
							placeholder="Name"
							value={formData.name}
							onChange={handleInputChange}
						/>
						<input
							type="number"
							id="price"
							placeholder="Price"
							value={formData.price}
							onChange={handleInputChange}
						/>
						<input
							type="number"
							id="kcal"
							placeholder="Kcal"
							value={formData.kcal}
							onChange={handleInputChange}
						/>
						<input
							type="number"
							id="hot"
							placeholder="Hot"
							value={formData.hot}
							onChange={handleInputChange}
						/>
						<button onClick={() => {
							console.log("Add Burger button clicked");
							createDataToJSONFile();
						}}>Add Burger</button>
					</div>
				</div>
			)}

			{/* Edit Burger Modal */}
			{isEditModalOpen && (
				<div className={`modal ${isEditModalOpen ? 'show' : ''}`} id="editModal">
					<div className="modal-content">
						<span className="close" onClick={() => closeModal("editModal")}>&times;</span>
						<h2>Edit Burger</h2>
						<input
							type="text"
							id="name"
							placeholder="Name"
							value={formData.name}
							onChange={handleInputChange}
						/>
						<input
							type="number"
							id="price"
							placeholder="Price"
							value={formData.price}
							onChange={handleInputChange}
						/>
						<input
							type="number"
							id="kcal"
							placeholder="Kcal"
							value={formData.kcal}
							onChange={handleInputChange}
						/>
						<input
							type="number"
							id="hot"
							placeholder="Hot"
							value={formData.hot}
							onChange={handleInputChange}
						/>
						<button onClick={updateDataToJSONFile}>Update Burger</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default ShowList;
