import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.panel};
  border-radius: ${({ theme }) => theme.radius};
  padding: ${({ theme }) => theme.spacing(4)};
  transition: all ${({ theme }) => theme.transitions.default};
  border: 2px solid transparent;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent}40;
    transform: translateY(-2px);
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

