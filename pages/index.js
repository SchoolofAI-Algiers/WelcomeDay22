import Faq from "../components/Faq.jsx";
import Challenges from "../components/Challenges.jsx";
import Events from "../components/Events";
import Contact from "../components/Contact";
import Home from "../components/Home";
import LeaderBoard from "../components/LeaderBord.jsx";
import LeaderBoardChallenge from "./LeaderBoardChallenge.jsx";

export default function App() {
  return (
    <div>
      <Home />
      <Events />
      <LeaderBoard/>
      <Faq />
      <Contact />
    </div>
  );
}
