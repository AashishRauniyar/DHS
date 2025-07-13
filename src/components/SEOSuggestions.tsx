/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, FileText, Heading } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SEOSuggestionsProps {
  titleSuggestions: string[]
  contentSuggestions: { [key: string]: string[] }
  onTitleSelect: (title: string) => void
  onContentInsert: (section: string, content: string) => void
}

export function SEOSuggestions({
  titleSuggestions,
  contentSuggestions,
  onTitleSelect,
  onContentInsert,
}: SEOSuggestionsProps) {
  const [selectedTitle, setSelectedTitle] = useState<string>("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied to your clipboard.",
    })
  }

  const handleTitleSelect = (title: string) => {
    setSelectedTitle(title)
    onTitleSelect(title)
    toast({
      title: "Title Selected",
      description: "Title has been applied to your article.",
    })
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5" />
          SEO Content Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="titles" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-8">
            <TabsTrigger value="titles" className="text-xs">
              Title Ideas
            </TabsTrigger>
            <TabsTrigger value="content" className="text-xs">
              Content Ideas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="titles" className="space-y-3 mt-3">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {titleSuggestions.map((title, index) => (
                <div key={index} className="p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm leading-tight">{title}</p>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="outline" className="text-xs h-4 px-1">
                          {title.length} chars
                        </Badge>
                        {title.length > 60 ? (
                          <Badge variant="destructive" className="text-xs h-4 px-1">
                            Too long
                          </Badge>
                        ) : (
                          <Badge variant="default" className="text-xs h-4 px-1 bg-green-600">
                            SEO Good
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(title)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleTitleSelect(title)}
                        className="h-6 px-2 text-xs"
                      >
                        Use
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-3 mt-3">
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {Object.entries(contentSuggestions).map(([section, suggestions]) => (
                <div key={section} className="space-y-2 mb-4">
                  <h4 className="font-medium capitalize flex items-center gap-2 text-sm">
                    <Heading className="h-3 w-3" />
                    {section}
                  </h4>
                  <div className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-start justify-between gap-2">
                          <p className="flex-1 text-xs leading-relaxed">{suggestion}</p>
                          <div className="flex gap-1 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(suggestion)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => onContentInsert(section, suggestion)}
                              className="h-6 px-2 text-xs"
                            >
                              Insert
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
