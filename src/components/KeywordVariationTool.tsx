/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Plus, X, Target, TrendingUp, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { KeywordVariation, KeywordVariationToolProps } from "@/types/article"

export function KeywordVariationTool({
  productName,
  onKeywordsChange,
  onTitleSuggestions,
  onContentSuggestions,
}: KeywordVariationToolProps) {
  const [keywords, setKeywords] = useState<KeywordVariation[]>([])
  const [newKeyword, setNewKeyword] = useState<{
    keyword: string;
    searchVolume: string;
    difficulty: "Low" | "Medium" | "High";
    intent: "Commercial" | "Informational" | "Navigational";
    isPrimary: boolean;
  }>({
    keyword: "",
    searchVolume: "",
    difficulty: "Medium",
    intent: "Informational",
    isPrimary: false,
  })

  const addKeyword = () => {
    if (!newKeyword.keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword",
        variant: "destructive",
      })
      return
    }

    // Check if keyword already exists
    if (keywords.some((k) => k.keyword.toLowerCase() === newKeyword.keyword.toLowerCase())) {
      toast({
        title: "Error",
        description: "This keyword already exists",
        variant: "destructive",
      })
      return
    }

    const keywordObj: KeywordVariation = {
      id: Date.now().toString(),
      keyword: newKeyword.keyword.toLowerCase().trim(),
      searchVolume: newKeyword.searchVolume ? Number.parseInt(newKeyword.searchVolume) : undefined,
      difficulty: newKeyword.difficulty,
      intent: newKeyword.intent,
    }

    const updatedKeywords = [...keywords, keywordObj]
    setKeywords(updatedKeywords)
    onKeywordsChange(updatedKeywords)

    // Reset form
    setNewKeyword({
      keyword: "",
      searchVolume: "",
      difficulty: "Medium",
      intent: "Informational",
      isPrimary: false,
    })

    toast({
      title: "Success",
      description: "Keyword added successfully",
    })
  }

  const removeKeyword = (id: string) => {
    const updatedKeywords = keywords.filter((k) => k.id !== id)
    setKeywords(updatedKeywords)
    onKeywordsChange(updatedKeywords)

    toast({
      title: "Success",
      description: "Keyword removed",
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateKeyword = (id: string, field: keyof KeywordVariation, value: any) => {
    const updatedKeywords = keywords.map((k) => (k.id === id ? { ...k, [field]: value } : k))
    setKeywords(updatedKeywords)
    onKeywordsChange(updatedKeywords)
  }

  const copyKeywords = () => {
    const keywordList = keywords.map((k) => k.keyword).join(", ")
    navigator.clipboard.writeText(keywordList)
    toast({
      title: "Keywords Copied",
      description: "All keywords have been copied to your clipboard.",
    })
  }

  const saveKeywords = () => {
    onKeywordsChange(keywords)
    toast({
      title: "Keywords Saved",
      description: `${keywords.length} keywords saved successfully`,
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case "Commercial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Informational":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Navigational":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5" />
          SEO Keywords
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Keyword Form */}
        <div className="space-y-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h4 className="font-medium text-sm">Add New Keyword</h4>

          <div className="space-y-3">
            <div>
              <Label htmlFor="keyword" className="text-xs font-medium">
                Keyword *
              </Label>
              <Input
                id="keyword"
                value={newKeyword.keyword}
                onChange={(e) => setNewKeyword((prev) => ({ ...prev, keyword: e.target.value }))}
                placeholder="Enter keyword phrase"
                className="mt-1 text-sm"
                onKeyPress={(e) => e.key === "Enter" && addKeyword()}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="searchVolume" className="text-xs font-medium">
                  Search Volume
                </Label>
                <Input
                  id="searchVolume"
                  type="number"
                  value={newKeyword.searchVolume}
                  onChange={(e) => setNewKeyword((prev) => ({ ...prev, searchVolume: e.target.value }))}
                  placeholder="e.g. 1000"
                  className="mt-1 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="difficulty" className="text-xs font-medium">
                  Difficulty
                </Label>
                <Select
                  value={newKeyword.difficulty}
                  onValueChange={(value: "Low" | "Medium" | "High") =>
                    setNewKeyword((prev) => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger className="mt-1 text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="intent" className="text-xs font-medium">
                Search Intent
              </Label>
              <Select
                value={newKeyword.intent}
                onValueChange={(value: "Commercial" | "Informational" | "Navigational") =>
                  setNewKeyword((prev) => ({ ...prev, intent: value }))
                }
              >
                <SelectTrigger className="mt-1 text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Informational">Informational</SelectItem>
                  <SelectItem value="Navigational">Navigational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addKeyword} disabled={!newKeyword.keyword.trim()} className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Keyword
            </Button>
          </div>
        </div>

        {/* Keywords List */}
        {keywords.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">Keywords ({keywords.length})</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyKeywords} className="h-7 px-2 text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={saveKeywords} className="h-7 px-2 text-xs">
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </Button>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {keywords.map((keyword) => (
                <div key={keyword.id} className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <Input
                        value={keyword.keyword}
                        onChange={(e) => updateKeyword(keyword.id, "keyword", e.target.value)}
                        className="text-sm font-medium border-none p-0 h-auto bg-transparent"
                        placeholder="Keyword"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyword(keyword.id)}
                      className="h-6 w-6 p-0 ml-2 flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Input
                      type="number"
                      value={keyword.searchVolume || ""}
                      onChange={(e) =>
                        updateKeyword(keyword.id, "searchVolume", Number.parseInt(e.target.value) || undefined)
                      }
                      placeholder="Search Volume"
                      className="text-xs h-7"
                    />
                    <Select
                      value={keyword.difficulty || "Medium"}
                      onValueChange={(value) => updateKeyword(keyword.id, "difficulty", value)}
                    >
                      <SelectTrigger className="text-xs h-7">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Select
                    value={keyword.intent || "Informational"}
                    onValueChange={(value) => updateKeyword(keyword.id, "intent", value)}
                  >
                    <SelectTrigger className="text-xs h-7 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Informational">Informational</SelectItem>
                      <SelectItem value="Navigational">Navigational</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-1 mt-2 flex-wrap">
                    <Badge variant="outline" className="text-xs h-4 px-1">
                      <TrendingUp className="h-2 w-2 mr-1" />
                      {keyword.searchVolume || 0}
                    </Badge>
                    <Badge className={`text-xs h-4 px-1 ${getDifficultyColor(keyword.difficulty || "")}`}>
                      {keyword.difficulty}
                    </Badge>
                    <Badge className={`text-xs h-4 px-1 ${getIntentColor(keyword.intent || "")}`}>
                      {keyword.intent}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Tips */}
        <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
          <h4 className="font-medium mb-2 text-sm">SEO Tips</h4>
          <ul className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
            <li>• Use primary keyword in title and first paragraph</li>
            <li>• Include 2-3 secondary keywords naturally</li>
            <li>• Focus on long-tail keywords for better ranking</li>
            <li>• Match search intent with content type</li>
            <li>• Research competitor keywords for ideas</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
