import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';
import { Input, InputWrapper, ClearButton } from './UI/Input';

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing(6)};
  padding: 0 ${({ theme }) => theme.spacing(4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing(3)};
    margin: 0 auto ${({ theme }) => theme.spacing(4)};
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on '/' key
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SearchContainer>
      <Label htmlFor="search">Search Heroes</Label>
      <InputWrapper>
        <Input
          ref={inputRef}
          id="search"
          type="text"
          placeholder="Type to filter heroes (press / to focus)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search heroes by name"
        />
        {searchTerm && (
          <ClearButton
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </ClearButton>
        )}
      </InputWrapper>
    </SearchContainer>
  );
};

