import React, { useEffect } from 'react';
import useEmployeeStore from '@/context/mentions';

interface KeyboardEventHandlerProps {
  onMention: (employees: string[]) => void;
}

const KeyboardEventHandler: React.FC<KeyboardEventHandlerProps> = ({ onMention }) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '@') {
        const employees = useEmployeeStore.getState().employees;
        onMention(employees);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onMention]);

  return null;
};

export default KeyboardEventHandler;