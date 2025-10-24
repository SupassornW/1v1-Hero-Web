import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Character } from '../types';
import { Modal } from './UI/Modal';
import { Button } from './UI/Button';
import { useApp } from '../context/AppContext';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPickAgain: () => void;
  selectedHero: Character | null;
}

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const confettiAnimation = keyframes`
  0% {
    transform: translateY(-100%) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.accent}80,
                0 0 40px ${({ theme }) => theme.colors.accent}40;
  }
  50% {
    box-shadow: 0 0 40px ${({ theme }) => theme.colors.accent},
                0 0 80px ${({ theme }) => theme.colors.accent}80;
  }
`;

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing(4)};
  }
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text};
  animation: ${slideUp} 0.5s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }
`;

const RouletteContainer = styled.div`
  position: relative;
  height: 300px;
  margin: 0 auto ${({ theme }) => theme.spacing(6)};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 250px;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const RouletteTrack = styled.div<{ $offset: number; $isSpinning: boolean; $hidden: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  transition: ${({ $isSpinning }) =>
    $isSpinning 
      ? 'none' 
      : 'transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.3s ease'};
  transform: translateY(${({ $offset }) => $offset}px);
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  pointer-events: ${({ $hidden }) => ($hidden ? 'none' : 'auto')};
`;

const RouletteCard = styled.div<{ $isWinner?: boolean }>`
  width: 280px;
  background: ${({ theme }) => theme.colors.panel};
  border-radius: ${({ theme }) => theme.radius};
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  border: 3px solid transparent;
  flex-shrink: 0;
  
  ${({ $isWinner, theme }) =>
    $isWinner &&
    css`
      border-color: ${theme.colors.accent};
      animation: ${glow} 2s ease-in-out infinite;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 240px;
    padding: ${({ theme }) => theme.spacing(3)};
  }
`;

const WinnerOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'scale(1)' : 'scale(0.9)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  z-index: 10;
`;

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.accent};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
  }
`;

const CardName = styled.div`
  font-size: clamp(1rem, 3vw, 1.25rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  flex: 1;
`;

const HeroName = styled.h3`
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  animation: ${pulse} 1s ease-in-out;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  justify-content: center;
  flex-wrap: wrap;
  animation: ${slideUp} 0.8s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing(2)};
    
    button {
      flex: 1;
      min-width: 120px;
    }
  }
`;

const Confetti = styled.div<{ $delay: number; $left: number }>`
  position: absolute;
  top: -10%;
  left: ${({ $left }) => $left}%;
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.colors.accent};
  animation: ${confettiAnimation} 3s ease-out ${({ $delay }) => $delay}s forwards;
  border-radius: 2px;

  &:nth-child(2n) {
    background: ${({ theme }) => theme.colors.success};
  }
  &:nth-child(3n) {
    background: #ffd93d;
  }
  &:nth-child(4n) {
    background: #ff6bcb;
  }
`;

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  onPickAgain,
  selectedHero,
}) => {
  const { selected } = useApp();
  const [isSpinning, setIsSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const [displayHero, setDisplayHero] = useState<Character | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rouletteCards, setRouletteCards] = useState<Character[]>([]);

  useEffect(() => {
    if (isOpen && selectedHero && selected.length > 0) {
      // Create roulette cards by repeating the selected heroes
      const cards: Character[] = [];
      for (let i = 0; i < 15; i++) {
        cards.push(...selected);
      }
      // Add the winning hero at a specific position
      const winningIndex = Math.floor(cards.length / 2) + 2;
      cards[winningIndex] = selectedHero;
      setRouletteCards(cards);

      // Start the spin animation
      setIsSpinning(true);
      setDisplayHero(null);
      setShowConfetti(false);
      setOffset(0);

      // Rapid spinning phase (reduced from 1500ms to 1200ms)
      const spinTimer = setTimeout(() => {
        setIsSpinning(false);
        // Calculate offset to center the winning card
        const cardHeight = 100; // Approximate height including gap
        const targetOffset = -(winningIndex * cardHeight - 100);
        setOffset(targetOffset);

        // Show result after shorter deceleration (reduced from 2000ms to 1100ms)
        setTimeout(() => {
          setDisplayHero(selectedHero);
          setShowConfetti(true);
        }, 1100);
      }, 1200);

      return () => clearTimeout(spinTimer);
    } else if (!isOpen) {
      // Reset when modal closes
      setDisplayHero(null);
      setIsSpinning(false);
      setOffset(0);
      setShowConfetti(false);
      setRouletteCards([]);
    }
  }, [isOpen, selectedHero, selected]);

  // Simulate rapid spinning by updating offset frequently
  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setOffset((prev) => prev - 1000);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  const handlePickAgain = () => {
    setDisplayHero(null);
    setIsSpinning(false);
    setOffset(0);
    setShowConfetti(false);
    onPickAgain();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {showConfetti && (
          <>
            {Array.from({ length: 30 }).map((_, i) => (
              <Confetti
                key={i}
                $delay={i * 0.05}
                $left={Math.random() * 100}
              />
            ))}
          </>
        )}

        <Title>🎰 {displayHero ? 'Your Hero is...' : 'Picking Your Hero...'}</Title>

        <RouletteContainer>
          <RouletteTrack $offset={offset} $isSpinning={isSpinning} $hidden={!!displayHero}>
            {rouletteCards.map((character, index) => (
              <RouletteCard key={`${character.name}-${index}`}>
                <CardImage src={character.imageUrl} alt={character.name} />
                <CardName>{character.name}</CardName>
              </RouletteCard>
            ))}
          </RouletteTrack>
          
          <WinnerOverlay $visible={!!displayHero}>
            {displayHero && (
              <RouletteCard $isWinner>
                <CardImage src={displayHero.imageUrl} alt={displayHero.name} />
                <CardName>{displayHero.name}</CardName>
              </RouletteCard>
            )}
          </WinnerOverlay>
        </RouletteContainer>
        
        {displayHero && (
          <>
            <HeroName>🎉 {displayHero.name} 🎉</HeroName>
            <ButtonGroup>
              <Button onClick={handlePickAgain}>🎲 Pick Again</Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ButtonGroup>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

