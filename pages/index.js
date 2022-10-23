import Faq from "../components/Faq.jsx";
import Challenges from "../components/Challenges.jsx";
import Events from "../components/Events";
import Contact from "../components/Contact";
import Home from "../components/Home";

export default function App() {
  return (
    <div>
      <Home />
      <Events />
      <Challenges />
      <Faq />
      <Contact />
    </div>
  );
}
