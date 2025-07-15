"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Eye, Search, Filter, FileText, Users, FolderTree, X, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ArticlePreview } from "@/components/ArticlePreview"
import type { Block } from "@/types/article"

interface Article {
  id: string
  title: string
  slug: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  publishDate: string
  imageUrl?: string
  category?: {
    id: string
    name: string
    slug: string
  }
  createdAt: string
  updatedAt: string
}

interface FullArticle extends Article {
  blocks: Block[]
  metaDescription?: string
  focusKeyword?: string
  readingTime?: number
}

interface Category {
  id: string
  name: string
  slug: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)

  // Preview modal states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewArticle, setPreviewArticle] = useState<FullArticle | null>(null)
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && selectedCategory !== "all" && { category: selectedCategory }),
        ...(selectedUser && selectedUser !== "all" && { userId: selectedUser }),
      })

      const response = await fetch(`/api/articles?${params}`)
      const data = await response.json()

      if (data.success) {
        setArticles(data.articles)
        setTotalPages(data.pagination?.totalPages || 1)
        setTotalArticles(data.pagination?.total || 0)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch articles",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching articles:", error)
      toast({
        title: "Error",
        description: "Failed to fetch articles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchTerm, selectedCategory, selectedUser])

  useEffect(() => {
    fetchArticles()
    fetchCategories()
    fetchUsers()
  }, [fetchArticles])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      if (data.success) {
        setCategories(data.allCategories || [])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      const data = await response.json()
      if (data.success) {
        setUsers(data.users || [])
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handlePreview = async (slug: string) => {
    try {
      setIsLoadingPreview(true)
      setIsPreviewOpen(true)

      const response = await fetch(`/api/article?slug=${slug}`)
      const data = await response.json()

      if (data.success && data.article) {
        setPreviewArticle(data.article)
      } else {
        toast({
          title: "Error",
          description: "Failed to load article for preview",
          variant: "destructive",
        })
        setIsPreviewOpen(false)
      }
    } catch (error) {
      console.error("Error loading article preview:", error)
      toast({
        title: "Error",
        description: "Failed to load article preview",
        variant: "destructive",
      })
      setIsPreviewOpen(false)
    } finally {
      setIsLoadingPreview(false)
    }
  }

  const handleDelete = async (articleId: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Article deleted successfully",
        })
        fetchArticles()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete article",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting article:", error)
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      })
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedUser("all")
    setCurrentPage(1)
  }

  const closePreview = () => {
    setIsPreviewOpen(false)
    setPreviewArticle(null)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Articles Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your content with {totalArticles} article{totalArticles !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory || "all"} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Author</label>
                <Select value={selectedUser || "all"} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.role.toLowerCase()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" onClick={clearFilters} className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-sm">Total Articles</span>
                </div>
                <span className="font-semibold">{totalArticles}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FolderTree className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-sm">Categories</span>
                </div>
                <span className="font-semibold">{categories.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  <span className="text-sm">Authors</span>
                </div>
                <span className="font-semibold">{users.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ) : articles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No Articles Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by creating your first article.</p>
                <Button asChild>
                  <Link href="/admin/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Article
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {article.imageUrl && (
                          <div className="w-24 h-16 flex-shrink-0">
                            <Image
                              src={article.imageUrl || "/placeholder.svg"}
                              alt={article.title}
                              width={96}
                              height={64}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <span className="font-medium">By: {article.user.name}</span>
                            {article.user.role === "ADMINISTRATOR" && (
                              <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs rounded-full">
                                Admin
                              </span>
                            )}
                            <span className="mx-2">•</span>
                            <span>Published: {new Date(article.publishDate).toLocaleDateString()}</span>
                            {article.category && (
                              <>
                                <span className="mx-2">•</span>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full">
                                  {article.category.name}
                                </span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last updated: {new Date(article.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreview(article.slug)}
                          disabled={isLoadingPreview}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/edit/${article.slug}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(article.slug)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}      <Dialog open={isPreviewOpen} onOpenChange={closePreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="preview-description">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Article Preview</span>
              <Button variant="ghost" size="sm" onClick={closePreview}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <div id="preview-description" className="text-sm text-muted-foreground">
              Preview the article content before making changes
            </div>
          </DialogHeader>

          {isLoadingPreview ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading article preview...</span>
            </div>
          ) : previewArticle ? (
            <ArticlePreview
              title={previewArticle.title}
              imageUrl={previewArticle.imageUrl}
              blocks={previewArticle.blocks || []}
              publishDate={new Date(previewArticle.publishDate)}
              isNew={false}
              author={previewArticle.user}
              category={previewArticle.category}
              metaDescription={previewArticle.metaDescription}
              focusKeyword={previewArticle.focusKeyword}
              readingTime={previewArticle.readingTime}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Failed to load article preview</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
