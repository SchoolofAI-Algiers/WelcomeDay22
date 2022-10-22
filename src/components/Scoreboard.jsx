import { useEffect, useState } from "react";
import axios from "axios";
export function Scoreboard() {
  const [scoreboard, setScoreboard] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/getScore")
      .then((response) => {
        // console.log(response.data);
        setScoreboard(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <table>
      <thead>
        <th>username</th>
        <th>score</th>
      </thead>
      <tbody>
        {scoreboard.map(({ username, score }, i) => (
          <tr key={i}>
            <td>{username}</td>
            <td>{score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
