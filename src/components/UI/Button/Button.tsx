import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

type VariantType = 'blue' | 'gray' | 'outline';

type IconPositionType = 'left' | 'right';

type SizeType = 'm' | 'l';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: VariantType;
  size: SizeType;
  isLoading?: boolean;
  type?: HTMLButtonElement['type'];
  icon?: ReactNode;
  iconPosition?: IconPositionType;
  borderColor?: 'transparent' | 'blue_primary';
  disableRipple?: boolean;
}

const styles = {
  button:
    'w-full rounded-[100px] px-[32px] border-[1px] transition-all disabled:cursor-not-allowed',
  variants: {
    blue: 'bg-blue_primary text-white hover:bg-blue_hover active:bg-blue_active disabled:bg-blue_disabled',
    gray: 'bg-gray_secondary text-black hover:bg-gray_hover active:bg-gray_active disabled:bg-gray_disabled',
    outline:
      'border-[1px] border-gray_secondary hover:border-gray_hover active:border-gray_active disabled:bg-gray_disabled',
  },
  size: {
    m: 'py-[10.5px]',
    l: 'py-[12.5px]',
  },
  withIcon: 'flex items-center gap-[10px]',
  iconPositionRight: 'flex-row-reverse',
  icon: 'flex items-center justify-center fill-black',
  iconSVGColor: {
    blue: 'fill-white',
    gray: 'fill-black',
    outline: 'fill-black',
  },
};

export const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      variant,
      size,
      isLoading,
      disableRipple = false,
      type = 'button',
      className,
      children,
      disabled,
      icon,
      iconPosition = 'left',
      borderColor = 'transparent',
      ...props
    },
    forwaredRef,
  ) => {
    return (
      <button
        ref={forwaredRef}
        className={clsx(
          styles.button,
          styles.variants[variant],
          styles.size[size],
          `border-${borderColor}`,
          className,
          {
            [styles.withIcon]: icon,
            [styles.iconPositionRight]: iconPosition === 'right',
          },
        )}
        type={type}
        disabled={isLoading || disabled}
        {...props}
      >
        {icon && <div className={clsx(styles.icon, styles.iconSVGColor[variant])}>{icon}</div>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
