export interface ButtonRightProps {
  className?: string;
  color?: string;
  size?: string;
}

export function ButtonRight({className, color, size}: ButtonRightProps) {
  const isDark = color === 'dark';
  const isSmall = size === 'small';

  return (
    <button className={`${className} ${color} swiper-button-next`}>
      <svg
        width={isSmall ? '8' : '23'}
        height={isSmall ? '16' : '39'}
        viewBox="0 0 22 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.82771 2.82812L19.7983 19.7987"
          stroke={isDark ? '#000' : '#FCFCFC'}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M19.7983 19.799L2.82771 36.7695"
          stroke={isDark ? '#000' : '#FCFCFC'}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default ButtonRight;
