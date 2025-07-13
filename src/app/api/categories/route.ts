import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        parent: true,
        children: {
          include: {
            _count: {
              select: { articles: true },
            },
          },
          orderBy: { sortOrder: "asc" },
        },
        _count: {
          select: { articles: true },
        },
      },
      orderBy: [{ parentId: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    })

    // Organize categories into a hierarchical structure
    const mainCategories = categories.filter((cat: { parentId: string | null }) => !cat.parentId)
    const organizedCategories = mainCategories.map((mainCat: { id: string; name: string; slug: string; parentId: string | null; description?: string | null; isActive: boolean; sortOrder: number; createdAt: Date; updatedAt: Date }) => ({
      ...mainCat,
      children: categories.filter((cat: { parentId: string | null; id: string }) => cat.parentId === mainCat.id),
    }))

    return NextResponse.json({
      success: true,
      categories: organizedCategories,
      allCategories: categories,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name) {
      return NextResponse.json({ success: false, message: "Category name is required" }, { status: 400 })
    }

    // Generate slug if not provided
    const slug =
      data.slug ||
      data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    })

    if (existingCategory) {
      return NextResponse.json({ success: false, message: "A category with this slug already exists" }, { status: 400 })
    }

    // If parentId is provided, verify the parent exists
    if (data.parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: { id: data.parentId },
      })

      if (!parentCategory) {
        return NextResponse.json({ success: false, message: "Parent category not found" }, { status: 400 })
      }
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        parentId: data.parentId || null,
        isActive: data.isActive !== undefined ? data.isActive : true,
        sortOrder: data.sortOrder || 0,
      },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { articles: true },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        category,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ success: false, message: "Failed to create category" }, { status: 500 })
  }
}
