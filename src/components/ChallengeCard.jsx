export default function ChallengeCard() {
  return (
    <div className="relative img-card duration-1000">
      <div
        id="first-border"
        className="absolute border-[0.5px] top-0 right-0 border-[#6FCBDC] h-full w-full"
      />
      <div
        id="second-border"
        className="absolute border-[0.5px] top-1 right-1 border-[#6FCBDC] h-full w-full"
      />
      <div
        id="third-border"
        className="absolute border-[0.5px] top-2 right-2 border-[#6FCBDC] h-full w-full"
      />
      <img
        className="w-auto h-96 relative top-3 right-3"
        src="https://cdn.shopify.com/s/files/1/0747/3829/products/mL4465_1024x1024.jpg?v=1591827152"
      />
    </div>
  );
}
