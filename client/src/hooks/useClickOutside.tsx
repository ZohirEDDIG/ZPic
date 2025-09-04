import  { useEffect } from 'react';

const useClickOutside = (containerRef: React.RefObject<HTMLElement | null>,  buttonRef: React.RefObject<HTMLButtonElement | null>,  setterFunction: (value : boolean) => void ) => {

  useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
          if (containerRef.current && buttonRef.current && !containerRef.current.contains(e.target as Node) && !buttonRef.current.contains(e.target as Node)) {
              setterFunction(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => document.removeEventListener('mousedown', handleClickOutside);

  }, [containerRef, buttonRef, setterFunction]);
};

export default useClickOutside;