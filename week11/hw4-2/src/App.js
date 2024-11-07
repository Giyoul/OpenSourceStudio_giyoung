import React, { useState, useEffect } from "react";
import './App.css';
import Hello from "./component/hello";

function App() {
    const [emojis, setEmojis] = useState([]);
    const emojiArray = ["😊", "😍", "🥳", "💖", "😎", "🎉", "🤩"];

    useEffect(() => {
        // 이모지 초기화 (랜덤 위치, 속도, 크기)
        const initialEmojis = Array.from({ length: 10 }).map(() => ({
            emoji: emojiArray[Math.floor(Math.random() * emojiArray.length)],
            x: Math.random() * 80 + 10, // 10% - 90% 화면 내 위치
            y: Math.random() * 80 + 10, // 10% - 90% 화면 내 위치
            dx: Math.random() * 1 + 0.5,  // 속도 조정 (0.5 - 1.5)
            dy: Math.random() * 1 + 0.5,  // 속도 조정 (0.5 - 1.5)
            fontSize: `${Math.random() * 30 + 20}px`, // 랜덤 크기
        }));
        setEmojis(initialEmojis);

        // 이모지 위치 업데이트 및 충돌 감지
        const interval = setInterval(() => {
            setEmojis((prevEmojis) => {
                return prevEmojis.map((emoji) => {
                    let newX = emoji.x + emoji.dx;
                    let newY = emoji.y + emoji.dy;

                    // 화면 경계를 넘지 않도록 반사 처리
                    if (newX > 90) emoji.dx = -emoji.dx;
                    if (newX < 10) emoji.dx = -emoji.dx;
                    if (newY > 90) emoji.dy = -emoji.dy;
                    if (newY < 10) emoji.dy = -emoji.dy;

                    // 이모지끼리 충돌 감지 및 반사 처리
                    prevEmojis.forEach((otherEmoji) => {
                        if (emoji !== otherEmoji) {
                            const dx = newX - otherEmoji.x;
                            const dy = newY - otherEmoji.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            const minDistance = 5; // 최소 거리 (충돌 기준)

                            if (distance < minDistance) {
                                emoji.dx = -emoji.dx;
                                emoji.dy = -emoji.dy;
                            }
                        }
                    });

                    return { ...emoji, x: newX, y: newY };
                });
            });
        }, 50); // 속도를 더 느리게 하기 위해 interval 시간을 50ms로 늘림

        // 컴포넌트가 언마운트될 때 interval 정리
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Hello />
                {emojis.map((emoji, index) => (
                    <div
                        key={index}
                        className="emoji"
                        style={{
                            position: "absolute",
                            top: `${emoji.y}vh`,
                            left: `${emoji.x}vw`,
                            fontSize: emoji.fontSize,
                            pointerEvents: "none", // 이모지에 마우스 이벤트가 겹치지 않게
                            transition: "top 0.1s, left 0.1s", // 부드러운 애니메이션
                        }}
                    >
                        {emoji.emoji}
                    </div>
                ))}
            </header>
        </div>
    );
}

export default App;
