import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 transition-colors duration-500">
      <div className="editorial-container h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center">
             <div className="w-4 h-4 bg-primary rounded-sm transition-transform group-hover:scale-110"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            KidneyHealth<span className="font-light text-foreground/60">.org</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#conditions" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Conditions
          </Link>
          <Link href="/#prevention" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Prevention
          </Link>
          <div className="w-px h-5 bg-border mx-2"></div>
          <ThemeToggle />
          <Link href="/assessment" className="btn-primary ml-2">
            Risk Assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}
