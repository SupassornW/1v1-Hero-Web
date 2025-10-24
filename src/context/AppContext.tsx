import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Character } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { pickRandom } from '../utils/random';

interface AppContextType {
  characters: Character[];
  filteredCharacters: Character[];
  selected: Character[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  toastMessage: { message: string; type: 'info' | 'error' | 'success' } | null;
  setSearchTerm: (term: string) => void;
  toggleSelection: (character: Character) => void;
  clearAll: () => void;
  pickRandomHero: () => Character;
  showToast: (message: string, type?: 'info' | 'error' | 'success') => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTermState] = useState('');
  const [selected, setSelected] = useLocalStorage<Character[]>('selectedCharacters', []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'info' | 'error' | 'success';
  } | null>(null);

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 200);

  // Load search term from localStorage on mount
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTermState(savedSearchTerm);
    }
  }, []);

  // Save search term to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  // Load characters from JSON
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('./data/characters.json');
        
        if (!response.ok) {
          throw new Error('Failed to load characters');
        }
        
        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error loading characters:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  // Filter characters based on search term
  const filteredCharacters = React.useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return characters;
    }
    
    const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
    return characters.filter((character) =>
      character.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [characters, debouncedSearchTerm]);

  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
  }, []);

  const showToast = useCallback(
    (message: string, type: 'info' | 'error' | 'success' = 'info') => {
      setToastMessage({ message, type });
    },
    []
  );

  const toggleSelection = useCallback((character: Character) => {
    setSelected((current) => {
      const isSelected = current.some((c) => c.name === character.name);
      
      if (isSelected) {
        // Remove from selection
        return current.filter((c) => c.name !== character.name);
      } else {
        // Check if we've reached the limit
        if (current.length >= 10) {
          showToast('You can only select up to 10 characters', 'error');
          return current;
        }
        // Add to selection
        return [...current, character];
      }
    });
  }, [showToast]);

  const clearAll = useCallback(() => {
    setSelected([]);
  }, [setSelected]);

  const pickRandomHero = useCallback((): Character => {
    if (selected.length < 1 || selected.length > 10) {
      throw new Error('Must have between 1 and 10 characters selected');
    }
    return pickRandom(selected);
  }, [selected]);

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const value: AppContextType = {
    characters,
    filteredCharacters,
    selected,
    searchTerm,
    loading,
    error,
    toastMessage,
    setSearchTerm,
    toggleSelection,
    clearAll,
    pickRandomHero,
    showToast,
    clearToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

