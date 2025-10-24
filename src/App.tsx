import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/global';
import { theme } from './styles/theme';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CharacterGrid } from './components/CharacterGrid';
import { SelectedBar } from './components/SelectedBar';
import { Actions } from './components/Actions';
import { ResultModal } from './components/ResultModal';
import { Toast } from './components/UI/Toast';
import { Button } from './components/UI/Button';
import { Character } from './types';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.panel};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.danger};
`;

const ErrorTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.panel};
  color: ${({ theme }) => theme.colors.muted};
  margin-top: auto;
  font-size: clamp(0.875rem, 2.5vw, 1rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(3)};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AppContent: React.FC = () => {
  const {
    filteredCharacters,
    loading,
    error,
    toastMessage,
    clearToast,
    pickRandomHero,
  } = useApp();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<Character | null>(null);

  const handleRandomPick = () => {
    try {
      const hero = pickRandomHero();
      setSelectedHero(hero);
      setModalOpen(true);
    } catch (err) {
      console.error('Error picking random hero:', err);
    }
  };

  const handlePickAgain = () => {
    try {
      const hero = pickRandomHero();
      setSelectedHero(hero);
    } catch (err) {
      console.error('Error picking random hero:', err);
      setModalOpen(false);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <AppContainer>
      <Header />
      
      <Main>
        {loading ? (
          <LoadingContainer>
            <Spinner />
            <p style={{ marginTop: '1rem' }}>Loading heroes...</p>
          </LoadingContainer>
        ) : error ? (
          <ErrorContainer>
            <ErrorTitle>Failed to Load Heroes</ErrorTitle>
            <p>{error}</p>
            <Button onClick={handleRetry} style={{ marginTop: '1rem' }}>
              Retry
            </Button>
          </ErrorContainer>
        ) : (
          <>
            <SearchBar />
            <Actions onRandomClick={handleRandomPick} />
            <CharacterGrid characters={filteredCharacters} />
          </>
        )}
      </Main>

      <SelectedBar />

      <Footer>
        <p>
          Built with React + Vite + TypeScript + styled-components |{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </p>
      </Footer>

      <ResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPickAgain={handlePickAgain}
        selectedHero={selectedHero}
      />

      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={clearToast}
        />
      )}
    </AppContainer>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;

