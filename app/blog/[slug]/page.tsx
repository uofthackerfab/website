import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GradientBackground } from "@/components/gradient-background"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { getPost, posts, type PostBlock } from "@/lib/posts"

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  return post ? { title: `${post.title} | Hacker Fab` } : {}
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className="t-body whitespace-pre-line">
          {para}
        </p>
      ))}
    </>
  )
}

function Block({ block }: { block: PostBlock }) {
  return (
    <section className="space-y-5">
      {block.heading && <h2 className="t-heading-20 text-primary pt-6">{block.heading}</h2>}
      {block.body && <Paragraphs text={block.body} />}
      {block.formula && <p className="t-heading-20 text-primary">{block.formula}</p>}
      {block.items && (
        <ul className="t-body list-disc pl-5 space-y-2 marker:text-[color:var(--text-secondary)]">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {block.table && (
        <div className="overflow-x-auto">
          <table className="w-full t-body border-t border-[color:var(--border-subtle)]">
            <tbody>
              {block.table.map((row) => (
                <tr key={row.label} className="border-b border-[color:var(--border-subtle)] align-baseline">
                  <th scope="row" className="text-left font-bold text-primary py-3 pr-6 whitespace-nowrap">
                    {row.label}
                  </th>
                  <td className="py-3">
                    {row.link ? (
                      <a className="nav-link text-primary" href={row.link} target="_blank" rel="noopener noreferrer">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {block.links && (
        <ul className="t-body space-y-1">
          {block.links.map((l) => (
            <li key={l.url}>
              <a className="nav-link text-primary" href={l.url} target="_blank" rel="noopener noreferrer">
                {l.text}
              </a>
            </li>
          ))}
        </ul>
      )}
      {block.images && (
        <div className={`grid gap-4 ${block.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {block.images.map((img) => (
            // Plain img: the site is a static export, so there is no image optimizer.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto rounded-md border border-[color:var(--border-subtle)]"
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <>
      <GradientBackground />
      <SiteHeader />
      <main className="pt-[72px] halo">
        <article className="shell py-16 md:py-24">
          <div className="max-w-[48rem] mx-auto space-y-6">
            <Link href="/#projects" className="nav-link t-nav">
              back to projects
            </Link>
            <h1 className="t-display pt-4">{post.title}</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover.src}
              alt={post.cover.alt}
              className="w-full h-auto rounded-md border border-[color:var(--border-subtle)]"
            />
            <Paragraphs text={post.intro} />
            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
