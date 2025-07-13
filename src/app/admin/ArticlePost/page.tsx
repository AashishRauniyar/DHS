"use client";

export const dynamic = 'force-dynamic';

import ArticlePostFullEditor from "@/components/AdminFullEditor";
import AdminSidebar from "@/components/AdminSidebar";
import ArticleAdminForm from "@/components/ArticleAdminForm";
import DashboardSection from "@/components/DashboardSection";
import { useState } from "react";
import ReduxProvider from "@/components/providers/ReduxProvider";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("articles");

  return (
    <ReduxProvider>
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50">
          <AdminSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-40">
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

          {/* Main Content Area */}
          <main className="flex-1 pb-8">
            <div className="mt-8">
              {activeSection === "dashboard" && <DashboardSection />}
              {activeSection === "articles" && <ArticleAdminForm />}
              {activeSection === "article" && <ArticlePostFullEditor />}
              {/* {activeSection === "media" && <MediaSection />}
              {activeSection === "users" && <UsersSection />}
              {activeSection === "analytics" && <AnalyticsSection />}
              {activeSection === "settings" && <SettingsSection />} */}
            </div>
          </main>
        </div>
      </div>
    </ReduxProvider>
  );
}
