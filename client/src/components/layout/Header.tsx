import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between px-4 max-w-md mx-auto">
        <Link href="/">
          <a className="flex items-center gap-2 font-display font-bold text-lg tracking-wider text-foreground/90 hover:text-primary transition-colors">
            <span className="text-primary text-glow">SKILL</span>BLITZ
          </a>
        </Link>
        <LanguageSelector />
      </div>
    </header>
  );
}
