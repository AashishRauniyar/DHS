/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  title: string
}

interface HorizontalTocProps {
  items: TocItem[]
  activeId?: string
  onItemClick: (id: string) => void
}

export function HorizontalToc({ items, activeId, onItemClick }: HorizontalTocProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("toc-container")
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const container = document.getElementById("toc-container")
    if (!container) return

    const handleScroll = () => {
      setScrollPosition(container.scrollLeft)
      setShowLeftArrow(container.scrollLeft > 0)
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }

    handleScroll() // Initial check
    container.addEventListener("scroll", handleScroll)

    // Check on resize too
    window.addEventListener("resize", handleScroll)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <div className="relative w-full mb-6 border-b border-gray-200">
      {showLeftArrow && (
        <button
          onClick={() => scrollContainer("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      <div
        id="toc-container"
        className="flex overflow-x-auto scrollbar-hide py-2 px-4 whitespace-nowrap"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={cn(
              "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
              activeId === item.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent hover:border-gray-300 text-gray-600 hover:text-gray-900",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scrollContainer("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  )
}
