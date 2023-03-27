import {useEffect, useRef} from 'react';

const noop = () => {}

export const useInterval = (callback: () => void, delayMillis: number) => {
  const savedCallback = useRef(noop);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delayMillis !== null) {
      let id = setInterval(tick, delayMillis);
      return () => clearInterval(id);
    }
  }, [delayMillis]);
};
