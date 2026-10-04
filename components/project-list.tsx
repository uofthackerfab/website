"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { PostBody } from "@/components/post-body"
import { getPost } from "@/lib/posts"

export type Project = { name: string; status: string; detail: string; post?: string }

const FADE_MS = 320

/*
  Project rows. Rows with a build log open it in a full-screen pop-out over
  the page, styled like the original site, rather than navigating away.
  The URL hash (#tube-furnace) makes each one linkable; the standalone
  /blog pages remain for search engines and old links.
*/
export function ProjectList({ projects }: { projects: Project[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [slug, setSlug] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const post = slug ? getPost(slug) : undefined
  const status = projects.find((p) => p.post === slug)?.status

  const open = useCallback((s: string) => {
    setSlug(s)
    history.replaceState(null, "", `#${s}`)
  }, [])

  // Restore the page. Safe to call more than once.
  const cleanup = useCallback(() => {
    document.documentElement.style.overflow = ""
    setVisible(false)
    setSlug(null)
    if (location.hash !== "#projects") history.replaceState(null, "", "#projects")
  }, [])

  // Fade out first, then close the dialog and restore the page directly,
  // rather than relying on the dialog's close event alone.
  const close = useCallback(() => {
    setVisible(false)
    window.setTimeout(() => {
      dialogRef.current?.close()
      cleanup()
    }, FADE_MS)
  }, [cleanup])

  // Show the dialog once its content has rendered, then fade it in.
  useEffect(() => {
    const d = dialogRef.current
    if (!d || !post) return
    if (!d.open) d.showModal()
    document.documentElement.style.overflow = "hidden"
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [post])

  // Open from a shared link like hackerfab.ca/#tube-furnace, on load or
  // when the hash changes without a reload.
  useEffect(() => {
    const fromHash = () => {
      const s = location.hash.slice(1)
      if (s && getPost(s)) open(s)
    }
    fromHash()
    window.addEventListener("hashchange", fromHash)
    return () => window.removeEventListener("hashchange", fromHash)
  }, [open])

  return (
    <>
      <dl className="divide-y divide-[color:var(--border-subtle)] border-y border-[color:var(--border-subtle)]">
        {projects.map((p) => (
          <div key={p.name} className="py-5 grid sm:grid-cols-[16rem_1fr_auto] gap-x-6 gap-y-1">
            <dt className="t-heading-16 text-primary">
              {p.post ? (
                <button type="button" className="build-log-trigger" onClick={() => open(p.post!)}>
                  {p.name}
                </button>
              ) : (
                p.name
              )}
            </dt>
            <dd className="t-body">
              {p.detail}
              {p.post && (
                <>
                  {" "}
                  <button type="button" className="build-log-more" onClick={() => open(p.post!)}>
                    Read the build log.
                  </button>
                </>
              )}
            </dd>
            <dd className="t-caption sm:text-right whitespace-nowrap">{p.status}</dd>
          </div>
        ))}
      </dl>

      <dialog
        ref={dialogRef}
        className={`build-log ${visible ? "is-visible" : ""}`}
        aria-label={post?.title}
        onClose={cleanup}
        onCancel={(e) => {
          // Esc: run the same fade-out as the close button.
          e.preventDefault()
          close()
        }}
      >
        <div className="build-log__backdrop" onClick={close} />
        {post && (
          <div className="build-log__panel">
            <button type="button" className="build-log__close" onClick={close}>
              close
            </button>
            <div className="build-log__scroll">
              <PostBody post={post} status={status} headingLevel={2} />
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
