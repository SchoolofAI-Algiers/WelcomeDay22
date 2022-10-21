export default function ChallengeCard({ setChallengeID, id, selected, image }) {
  return (
    <div className="relative img-card my-4" onClick={() => setChallengeID(id)}>
      <div
        id="highlight"
        className={`absolute ${
          selected ? "w-0 h-0" : "h-72 w-72"
        } bg-[#6FCBDC] blur-[120px] hidden`}
      />
      <div
        id="first-border"
        className="absolute border-[0.5px] top-0 right-0 border-[#6FCBDC] h-full w-full"
      />
      <div
        id="second-border"
        className={`absolute border-[0.5px] ${
          selected ? "top-0 right-0" : "top-1 right-1"
        } border-[#6FCBDC] h-full w-full`}
      />
      <div
        id="third-border"
        className={`absolute border-[0.5px] ${
          selected ? "top-0 right-0" : "top-2 right-2"
        } border-[#6FCBDC] h-full w-full`}
      />
      <img
        className={`w-auto h-60 md:h-72 lg:h-96 relative ${
          selected ? "top-0 right-0" : "top-3 right-3"
        }`}
        src={image}
      />
    </div>
  );
}
