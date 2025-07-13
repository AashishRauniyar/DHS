/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { CreateArticleRequest } from "@/types/article"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const pageParam = searchParams.get("page")
    const page = pageParam ? Number.parseInt(pageParam, 10) : 1
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const userId = searchParams.get("userId")

    const limit = 10
    const skip = (page - 1) * limit

    const where: any = {}

    if (category) {
      where.categoryId = category
    }

    if (userId) {
      where.userId = userId
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        {
          sections: {
            some: {
              blocks: {
                some: {
                  content: { contains: search, mode: "insensitive" },
                },
              },
            },
          },
        },
      ]
    }

    const total = await prisma.article.count({ where })
    const totalPages = Math.ceil(total / limit)

    const articles = await prisma.article.findMany({
      where,
      take: limit,
      skip,
      orderBy: { updatedAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        keywords: {
          select: {
            id: true,
            keyword: true,
            isPrimary: true,
          },
        },
        seoData: {
          select: {
            wordCount: true,
            readingTime: true,
            readabilityScore: true,
          },
        },
        sections: {
          include: {
            blocks: {
              include: {
                pros: true,
                cons: true,
                ingredients: true,
                highlights: true,
                customFields: true,
                ingredientsList: true,
                ratings: true,
                bulletPoints: true,
                faqItems: true,
                specifications: true,
              },
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    })

    const transformedArticles = articles.map((article: any) => ({
      id: article.id.toString(),
      title: article.title,
      slug: article.slug,
      user: article.user,
      publishDate: article.publishDate,
      imageUrl: article.imageUrl,
      description: article.sections[0]?.blocks.find((block: any) => block.type === "paragraph")?.content || "",
      category: article.category,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      seoScore: article.seoScore,
      focusKeyword: article.focusKeyword,
      keywords: article.keywords,
      seoData: article.seoData,
      sections: article.sections,
    }))

    return NextResponse.json({
      success: true,
      articles: transformedArticles,
      pagination: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data: CreateArticleRequest = await request.json()
    console.log("Received article data:", JSON.stringify(data, null, 2))

    // Validate required fields
    if (!data.title || !data.userId || !data.sections || !Array.isArray(data.sections)) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: title, userId, and sections are required" },
        { status: 400 },
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 400 })
    }

    // Check if category exists (if provided)
    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      })

      if (!category) {
        return NextResponse.json({ success: false, message: "Category not found" }, { status: 400 })
      }
    }

    // Generate unique slug
    const baseSlug = data.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .substring(0, 50)

    let slug = baseSlug
    let counter = 1

    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Calculate word count and reading time from all sections
    const wordCount = data.sections.reduce((total, section) => {
      return (
        total +
        section.blocks
          .filter((block: any) => block.content && typeof block.content === "string")
          .reduce((count: number, block: any) => {
            const words = block.content
              .replace(/<[^>]*>/g, "")
              .split(/\s+/)
              .filter((word: string) => word.length > 0)
            return count + words.length
          }, 0)
      )
    }, 0)

    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    console.log(`Calculated word count: ${wordCount}, reading time: ${readingTime}`)

    // Create the article with sections and blocks in a single transaction
    const article = await prisma.$transaction(
      async (tx: any) => {
        // Create the article first
        const newArticle = await tx.article.create({
          data: {
            title: data.title.trim(),
            slug: slug,
            userId: data.userId,
            publishDate: new Date(),
            imageUrl: data.imageUrl || null,
            categoryId: data.categoryId || null,
            metaDescription: data.metaDescription?.trim() || null,
            focusKeyword: data.focusKeyword?.trim() || null,
            seoScore: 0,
          },
        })

        // Prepare all section data with blocks
        const sectionsToCreate = data.sections.map((sectionData, sectionIndex) => ({
          title: sectionData.title,
          order: sectionData.order,
          articleId: newArticle.id,
          blocks: {
            create: sectionData.blocks.map((block: any, blockIndex: number) => {
              const blockData: any = {
                type: block.type || "paragraph",
                content: block.content || "",
                order: block.order !== undefined ? block.order : blockIndex,
                level: block.level || null,
                imageUrl: block.imageUrl || null,
                imageCaption: block.imageCaption || null,
                imageAlt: block.imageAlt || null,
                productName: block.productName || null,
                overallRating: block.overallRating || null,
                ingredientsIntroduction: block.ingredientsIntroduction || null,
                ctaText: block.ctaText || null,
                ctaButtonText: block.ctaButtonText || null,
                ctaButtonLink: block.ctaButtonLink || null,
                backgroundColor: block.backgroundColor || null,
              }

              // Add nested creates for related data
              if (block.pros && Array.isArray(block.pros) && block.pros.length > 0) {
                blockData.pros = {
                  create: block.pros.map((pro: any, proIdx: number) => ({
                    content: pro.content || pro,
                    order: pro.order !== undefined ? pro.order : proIdx,
                  })),
                }
              }

              if (block.cons && Array.isArray(block.cons) && block.cons.length > 0) {
                blockData.cons = {
                  create: block.cons.map((con: any, conIdx: number) => ({
                    content: con.content || con,
                    order: con.order !== undefined ? con.order : conIdx,
                  })),
                }
              }

              if (block.ingredients && Array.isArray(block.ingredients) && block.ingredients.length > 0) {
                blockData.ingredients = {
                  create: block.ingredients.map((ingredient: any, ingIdx: number) => ({
                    content: ingredient.content || ingredient,
                    order: ingredient.order !== undefined ? ingredient.order : ingIdx,
                  })),
                }
              }

              if (block.highlights && Array.isArray(block.highlights) && block.highlights.length > 0) {
                blockData.highlights = {
                  create: block.highlights.map((highlight: any, hlIdx: number) => ({
                    content: highlight.content || highlight,
                    order: highlight.order !== undefined ? highlight.order : hlIdx,
                  })),
                }
              }

              if (block.ingredientsList && Array.isArray(block.ingredientsList) && block.ingredientsList.length > 0) {
                blockData.ingredientsList = {
                  create: block.ingredientsList.map((ingredient: any) => ({
                    number: ingredient.number || 1,
                    name: ingredient.name || "Unknown Ingredient",
                    imageUrl: ingredient.imageUrl || "",
                    description: ingredient.description || "",
                    studyYear: ingredient.studyYear || null,
                    studySource: ingredient.studySource || null,
                    studyDescription: ingredient.studyDescription || null,
                  })),
                }
              }

              if (block.ratings && typeof block.ratings === "object") {
                blockData.ratings = {
                  create: {
                    ingredients: block.ratings.ingredients || null,
                    value: block.ratings.value || null,
                    manufacturer: block.ratings.manufacturer || null,
                    safety: block.ratings.safety || null,
                    effectiveness: block.ratings.effectiveness || null,
                  },
                }
              }

              if (block.customFields && Array.isArray(block.customFields) && block.customFields.length > 0) {
                blockData.customFields = {
                  create: block.customFields.map((field: any) => ({
                    name: field.name || "custom",
                    value: field.value || "",
                  })),
                }
              }

              if (block.bulletPoints && Array.isArray(block.bulletPoints) && block.bulletPoints.length > 0) {
                blockData.bulletPoints = {
                  create: block.bulletPoints.map((point: any, pointIdx: number) => ({
                    content: point.content || point,
                    order: point.order !== undefined ? point.order : pointIdx,
                  })),
                }
              }

              if (block.faqItems && Array.isArray(block.faqItems) && block.faqItems.length > 0) {
                blockData.faqItems = {
                  create: block.faqItems.map((faq: any, faqIdx: number) => ({
                    question: faq.question || "",
                    answer: faq.answer || "",
                    order: faq.order !== undefined ? faq.order : faqIdx,
                  })),
                }
              }

              if (block.specifications && Array.isArray(block.specifications) && block.specifications.length > 0) {
                blockData.specifications = {
                  create: block.specifications.map((spec: any, specIdx: number) => ({
                    name: spec.name || "",
                    value: spec.value || "",
                    order: spec.order !== undefined ? spec.order : specIdx,
                  })),
                }
              }

              return blockData
            }),
          },
        }))

        // Create all sections with their blocks in one operation
        await tx.section.createMany({
          data: sectionsToCreate.map((section) => ({
            title: section.title,
            order: section.order,
            articleId: section.articleId,
          })),
        })

        // Get the created sections to create blocks
        const createdSections = await tx.section.findMany({
          where: { articleId: newArticle.id },
          orderBy: { order: "asc" },
        })

        // Create blocks for each section
        for (let i = 0; i < data.sections.length; i++) {
          const sectionData = data.sections[i]
          const createdSection = createdSections[i]

          if (sectionData.blocks && sectionData.blocks.length > 0) {
            for (let j = 0; j < sectionData.blocks.length; j++) {
              const block = sectionData.blocks[j]

              const createdBlock = await tx.block.create({
                data: {
                  type: block.type || "paragraph",
                  content: block.content || "",
                  order: block.order !== undefined ? block.order : j,
                  level: block.level || null,
                  imageUrl: block.imageUrl || null,
                  imageCaption: block.imageCaption || null,
                  imageAlt: block.imageAlt || null,
                  productName: block.productName || null,
                  overallRating: block.overallRating || null,
                  ingredientsIntroduction: block.ingredientsIntroduction || null,
                  ctaText: block.ctaText || null,
                  ctaButtonText: block.ctaButtonText || null,
                  ctaButtonLink: block.ctaButtonLink || null,
                  backgroundColor: block.backgroundColor || null,
                  sectionId: createdSection.id,
                },
              })

              // Create related data for each block
              if (block.pros && Array.isArray(block.pros) && block.pros.length > 0) {
                await tx.pros.createMany({
                  data: block.pros.map((pro: any, proIdx: number) => ({
                    content: pro.content || pro,
                    order: pro.order !== undefined ? pro.order : proIdx,
                    blockId: createdBlock.id,
                  })),
                })
              }

              if (block.cons && Array.isArray(block.cons) && block.cons.length > 0) {
                await tx.cons.createMany({
                  data: block.cons.map((con: any, conIdx: number) => ({
                    content: con.content || con,
                    order: con.order !== undefined ? con.order : conIdx,
                    blockId: createdBlock.id,
                  })),
                })
              }

              if (block.ingredients && Array.isArray(block.ingredients) && block.ingredients.length > 0) {
                await tx.ingredient.createMany({
                  data: block.ingredients.map((ingredient: any, ingIdx: number) => ({
                    content: ingredient.content || ingredient,
                    order: ingredient.order !== undefined ? ingredient.order : ingIdx,
                    blockId: createdBlock.id,
                  })),
                })
              }

              if (block.highlights && Array.isArray(block.highlights) && block.highlights.length > 0) {
                await tx.highlight.createMany({
                  data: block.highlights.map((highlight: any, hlIdx: number) => ({
                    content: highlight.content || highlight,
                    order: highlight.order !== undefined ? highlight.order : hlIdx,
                    blockId: createdBlock.id,
                  })),
                })
              }

              if (block.ingredientsList && Array.isArray(block.ingredientsList) && block.ingredientsList.length > 0) {
                await tx.ingredientItem.createMany({
                  data: block.ingredientsList.map((ingredient: any) => ({
                    number: ingredient.number || 1,
                    name: ingredient.name || "Unknown Ingredient",
                    imageUrl: ingredient.imageUrl || "",
                    description: ingredient.description || "",
                    studyYear: ingredient.studyYear || null,
                    studySource: ingredient.studySource || null,
                    studyDescription: ingredient.studyDescription || null,
                    blockId: createdBlock.id,
                  })),
                })
              }

              if (block.ratings && typeof block.ratings === "object") {
                await tx.rating.create({
                  data: {
                    ingredients: block.ratings.ingredients || null,
                    value: block.ratings.value || null,
                    manufacturer: block.ratings.manufacturer || null,
                    safety: block.ratings.safety || null,
                    effectiveness: block.ratings.effectiveness || null,
                    blockId: createdBlock.id,
                  },
                })
              }

              if (block.customFields && Array.isArray(block.customFields) && block.customFields.length > 0) {
                await tx.customField.createMany({
                  data: block.customFields.map((field: any) => ({
                    name: field.name || "custom",
                    value: field.value || "",
                    blockId: createdBlock.id,
                  })),
                })
              }

              if (block.bulletPoints && Array.isArray(block.bulletPoints) && block.bulletPoints.length > 0) {
                await tx.bulletPoint.createMany({
                  data: block.bulletPoints.map((point: any, pointIdx: number) => ({
                    content: point.content || point,
                    order: point.order !== undefined ? point.order : pointIdx,
                    blockId: createdBlock.id,
                  })),
                })
              }

              if (block.faqItems && Array.isArray(block.faqItems) && block.faqItems.length > 0) {
                await tx.fAQItem.createMany({
                  data: block.faqItems.map((faq: any, faqIdx: number) => ({
                    question: faq.question || "",
                    answer: faq.answer || "",
                    order: faq.order !== undefined ? faq.order : faqIdx,
                    blockId: createdBlock.id,
                  })),
                })
              }

              if (block.specifications && Array.isArray(block.specifications) && block.specifications.length > 0) {
                await tx.specification.createMany({
                  data: block.specifications.map((spec: any, specIdx: number) => ({
                    name: spec.name || "",
                    value: spec.value || "",
                    order: spec.order !== undefined ? spec.order : specIdx,
                    blockId: createdBlock.id,
                  })),
                })
              }
            }
          }
        }

        // Create SEO data
        await tx.sEOData.create({
          data: {
            articleId: newArticle.id,
            titleSuggestions: [],
            contentSuggestions: {},
            readabilityScore: 0,
            keywordDensity: 0.0,
            wordCount,
            readingTime,
          },
        })

        // Create keywords if provided
        if (data.keywords && Array.isArray(data.keywords) && data.keywords.length > 0) {
          await tx.keywordVariation.createMany({
            data: data.keywords.map((keyword: any) => ({
              keyword: typeof keyword === "string" ? keyword : keyword.keyword,
              searchVolume: keyword.searchVolume || null,
              difficulty: keyword.difficulty || null,
              intent: keyword.intent || null,
              isPrimary: keyword.isPrimary || false,
              articleId: newArticle.id,
            })),
          })
        }

        return newArticle
      },
      {
        maxWait: 10000, // 10 seconds
        timeout: 30000, // 30 seconds
      },
    )

    // Fetch the complete article with all relations
    const completeArticle = await prisma.article.findUnique({
      where: { id: article.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        keywords: true,
        seoData: true,
        sections: {
          include: {
            blocks: {
              include: {
                pros: true,
                cons: true,
                ingredients: true,
                highlights: true,
                customFields: true,
                ingredientsList: true,
                ratings: true,
                bulletPoints: true,
                faqItems: true,
                specifications: true,
              },
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    })

    console.log("Article created successfully:", completeArticle?.id)

    return NextResponse.json(
      {
        success: true,
        article: {
          ...completeArticle,
          id: completeArticle?.id.toString(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating article:", error)

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { success: false, message: "An article with this slug already exists" },
          { status: 409 },
        )
      }
      if (error.message.includes("Foreign key constraint")) {
        return NextResponse.json(
          { success: false, message: "Invalid user ID or category ID provided" },
          { status: 400 },
        )
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create article",
        error:
          process.env.NODE_ENV === "development" ? (error instanceof Error ? error.message : String(error)) : undefined,
      },
      { status: 500 },
    )
  }
}
