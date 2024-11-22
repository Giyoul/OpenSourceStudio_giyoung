import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detail.css"

function Detail() {
	const location = useLocation();
	const navigate = useNavigate();
	const burger = location.state?.burger;

	if (!burger) {
		return (
			<div>
				<h1>No Burger Selected</h1>
				<button onClick={() => navigate("/list")}>Back to List</button>
			</div>
		);
	}

	return (
		<div className="container detail-container">
			{burger ? (
				<>
					<h1>{burger.name}</h1>
					<p>Price: {burger.price}원</p>
					<p>Calories: {burger.kcal}kcal</p>
					<p>Spiciness: {burger.hot}</p>
					<button onClick={() => navigate("/list")}>Back to List</button>
				</>
			) : (
				<>
					<h1>No Burger Selected</h1>
					<button onClick={() => navigate("/list")}>Back to List</button>
				</>
			)}
		</div>

	);
}

export default Detail;
