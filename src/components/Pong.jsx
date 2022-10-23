import {
  useEffect,
  useState,
  useRef,
  createContext,
  useMemo,
  useContext,
} from "react";
import axios from "axios";
// number of frames per second
const framePerSecond = 60;
const width = "600";
const height = "400";

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
  const [ai] = useState({ step: 5 });
  const value = useMemo(
    () => ({ ball, user, com, net, ai }),
    [ball, user, com, net, ai]
  );
  return <PongContext.Provider value={value}>{children}</PongContext.Provider>;
}
function PongContent() {
  const { ball, user, com, net, ai } = useContext(PongContext);
  const [gameover, setGameover] = useState(false);
  const [score, setScore] = useState(0);
  const [loop, setLoop] = useState(null);
  const [username, setUsername] = useState("");
  const ref = useRef(null);
  function getMousePos(evt) {
    const rect = evt.target.getBoundingClientRect();
    changePaddle(user, evt.clientY - rect.top - user.height / 2);
  }
  function changePaddle(paddle, y) {
    if (y > 0 && y < height - paddle.height) paddle.y = y;
    if (y <= 0) paddle.y = 0;
    if (y >= height - paddle.height) paddle.y = height - paddle.height;
  }
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    ctx.textAlign = "center";
    let error = false;
    const hit = new Audio("./sounds/hit.mp3");
    const wall = new Audio("./sounds/wall.mp3");
    const userScore = new Audio("./sounds/comScore.mp3");
    const comScore = new Audio("./sounds/userScore.mp3");
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

    function resetBall() {
      ball.speed = 8;
      ball.x = width / 2;
      ball.y = height / 2;
      ball.velocityX = (Math.round(Math.random()) * 2 - 1) * 4;
      ball.velocityY = (Math.round(Math.random()) * 2 - 1) * Math.random() * 3;
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

      if (decision === 1) changePaddle(com, com.y - ai.step);
      else if (decision === 2) changePaddle(com, com.y + ai.step);

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) {
        ball.velocityY = -ball.velocityY;
        wall.play();
        if (error) ball.y = ball.y < height / 2 ? 3 : height - 2;
        error = true;
      } else error = false;

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
        ai.step += 0.05;
      }
    }

    function render() {
      // clear the canvas
      drawRect(0, 0, width, height, "#000");

      // draw the user score to the left
      // drawText(user.score, width / 4, height / 5);

      // draw ball score
      drawText(ball.score, width / 2, height / 5);

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
      axios
        .post("http://127.0.0.1:5000/getPos", {
          params: {
            paddle: [
              Math.round(com.x),
              Math.round(com.y) + (com.height * 1) / 2,
            ],
            ball: [Math.round(ball.x), Math.round(ball.y)],
          },
        })
        .then(function (response) {
          const decision = parseInt(response.data);
          update(decision);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    //call the game function 50 times every 1 Sec
    if (ref?.current && !gameover) {
      setLoop(setInterval(game, 1000 / framePerSecond));
    }
  }, [gameover]);

  useEffect(() => {
    if (gameover) {
      clearInterval(loop);
    }
  }, [gameover]);
  return (
    <div style={{ position: "relative" }}>
      {gameover && (
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
              onClick={(event) => {
                if (username !== "")
                  axios
                    .post("http://127.0.0.1:5000/submitScore", {
                      params: {
                        username,
                        score,
                      },
                    })
                    .then(() => {
                      setGameover(false);
                      setScore(0);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
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
            <button
              onClick={() => {
                setGameover(false);
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
          </div>
        </div>
      )}
      <canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        ref={ref}
        tabIndex="0"
        onMouseMove={getMousePos}
        onTouchMove={getMousePos}
        id="pong"
        width="600"
        height="400"
      />
    </div>
  );
}

export function Pong() {
  return (
    <PongContextProvider>
      <PongContent />
    </PongContextProvider>
  );
}
