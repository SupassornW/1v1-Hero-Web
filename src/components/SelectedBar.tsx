import React from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';
import { Button } from './UI/Button';

const BarContainer = styled.div`
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => theme.colors.panel};
  border-top: 2px solid ${({ theme }) => theme.colors.accent}40;
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
  flex-wrap: wrap;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    padding: ${({ theme }) => theme.spacing(3)};
    gap: ${({ theme }) => theme.spacing(3)};
  }
`;

const AvatarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
  flex: 1;
`;

const Count = styled.div`
  font-size: clamp(0.875rem, 3vw, 1rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: center;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.default};
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 56px;
    height: 56px;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.danger};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  transition: transform ${({ theme }) => theme.transitions.default};
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 24px;
    height: 24px;
    font-size: 0.875rem;
    top: -6px;
    right: -6px;
  }
`;

const Placeholder = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-style: italic;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: stretch;

    button {
      flex: 1;
    }
  }
`;

export const SelectedBar: React.FC = () => {
  const { selected, toggleSelection, clearAll } = useApp();

  return (
    <BarContainer>
      <Count>Selected: {selected.length}/10</Count>
      <AvatarsContainer>
        {selected.length === 0 ? (
          <Placeholder>No heroes selected yet</Placeholder>
        ) : (
          selected.map((character) => (
            <AvatarWrapper key={character.name}>
              <Avatar
                src={character.imageUrl}
                alt={character.name}
                title={character.name}
              />
              <RemoveButton
                onClick={() => toggleSelection(character)}
                aria-label={`Remove ${character.name}`}
                title={`Remove ${character.name}`}
              >
                ✕
              </RemoveButton>
            </AvatarWrapper>
          ))
        )}
      </AvatarsContainer>
      <Actions>
        {selected.length > 0 && (
          <Button variant="danger" onClick={clearAll}>
            Clear All
          </Button>
        )}
      </Actions>
    </BarContainer>
  );
};

