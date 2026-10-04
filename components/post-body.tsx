import type { Post, PostBlock } from "@/lib/posts"

/* Renders a build log. Shared by the pop-out on the homepage and the
   standalone /blog pages so both stay identical. */

export function Paragraphs({ text }: { text: string }) {
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

export function PostBody({ post, headingLevel = 1 }: { post: Post; headingLevel?: 1 | 2 }) {
  const Title = headingLevel === 1 ? "h1" : "h2"
  return (
    <div className="space-y-6">
      <Title className="t-display">{post.title}</Title>
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
  )
}
