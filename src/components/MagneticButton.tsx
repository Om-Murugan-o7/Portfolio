import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  onClick,
  ...props
}) => {
  const magneticRef = useMagnetic<HTMLButtonElement>(strength);

  return (
    <button
      ref={magneticRef}
      className={`interactive-hover relative inline-flex items-center justify-center transition-all duration-300 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
