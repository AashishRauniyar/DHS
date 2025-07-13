import {ArticleWrapper} from "@/components/ArticleWrapper"

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <div className="min-h-screen bg-white">
      <main className="py-6">
        <div className="  px-4 sm:px-6 lg:px-8">
          <ArticleWrapper slug={(await params).slug} />
        </div>
      </main>
    </div>
  )
}
