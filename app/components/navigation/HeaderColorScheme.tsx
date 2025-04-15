export function getHeaderColorScheme(colorSchemeName: string): {[key: string]: string} {
    if (colorSchemeName === 'light') {
      return {
        background: 'bg-white',
        backgroundBlur: 'bg-dark/20',
        border: 'border-white',
        borderBottom: 'border-b border-white',
        logo: 'text-white',
        text: 'text-dark hover:text-dark',
      };
    }
  
    if (colorSchemeName === 'dark') {
      return {
        background: 'bg-dark',
        backgroundBlur: 'bg-white/20',
        border: 'border-black',
        borderBottom: 'border-b border-black',
        logo: 'text-dark',
        text: 'text-white hover:text-white',
      };
    }
  
    return {}; // Default or empty object if no matching scheme
  }
  