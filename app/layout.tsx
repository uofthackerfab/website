import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const hack = localFont({
  src: [
    { path: "./fonts/hack-nerd-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/hack-nerd-bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/hack-nerd-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-hack",
  display: "swap",
  fallback: ["Hack Nerd Font Mono", "Hack", "Menlo", "Consolas", "monospace"],
})

export const metadata: Metadata = {
  title: "Hacker Fab",
  description:
    "A student-run team at the University of Toronto building an open hardware stack and toolchain for fabricating semiconductor devices.",
  metadataBase: new URL("https://hackerfab.ca"),
  openGraph: {
    title: "Hacker Fab",
    description:
      "Open, reproducible chip fabrication. Design, fabricate, measure, debug, repeat.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${hack.variable} antialiased`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
