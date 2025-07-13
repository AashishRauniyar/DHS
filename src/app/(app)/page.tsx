import Featured from "@/components/Featured";
import FeaturedTopics from "@/components/FeaturedTopics";
import BestGuide from "@/components/Guide";
import HomeContent from "@/components/HomeContent";
import LatestReview from "@/components/LatestReview";
import MedicalExpertBoard from "@/components/MedicalExpert";
import ProductCategories from "@/components/ProductCategory";
import TopPicks from "@/components/TopPicks";
import React from "react";

export default function page() {
  return (
    <>
      <HomeContent />
      <ProductCategories />
      <Featured />
      <BestGuide />
      <TopPicks />
      <LatestReview />
      <MedicalExpertBoard />
      <FeaturedTopics />
    </>
  );
}
