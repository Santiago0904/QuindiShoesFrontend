// [IMPORTS]
import { useEffect, useRef, useState } from 'react';
import birdImg from '../../assets/images/crocodilo.png';
import birdFlapImg from '../../assets/images/sprite-up.png';
import dieSoundFile from '../../assets/sounds/die.mp3';
import fondoVideo from '../../assets/images/202505231554.mp4';
import Ecos_Freneticos from '../../assets/sounds/Ecos_Freneticos.mp3';
import axiosClient from '../../api/axion';

export default function FlappyBirdGame({onGameOver}) {
  const [gameState, setGameState] = useState('Start');
  const [birdY, setBirdY] = useState(40);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [birdSrc, setBirdSrc] = useState(birdImg);
  const [videoReverse, setVideoReverse] = useState(false);

  const velocityRef = useRef(0);
  const birdYRef = useRef(40);
  const pipesRef = useRef([]);
  const animationFrameRef = useRef();
  const pipeTimerRef = useRef(0);
  const gameStateRef = useRef(gameState);
  const dieSound = useRef(new Audio(dieSoundFile));
  const videoRef = useRef(null);
  const reverseIntervalRef = useRef(null);
  const videoTimeoutRef = useRef(null);
  const ecosFreneticosAudio = useRef(new Audio(Ecos_Freneticos));
  const gameOverRef = useRef(false);

  useEffect(() => {
    dieSound.current.load();
    ecosFreneticosAudio.current.load();
  }, []);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

const guardarPuntuacion = async (puntuacion) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Decodifica el payload del JWT para obtener el usuarioId
    const payload = JSON.parse(atob(token.split('.')[1]));
    const usuarioId = payload.id || payload.data?.id;
    if (!usuarioId) return;

    await axiosClient.post("/juego", { usuarioId, puntuacion });
  } catch (error) {
    console.error("Error al guardar puntuación:", error);
  }
};

  const gravity = 0.1;
  const flapPower = -1.5;
  const moveSpeedRef = useRef(0.3);
  const [_, setDummy] = useState(0); // para forzar re-render si quieres mostrar velocidad (opcional)


  const pipeGap = 30;
  const PIPE_SCALE = 13;

  const birdHeight = 10.5;
  const birdWidth = 7;

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const handleKeyDown = (e) => {
  const audio = ecosFreneticosAudio.current;

  if ((e.key === 'Enter' || e.key === 'ArrowUp') && gameStateRef.current !== 'Play') {
    // Reproduce la música aquí directamente tras interacción
    e.preventDefault()
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch((e) => {
      console.warn("No se pudo reproducir Ecos_Freneticos:", e);
    });

    startGame();
  }

  if ((e.key === ' ' || e.key === 'ArrowUp') && gameStateRef.current === 'Play') {
    e.preventDefault();
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
 gameOverRef.current = false;  // Reiniciar bandera

  moveSpeedRef.current = 0.3;
  setScore(0);
  const initialY = 40;
  setBirdY(initialY);
  birdYRef.current = initialY;
  velocityRef.current = 0;

  startVideoForward();
  



  const initialPipes = [
    { id: Date.now(),     x: 100, top: 25, scored: false },

  ];

  pipesRef.current = initialPipes;
  setPipes(initialPipes);
  pipeTimerRef.current = 0;
  setGameState('Play');
  cancelAnimationFrame(animationFrameRef.current);
  animationFrameRef.current = requestAnimationFrame(gameLoop);
};




  // Dentro de `gameOver`:
const gameOver = () => {
  if (gameOverRef.current) return;  // Si ya hubo game over, no hacer nada
  gameOverRef.current = true;

  setGameState('End');
  cancelAnimationFrame(animationFrameRef.current);

  const audio = ecosFreneticosAudio.current;
  audio.pause();
  audio.currentTime = 0;

  // const die = dieSound.current;
  // die.pause();
  // die.currentTime = 0;
  // die.play().catch((e) => console.warn("No se pudo reproducir die.mp3:", e));

  if (videoRef.current) {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    clearInterval(reverseIntervalRef.current);
    clearTimeout(videoTimeoutRef.current);
  }

  guardarPuntuacion(scoreRef.current);    
  if (typeof onGameOver === 'function') {
      onGameOver();
    }};


  // ... (todo igual hasta gameLoop)

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
    .map(pipe => ({ ...pipe, x: pipe.x - moveSpeedRef.current }))
    .filter(pipe => pipe.x + 8 > 0);

  const hitboxWidth = birdWidth * 0.8;
  const hitboxHeight = birdHeight * 0.8;
  const marginX = (birdWidth - hitboxWidth) / 2;
  const marginY = (birdHeight - hitboxHeight) / 2;
  const verticalOffset = 2;

  pipesRef.current.forEach(pipe => {
    const birdLeft = 30 + marginX;
    const birdRight = birdLeft + hitboxWidth;
    const birdTop = birdYRef.current + verticalOffset + marginY;
    const birdBottom = birdTop + hitboxHeight;

    const pipeLeft = pipe.x;
    const pipeRight = pipeLeft + 6;

    const upperPipeBottom = pipe.top;
    const lowerPipeTop = pipe.top + pipeGap;

    const horizontalOverlap = birdRight > pipeLeft + 1 && birdLeft < pipeRight - 1;
    const verticalCollision = birdTop < upperPipeBottom || birdBottom > lowerPipeTop;

    if (horizontalOverlap && verticalCollision) {
      gameOver();
    }

    if (!pipe.scored && pipe.x + 6 < 30) {
      setScore(prev => {
        const newScore = prev + 1;
        scoreRef.current = newScore;
        // Eliminado el sonido aquí:
        // if (newScore % 10 === 0) {
        //   const point = pointSound.current;
        //   point.pause();
        //   point.currentTime = 0;
        //   point.play().catch((e) => console.warn("No se pudo reproducir point.mp3:", e));
        // }
        return newScore;
      });
      pipe.scored = true;
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

// ... (el resto igual)


  useEffect(() => {
  if (score > 0 && score % 10 === 0) {
    // Aumenta la velocidad ligeramente, por ejemplo +0.05
    moveSpeedRef.current += 0.15;
    // Opcional: forzar re-render para debug o mostrar velocidad
    setDummy(prev => prev + 1);
  }
}, [score]);


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
 
return (

    <div
      className="relative w-[1300px] h-[700px] overflow-hidden border-4 border-white rounded-xl shadow-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(6px)',

      }}
    >
      <video
        ref={videoRef}
        src={fondoVideo}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        muted
        playsInline
        loop
      />
      <img
        src={birdSrc}
        alt="bird"
        className="absolute w-[80px] h-[105px] left-[390px] z-50"
        style={{ top: `${birdY * 8}px` }}
      />
      {pipes.map(pipe => {
        const pipeWidth = 80;
        const pipeHeight = 600;
        const pipeX = pipe.x * PIPE_SCALE;

        const topPipeBottom = pipe.top * 8;
        const bottomPipeTop = topPipeBottom + pipeGap * 8;

        const palmaPattern = `
          repeating-linear-gradient(
            0deg,
            #3cb371,
            #3cb371 2px,
            #2ea360 2px,
            #2ea360 4px,
            #279151 4px,
            #279151 6px
          ),
          linear-gradient(
            to bottom,
            rgba(60, 179, 113, 0.9),
            rgba(40, 120, 70, 0.95)
          )
        `;

        return (
          <div key={pipe.id}>
            {/* Tubería superior */}
            <div
              className="absolute z-10"
              style={{
                left: `${pipeX}px`,
                top: `${topPipeBottom - pipeHeight}px`,
                width: `${pipeWidth}px`,
                height: `${pipeHeight}px`,
                backgroundColor: '#3cb371',
                backgroundImage: palmaPattern,
                backgroundSize: '8px 100%, auto',
                backgroundRepeat: 'repeat-x, no-repeat',
                border: '5px solid #1f6e3d',
                borderBottom: 'none',
                borderRadius: '14px 14px 0 0',
                boxShadow: 'inset 0 0 20px rgba(50, 150, 100, 0.9), 0 6px 15px rgba(0,0,0,0.5)',
                filter: 'drop-shadow(0 0 5px rgba(30, 120, 80, 0.6))',
                transition: 'background-color 0.3s',
              }}
            />

            {/* Tubería inferior */}
            <div
              className="absolute z-10"
              style={{
                left: `${pipeX}px`,
                top: `${bottomPipeTop}px`,
                width: `${pipeWidth}px`,
                height: `${pipeHeight}px`,
                backgroundColor: '#3cb371',
                backgroundImage: palmaPattern,
                backgroundSize: '8px 100%, auto',
                backgroundRepeat: 'repeat-x, no-repeat',
                border: '5px solid #1f6e3d',
                borderTop: 'none',
                borderRadius: '0 0 14px 14px',
                boxShadow: 'inset 0 0 20px rgba(50, 150, 100, 0.9), 0 -6px 15px rgba(0,0,0,0.5)',
                filter: 'drop-shadow(0 0 5px rgba(30, 120, 80, 0.6))',
                transition: 'background-color 0.3s',
              }}
            />
          </div>
        );
      })}

      <div className="absolute top-6 left-6 text-white text-4xl z-50 drop-shadow-lg">
        <span>Score: </span>
        <span className="text-yellow-400 font-bold">{score}</span>
      </div>
      {gameState !== 'Play' && (
        <div className="absolute text-center z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
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
