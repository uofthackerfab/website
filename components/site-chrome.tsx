import Link from "next/link"

export const JOIN_URL = "https://form.typeform.com/to/WDKMFCuC"
export const DOCS_URL = "https://docs.hackerfab.ca"

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="shell flex items-center justify-between h-[72px]">
        <Link href="/" className="t-nav font-bold">
          Toronto Hacker Fab
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-8 t-nav">
          <Link className="nav-link" href="/#projects">
            projects
          </Link>
          <a className="nav-link" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
            docs
          </a>
          <a className="nav-link" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
            join
          </a>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border-subtle)]">
      <div className="shell flex items-center justify-between gap-4 py-8 t-nav">
        <span className="font-bold">Toronto Hacker Fab</span>
        <nav aria-label="Footer" className="flex gap-8">
          <a className="nav-link" href={DOCS_URL} target="_blank" rel="noopener noreferrer">
            docs
          </a>
          <a className="nav-link" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
            join
          </a>
        </nav>
      </div>
    </footer>
  )
}
