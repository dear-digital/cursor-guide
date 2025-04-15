export function Section({
  children,
  className,
  colorTheme,
}: {
  children: React.ReactNode;
  className?: string;
  colorTheme?: string;
}) {
  const darkMode = colorTheme === 'dark';

  return (
    <div
      className={`${
        darkMode ? 'bg-contentPrimary' : ''
      } section-padding relative py-8 text-foreground lg:py-16 ${className}`}
    >
      {children}
    </div>
  );
}
