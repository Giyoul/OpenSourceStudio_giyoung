import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Update() {
	const location = useLocation();
	const navigate = useNavigate();
	const existingBurger = location.state?.burger;

	const [formData, setFormData] = useState({
		name: existingBurger?.name || "",
		price: existingBurger?.price || "",
		kcal: existingBurger?.kcal || "",
		hot: existingBurger?.hot || "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		const apiCall = existingBurger
			? axios.put(`https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers/${existingBurger.id}`, formData)
			: axios.post("https://672818cb270bd0b9755451a8.mockapi.io/api/v1/burgers", formData);

		apiCall
			.then(() => {
				alert(`Burger ${existingBurger ? "updated" : "added"} successfully!`);
				navigate("/list");
			})
			.catch((error) => console.error("Error submitting form:", error));
	};

	return (
		<div className="container update-container">
			<h1>{existingBurger ? "Edit Burger" : "Add New Burger"}</h1>
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={formData.name}
				onChange={handleInputChange}
			/>
			<input
				type="number"
				name="price"
				placeholder="Price"
				value={formData.price}
				onChange={handleInputChange}
			/>
			<input
				type="number"
				name="kcal"
				placeholder="Calories"
				value={formData.kcal}
				onChange={handleInputChange}
			/>
			<input
				type="number"
				name="hot"
				placeholder="Spiciness"
				value={formData.hot}
				onChange={handleInputChange}
			/>
			<button onClick={handleSubmit}>{existingBurger ? "Update" : "Add"}</button>
			<button className="secondary" onClick={() => navigate("/list")}>Cancel</button>
		</div>

	);
}

export default Update;
