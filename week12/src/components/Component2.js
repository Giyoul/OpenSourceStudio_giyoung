import './Component2.css'

function Component2(props){
	return <li>I am a { props.brand } >> {props.id}</li>
}

function Garage(){
	const array1 = [1, 4, 7, 10];
	const map1 = array1.map((x) => x * 3);
	console.log(map1);
	const cars = [
		{
			id : 1, brand : '1번 차'
		},
		{
			id : 2, brand : '2번 차'
		},
		{
			id : 3, brand : '3번 차'
		}];
	return (
		<div>
			<h1>Whe lives in my garage?</h1>
			<ul>
				{cars.map(car => <Component2 brand={car.brand} id={car.id}/>)}
			</ul>
		</div>
	)
}

export default Garage;