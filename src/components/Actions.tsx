import React from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';
import { Button } from './UI/Button';

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(3)};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const RandomButton = styled(Button)`
  font-size: clamp(1rem, 3vw, 1.25rem);
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(8)}`};
  min-width: 200px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 320px;
    padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(6)}`};
    min-height: 56px; /* Larger touch target */
  }
`;

interface ActionsProps {
  onRandomClick: () => void;
}

export const Actions: React.FC<ActionsProps> = ({ onRandomClick }) => {
  const { selected } = useApp();
  const isEnabled = selected.length >= 1 && selected.length <= 10;

  return (
    <ActionsContainer>
      <RandomButton
        onClick={onRandomClick}
        disabled={!isEnabled}
        title={
          isEnabled
            ? 'Pick a random hero from your selection'
            : 'Select between 1 and 10 heroes to enable random pick'
        }
      >
        🎲 Random Pick
      </RandomButton>
    </ActionsContainer>
  );
};

