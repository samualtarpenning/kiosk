import { useCallback, useEffect, useMemo, useState } from "react";
import useCountdownTimer from "../utils/timer.hook";
import { useSelector } from "react-redux";
import { debounce } from 'lodash'
const Timer = (props: any) => {
  const { remainingTime } = useCountdownTimer(props.duration , props.shouldStop, props.status);
  const device = useSelector((state: any) => state.device); 

  const handleDurationChange = useCallback(debounce(() => {
    console.log("Timer duration changed to:", props.duration);
  }, 100), [props.duration]); 

  useEffect(() => {
    handleDurationChange(); 
  }, [props.duration, handleDurationChange]); 

  const msToTime = useMemo(() => {
    return (durationMs: number): string => {
    const seconds = Math.floor((durationMs / 1000) % 60);
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
}, []);

  return (
    <div>
      <h6>{msToTime(remainingTime)}</h6>
    </div>
  );
};

export default Timer;
