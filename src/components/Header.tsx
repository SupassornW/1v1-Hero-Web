import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing(6)} ${theme.spacing(4)}`};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.panel} 0%,
    transparent 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(3)}`};
  }
`;

const Title = styled.h1`
  font-size: clamp(1.75rem, 6vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;

const Subtitle = styled.p`
  font-size: clamp(0.875rem, 3vw, 1.125rem);
  color: ${({ theme }) => theme.colors.muted};
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(2)};
  line-height: 1.5;
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>1v1 Hero Picker</Title>
      <Subtitle>
        Select up to 10 heroes, then randomly pick one for your next match
      </Subtitle>
    </HeaderContainer>
  );
};

