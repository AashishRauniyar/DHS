/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET SEO data for an article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const articleId = (await params).id;

    const seoData = await prisma.sEOData.findUnique({
      where: { articleId },
      include: {
        article: {
          include: {
            keywords: true,
          },
        },
      },
    });

    if (!seoData) {
      return NextResponse.json(
        { success: false, message: "SEO data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      seoData,
    });
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch SEO data" },
      { status: 500 }
    );
  }
}

// POST/PUT SEO data for an article
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const articleId = (await params).id;
    const data = await request.json();

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    // Update or create SEO data
    const seoData = await prisma.sEOData.upsert({
      where: { articleId },
      update: {
        titleSuggestions: data.titleSuggestions || [],
        contentSuggestions: data.contentSuggestions || {},
        readabilityScore: data.readabilityScore || 0,
        keywordDensity: data.keywordDensity || 0.0,
        wordCount: data.wordCount || 0,
        readingTime: data.readingTime || 0,
      },
      create: {
        articleId,
        titleSuggestions: data.titleSuggestions || [],
        contentSuggestions: data.contentSuggestions || {},
        readabilityScore: data.readabilityScore || 0,
        keywordDensity: data.keywordDensity || 0.0,
        wordCount: data.wordCount || 0,
        readingTime: data.readingTime || 0,
      },
    });

    // Handle keywords if provided
    if (data.keywords && Array.isArray(data.keywords)) {
      // Delete existing keywords
      await prisma.keywordVariation.deleteMany({
        where: { articleId },
      });

      // Create new keywords
      await prisma.keywordVariation.createMany({
        data: data.keywords.map((keyword: any) => ({
          articleId,
          keyword: keyword.keyword,
          searchVolume: keyword.searchVolume,
          difficulty: keyword.difficulty,
          intent: keyword.intent,
          isPrimary: keyword.isPrimary || false,
        })),
      });
    }

    // Update article SEO fields if provided
    if (
      data.metaDescription ||
      data.focusKeyword ||
      data.seoTitle ||
      data.seoScore !== undefined
    ) {
      await prisma.article.update({
        where: { id: articleId },
        data: {
          metaDescription: data.metaDescription,
          focusKeyword: data.focusKeyword,
          seoTitle: data.seoTitle,
          seoScore: data.seoScore,
        },
      });
    }

    return NextResponse.json({
      success: true,
      seoData,
    });
  } catch (error) {
    console.error("Error saving SEO data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save SEO data" },
      { status: 500 }
    );
  }
}
