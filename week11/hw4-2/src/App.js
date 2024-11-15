import React, { useState, useEffect } from "react";
import './App.css';
import Hello from "./component/hello";


function App() {
    const [emojis, setEmojis] = useState([]);
    const emojiArray = React.useMemo(() => ["😊", "😍", "🥳", "💖", "😎", "🎉", "🤩"], []);

    useEffect(() => {
        // 이모지 초기화 및 설정 로직
        const initialEmojis = Array.from({ length: 10 }).map(() => ({
            emoji: emojiArray[Math.floor(Math.random() * emojiArray.length)],
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            dx: Math.random() * 1 + 0.5,
            dy: Math.random() * 1 + 0.5,
            fontSize: `${Math.random() * 30 + 20}px`,
        }));
        setEmojis(initialEmojis);

        const interval = setInterval(() => {
            setEmojis((prevEmojis) => {
                return prevEmojis.map((emoji) => {
                    let newX = emoji.x + emoji.dx;
                    let newY = emoji.y + emoji.dy;
                    if (newX > 90) emoji.dx = -emoji.dx;
                    if (newX < 10) emoji.dx = -emoji.dx;
                    if (newY > 90) emoji.dy = -emoji.dy;
                    if (newY < 10) emoji.dy = -emoji.dy;

                    prevEmojis.forEach((otherEmoji) => {
                        if (emoji !== otherEmoji) {
                            const dx = newX - otherEmoji.x;
                            const dy = newY - otherEmoji.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            const minDistance = 5;
                            if (distance < minDistance) {
                                emoji.dx = -emoji.dx;
                                emoji.dy = -emoji.dy;
                            }
                        }
                    });

                    return { ...emoji, x: newX, y: newY };
                });
            });
        }, 50);

        return () => clearInterval(interval);
    }, [emojiArray]);


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
