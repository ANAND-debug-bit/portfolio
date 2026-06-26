export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-bg py-8 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a href="https://x.com/AahishAbbani" target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-text-primary transition-colors">Twitter</a>
          <a href="https://www.linkedin.com/in/aahish-abbani/" target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-text-primary transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/aahishabbani/" target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-text-primary transition-colors">Instagram</a>
          <a href="https://github.com/kinghightech" target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-text-primary transition-colors">GitHub</a>
        </div>

        <div className="hidden md:block text-sm text-muted">
          © {new Date().getFullYear()} Aahish Abbani
        </div>
      </div>
    </footer>
  );
}
