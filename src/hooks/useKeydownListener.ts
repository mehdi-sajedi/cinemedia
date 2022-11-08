import { useState, useEffect, useCallback } from 'react';

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) setKeyPressed(true);
    },
    [targetKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [downHandler]);

  return keyPressed;
};
