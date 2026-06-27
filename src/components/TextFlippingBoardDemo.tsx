import { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "./ui/text-flipping-board";

const MESSAGES: string[] = [
  "15 YEARS OLD \n9+ PROJECTS \nINFINITE IDEAS",
  "DESIGN MEETS \nCODE",
  "FROM BOSTON \nWITH AMBITION",
  "POWERED BY \nCAFFEINE & \nCURIOSITY",
  "STILL SHIPPING \nAT 15",
  "LET'S BUILD \nSOMETHING \nINCREDIBLE",
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
    <section className="bg-bg border-t border-stroke/50 py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-8 px-6">
        <TextFlippingBoard text={MESSAGES[msgIdx]} />
      </div>
    </section>
  );
}
