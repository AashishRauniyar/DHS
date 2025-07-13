import ArticleListing from "@/components/ArticleListing";
import React, { Suspense } from "react";

export default function ArticleListingPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading articles...</div>}>
        <ArticleListing />
      </Suspense>
    </div>
  );
}
