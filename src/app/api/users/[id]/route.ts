import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (await params).id },
      include: {
        articles: {
          select: {
            id: true,
            title: true,
            slug: true,
            publishDate: true,
            imageUrl: true,
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
          orderBy: { publishDate: "desc" },
        },
        _count: {
          select: { articles: true },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params:Promise < { id: string }> }) {
  try {
    const data = await request.json()

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: (await params).id },
    })

    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check if new email conflicts with existing users (excluding current one)
    if (data.email && data.email !== existingUser.email) {
      const conflictingUser = await prisma.user.findUnique({
        where: { email: data.email },
      })

      if (conflictingUser && conflictingUser.id !==(await params).id) {
        return NextResponse.json({ success: false, message: "A user with this email already exists" }, { status: 400 })
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id:(await params).id },
      data: {
        email: data.email || existingUser.email,
        name: data.name || existingUser.name,
        role: data.role || existingUser.role,
        isActive: data.isActive !== undefined ? data.isActive : existingUser.isActive,
      },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ success: false, message: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise <{ id: string }> }) {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id:(await params).id },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check if user has articles
    if (user._count.articles > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot delete user with ${user._count.articles} articles. Please reassign or delete articles first.`,
        },
        { status: 400 },
      )
    }

    await prisma.user.delete({
      where: { id: (await params).id },
    })

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ success: false, message: "Failed to delete user" }, { status: 500 })
  }
}
