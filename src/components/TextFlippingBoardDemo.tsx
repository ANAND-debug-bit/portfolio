import { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "./ui/text-flipping-board";

const MESSAGES: string[] = [
  "STILL \nBUILDING \nAT 15",
  "THIS SITE TOOK \nLONGER THAN IT \nSHOULD HAVE",
  "WOULD RATHER \nBUILD THAN \nSLEEP",
  "DESIGN \nMEETS \nCODE",
  "LET'S \nBUILD \nSOMETHING",
];

export default function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const id = setInterval(next, isMobile ? 3600 : 6000);
    return () => clearInterval(id);
  }, [isMobile, next]);

  return (
    <section className="bg-bg border-t border-stroke/50 py-12 sm:py-16 md:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-3 sm:px-6">
        <TextFlippingBoard text={MESSAGES[msgIdx]} duration={isMobile ? 0.72 : undefined} />
      </div>
    </section>
  );
}
