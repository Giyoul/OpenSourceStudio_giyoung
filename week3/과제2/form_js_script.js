document.addEventListener('DOMContentLoaded', function() {
	const checkoutButton = document.getElementById('checkout_button');

	// 마우스를 올렸을 때 색 변경 (mouseover 이벤트)
	checkoutButton.addEventListener('mouseover', function() {
		checkoutButton.style.backgroundColor = 'rgb(1, 73, 190)';  // 마우스를 올렸을 때 배경색을 녹색으로 변경
		checkoutButton.style.color = 'white';  // 글씨 색 변경 (선택사항)
		checkoutButton.style.cursor = 'pointer';
	});

	// 마우스를 뗐을 때 원래 색으로 되돌림 (mouseout 이벤트)
	checkoutButton.addEventListener('mouseout', function() {
		checkoutButton.style.backgroundColor = '';  // 원래 배경색으로 복귀
		checkoutButton.style.color = '';  // 원래 글씨 색으로 복귀
	});

	// 필수 입력 필드 목록
	const requiredFields = [
		{id: 'first_name_input', message: 'Valid first name is required.'},
		{id: 'last_name_input', message: 'Valid last name is required.'},
		{id: 'user_name_input', message: 'Your username is required.'},
		{id: 'address_input', message: 'Please enter your shipping address.'},
		{id: 'country_input', message: 'Please select a valid country.'},
		{id: 'state_input', message: 'Please provide a valid state.'},
		{id: 'zip_input', message: 'Zip code required.'},
		{id: 'name_on_card_input', message: 'Name on card is required.'},
		{id: 'credit_card_number_input', message: 'Credit card number is required.'},
		{id: 'expiration_input', message: 'Expiration date required.'},
		{id: 'cvv_input', message: 'Security code required.'}
	];

	requiredFields.forEach(function(field) {
		const inputField = document.getElementById(field.id);
		// input 클릭 시 에러 메시지 제거
		inputField.addEventListener('focus', function() {
			inputField.classList.remove('input-error');
			inputField.classList.remove('input-valid'); // 초록색 테두리 제거
			const errorMessage = inputField.parentNode.querySelector('.error-message');
			if (errorMessage) {
				errorMessage.remove(); // 에러 메시지 제거
			}
		});
	});

	checkoutButton.addEventListener('click', function(event) {
		event.preventDefault(); // 폼이 바로 제출되지 않도록 방지
		let allFieldsFilled = true; // 모든 필드가 채워졌는지 확인하는 변수
		let alertMessage = ''; // alert 메시지

		// 모든 input과 select 요소를 가져옴
		const allInputs = document.querySelectorAll('input, select');

		// 모든 필드를 초록색으로 초기화
		allInputs.forEach(function(inputField) {
			if (!requiredFields.some(field => field.id === inputField.id)) {
				inputField.classList.add('input-valid'); // 초록색 테두리 적용
			}
		});

		// 필드 검증 및 에러 메시지 추가
		requiredFields.forEach(function(field) {
			const inputField = document.getElementById(field.id);
			if (!inputField.value) {
				inputField.classList.add('input-error'); // 빨간 테두리 적용
				inputField.classList.remove('input-valid'); // 초록색 테두리 제거
				allFieldsFilled = false; // 필드가 비어 있으면 false로 설정

				// 이미 에러 메시지가 없을 경우에만 추가
				if (!inputField.parentNode.querySelector('.error-message')) {
					const errorText = document.createElement('div');
					errorText.className = 'error-message';
					errorText.innerText = field.message;
					inputField.parentNode.appendChild(errorText); // 에러 메시지 추가
				}
			} else {
				// 필드가 채워져 있으면 에러 메시지와 빨간 테두리 제거하고 초록색 테두리 추가
				inputField.classList.remove('input-error');
				inputField.classList.add('input-valid');
				const errorMessage = inputField.parentNode.querySelector('.error-message');
				if (errorMessage) {
					errorMessage.remove();
				}

				// 값이 있는 필드는 alert 메시지에 추가
				alertMessage += `${inputField.previousSibling.textContent.trim()}: ${inputField.value}\n`;
			}
		});

		// 입력이 필요한 필드가 모두 채워진 경우에만 alert 표시
		if (allFieldsFilled) {
			alert(alertMessage);
		}
	});
});
