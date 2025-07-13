"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import ArticleAdminForm from "@/components/ArticleAdminForm";
import ArticleList from "@/components/ArticleList";
import DashboardSection from "@/components/DashboardSection";

export default function AdminContent() {
  const [activeSection, setActiveSection] = useState("articles");
  const [selectedArticleId, setSelectedArticleId] = useState<
    string | undefined
  >(undefined);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={(section) => {
          setActiveSection(section);
          if (section !== "article") {
            setSelectedArticleId(undefined);
          }
        }}
      />
      <div className="lg:ml-64">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">
              {activeSection === "dashboard" && "Dashboard"}
              {activeSection === "articles" && "Article Content Management"}
              {activeSection === "article" && "Content Management"}
              {activeSection === "media" && "Media Library"}
              {activeSection === "users" && "User Management"}
              {activeSection === "analytics" && "Analytics"}
              {activeSection === "settings" && "Settings"}
            </h1>
          </div>
        </header>
        <main>
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "articles" && (
            <ArticleList
              onEditArticle={(id) => {
                setSelectedArticleId(id);
                setActiveSection("article");
              }}
            />
          )}
          {activeSection === "article" && (
            <ArticleAdminForm articleId={selectedArticleId} />
          )}
          {/* Other sections... */}
        </main>
      </div>
    </div>
  );
}
