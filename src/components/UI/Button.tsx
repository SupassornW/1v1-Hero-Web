import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'danger' | 'ghost';

interface ButtonProps {
  variant?: ButtonVariant;
}

export const Button = styled.button<ButtonProps>`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.radius};
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: ${theme.colors.accent};
          color: ${theme.colors.bg};

          &:hover:not(:disabled) {
            background: ${theme.colors.accent};
            filter: brightness(1.1);
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.danger};
          color: white;

          &:hover:not(:disabled) {
            filter: brightness(1.1);
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.muted};

          &:hover:not(:disabled) {
            background: ${theme.colors.panel};
            border-color: ${theme.colors.accent};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

