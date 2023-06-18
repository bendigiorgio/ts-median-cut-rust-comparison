import { useRef, useState } from "react";

type Timer = {
  delta: number;
  start: () => void;
  end: () => number;
};

const useTimer = (): Timer => {
  const startTime = useRef<number>(Date.now());
  const [latestTimeDifference, setLatestTimeDifference] = useState<number>(0);

  const start = () => {
    startTime.current = Date.now();
  };

  const end = (): number => {
    const endTime = Date.now();
    const timeDifference = endTime - startTime.current;
    setLatestTimeDifference(timeDifference);
    return timeDifference;
  };

  return {
    delta: latestTimeDifference,
    start,
    end,
  };
};

export default useTimer;
