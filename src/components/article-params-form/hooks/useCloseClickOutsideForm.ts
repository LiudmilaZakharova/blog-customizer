import { useEffect } from 'react';

type useCloseClickOutsideForm = {
	isOpen: boolean;
	onClose: () => void;
	refForm: React.RefObject<HTMLElement>;
};

export const useCloseClickOutsideForm = ({
	isOpen,
	onClose,
	refForm
}: useCloseClickOutsideForm) => {
	  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refForm.current && !refForm.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, refForm]);

  if (!isOpen) {
    return null;
  }
};
