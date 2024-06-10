import { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLButtonElement>,
  callback: () => void,
  filterMenuRef: React.RefObject<HTMLDivElement>
) => {
  const handleClick = (e: MouseEvent) => {
    if (
      ref.current &&
      !ref.current?.contains(e.target as Node) &&
      !filterMenuRef?.current?.contains(e.target as Node)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export default useClickOutside;
