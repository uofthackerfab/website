import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GradientBackground } from "@/components/gradient-background"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { PostBody } from "@/components/post-body"
import { getPost, posts } from "@/lib/posts"

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  return post ? { title: `${post.title} | Hacker Fab` } : {}
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
          <div className="max-w-5xl mx-auto space-y-6">
            <Link href="/#projects" className="nav-link t-nav">
              back to projects
            </Link>
            <div className="pt-4">
              <PostBody post={post} />
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
