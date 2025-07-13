import {ArticleWrapper} from "@/components/ArticleWrapper";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ArticleWrapper slug={(await params).slug} />;
}
