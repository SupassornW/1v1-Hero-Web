import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  padding-right: ${({ theme }) => theme.spacing(10)};
  background: ${({ theme }) => theme.colors.panel};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.default};
  min-height: 44px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }

  &:hover:not(:focus) {
    border-color: ${({ theme }) => theme.colors.muted};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing(2)};
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.default};
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: ${({ theme }) => theme.colors.accent}20;
    color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

