import type { Post, PostBlock } from "@/lib/posts"

/*
  Renders a build log in the layout of the original site: a reading column
  on the left and the build image pinned on the right. Shared by the
  homepage pop-out and the standalone /blog pages so both stay identical.
*/

export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className="whitespace-pre-line">
          {para}
        </p>
      ))}
    </>
  )
}

function Block({ block }: { block: PostBlock }) {
  const pair = (block.images?.length ?? 0) > 1
  return (
    <section className="space-y-3">
      {block.heading && <h3 className="post-label">{block.heading}</h3>}
      <div className="space-y-4">
        {block.body && <Paragraphs text={block.body} />}
        {block.formula && <p className="post-formula">{block.formula}</p>}
        {block.items && (
          <ul className="list-disc pl-4 space-y-2 marker:text-white/40">
            {block.items.map((item) => (
              <li key={item} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
        )}
        {block.table && (
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left border-collapse post-table">
              <tbody>
                {block.table.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>
                      {row.link ? (
                        <a href={row.link} target="_blank" rel="noopener noreferrer" className="post-link">
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
          <div className="flex flex-wrap gap-3 pt-2">
            {block.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="post-button">
                {l.text}
              </a>
            ))}
          </div>
        )}
        {block.images && (
          <div className={`grid gap-4 my-4 ${pair ? "grid-cols-2" : "grid-cols-1"}`}>
            {block.images.map((img) => (
              <div key={img.src} className={`post-image ${pair ? "aspect-[3/4]" : ""}`}>
                {/* Plain img: the site is a static export with no image optimizer. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={pair ? "h-full w-full object-cover" : "w-full h-auto"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Cover({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <figure className={`post-cover ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.cover.src} alt={post.cover.alt} className="h-full w-full object-cover" />
    </figure>
  )
}

export function PostBody({
  post,
  status,
  headingLevel = 1,
}: {
  post: Post
  status?: string
  headingLevel?: 1 | 2
}) {
  const Title = headingLevel === 1 ? "h1" : "h2"
  return (
    <div className="post mx-auto flex w-full max-w-5xl flex-col gap-10 md:flex-row md:gap-12">
      <div className="post-text flex-1 min-w-0 flex flex-col gap-6">
        {status && <p className="post-label">{status}</p>}
        <Title className="post-title">{post.title}</Title>
        <Cover post={post} className="md:hidden" />
        <div className="space-y-4">
          <Paragraphs text={post.intro} />
        </div>
        {post.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
      <aside className="hidden md:block w-full max-w-sm flex-shrink-0">
        <div className="sticky top-0">
          <p className="post-label">build image</p>
          <Cover post={post} className="mt-4" />
        </div>
      </aside>
    </div>
  )
}
