  /* eslint-disable @typescript-eslint/no-explicit-any */
  "use client"

  import { useState, useEffect } from "react"
  import { useRouter } from "next/router"

  const ArticleContent = () => {
    const [articleData, setArticleData] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    
    const { id } = router.query // Extract the article ID from the URL query parameters

    useEffect(() => {
      if (id) {
        const fetchArticle = async () => {
          setLoading(true)
          try {
            // Correct the API request to use query parameters properly
            const response = await fetch(`/api/article?id=${id}`) 

            if (!response.ok) {
              throw new Error(`Error fetching article: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()

            if (data.success) {
              setArticleData(data.article)
            } else {
              // Handle error: Article not found
              console.error('Error fetching article:', data.message)
            }
          } catch (error) {
            console.error('Error fetching article:', error)
          } finally {
            setLoading(false)
          }
        }
        fetchArticle()
      }
    }, [id])

    if (loading) {
      return <div>Loading...</div>
    }

    if (!articleData) {
      return <div>No article found</div>
    }

    return (
      <div className="article-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Display Article Title */}
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-4">{articleData.title}</h1>
        {/* Article details, Benefits, and other sections */}
        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Overview</h2>
          <p className="text-gray-700">{articleData.overview}</p>
        </section>
      </div>
    )
  }

  export default ArticleContent
