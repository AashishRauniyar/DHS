/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ArticleProcessor - Utility class for processing article data
 * Handles transformations between database and frontend formats
 */
export class ArticleProcessor {
  /**
   * Formats article data for frontend consumption
   * @param article - Raw article data from database
   * @returns Formatted article data
   */
  static formatForFrontend(article: any) {
    // Process blocks to ensure they're in the right format for the frontend
    const processedBlocks = article.blocks.map((block: any) => {
      // Base block structure
      const processedBlock = {
        id: block.id,
        type: block.type,
        order: block.order,
        content: block.content || "",
        articleId: block.articleId,
      }

      // Add type-specific properties
      switch (block.type) {
        case "heading":
          return {
            ...processedBlock,
            level: block.level || 2,
          }
        case "image":
          return {
            ...processedBlock,
            imageUrl: block.imageUrl || "",
            imageCaption: block.imageCaption || "",
            imageAlt: block.imageAlt || "",
          }
        case "list":
          return {
            ...processedBlock,
            listType: block.listType || "unordered",
            bulletPoints: block.bulletPoints.map((bp: any) => ({
              id: bp.id,
              content: bp.content,
              order: bp.order,
            })),
          }
        case "quote":
          return {
            ...processedBlock,
            author: block.author || "",
          }
        case "code":
          return {
            ...processedBlock,
            language: block.language || "javascript",
          }
        case "rating":
          return {
            ...processedBlock,
            productName: block.productName || "",
            overallRating: block.overallRating || 0,
            ratings: block.ratings
              ? {
                  ingredients: block.ratings.ingredients || 0,
                  value: block.ratings.value || 0,
                  manufacturer: block.ratings.manufacturer || 0,
                  safety: block.ratings.safety || 0,
                  effectiveness: block.ratings.effectiveness || 0,
                }
              : {},
            highlights: block.highlights.map((h: any) => ({
              id: h.id,
              content: h.content,
              order: h.order,
            })),
          }
        case "pros-cons":
          return {
            ...processedBlock,
            pros: block.pros.map((p: any) => ({
              id: p.id,
              content: p.content,
              order: p.order,
            })),
            cons: block.cons.map((c: any) => ({
              id: c.id,
              content: c.content,
              order: c.order,
            })),
          }
        case "ingredients":
          return {
            ...processedBlock,
            introduction: block.ingredientsIntroduction || "",
            ingredientsList: block.ingredientsList.map((i: any) => ({
              id: i.id,
              name: i.name,
              imageUrl: i.imageUrl,
              description: i.description,
              studyYear: i.studyYear || "",
              studySource: i.studySource || "",
              studyDescription: i.studyDescription || "",
            })),
          }
        case "cta":
          return {
            ...processedBlock,
            ctaText: block.ctaText || "",
            ctaButtonText: block.ctaButtonText || "",
            ctaButtonLink: block.ctaButtonLink || "",
            backgroundColor: block.backgroundColor || "",
          }
        case "faq":
          return {
            ...processedBlock,
            faqItems: block.faqItems.map((faq: any) => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
              order: faq.order,
            })),
          }
        case "specifications":
          return {
            ...processedBlock,
            specifications: block.specifications.map((spec: any) => ({
              id: spec.id,
              name: spec.name,
              value: spec.value,
              order: spec.order,
            })),
          }
        default:
          return processedBlock
      }
    })

    // Extract custom fields into a more usable format
    const customFields: Record<string, string> = {}
    article.blocks.forEach((block: any) => {
      block.customFields.forEach((field: any) => {
        customFields[field.name] = field.value
      })
    })

    // Calculate reading time and word count
    const wordCount = article.blocks
      .filter((b: any) => b.content)
      .reduce((count: number, block: any) => count + (block.content?.split(/\s+/).length || 0), 0)

    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    // Format the response
    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      publishDate: article.publishDate.toISOString(),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      imageUrl: article.imageUrl || "",

      // User information
      userId: article.userId,
      user: article.user,

      // Category information
      categoryId: article.categoryId || null,
      category: article.category,

      // SEO information
      seo: {
        metaDescription: article.metaDescription || "",
        focusKeyword: article.focusKeyword || "",
        seoTitle: article.seoTitle || "",
        seoScore: article.seoScore || 0,
        keywords: article.keywords || [],
        readabilityScore: article.seoData?.readabilityScore || 0,
        keywordDensity: article.seoData?.keywordDensity || 0,
        titleSuggestions: article.seoData?.titleSuggestions || [],
        contentSuggestions: article.seoData?.contentSuggestions || {},
      },

      // Content statistics
      wordCount,
      readingTime,

      // Content blocks
      blocks: processedBlocks,

      // Custom fields
      customFields,
    }
  }

  /**
   * Prepares article data for database storage
   * @param data - Article data from frontend
   * @returns Formatted data for database
   */
  static prepareForDatabase(data: any) {
    // Extract main article fields
    const {
      title,
      slug,
      userId,
      imageUrl,
      categoryId,
      metaDescription,
      focusKeyword,
      seoTitle,
      blocks,
      keywords,
      seoData,
    } = data

    // Prepare article data
    const articleData = {
      title,
      slug,
      userId,
      imageUrl: imageUrl || null,
      categoryId: categoryId || null,
      metaDescription: metaDescription || null,
      focusKeyword: focusKeyword || null,
      seoTitle: seoTitle || null,
    }

    return {
      articleData,
      blocks,
      keywords,
      seoData,
    }
  }
}
