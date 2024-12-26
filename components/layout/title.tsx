import React from 'react';
import clsx from 'clsx';

type TitleSize = 'xs' | 'vs' |'sm' | 'md' | 'lg' | 'xl' | '2xl';

type TitleProps = {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title = ({ text, size = 'sm', className }: TitleProps) => {
  
  const tagBySize = {
    xs: 'h6',
    vs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const;

  const classNameBySize = {
    xs: 'text-[16px]',
    vs: 'text-[20px]',
    sm: 'text-[22px]',
    md: 'text-[26px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
    '2xl': 'text-[48px]',
  } as const;

  return React.createElement(
    tagBySize[size],
    { className: clsx(classNameBySize[size], className) },
    text,
  );
};