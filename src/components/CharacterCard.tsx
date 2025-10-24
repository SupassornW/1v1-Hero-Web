import React, { useState } from 'react';
import styled from 'styled-components';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  selected: boolean;
  onToggle: () => void;
}

const CardContainer = styled.div<{ $selected: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.panel};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  border: 2px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.accent : 'transparent'};
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.colors.accent}80;
  }

  &:active {
    transform: translateY(-2px);
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 8px;

    &:hover {
      transform: none; /* Disable hover effect on mobile */
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
`;

const Image = styled.img<{ $loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.default},
              opacity 0.3s ease;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const Skeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.panel} 0%,
    ${({ theme }) => theme.colors.bg} 50%,
    ${({ theme }) => theme.colors.panel} 100%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Info = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing(1.5)};
  }
`;

const Name = styled.h3`
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
`;

const Checkbox = styled.button<{ $checked: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1.5)};
  right: ${({ theme }) => theme.spacing(1.5)};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.accent : 'rgba(0, 0, 0, 0.5)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.default};
  z-index: 10;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    top: ${({ theme }) => theme.spacing(1)};
    right: ${({ theme }) => theme.spacing(1)};
    font-size: 1rem;
  }
`;

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  selected,
  onToggle,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <CardContainer
      $selected={selected}
      onClick={onToggle}
      role="checkbox"
      aria-checked={selected}
      aria-label={`${character.name}, ${selected ? 'selected' : 'not selected'}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <ImageContainer>
        {!imageLoaded && !imageError && <Skeleton />}
        <Image
          $loaded={imageLoaded}
          src={character.imageUrl}
          alt={character.name}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
      </ImageContainer>
      <Info>
        <Name>{character.name}</Name>
      </Info>
      <Checkbox
        $checked={selected}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label={selected ? 'Deselect' : 'Select'}
        tabIndex={-1}
      >
        {selected && '✓'}
      </Checkbox>
    </CardContainer>
  );
};

