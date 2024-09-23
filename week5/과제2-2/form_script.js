document.addEventListener('DOMContentLoaded', function() {
	const addButton = document.getElementById('add_button');
	const resetButton = document.getElementById('reset_button');
	const boxArea = document.getElementById('box_area');
	const inputText = document.getElementById('input_text');

	const boxWidth = 100;
	const boxHeight = 50;
	const usedPositions = [];

	// 텍스트 추가
	addButton.addEventListener('click', function() {
		const text = inputText.value.trim();
		if (text === '') return;  // 빈 입력 방지

		// 박스의 랜덤 위치 계산
		const position = getRandomPosition(boxWidth, boxHeight);
		if (position) {
			const box = document.createElement('div');
			box.classList.add('box');
			box.innerText = text;
			box.style.left = position.x + 'px';
			box.style.top = position.y + 'px';
			boxArea.appendChild(box);
			usedPositions.push(position);
			inputText.value = '';  // 입력 초기화
		}
	});

	// 모든 박스 리셋 (애니메이션 후 삭제)
	resetButton.addEventListener('click', function() {
		const boxes = document.querySelectorAll('.box');

		// 중심 좌표 계산 (박스 영역의 가운데)
		const centerX = boxArea.offsetWidth / 2;
		const centerY = boxArea.offsetHeight / 2;

		boxes.forEach(box => {
			// 박스의 현재 위치 계산
			const boxRect = box.getBoundingClientRect();
			const boxX = boxRect.left + boxRect.width / 2;
			const boxY = boxRect.top + boxRect.height / 2;

			// 중심으로부터의 벡터 (x, y 거리)
			const deltaX = boxX - centerX;
			const deltaY = boxY - centerY;

			// 해당 방향으로 멀어지도록 translate 값 설정 (배수 조정 가능)
			const translateX = deltaX * 2;
			const translateY = deltaY * 2;

			// 삭제 애니메이션 설정 (중심에서 멀어지게)
			box.style.transform = `translate(${translateX}px, ${translateY}px)`;
			box.style.opacity = '0';
			box.style.transition = 'transform 1s ease-out, opacity 1s ease-out';

			// 애니메이션 종료 후 박스 삭제
			box.addEventListener('transitionend', function() {
				box.remove();
			});
		});

		usedPositions.length = 0;  // 위치 배열 초기화
	});

	// 겹치지 않는 랜덤 위치를 찾는 함수
	function getRandomPosition(width, height) {
		const areaWidth = boxArea.offsetWidth;
		const areaHeight = boxArea.offsetHeight;

		// 시도 횟수 제한 (무한 루프 방지)
		let attempts = 0;
		while (attempts < 100) {
			const x = Math.floor(Math.random() * (areaWidth - width));
			const y = Math.floor(Math.random() * (areaHeight - height));

			// 새로운 위치가 기존 박스와 겹치지 않는지 확인
			if (!isOverlapping(x, y, width, height)) {
				return {x, y};
			}
			attempts++;
		}
		return null;  // 위치를 찾지 못하면 null 반환
	}

	// 박스 위치가 겹치는지 확인하는 함수
	function isOverlapping(x, y, width, height) {
		return usedPositions.some(pos => {
			return !(x + width < pos.x || pos.x + width < x || y + height < pos.y || pos.y + height < y);
		});
	}
});
