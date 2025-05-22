import { useEffect, useRef, useState } from 'react';
import birdImg from '../../assets/images/crocodilo.png';
import birdFlapImg from '../../assets/images/sprite-up.png';
import pointSoundFile from '../../assets/sounds/point.mp3';
import dieSoundFile from '../../assets/sounds/die.mp3';
import fondoVideo from '../../assets/images/FONDOMP4.mp4';
import coffeePlantImg from '../../assets/images/coffee-plant.png';


// ... [importaciones iguales que antes]

export default function FlappyBirdGame() {
  const [gameState, setGameState] = useState('Start');
  const [birdY, setBirdY] = useState(40);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [birdSrc, setBirdSrc] = useState(birdImg);
  const [videoReverse, setVideoReverse] = useState(false);
  const reverseIntervalRef = useRef(null);
  const videoTimeoutRef = useRef(null); // NUEVO: referencia para timeout de espera

  const velocityRef = useRef(0);
  const birdYRef = useRef(40);
  const pipesRef = useRef([]);
  const animationFrameRef = useRef();
  const pipeTimerRef = useRef(0);
  const gameStateRef = useRef(gameState);
  const pointSound = useRef(new Audio(pointSoundFile));
  const dieSound = useRef(new Audio(dieSoundFile));
  const videoRef = useRef(null);

  const gravity = 0.1;
  const flapPower = -1.5;
  const moveSpeed = 0.3;
  const pipeGap = 30;

  const birdHeight = 11.5;
  const birdWidth = 3.5;

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
      setTimeout(() => setBirdSrc(birdImg), 200);
    }
  };

  const startVideoForward = () => {
    if (!videoRef.current) return;
    clearInterval(reverseIntervalRef.current);
    clearTimeout(videoTimeoutRef.current);
    videoRef.current.playbackRate = 1;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setVideoReverse(false);
  };

  const startVideoReverse = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setVideoReverse(true);

    videoTimeoutRef.current = setTimeout(() => {
      reverseIntervalRef.current = setInterval(() => {
        if (!videoRef.current) return;
        if (videoRef.current.currentTime <= 0) {
          clearInterval(reverseIntervalRef.current);
          clearTimeout(videoTimeoutRef.current);

          // Espera 3 segundos antes de volver a reproducir hacia adelante
          videoTimeoutRef.current = setTimeout(() => {
            startVideoForward();
          }, 3000);
        } else {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 0.05);
        }
      }, 50);
    }, 3000); // Espera 3s antes de comenzar a retroceder
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      startVideoReverse();
    };
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
      clearInterval(reverseIntervalRef.current);
      clearTimeout(videoTimeoutRef.current);
    };
  }, []);

  const startGame = () => {
    setScore(0);
    const initialY = 40;
    setBirdY(initialY);
    birdYRef.current = initialY;
    velocityRef.current = 0;

    startVideoForward();

    // NUEVO: Generar 3 tuberías separadas adecuadamente
    const initialPipes = Array.from({ length: 3 }, (_, i) => {
      const top = Math.floor(Math.random() * 45) + 10;
      return {
        id: Date.now() + i,
        x: 100 + i * 50, // Más separadas horizontalmente
        top,
        scored: false,
      };
    });

    pipesRef.current = initialPipes;
    setPipes(initialPipes);
    pipeTimerRef.current = 0;
    setGameState('Play');
    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  const gameOver = () => {
    setGameState('End');
    dieSound.current.play();
    cancelAnimationFrame(animationFrameRef.current);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      clearInterval(reverseIntervalRef.current);
      clearTimeout(videoTimeoutRef.current);
    }
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
      .filter(pipe => pipe.x + 8 > 0);

    const hitboxWidth = birdWidth * 0.85;
    const hitboxHeight = birdHeight * 0.85;
    const marginX = (birdWidth - hitboxWidth) / 2;
    const marginY = (birdHeight - hitboxHeight) / 2;
    const verticalOffset = 2;

    pipesRef.current.forEach(pipe => {
      const birdLeft = 30 + marginX;
      const birdRight = birdLeft + hitboxWidth;
      const birdTop = birdYRef.current + verticalOffset + marginY;
      const birdBottom = birdTop + hitboxHeight;

      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + 6;

      const upperPipeBottom = pipe.top;
      const lowerPipeTop = pipe.top + pipeGap;

      const horizontalOverlap = birdRight > pipeLeft + 1 && birdLeft < pipeRight - 1;
      const verticalCollision = birdTop < upperPipeBottom || birdBottom > lowerPipeTop;

      if (horizontalOverlap && verticalCollision) {
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
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="relative w-[1300px] h-[800px] overflow-hidden border-4 border-white rounded-xl shadow-lg">
        <video
          ref={videoRef}
          src={fondoVideo}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          muted
          playsInline
        />

        <img
          src={birdSrc}
          alt="bird"
          className="absolute w-[80px] h-[105px] left-[350px] z-50"
          style={{ top: `${birdY * 8}px` }}
        />

        {pipes.map(pipe => (
          <div key={pipe.id}>
            {/* Parte superior */}
            <img
              src={coffeePlantImg}
              alt="plant-top"
              className="absolute image-render-pixel"
              style={{
                left: `${pipe.x * 13}px`,
                top: '0px',
                width: '78px',
                height: `${pipe.top * 8}px`,
                imageRendering: 'pixelated',
                objectFit: 'fill',
                transform: 'scaleY(-1)', // Volteada para arriba
              }}
            />

            {/* Parte inferior */}
            <img
              src={coffeePlantImg}
              alt="plant-bottom"
              className="absolute image-render-pixel"
              style={{
                left: `${pipe.x * 13}px`,
                top: `${(pipe.top + pipeGap) * 8}px`,
                width: '78px',
                height: `${(100 - (pipe.top + pipeGap)) * 8}px`,
                imageRendering: 'pixelated',
                objectFit: 'fill',

              }}
            />
          </div>
        ))}


        <div className="absolute top-6 left-6 text-white text-4xl z-50 drop-shadow-lg">
          <span>Score: </span>
          <span className="text-yellow-400 font-bold">{score}</span>
        </div>

        {gameState !== 'Play' && (
          <div className="absolute text-center z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl bg-white p-8 rounded-lg shadow-lg">
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
    </div>
  );
}

