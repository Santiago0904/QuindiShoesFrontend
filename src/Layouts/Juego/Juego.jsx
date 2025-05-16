import { useEffect, useRef, useState } from 'react';
import birdImg from '../../assets/images/Bird.png';
import birdFlapImg from '../../assets/images/Bird-2.png';
import pointSoundFile from '../../assets/sounds/point.mp3';
import dieSoundFile from '../../assets/sounds/die.mp3';
import bgImg from '../../assets/images/background-img.png';

export default function FlappyBirdGame() {
  const [gameState, setGameState] = useState('Start');
  const [birdY, setBirdY] = useState(40); // en vh
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [birdSrc, setBirdSrc] = useState(birdImg);

  const velocityRef = useRef(0);
  const birdYRef = useRef(40);
  const pipesRef = useRef([]);
  const animationFrameRef = useRef();
  const pipeTimerRef = useRef(0);
  const gameStateRef = useRef(gameState);
  const pointSound = useRef(new Audio(pointSoundFile));
  const dieSound = useRef(new Audio(dieSoundFile));

  const gravity = 0.1;
  const flapPower = -1.5;  // menos salto para que no sea instant kill
  const moveSpeed = 0.3;   // movimiento más lento
  const pipeGap = 30;      // en vh

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === 'ArrowUp') && gameStateRef.current !== 'Play') {
      startGame();
    }
    if ((e.key === ' ' || e.key === 'ArrowUp') && gameStateRef.current === 'Play') {
      velocityRef.current = flapPower;
      setBirdSrc(birdFlapImg);
    }
  };

  const handleKeyUp = (e) => {
    if ((e.key === ' ' || e.key === 'ArrowUp')) {
      setBirdSrc(birdImg);
    }
  };

  const startGame = () => {
    setScore(0);
    pipesRef.current = [];
    setPipes([]);
    birdYRef.current = 40;
    velocityRef.current = 0;
    setBirdY(40);
    setGameState('Play');
    pipeTimerRef.current = 0;
    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  const gameOver = () => {
    setGameState('End');
    dieSound.current.play();
    cancelAnimationFrame(animationFrameRef.current);
  };

  const gameLoop = () => {
    if (gameStateRef.current !== 'Play') return;

    velocityRef.current += gravity;
    birdYRef.current += velocityRef.current;

    if (birdYRef.current < 0 || birdYRef.current > 90) {
      gameOver();
      return;
    }

    setBirdY(birdYRef.current);

    pipesRef.current = pipesRef.current
      .map(pipe => ({ ...pipe, x: pipe.x - moveSpeed }))
      .filter(pipe => pipe.x + 6 > 0);

    pipesRef.current.forEach(pipe => {
      const birdTop = birdYRef.current;
      const birdBottom = birdYRef.current + 10;
      const upperPipeBottom = pipe.top;
      const lowerPipeTop = pipe.top + pipeGap;

      const isHorizontal = pipe.x < 36 && pipe.x + 6 > 30;

      if (
        isHorizontal &&
        (birdTop < upperPipeBottom || birdBottom > lowerPipeTop)
      ) {
        gameOver();
      }

      if (!pipe.scored && pipe.x + 6 < 30) {
        setScore(prev => prev + 1);
        pipe.scored = true;
        pointSound.current.play();
      }
    });

    setPipes([...pipesRef.current]);

    pipeTimerRef.current++;
    if (pipeTimerRef.current > 100) {
      pipeTimerRef.current = 0;
      const top = Math.floor(Math.random() * 45) + 10;
      pipesRef.current.push({
        id: Date.now() + Math.random(),
        x: 100,
        top,
        scored: false,
      });
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Bird */}
      <img
        src={birdSrc}
        alt="bird"
        className="absolute w-[4vw] h-[7vh] left-[30vw] z-50"
        style={{ top: `${birdY}vh` }}
      />

      {/* Pipes */}
      {pipes.map(pipe => (
        <div key={pipe.id}>
          {/* Superior */}
          <div
            className="absolute bg-green-700 border border-black"
            style={{
              left: `${pipe.x}vw`,
              top: '0vh',
              width: '6vw',
              height: `${pipe.top}vh`,
            }}
          />
          {/* Inferior */}
          <div
            className="absolute bg-green-700 border border-black"
            style={{
              left: `${pipe.x}vw`,
              top: `${pipe.top + pipeGap}vh`,
              width: '6vw',
              height: `${100 - (pipe.top + pipeGap)}vh`,
            }}
          />
        </div>
      ))}

      {/* Score */}
      <div className="absolute top-4 left-4 text-white text-5xl z-50 drop-shadow-lg">
        <span>Score: </span>
        <span className="text-yellow-400 font-bold">{score}</span>
      </div>

      {/* Mensajes */}
      {gameState !== 'Play' && (
        <div className="absolute text-center z-50 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl bg-white p-6 rounded-lg shadow-lg">
          {gameState === 'Start' && (
            <>
              <p>Presiona <b>↑</b> o <b>Enter</b> para comenzar</p>
              <p>Usa <span className="text-red-600">↑</span> o espacio para volar</p>
            </>
          )}
          {gameState === 'End' && (
            <p className="text-red-600">Game Over<br />Presiona ↑ o Enter para reiniciar</p>
          )}
        </div>
      )}
    </div>
  );
}
