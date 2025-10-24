import React, { useState } from 'react';
import styled from 'styled-components';
import { Character } from '../types';
import { useApp } from '../context/AppContext';
import { CharacterCard } from './CharacterCard';
import { Button } from './UI/Button';

const GridContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing(3)};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing(2)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing(2)};
    max-width: 100%;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(12)} ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.muted};
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const ITEMS_PER_PAGE = 60;

interface CharacterGridProps {
  characters: Character[];
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
  const { selected, toggleSelection } = useApp();
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);

  const visibleCharacters = characters.slice(0, itemsToShow);
  const hasMore = itemsToShow < characters.length;

  const isSelected = (character: Character) => {
    return selected.some((c) => c.name === character.name);
  };

  const loadMore = () => {
    setItemsToShow((prev) => prev + ITEMS_PER_PAGE);
  };

  if (characters.length === 0) {
    return (
      <EmptyState>
        <h2>No heroes found</h2>
        <p>Try adjusting your search criteria</p>
      </EmptyState>
    );
  }

  return (
    <GridContainer>
      <Grid>
        {visibleCharacters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            selected={isSelected(character)}
            onToggle={() => toggleSelection(character)}
          />
        ))}
      </Grid>
      {hasMore && (
        <LoadMoreContainer>
          <Button variant="ghost" onClick={loadMore}>
            Load More ({characters.length - itemsToShow} remaining)
          </Button>
        </LoadMoreContainer>
      )}
    </GridContainer>
  );
};

