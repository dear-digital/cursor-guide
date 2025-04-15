export interface ButtonLeftProps {
  className?: string;
  color?: string;
  size?: string;
}

export function ButtonLeft({className, color, size}: ButtonLeftProps) {
  const isDark = color === 'dark';
  const isSmall = size === 'small';

  return (
    <button className={`${className} ${color} swiper-button-prev`}>
      <svg
        width={isSmall ? '8' : '23'}
        height={isSmall ? '16' : '39'}
        viewBox="0 0 23 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.7992 36.7695L2.82863 19.799"
          stroke={isDark ? '#000' : '#FCFCFC'}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M2.82863 19.7987L19.7992 2.82812"
          stroke={isDark ? '#000' : '#FCFCFC'}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default ButtonLeft;
