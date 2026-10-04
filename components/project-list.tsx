"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { PostBody } from "@/components/post-body"
import { getPost } from "@/lib/posts"

export type Project = { name: string; status: string; detail: string; post?: string }

/*
  Project rows. Rows with a build log open it in a pop-out panel over the
  page rather than navigating away. The panel's URL hash (#tube-furnace)
  makes it linkable, and the standalone /blog pages remain for search.
*/
export function ProjectList({ projects }: { projects: Project[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [slug, setSlug] = useState<string | null>(null)
  const post = slug ? getPost(slug) : undefined

  const open = useCallback((s: string) => {
    setSlug(s)
    history.replaceState(null, "", `#${s}`)
  }, [])

  const close = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  // Show the dialog once its content has rendered.
  useEffect(() => {
    const d = dialogRef.current
    if (!d || !post) return
    if (!d.open) d.showModal()
    d.scrollTop = 0
    document.documentElement.style.overflow = "hidden"
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

  const onClose = () => {
    document.documentElement.style.overflow = ""
    setSlug(null)
    history.replaceState(null, "", "#projects")
  }

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
                  <button type="button" className="build-log-trigger" onClick={() => open(p.post!)}>
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
        className="build-log"
        aria-label={post?.title}
        onClose={onClose}
        onClick={(e) => {
          // Clicking the dimmed area outside the panel closes it.
          if (e.target === e.currentTarget) close()
        }}
      >
        {post && (
          <div className="build-log__panel halo">
            <div className="flex justify-end">
              <button type="button" className="nav-link t-nav" onClick={close}>
                close
              </button>
            </div>
            <PostBody post={post} headingLevel={2} />
          </div>
        )}
      </dialog>
    </>
  )
}
