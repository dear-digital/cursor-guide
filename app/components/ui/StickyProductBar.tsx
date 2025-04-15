export interface StickyProductBarProps {
  button: any;
  image: any;
  subtitle: string;
  title: string;
}

export function StickyProductBar({ button, image, subtitle, title }: StickyProductBarProps) {
  return (
    <div>
      <div>{image}</div>
      <div>{title}</div>
      <div>{subtitle}</div>
      <div>{button}</div>
    </div>
  )
}