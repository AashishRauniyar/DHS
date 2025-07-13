import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: (await params).id },
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
        articles: {
          select: {
            id: true,
            title: true,
            slug: true,
            user: true,
            publishDate: true,
            imageUrl: true,
          },
          orderBy: { publishDate: "desc" },
        },
        _count: {
          select: { articles: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      category,
    })
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string } >}) {
  try {
    const data = await request.json()

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: (await params).id },
    })

    if (!existingCategory) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 })
    }

    // Generate slug if name is being updated
    let slug = data.slug
    if (data.name && !slug) {
      slug = data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
    }

    // Check if new slug conflicts with existing categories (excluding current one)
    if (slug && slug !== existingCategory.slug) {
      const conflictingCategory = await prisma.category.findUnique({
        where: { slug },
      })

      if (conflictingCategory && conflictingCategory.id !== (await params).id) {
        return NextResponse.json(
          { success: false, message: "A category with this slug already exists" },
          { status: 400 },
        )
      }
    }

    // Prevent setting parent to self or creating circular references
    if (data.parentId === (await params).id) {
      return NextResponse.json({ success: false, message: "A category cannot be its own parent" }, { status: 400 })
    }

    // If parentId is provided, verify the parent exists and won't create a cycle
    if (data.parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: { id: data.parentId },
        include: { parent: true },
      })

      if (!parentCategory) {
        return NextResponse.json({ success: false, message: "Parent category not found" }, { status: 400 })
      }

      // Check for circular reference (simplified check)
      if (parentCategory.parentId === (await params).id) {
        return NextResponse.json({ success: false, message: "This would create a circular reference" }, { status: 400 })
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id: (await params).id },
      data: {
        name: data.name || existingCategory.name,
        slug: slug || existingCategory.slug,
        description: data.description !== undefined ? data.description : existingCategory.description,
        parentId: data.parentId !== undefined ? data.parentId : existingCategory.parentId,
        isActive: data.isActive !== undefined ? data.isActive : existingCategory.isActive,
        sortOrder: data.sortOrder !== undefined ? data.sortOrder : existingCategory.sortOrder,
      },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { articles: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      category: updatedCategory,
    })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ success: false, message: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params:Promise< { id: string }> }) {
  try {
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: (await params).id },
      include: {
        children: true,
        _count: {
          select: { articles: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 })
    }

    // Check if category has children
    if (category.children.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot delete category with subcategories. Please delete or move subcategories first.",
        },
        { status: 400 },
      )
    }

    // Check if category has articles
    if (category._count.articles > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot delete category with ${category._count.articles} articles. Please move or delete articles first.`,
        },
        { status: 400 },
      )
    }

    await prisma.category.delete({
      where: { id: (await params).id },
    })

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ success: false, message: "Failed to delete category" }, { status: 500 })
  }
}
