import {
  useEffect,
  useState,
  useRef,
  createContext,
  useMemo,
  useContext,
} from "react";
import { isMobile } from "react-device-detect";
import { Slider } from "@mui/material";
import axios from "axios";
import { io } from "socket.io-client";
// number of frames per second
const framePerSecond = 60;
const width = 600;
const height = 400;

const PongContext = createContext({});
function PongContextProvider({ children }) {
  const [ball] = useState({
    score: 0,
    x: width / 2,
    y: height / 2,
    radius: 7,
    velocityX: 4,
    velocityY: 4,
    speed: 8,
    color: "WHITE",
  });
  const [user] = useState({
    x: 0, // left side of canvas
    y: (height - 100) / 2, // -100 the height of paddle
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE",
  });
  const [com] = useState({
    x: width - 10, // - width of paddle
    y: (height - 100) / 2, // -100 the height of paddle
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE",
  });
  const [net] = useState({
    x: (width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "WHITE",
  });
  const [ai] = useState({ step: 7 });
  const value = useMemo(
    () => ({ ball, user, com, net, ai }),
    [ball, user, com, net, ai]
  );
  return <PongContext.Provider value={value}>{children}</PongContext.Provider>;
}
function PongContent({ setLoading }) {
  const { ball, user, com, net, ai } = useContext(PongContext);
  const [gameover, setGameover] = useState(false);
  const [score, setScore] = useState(0);
  const [loop, setLoop] = useState(null);
  const [start, setStart] = useState(false);
  const [startWindow, setStartWindow] = useState(true);
  const error = useRef(false);
  const [username, setUsername] = useState("");
  const [value, setValue] = useState(height / 2 - user.height / 2);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    changePaddle(user, value);
  }, [user, value]);

  useEffect(() => {
    const socket = io("https://864d-105-235-130-142.eu.ngrok.io", {
      transports: ["websocket"],
    });
    setSocket(socket);

    return function cleanup() {
      socket.disconnect();
    };
  }, []);
  function getMousePos(evt) {
    const rect = evt.target.getBoundingClientRect();
    setValue(evt.clientY - rect.top - user.height / 2);
  }
  function changePaddle(paddle, y) {
    if (y > 0 && y < height - paddle.height) paddle.y = y;
    if (y <= 0) paddle.y = 0;
    if (y >= height - paddle.height) paddle.y = height - paddle.height;
  }
  useEffect(() => {
    const hit = new Audio("./sounds/hit.mp3");
    const wall = new Audio("./sounds/wall.mp3");
    const userScore = new Audio("./sounds/comScore.mp3");
    const comScore = new Audio("./sounds/userScore.mp3");
    socket &&
      socket.on("pong", (decision) => {
        update(decision);
      });

    function resetBall() {
      ball.speed = 8;
      ball.x = width / 2;
      ball.y = height / 2;
      ball.velocityX = (Math.round(Math.random()) * 2 - 1) * 4;
      ball.velocityY = (Math.round(Math.random()) * 2 - 1) * Math.random() * 3;
    }
    function collision(b, p) {
      p.top = p.y;
      p.bottom = p.y + p.height;
      p.left = p.x;
      p.right = p.x + p.width;

      b.top = b.y - b.radius;
      b.bottom = b.y + b.radius;
      b.left = b.x - b.radius;
      b.right = b.x + b.radius;

      return (
        p.left < b.right &&
        p.top < b.bottom &&
        p.right > b.left &&
        p.bottom > b.top
      );
    }

    function update(decision) {
      if (
        ball.x - ball.radius < 0 &&
        (ball.y > user.y + user.height || ball.y < user.y)
      ) {
        setScore(ball.score);
        ball.score = 0;
        com.score++;
        comScore.play();
        resetBall();
        setGameover(true);
      } else if (
        ball.x + ball.radius > width &&
        (ball.y > com.y + com.height || ball.y < com.y)
      ) {
        setScore(ball.score);
        ball.score = 0;
        user.score++;
        userScore.play();
        resetBall();
        setGameover(true);
      }

      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // simple AI
      // com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

      if (decision === 1)
        changePaddle(
          com,
          ball.y > com.y + com.height / 2 ? com.y + 2 : com.y - ai.step
        );
      else if (decision === 2)
        changePaddle(
          com,
          ball.y < com.y + com.height / 2 ? com.y - 2 : com.y + ai.step
        );

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) {
        ball.velocityY = -ball.velocityY;
        wall.play();
        if (error.current) ball.y = ball.y < height / 2 ? 3 : height - 2;
        error.current = true;
      } else error.current = false;

      const player = ball.x + ball.radius < width / 2 ? user : com;

      if (collision(ball, player)) {
        ball.score++;
        hit.play();
        let collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint = collidePoint / (player.height / 2);
        const angleRad = (Math.PI / 4) * collidePoint;
        const direction = ball.x + ball.radius < width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
        ai.step += 0.2;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    ctx.textAlign = "center";
    function drawRect(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    function drawArc(x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

    function drawNet() {
      for (let i = 0; i <= height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
      }
    }

    function drawText(text, x, y) {
      ctx.fillStyle = "#FFF";
      ctx.font = "75px fantasy";
      ctx.fillText(text, x, y);
    }

    function render() {
      // clear the canvas
      drawRect(0, 0, width, height, "#000");

      // draw the user score to the left
      // drawText(user.score, width / 4, height / 5);

      // draw ball score
      !isMobile && drawText(ball.score, width / 2, height / 5);

      // draw the COM score to the right
      // drawText(com.score, (3 * width) / 4, height / 5);

      // draw the net
      drawNet();

      // draw the user's paddle
      drawRect(user.x, user.y, user.width, user.height, user.color);

      // draw the COM's paddle
      drawRect(com.x, com.y, com.width, com.height, com.color);

      // draw the ball
      drawArc(ball.x, ball.y, ball.radius, ball.color);
    }
    function game() {
      sendPos();
      if (ctx) render();
    }
    function sendPos() {
      socket.emit("pong", {
        paddle: [com.x, com.y + com.height / 2],
        ball: [ball.x, ball.y],
      });
    }

    if (ref?.current && start) {
      setStart(false);
      setLoop(setInterval(game, 1000 / framePerSecond));
    }
  }, [
    start,
    socket,
    net.x,
    net.y,
    net.width,
    net.height,
    net.color,
    ball.score,
    ball.x,
    ball.y,
    ball.radius,
    ball.color,
    user.x,
    user.y,
    user.width,
    user.height,
    user.color,
    com.x,
    com.y,
    com.width,
    com.height,
    com.color,
  ]);

  useEffect(() => {
    if (gameover) {
      clearInterval(loop);
    }
  }, [gameover, loop]);
  return (
    <div
      className="scale-[0.7] md:scale-100 ml-[300px] mt-[40px] rotate-90 md:m-auto lg:ml-[20%] md:rotate-0 "
      style={{ position: "relative" }}
    >
      {gameover && (
        <div
          className="-rotate-90 md:rotate-0 ml-20 md:ml-0 w-[400px] md:w-[600px]"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,1)",
            height: 400,
            color: "white",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ paddingTop: "110px" }}>SCORE : {score}</h1>
            <h1 style={{ paddingTop: "10px" }}>GAME OVER</h1>
            <input
              placeholder="Enter your username"
              style={{
                color: "black",
                padding: "3px 10px",
                marginTop: "10px",
                textAlign: "center",
                border: "none",
              }}
              onChange={(event) => {
                const value = event.target.value;
                if (value !== undefined) setUsername(value);
              }}
              value={username}
              name="username"
            ></input>
            <div>
              <button
                onClick={() => {
                  setGameover(false);
                  setStartWindow(true);
                  setScore(0);
                }}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "3px 10px",
                  borderRadius: "5px",
                  margin: "5px",
                }}
              >
                Restart
              </button>
              <button
                onClick={(event) => {
                  if (username !== "") {
                    socket && socket.emit("score", { username, score });
                    setLoading(true);
                    setGameover(false);
                    setStartWindow(true);
                    setScore(0);
                    setValue(height / 2 - user.height / 2);
                  }

                  //   axios
                  //     .post(
                  //       "https://864d-105-235-130-142.eu.ngrok.io/addScore",
                  //       {
                  //         username,
                  //         score,
                  //       }
                  //     )
                  //     .then(() => {
                  //       setLoading(true);
                  //       setGameover(false);
                  //       setStartWindow(true);
                  //       setScore(0);
                  //       setValue(height / 2 - user.height / 2);
                  //     })
                  //     .catch(function (error) {
                  //       console.log(error);
                  //     });
                  else {
                    event.target.style.backgroundColor = "red";
                    setTimeout(() => {
                      event.target.style.backgroundColor = "white";
                    }, 300);
                  }
                }}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "3px 10px",
                  borderRadius: "5px",
                  margin: "auto",
                  marginTop: "10px",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {startWindow && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "black",
            width: 600,
            height: 400,
            color: "white",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => {
              setStart(true);
              setStartWindow(false);
            }}
            className="-rotate-90 md:rotate-0 m-auto mt-[200px] rounded-[5px] px-[10px] py-[3px] bg-white text-black hover:text-yellow-500"
          >
            Start
          </button>
        </div>
      )}
      <canvas
        className="rotate-180 md:rotate-0  border-white border-2"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -11,
        }}
        ref={ref}
        tabIndex="0"
        onMouseMove={getMousePos}
        id="pong"
        width="600"
        height="400"
      />
      {isMobile && (
        <Slider
          className="absolute md:hidden -rotate-90 "
          style={{
            top: "180px",
            left: "400px",
            width: "400px",
            color: "white",
          }}
          width={500}
          value={value + user.height / 2}
          min={0}
          max={height}
          onChange={(evt, value) => {
            if (value < height - user.height && !startWindow && !gameover)
              setValue(value);
          }}
        />
      )}
      <div>
        <p className="-rotate-90 text-3xl absolute text-center  left-[270px] top-[180px] -z-10 md:-z-20">
          {ball.score}
        </p>
      </div>
    </div>
  );
}

export default function Pong({ setLoading }) {
  return (
    <PongContextProvider>
      <PongContent setLoading={setLoading} />
    </PongContextProvider>
  );
}
