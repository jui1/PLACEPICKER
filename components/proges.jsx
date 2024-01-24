import { useEffect, useState } from 'react';

export default function Progessbar({ Timer }) {
  const [remainingTime, setRemainingTime] = useState(Timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={Timer} />;
}
