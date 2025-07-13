/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const slug = (await params).slug

    if (!slug) {
      return NextResponse.json({ success: false, message: "Article slug is required" }, { status: 400 })
    }

    const article = await prisma.article.findUnique({
      where: { slug },
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
            description: true,
            parent: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        keywords: true,
        seoData: true,
        sections: {
          include: {
            blocks: {
              include: {
                pros: { orderBy: { order: "asc" } },
                cons: { orderBy: { order: "asc" } },
                ingredients: { orderBy: { order: "asc" } },
                highlights: { orderBy: { order: "asc" } },
                customFields: true,
                ingredientsList: { orderBy: { number: "asc" } },
                ratings: true,
                bulletPoints: { orderBy: { order: "asc" } },
                faqItems: { orderBy: { order: "asc" } },
                specifications: { orderBy: { order: "asc" } },
              },
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    })

    if (!article) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 })
    }

    // Process sections and blocks
    const processedSections = article.sections.map((section: any) => ({
      id: section.id,
      title: section.title,
      order: section.order,
      articleId: section.articleId,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
      blocks: section.blocks.map((block: any) => {
        const processedBlock = {
          id: block.id,
          type: block.type,
          order: block.order,
          content: block.content || "",
          sectionId: block.sectionId,
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
          case "bullet-list":
            return {
              ...processedBlock,
              bulletPoints: block.bulletPoints.map((bp: any) => ({
                id: bp.id,
                content: bp.content,
                order: bp.order,
              })),
            }
          default:
            return processedBlock
        }
      }),
    }))

    // Calculate reading time and word count
    const wordCount = article.sections.reduce((total: number, section: any) => {
      return (
        total +
        section.blocks
          .filter((b: any) => b.content)
          .reduce((count: number, block: any) => count + (block.content?.split(/\s+/).length || 0), 0)
      )
    }, 0)

    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    const formattedArticle = {
      id: article.id,
      title: article.title,
      slug: article.slug,
      publishDate: article.publishDate.toISOString(),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      imageUrl: article.imageUrl || "",

      userId: article.userId,
      user: article.user,

      categoryId: article.categoryId || null,
      category: article.category,

      seo: {
        metaDescription: article.metaDescription || "",
        focusKeyword: article.focusKeyword || "",
        seoTitle: article.seoTitle || "",
        seoScore: article.seoScore || 0,
        keywords: article.keywords,
        readabilityScore: article.seoData?.readabilityScore || 0,
        keywordDensity: article.seoData?.keywordDensity || 0,
        titleSuggestions: article.seoData?.titleSuggestions || [],
        contentSuggestions: article.seoData?.contentSuggestions || {},
      },

      metaDescription: article.metaDescription || "",
      focusKeyword: article.focusKeyword || "",
      keywords: article.keywords?.map((k: any) => k.keyword) || [],

      wordCount,
      readingTime,

      sections: processedSections,
    }

    return NextResponse.json({ success: true, article: formattedArticle })
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch article",
        error: process.env.NODE_ENV === "development" && error instanceof Error ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const updatedArticle = await request.json()

    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    })

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Delete all existing sections and their blocks
    await prisma.section.deleteMany({
      where: { articleId: existingArticle.id },
    })

    // Update the article with new data
    const result = await prisma.article.update({
      where: { id: existingArticle.id },
      data: {
        title: updatedArticle.title,
        imageUrl: updatedArticle.imageUrl || null,
        slug: updatedArticle.slug || slug,
        sections: {
          create: updatedArticle.sections.map((section: any) => ({
            title: section.title,
            order: section.order,
            blocks: {
              create: section.blocks.map((block: any, index: number) => ({
                type: block.type,
                content: block.content || null,
                level: block.level || null,
                listType: block.listType || null,
                imageUrl: block.imageUrl || null,
                language: block.language || null,
                ctaText: block.ctaText || null,
                ctaLink: block.ctaLink || null,
                productName: block.productName || null,
                overallRating: block.overallRating || null,
                ingredientsIntroduction: block.ingredientsIntroduction || null,
                howToUse: block.howToUse || null,
                price: block.price || null,
                verdict: block.verdict || null,
                author: block.author || null,
                reviewDate: block.reviewDate || null,
                medicallyReviewed: block.medicallyReviewed || null,
                factChecked: block.factChecked || null,
                ctaButtonText: block.ctaButtonText || null,
                ctaButtonLink: block.ctaButtonLink || null,
                backgroundColor: block.backgroundColor || null,
                order: index,
                // Create related records
                pros:
                  block.pros && block.pros.length > 0
                    ? {
                        create: block.pros.map((pro: any, proIndex: number) => ({
                          content: pro.content,
                          order: proIndex,
                        })),
                      }
                    : undefined,
                cons:
                  block.cons && block.cons.length > 0
                    ? {
                        create: block.cons.map((con: any, conIndex: number) => ({
                          content: con.content,
                          order: conIndex,
                        })),
                      }
                    : undefined,
                ingredients:
                  block.ingredients && block.ingredients.length > 0
                    ? {
                        create: block.ingredients.map((ingredient: any, ingIndex: number) => ({
                          content: ingredient.content,
                          order: ingIndex,
                        })),
                      }
                    : undefined,
                highlights:
                  block.highlights && block.highlights.length > 0
                    ? {
                        create: block.highlights.map((highlight: any, hlIndex: number) => ({
                          content: highlight.content,
                          order: hlIndex,
                        })),
                      }
                    : undefined,
                ingredientsList:
                  block.ingredientsList && block.ingredientsList.length > 0
                    ? {
                        create: block.ingredientsList.map((item: any) => ({
                          number: item.number || 1,
                          name: item.name,
                          imageUrl: item.imageUrl || "/placeholder.svg",
                          description: item.description || "",
                          studyYear: item.studyYear || null,
                          studySource: item.studySource || null,
                          studyDescription: item.studyDescription || null,
                        })),
                      }
                    : undefined,
                ratings: block.ratings
                  ? {
                      create: {
                        ingredients: block.ratings.ingredients || null,
                        value: block.ratings.value || null,
                        manufacturer: block.ratings.manufacturer || null,
                        safety: block.ratings.safety || null,
                        effectiveness: block.ratings.effectiveness || null,
                      },
                    }
                  : undefined,
                customFields:
                  block.customFields && block.customFields.length > 0
                    ? {
                        create: block.customFields.map((field: any) => ({
                          name: field.name,
                          value: field.value,
                        })),
                      }
                    : undefined,
              })),
            },
          })),
        },
      },
      include: {
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

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const slug = (await params).slug

    const article = await prisma.article.findUnique({
      where: { slug },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    await prisma.article.delete({
      where: { id: article.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}
