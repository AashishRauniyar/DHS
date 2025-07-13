/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Target, TrendingUp, Copy, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SEOData {
  title: string
  metaDescription: string
  focusKeyword: string
  keywords: string[]
  content: string
}

interface SEOToolProps {
  title: string
  content: string
  onChange: (seoData: Partial<SEOData>) => void
}

export function SEOTool({ title, content, onChange }: SEOToolProps) {
  const [focusKeyword, setFocusKeyword] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordVariations, setKeywordVariations] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null)
  const [seoScore, setSeoScore] = useState(0)

  // Calculate SEO score based on various factors
  useEffect(() => {
    let score = 0
    const maxScore = 100

    // Title optimization (20 points)
    if (title.length >= 30 && title.length <= 60) score += 10
    if (focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase())) score += 10

    // Meta description (15 points)
    if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 10
    if (focusKeyword && metaDescription.toLowerCase().includes(focusKeyword.toLowerCase())) score += 5

    // Content optimization (35 points)
    if (content.length >= 300) score += 10
    if (focusKeyword && content.toLowerCase().includes(focusKeyword.toLowerCase())) {
      const keywordCount = (content.toLowerCase().match(new RegExp(focusKeyword.toLowerCase(), "g")) || []).length
      const wordCount = content.split(" ").length
      const density = (keywordCount / wordCount) * 100
      if (density >= 0.5 && density <= 2.5) score += 15
      else if (density > 0) score += 5
    }
    if (keywords.length >= 3) score += 10

    // Focus keyword (20 points)
    if (focusKeyword.length >= 2) score += 10
    if (keywordVariations.length >= 3) score += 10

    // Additional factors (10 points)
    if (title.length > 0) score += 5
    if (metaDescription.length > 0) score += 5

    setSeoScore(Math.min(score, maxScore))
  }, [title, content, focusKeyword, metaDescription, keywords, keywordVariations])

  const generateKeywordVariations = async () => {
    if (!focusKeyword.trim()) {
      toast({
        title: "Focus keyword required",
        description: "Please enter a focus keyword first",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      // Simulate API call for keyword variations
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const variations = [
        `${focusKeyword} review`,
        `${focusKeyword} benefits`,
        `${focusKeyword} side effects`,
        `${focusKeyword} ingredients`,
        `${focusKeyword} dosage`,
        `${focusKeyword} price`,
        `${focusKeyword} where to buy`,
        `${focusKeyword} vs alternatives`,
        `${focusKeyword} results`,
        `${focusKeyword} testimonials`,
        `best ${focusKeyword}`,
        `${focusKeyword} supplement`,
        `${focusKeyword} effectiveness`,
        `${focusKeyword} safety`,
        `${focusKeyword} clinical studies`,
      ]

      setKeywordVariations(variations)
      toast({
        title: "Keywords generated",
        description: `Generated ${variations.length} keyword variations`,
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate keyword variations",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const addKeyword = (keyword: string) => {
    if (!keywords.includes(keyword)) {
      const newKeywords = [...keywords, keyword]
      setKeywords(newKeywords)
      onChange({ keywords: newKeywords })
    }
  }

  const removeKeyword = (keyword: string) => {
    const newKeywords = keywords.filter((k) => k !== keyword)
    setKeywords(newKeywords)
    onChange({ keywords: newKeywords })
  }

  const copyKeyword = async (keyword: string) => {
    try {
      await navigator.clipboard.writeText(keyword)
      setCopiedKeyword(keyword)
      setTimeout(() => setCopiedKeyword(null), 2000)
      toast({
        title: "Copied",
        description: "Keyword copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy keyword",
        variant: "destructive",
      })
    }
  }

  const handleFocusKeywordChange = (value: string) => {
    setFocusKeyword(value)
    onChange({ focusKeyword: value })
  }

  const handleMetaDescriptionChange = (value: string) => {
    setMetaDescription(value)
    onChange({ metaDescription: value })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Needs Improvement"
    return "Poor"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          SEO Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SEO Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>SEO Score</Label>
            <span className={`font-bold ${getScoreColor(seoScore)}`}>
              {seoScore}/100 - {getScoreLabel(seoScore)}
            </span>
          </div>
          <Progress value={seoScore} className="h-2" />
        </div>

        <Tabs defaultValue="keywords" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="meta">Meta Data</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="keywords" className="space-y-4">
            {/* Focus Keyword */}
            <div className="space-y-2">
              <Label htmlFor="focusKeyword">Focus Keyword</Label>
              <div className="flex gap-2">
                <Input
                  id="focusKeyword"
                  value={focusKeyword}
                  onChange={(e) => handleFocusKeywordChange(e.target.value)}
                  placeholder="Enter your main keyword..."
                />
                <Button onClick={generateKeywordVariations} disabled={isGenerating} variant="outline">
                  {isGenerating ? (
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <TrendingUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Keyword Variations */}
            {keywordVariations.length > 0 && (
              <div className="space-y-2">
                <Label>Keyword Variations</Label>
                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                  {keywordVariations.map((variation, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">{variation}</span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyKeyword(variation)}
                          className="h-6 w-6 p-0"
                        >
                          {copiedKeyword === variation ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => addKeyword(variation)} className="h-6 w-6 p-0">
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Keywords */}
            {keywords.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Keywords</Label>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer">
                      {keyword}
                      <button onClick={() => removeKeyword(keyword)} className="ml-2 hover:text-red-500">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="meta" className="space-y-4">
            {/* Meta Description */}
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => handleMetaDescriptionChange(e.target.value)}
                placeholder="Write a compelling meta description (120-160 characters)..."
                className="min-h-[80px]"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Recommended: 120-160 characters</span>
                <span className={metaDescription.length > 160 ? "text-red-500" : ""}>{metaDescription.length}/160</span>
              </div>
            </div>

            {/* Title Analysis */}
            <div className="space-y-2">
              <Label>Title Analysis</Label>
              <div className="p-3 border rounded-md bg-gray-50">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Length:</span>
                    <span className={title.length < 30 || title.length > 60 ? "text-red-500" : "text-green-500"}>
                      {title.length}/60 characters
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus keyword included:</span>
                    <span
                      className={
                        focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase())
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase()) ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            {/* Content Analysis */}
            <div className="space-y-2">
              <Label>Content Analysis</Label>
              <div className="p-3 border rounded-md bg-gray-50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Word count:</span>
                  <span>{content.split(" ").filter((word) => word.length > 0).length} words</span>
                </div>
                {focusKeyword && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Keyword density:</span>
                      <span>
                        {(
                          ((content.toLowerCase().match(new RegExp(focusKeyword.toLowerCase(), "g")) || []).length /
                            content.split(" ").length) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Keyword occurrences:</span>
                      <span>
                        {(content.toLowerCase().match(new RegExp(focusKeyword.toLowerCase(), "g")) || []).length}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* SEO Recommendations */}
            <div className="space-y-2">
              <Label>Recommendations</Label>
              <div className="space-y-2">
                {title.length < 30 && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <Target className="h-4 w-4 inline mr-2" />
                    Consider making your title longer (30-60 characters)
                  </div>
                )}
                {title.length > 60 && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-sm">
                    <Target className="h-4 w-4 inline mr-2" />
                    Your title is too long. Keep it under 60 characters.
                  </div>
                )}
                {focusKeyword && !title.toLowerCase().includes(focusKeyword.toLowerCase()) && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <Target className="h-4 w-4 inline mr-2" />
                    Include your focus keyword in the title
                  </div>
                )}
                {metaDescription.length < 120 && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <Target className="h-4 w-4 inline mr-2" />
                    Your meta description is too short. Aim for 120-160 characters.
                  </div>
                )}
                {content.split(" ").length < 300 && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <Target className="h-4 w-4 inline mr-2" />
                    Consider adding more content. Aim for at least 300 words.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
