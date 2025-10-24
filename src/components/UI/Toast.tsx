import React, { useEffect } from 'react';
import styled from 'styled-components';

interface ToastProps {
  message: string;
  type?: 'info' | 'error' | 'success';
  onClose: () => void;
  duration?: number;
}

const ToastContainer = styled.div<{ type: 'info' | 'error' | 'success' }>`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing(4)};
  right: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme, type }) => {
    switch (type) {
      case 'error':
        return theme.colors.danger;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.accent;
    }
  }};
  color: white;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 2000;
  max-width: 400px;
  animation: slideInRight 0.3s ease;

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: ${({ theme }) => theme.spacing(4)};
    right: ${({ theme }) => theme.spacing(4)};
    max-width: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastContainer type={type} role="alert" aria-live="polite">
      {message}
    </ToastContainer>
  );
};

