import { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "./ui/text-flipping-board";

const MESSAGES: string[] = [
  "STILL \nBUILDING \nAT 15",
  "THIS SITE TOOK \nLONGER THAN IT \nSHOULD HAVE",
  "WOULD RATHER \nBUILD THAN \nSLEEP",
  "DESIGN \nMEETS \nCODE",
  "LET'S \nBUILD \nSOMETHING",
  "POWERED BY \nCURIOSITY & \nCAFFEINE",
];

export default function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="bg-bg border-t border-stroke/50 py-12 sm:py-16 md:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-3 sm:px-6">
        <TextFlippingBoard text={MESSAGES[msgIdx]} />
      </div>
    </section>
  );
}
