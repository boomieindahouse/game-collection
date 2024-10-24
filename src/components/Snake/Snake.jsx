import { useState, useEffect } from 'react';
import './Snake.css';

const Snake = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([0, -1]); // กำหนดทิศทางเริ่มต้น

  useEffect(() => {
    const handleKeyPress = (event) => {
      // ตรวจสอบการกดปุ่มลูกศร
      switch (event.key) {
        case 'ArrowUp':
          // ไม่อนุญาตให้กลับทิศทางถ้าไปลง
          if (direction[1] === 1) break;
          setDirection([0, -1]);
          break;
        case 'ArrowDown':
          // ไม่อนุญาตให้กลับทิศทางถ้าไปขึ้น
          if (direction[1] === -1) break;
          setDirection([0, 1]);
          break;
        case 'ArrowLeft':
          // ไม่อนุญาตให้กลับทิศทางถ้าไปขวา
          if (direction[0] === 1) break;
          setDirection([-1, 0]);
          break;
        case 'ArrowRight':
          // ไม่อนุญาตให้กลับทิศทางถ้าไปซ้าย
          if (direction[0] === -1) break;
          setDirection([1, 0]);
          break;
        default:
          break;
      }
    };

    // ฟัง event การกดปุ่มเมื่อ component ถูกสร้างขึ้น
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      // ลบ event listener เมื่อ component ถูกทำลาย
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  // ฟังก์ชันเคลื่อนที่ของงู
  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];

        // เพิ่มหัวใหม่ที่ตำแหน่งใหม่
        newSnake.unshift(head);

        // ถ้าหัวไม่กินอาหาร ให้ลบหาง
        if (head[0] !== food[0] || head[1] !== food[1]) {
          newSnake.pop();
        } else {
          // สุ่มตำแหน่งอาหารใหม่
          setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
        }

        return newSnake;
      });
    };

    // เคลื่อนที่ของงูทุก 200 มิลลิวินาที
    const intervalId = setInterval(moveSnake, 200);

    return () => {
      clearInterval(intervalId); // ลบ interval เมื่อ component ถูกทำลาย
    };
  }, [direction, food]);

  return (
    <div className="game-board">
      <div className="snake-area">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              left: `${segment[0] * 5}%`,
              top: `${segment[1] * 5}%`,
            }}
          />
        ))}
      </div>
      <div
        className="food"
        style={{
          left: `${food[0] * 5}%`,
          top: `${food[1] * 5}%`,
        }}
      />
    </div>
  );
};

export default Snake;
