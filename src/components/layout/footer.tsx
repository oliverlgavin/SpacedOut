export function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border border-blue-electric/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-electric/50" />
            </div>
            <span className="text-sm text-foreground-muted">
              <span className="text-blue-electric">Spaced</span>Out
            </span>
          </div>

          <p className="text-xs text-foreground-muted text-center">
            Data from NASA, ESA, SpaceX, Launch Library 2, and Open Notify.
            Not affiliated with any space agency.
          </p>

          <div className="flex flex-col items-center">
            <span className="text-xs text-foreground-muted">
              Created by Oliver Gavin
            </span>
            <a
              href="https://olivergavin.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-electric hover:underline"
            >
              olivergavin.uk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
