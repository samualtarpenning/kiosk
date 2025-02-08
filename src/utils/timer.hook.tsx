import { useState, useEffect, useRef } from "react";

const useCountdownTimer = (duration: number, shouldStop: boolean, status: boolean) => {
  const [remainingTime, setRemainingTime] = useState(duration); 
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setRemainingTime(duration);
    if (intervalId.current) clearInterval(intervalId.current);

    if (shouldStop) {
      return;
    }
    intervalId.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1000; 
        } else {
          if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
          }
          return 0; 
        }
      });
    }, 1000); 

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [duration, status, shouldStop]); 

  return { remainingTime };
};

export default useCountdownTimer;
