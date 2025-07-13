"use client"

import { useState } from "react"
import { Menu, X, FileText, Grid, ImageIcon, Settings, Users, BarChart2, HelpCircle, LogOut } from "lucide-react"

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  // Remove the internal state for activeSection since it's now passed as a prop
  // const [activeSection, setActiveSection] = useState("articles");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Grid className="w-5 h-5" /> },
    { id: "articles", label: "Post Articles", icon: <FileText className="w-5 h-5" /> },
    { id: "article", label: "Post Articles approach 2", icon: <FileText className="w-5 h-5" /> },
    { id: "media", label: "Media", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "users", label: "Users", icon: <Users className="w-5 h-5" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeSection === item.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className="space-y-2">
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900">
                <HelpCircle className="w-5 h-5" />
                <span className="ml-3">Help</span>
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50">
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  )
}
