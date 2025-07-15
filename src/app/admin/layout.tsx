"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText,
  Users,
  FolderTree,
  Settings,
  BarChart3,
  Home,
  ChevronDown,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import ReduxProvider from "@/components/providers/ReduxProvider"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarOpen")
    if (savedState !== null) {
      setIsSidebarOpen(savedState === "true")
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isSidebarOpen.toString())
  }, [isSidebarOpen])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <ReduxProvider>
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-30 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-16",
        )}
      >
        <div
          className={cn(
            "p-4 border-b border-gray-200 dark:border-gray-700 flex items-center",
            isSidebarOpen ? "justify-between" : "justify-center",
          )}
        >
          {isSidebarOpen ? (
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">CMS Admin</span>
            </Link>
          ) : (
            <Link href="/admin" className="flex items-center justify-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">CMS</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
            {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        <nav className={cn("flex-1 overflow-y-auto p-4", !isSidebarOpen && "px-2")}>
          <div className="space-y-1">
            {isSidebarOpen && (
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
                Dashboard
              </p>
            )}
            <Link
              href="/"
              className={cn(
                "flex items-center py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isSidebarOpen ? "px-3" : "px-2 justify-center",
              )}
            >
              <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              {isSidebarOpen && <span className="ml-3">Site Home</span>}
            </Link>
            <Link
              href="/admin"
              className={cn(
                "flex items-center py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin") && "bg-gray-100 dark:bg-gray-700 font-medium",
                isSidebarOpen ? "px-3" : "px-2 justify-center",
              )}
              aria-disabled={isActive("/admin") ? "true" : "false"}
            >
              <Home className={cn("h-5 w-5 text-gray-500 dark:text-gray-400", isActive("/admin") && "text-blue-500")} />
              {isSidebarOpen && <span className="ml-3">Overview</span>}
            </Link>
            <Link
              href="/admin/analytics"
              className={cn(
                "flex items-center py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/analytics") && "bg-gray-100 dark:bg-gray-700 font-medium",
                isSidebarOpen ? "px-3" : "px-2 justify-center",
              )}
              aria-disabled={isActive("/admin") ? "true" : "false"}
            >
              <BarChart3
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400",
                  isActive("/admin/analytics") && "text-blue-500",
                )}
              />
              {isSidebarOpen && <span className="ml-3">Analytics</span>}
            </Link>
          </div>

          <div className={cn("mt-8 space-y-1", !isSidebarOpen && "mt-6")}>
            {isSidebarOpen && (
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
                Content
              </p>
            )}
            <Link
              href="/admin/articles"
              className={cn(
                "flex items-center py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/articles") && "bg-gray-100 dark:bg-gray-700 font-medium",
                isSidebarOpen ? "px-3" : "px-2 justify-center",
              )}
            >
              <FileText
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400",
                  isActive("/admin/articles") && "text-blue-500",
                )}
              />
              {isSidebarOpen && <span className="ml-3">Articles</span>}
            </Link>
            <Link
              href="/admin/categories"
              className={cn(
                "flex items-center py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/categories") && "bg-gray-100 dark:bg-gray-700 font-medium",
                isSidebarOpen ? "px-3" : "px-2 justify-center",
              )}
            >
              <FolderTree
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400",
                  isActive("/admin/categories") && "text-blue-500",
                )}
              />
              {isSidebarOpen && <span className="ml-3">Categories</span>}
            </Link>
          </div>

          <div className={cn("mt-8 space-y-1", !isSidebarOpen && "mt-6")}>
            {isSidebarOpen && (
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
                Administration
              </p>
            )}
            <Link
              href="/admin/users"
              className={cn(
                "flex items-center py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/users") && "bg-gray-100 dark:bg-gray-700 font-medium",
                isSidebarOpen ? "px-3" : "px-2 justify-center",
              )}
            >
              <Users
                className={cn("h-5 w-5 text-gray-500 dark:text-gray-400", isActive("/admin/users") && "text-blue-500")}
              />
              {isSidebarOpen && <span className="ml-3">Users</span>}
            </Link>
            <Link
              href="/admin/settings"
              className={cn(
                "flex items-center py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/settings") && "bg-gray-100 dark:bg-gray-700 font-medium",
                isSidebarOpen ? "px-3" : "px-2 justify-center",
              )}
            >
              <Settings
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400",
                  isActive("/admin/settings") && "text-blue-500",
                )}
              />
              {isSidebarOpen && <span className="ml-3">Settings</span>}
            </Link>
          </div>
        </nav>

        {isSidebarOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 h-full z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <Link href="/admin" className="flex items-center">
            <span className="text-xl font-bold text-gray-800 dark:text-white">CMS Admin</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
              Dashboard
            </p>
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
              Site Home
            </Link>
            <Link
              href="/admin"
              className={cn(
                "flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin") && "bg-gray-100 dark:bg-gray-700 font-medium",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home
                className={cn("h-5 w-5 mr-3 text-gray-500 dark:text-gray-400", isActive("/admin") && "text-blue-500")}
              />
              Overview
            </Link>
            <Link
              href="/admin/analytics"
              className={cn(
                "flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/analytics") && "bg-gray-100 dark:bg-gray-700 font-medium",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BarChart3
                className={cn(
                  "h-5 w-5 mr-3 text-gray-500 dark:text-gray-400",
                  isActive("/admin/analytics") && "text-blue-500",
                )}
              />
              Analytics
            </Link>
          </div>

          <div className="mt-8 space-y-1">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
              Content
            </p>
            <Link
              href="/admin/articles"
              className={cn(
                "flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/articles") && "bg-gray-100 dark:bg-gray-700 font-medium",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText
                className={cn(
                  "h-5 w-5 mr-3 text-gray-500 dark:text-gray-400",
                  isActive("/admin/articles") && "text-blue-500",
                )}
              />
              Articles
            </Link>
            <Link
              href="/admin/categories"
              className={cn(
                "flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/categories") && "bg-gray-100 dark:bg-gray-700 font-medium",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FolderTree
                className={cn(
                  "h-5 w-5 mr-3 text-gray-500 dark:text-gray-400",
                  isActive("/admin/categories") && "text-blue-500",
                )}
              />
              Categories
            </Link>
          </div>

          <div className="mt-8 space-y-1">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
              Administration
            </p>
            <Link
              href="/admin/users"
              className={cn(
                "flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/users") && "bg-gray-100 dark:bg-gray-700 font-medium",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users
                className={cn(
                  "h-5 w-5 mr-3 text-gray-500 dark:text-gray-400",
                  isActive("/admin/users") && "text-blue-500",
                )}
              />
              Users
            </Link>
            <Link
              href="/admin/settings"
              className={cn(
                "flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                isActive("/admin/settings") && "bg-gray-100 dark:bg-gray-700 font-medium",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings
                className={cn(
                  "h-5 w-5 mr-3 text-gray-500 dark:text-gray-400",
                  isActive("/admin/settings") && "text-blue-500",
                )}
              />
              Settings
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", isSidebarOpen ? "md:ml-64" : "md:ml-16")}>
        {/* Mobile Header */}
        <header className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-lg font-bold">CMS Admin</span>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
    </ReduxProvider>  
  )
}
