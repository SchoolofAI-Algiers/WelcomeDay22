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
  const value = useMemo(
    () => ({ ball, user, com, net }),
    [ball, user, com, net]
  );
  return <PongContext.Provider value={value}>{children}</PongContext.Provider>;
}
function PongContent() {
  const { ball, user, com, net } = useContext(PongContext);
  // const [score, setScore] = useState(0);
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
    // ctx.textAlign = "center";

    function drawRect(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    // draw circle, will be used to draw the ball
    function drawArc(x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

    // when COM or USER scores, we reset the ball
    function resetBall() {
      ball.speed = 8;
      ball.x = width / 2;
      ball.y = height / 2;
      ball.velocityX = (Math.round(Math.random()) * 2 - 1) * 4;
      ball.velocityY = (Math.round(Math.random()) * 2 - 1) * Math.random() * 3;
    }

    // draw the net
    function drawNet() {
      for (let i = 0; i <= height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
      }
    }

    // draw text
    function drawText(text, x, y) {
      ctx.fillStyle = "#FFF";
      ctx.font = "75px fantasy";
      ctx.fillText(text, x, y);
    }

    // collision detection
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

    // update function, the function that does all calculations
    function update(decision) {
      // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
      if (ball.x - ball.radius < 0) {
        ball.score = 0;
        com.score++;
        // comScore.play();
        resetBall();
      } else if (ball.x + ball.radius > width) {
        ball.score = 0;
        user.score++;
        // userScore.play();
        resetBall();
      }

      // the ball has a velocity
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // computer plays for itself, and we must be able to beat it
      // simple AI
      // com.y += (ball.y - (com.y + com.height / 2)) * 0.1;
      if (decision === 1) changePaddle(com, com.y - 5);
      else if (decision === 2) changePaddle(com, com.y + 5);
      // when the ball collides with bottom and top walls we inverse the y velocity.
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) {
        ball.velocityY = -ball.velocityY;
        // wall.play();
      }

      // we check if the paddle hit the user or the com paddle
      const player = ball.x + ball.radius < width / 2 ? user : com;

      // if the ball hits a paddle
      if (collision(ball, player)) {
        ball.score++;
        // play sound
        // hit.play();
        // we check where the ball hits the paddle
        let collidePoint = ball.y - (player.y + player.height / 2);
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height / 2);

        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        const angleRad = (Math.PI / 4) * collidePoint;

        // change the X and Y velocity direction
        const direction = ball.x + ball.radius < width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        if (ball.velocityY === 0) ball.velocityY = 1;

        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.1;
      }
    }

    // render function, the function that does al the drawing
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
            paddle: [com.x, com.y],
            ball: [ball.x, ball.y],
          },
        })
        .then(function (response) {
          const decision = parseInt(response.data);
          // console.log(decision);
          update(decision);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    //call the game function 50 times every 1 Sec
    if (ref?.current) setInterval(game, 1000 / framePerSecond);
  }, []);

  return (
    <canvas
      ref={ref}
      tabIndex="0"
      onMouseMove={getMousePos}
      id="pong"
      width="600"
      height="400"
    />
  );
}

export function Pong() {
  return (
    <PongContextProvider>
      <PongContent />
    </PongContextProvider>
  );
}
