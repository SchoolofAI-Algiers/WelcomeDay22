import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function Faq() {
  const FaqList = [
    {
      question: "How to join School of AI ?",
      answer: "Wait for registration then apply",
    },
    {
      question: "Are there prerequisites to join SOAI ?",
      answer: "No, you will learn AI with us !",
    },
    {
      question: "What do SOAI do ?",
      answer: "We have a lot of workshops, talks and hackathons",
    },
  ];
  const [activeFaq, setActiveFaq] = useState([]);

  const [hoverFaq, setHoverFaq] = useState(-1);

  const onHandlerFaq = (index) => {
    if (activeFaq.includes(index)) {
      setActiveFaq(activeFaq.filter((faq) => faq != index));
    } else {
      setActiveFaq([...activeFaq, index]);
    }
    setHoverFaq(-1);
  };
  return (
    <div id="FAQ">
      <div className="relative min-h-screen text-white py-6 px-4 md:p-16 overflow-hidden">
        {/* {Header} */}
        <img
          src="/assets/Group6.png"
          className="invisible md:visible absolute xl:w-80 md:w-56 sm:w-36 w-28 top-5 left-0"
        />
        <img
          src="/assets/Group5.png"
          className="invisible md:visible absolute lg:w-80 md:w-56 sm:w-36 w-28 top-[-1] right-0"
        />
        <div className="bg-[#FFCC00] h-36 w-36 md:h-48 md:w-48 blur-[60px] md:blur-[100px] absolute top-0 -translate-x-1/2 left-1/2 -translate-y-1/2" />
        <div className="relative w-full flex flex-col items-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">FAQ</h1>
        </div>
        {/* Question */}
        <div className="w-full md:mt-24 mt-16 lg:px-32 md:px-24 sm:px-16 px-4">
          {FaqList.map((item, index) => {
            return (
              <div
                onClick={() => onHandlerFaq(index)}
                onMouseEnter={() => setHoverFaq(index)}
                onMouseLeave={() => setHoverFaq(-1)}
                key={index}
                className="cursor-pointer md:px-6 px-4 py-4 md:py-6 md:my-10 my-8 rounded-xl w-full bg-white24 flex justify-between items-center"
              >
                <div>
                  <p
                    className={
                      activeFaq.includes(index) || hoverFaq == index
                        ? "xl:text-xl lg:text-base md:text-sm text-xs text-bleu font-normal pr-4"
                        : "xl:text-xl lg:text-base md:text-sm text-xs text-gold font-normal pr-4"
                    }
                  >
                    {item.question}
                  </p>
                  <div
                    className={[
                      activeFaq.includes(index) ? "active" : "disabled",
                    ]}
                  >
                    <p className="xl:text-xl lg:text-base md:text-sm text-xs text-bleu md:mt-10 mt-2 md:ml-4 ml-2 font-thin">
                      {item.answer}
                    </p>
                  </div>
                </div>

                <FaChevronRight
                  size={26}
                  className={
                    hoverFaq == index || activeFaq.includes(index)
                      ? "xl:text-xl lg:text-lg md:text-base  text-xs text-bleu ml-2"
                      : "xl:text-xl lg:text-lg md:text-base text-xs text-gold ml-2"
                  }
                />
              </div>
            );
          })}
        </div>
        {/* Shapes */}
        <div className=" flex justify-center items-center my-12">
          <img src="/assets/shapes.png" className="" />
        </div>
      </div>
    </div>
  );
}
