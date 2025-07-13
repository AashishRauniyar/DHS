"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, Search, X, Menu, ChevronRight } from "lucide-react"

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null)

  // Create refs with proper typing
  const searchRef = useRef<HTMLDivElement | null>(null)
  const searchBarRef = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  // Toggle mobile submenu
  const toggleMobileSubmenu = (menu: string) => {
    setExpandedMobileMenu(expandedMobileMenu === menu ? null : menu)
  }

  useEffect(() => {
    // Close search when clicked outside (as a fallback)
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false)
      }

      // Close mobile menu when clicked outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMobileMenuOpen &&
        !(event.target as Element).closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Focus the search input when opened
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }

    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isSearchOpen, isMobileMenuOpen])

  return (
    <div>
      <nav className="flex items-center justify-between p-2 shadow-md bg-white">
        <div className="flex items-center">
          <Link href={"/"}>
          {/* Logo */}
          <Image
            src="/dailySupplementLogo.png"
            alt="Logo"
            width={320}
            height={52}
            className="h-12 w-48 md:h-auto md:w-80 ml-2 md:ml-8"
            priority
          />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-m">
          <Link href="/" className="text-lg hover:text-green-500 hover:text-xl transition-all duration-200">
            Home
          </Link>

          <a href="/ArticleListing" className="text-lg hover:text-green-500 hover:text-xl transition-all duration-200">
            Reviews
          </a>

          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-green-500 py-2 text-base hover:text-lg transition-all duration-200">
              <span>MEN&apos;S AND WOMEN&apos;S HEALTH</span> <ChevronDown size={18} />
            </button>
            <div className="absolute left-0 top-full pt-1 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white border border-black shadow-md rounded-md overflow-hidden">
                <a
                  href="/MenWomenHealth"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Male Enhancement
                </a>
                <a
                  href="/MenWomenHealth"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Female Enhancement
                </a>
                <a
                  href="MenWomenHealth"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Sexual Health
                </a>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-green-500 py-2 text-base hover:text-lg transition-all duration-200">
              <span>General Health</span> <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 top-full pt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white border border-black shadow-md rounded-md overflow-hidden">
                <a
                  href="/GeneralHealth"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Bladder Control
                </a>
                <a
                  href="/GeneralHealth"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Body Building
                </a>
                <a
                  href="GeneralHealth"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Immune Support
                </a>
                <a
                  href="/GeneralHealth"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Weight Management
                </a>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-green-500 py-2 text-base hover:text-lg transition-all duration-200">
              <span>Beauty & Skin Care</span> <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 top-full pt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white border border-black shadow-md rounded-md overflow-hidden">
                <a
                  href="/BeautyCare"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Acne
                </a>
                <a
                  href="/BeautyCare"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Eye Cream
                </a>
                <a
                  href="/BeautyCare"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Anti-Aging
                </a>
                <a
                  href="/BeautyCare"
                  className="block p-3 hover:text-green-500 hover:text-lg transition-all duration-200"
                >
                  Moisturizers
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 mr-2 md:mr-10">
          <button className="hidden sm:block bg-green-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-green-600 text-sm md:text-lg hover:text-xl transition-all duration-200">
            Subscribe
          </button>
          <div className="relative cursor-pointer" ref={searchRef}>
            <Search
              size={20}
              className="cursor-pointer text-gray-500 hover:text-green-500 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden mobile-menu-button p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-50 bg-white pt-16 overflow-y-auto md:hidden"
          style={{ top: "60px" }}
        >
          <div className="p-4 space-y-4">
            <Link href="/" className="block py-2 text-lg border-b border-gray-100">
              Home
            </Link>
            <a href="/ArticleListing" className="block py-2 text-lg border-b border-gray-100">
              Reviews
            </a>

            {/* Mobile MEN'S AND WOMEN'S HEALTH dropdown */}
            <div className="border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full py-2 text-lg"
                onClick={() => toggleMobileSubmenu("mens-womens")}
              >
                <span>MEN&apos;S AND WOMEN&apos;S HEALTH</span>
                <ChevronRight
                  className={`transition-transform duration-200 ${
                    expandedMobileMenu === "mens-womens" ? "rotate-90" : ""
                  }`}
                  size={20}
                />
              </button>
              {expandedMobileMenu === "mens-womens" && (
                <div className="pl-4 py-2 space-y-2 bg-gray-50">
                  <a href="/MenWomenHealth" className="block py-2">
                    Male Enhancement
                  </a>
                  <a href="/MenWomenHealth" className="block py-2">
                    Female Enhancement
                  </a>
                  <a href="/MenWomenHealth" className="block py-2">
                    Sexual Health
                  </a>
                </div>
              )}
            </div>

            {/* Mobile General Health dropdown */}
            <div className="border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full py-2 text-lg"
                onClick={() => toggleMobileSubmenu("general-health")}
              >
                <span>General Health</span>
                <ChevronRight
                  className={`transition-transform duration-200 ${
                    expandedMobileMenu === "general-health" ? "rotate-90" : ""
                  }`}
                  size={20}
                />
              </button>
              {expandedMobileMenu === "general-health" && (
                <div className="pl-4 py-2 space-y-2 bg-gray-50">
                  <a href="/GeneralHealth" className="block py-2">
                    Bladder Control
                  </a>
                  <a href="/GeneralHealth" className="block py-2">
                    Body Building
                  </a>
                  <a href="/GeneralHealth" className="block py-2">
                    Immune Support
                  </a>
                  <a href="/GeneralHealth" className="block py-2">
                    Weight Management
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Beauty & Skin Care dropdown */}
            <div className="border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full py-2 text-lg"
                onClick={() => toggleMobileSubmenu("beauty-skin")}
              >
                <span>Beauty & Skin Care</span>
                <ChevronRight
                  className={`transition-transform duration-200 ${
                    expandedMobileMenu === "beauty-skin" ? "rotate-90" : ""
                  }`}
                  size={20}
                />
              </button>
              {expandedMobileMenu === "beauty-skin" && (
                <div className="pl-4 py-2 space-y-2 bg-gray-50">
                  <a href="/BeautyCare" className="block py-2">
                    Acne
                  </a>
                  <a href="/BeautyCare" className="block py-2">
                    Eye Cream
                  </a>
                  <a href="/BeautyCare" className="block py-2">
                    Anti-Aging
                  </a>
                  <a href="/BeautyCare" className="block py-2">
                    Moisturizers
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Subscribe button */}
            <button className="w-full bg-green-500 text-white px-4 py-3 rounded-full hover:bg-green-600 text-lg mt-4">
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* Search bar below navbar with reduced width */}
      {isSearchOpen && (
        <div
          ref={searchBarRef}
          className="w-full h-16 md:h-20 bg-white border-t border-b border-gray-200 shadow-md transition-all duration-300 py-2 md:py-4 flex justify-center"
          onMouseLeave={() => setIsSearchOpen(false)}
        >
          <div className="w-full max-w-4xl px-4 flex items-center">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for health topics, products, or reviews..."
                className="w-full h-10 p-2 md:p-3 pl-8 md:pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-lg"
              />
              <Search
                size={16}
                className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button className="ml-2 p-2 text-gray-500 hover:text-gray-700" onClick={() => setIsSearchOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

