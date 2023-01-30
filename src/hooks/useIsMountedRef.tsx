import { useRef, useEffect } from 'react';

export default function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
      console.log('Je suis démonté ! et je suis dans le useIsMountedRef');
    },
    [],
  );

  return isMounted;
}
