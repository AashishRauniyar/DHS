/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
     useState,
     useEffect,
     useMemo,
     type JSXElementConstructor,
     type Key,
     type ReactElement,
     type ReactNode,
     type ReactPortal,
} from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import {
     AlertCircle,
     User,
     Star,
     CheckCircle,
     XCircle,
     ChevronRight,
     Award,
     Shield,
} from "lucide-react";
import { FAQBlock } from "./article-blocks/faq-block";

interface ArticleWrapperProps {
     slug?: string;
}

export function ArticleWrapper({ slug: propSlug }: ArticleWrapperProps) {
     const params = useParams();
     const slug = propSlug || (params?.slug as string);

     const [article, setArticle] = useState<any>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     // Fetch article data
     useEffect(() => {
          const fetchArticle = async () => {
               if (!slug) {
                    setError("No article slug provided");
                    setLoading(false);
                    return;
               }

               try {
                    setLoading(true);
                    setError(null);

                    const response = await fetch(`/api/articles/${slug}`);

                    if (!response.ok) {
                         if (response.status === 404) {
                              throw new Error("Article not found");
                         }
                         throw new Error(
                              `Failed to load article: ${response.status} ${response.statusText}`
                         );
                    }

                    const data = await response.json();
                    console.log("Fetched article data:", data);

                    if (data.success && data.article) {
                         setArticle(data.article);
                    } else {
                         throw new Error("Invalid article data received");
                    }
               } catch (err) {
                    console.error("Error fetching article:", err);
                    setError(
                         err instanceof Error
                              ? err.message
                              : "Failed to load article"
                    );
               } finally {
                    setLoading(false);
               }
          };

          fetchArticle();
     }, [slug]);

     // Flatten sections into blocks for easier processing
     const allBlocks = useMemo(() => {
          if (!article?.sections) return [];

          return article.sections.flatMap((section: any) =>
               section.blocks.map((block: any) => ({
                    ...block,
                    sectionTitle: section.title,
                    sectionOrder: section.order,
               }))
          );
     }, [article]);

     // Organize content sections from the new section-based structure
     const organizedContent = useMemo(() => {
          if (!article?.sections) return [];

          return article.sections
               .sort((a: any, b: any) => a.order - b.order)
               .map((section: any) => ({
                    id: section.id,
                    title: section.title,
                    order: section.order,
                    blocks: section.blocks.sort(
                         (a: any, b: any) => a.order - b.order
                    ),
                    content: section.blocks.filter(
                         (block: any) => block.type === "paragraph"
                    ),
               }));
     }, [article]);

     // Extract special blocks from all sections
     const specialBlocks = useMemo(() => {
          if (!allBlocks.length) return {};

          return {
               rating: allBlocks.find((block: any) => block.type === "rating"),
               prosCons: allBlocks.find(
                    (block: any) => block.type === "pros-cons"
               ),
               ingredients: allBlocks.find(
                    (block: any) => block.type === "ingredients"
               ),
               specifications: allBlocks.find(
                    (block: any) => block.type === "specifications"
               ),
               faq: allBlocks.find((block: any) => block.type === "faq"),
               cta: allBlocks.filter((block: any) => block.type === "cta"),
          };
     }, [allBlocks]);

     // Helper function to render stars
     const renderStars = (rating: number) => {
          const fullStars = Math.floor(rating);
          const hasHalfStar = rating % 1 >= 0.5;

          return (
               <div className="flex items-center">
                    {[...Array(fullStars)].map((_, i) => (
                         <Star
                              key={i}
                              className="h-5 w-5 fill-yellow-400 text-yellow-400"
                         />
                    ))}
                    {hasHalfStar && (
                         <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    )}
                    {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
                         (_, i) => (
                              <Star
                                   key={`empty-${i}`}
                                   className="h-5 w-5 text-gray-300"
                              />
                         )
                    )}
                    <span className="ml-2 font-semibold">
                         {rating.toFixed(1)}
                    </span>
               </div>
          );
     };

     // Get section by title (case insensitive)
     const getSectionByTitle = (titlePattern: string) => {
          return organizedContent.find((section: { title: string }) =>
               section.title.toLowerCase().includes(titlePattern.toLowerCase())
          );
     };

     // Get content from a specific section
     const getSectionContent = (titlePattern: string) => {
          const section = getSectionByTitle(titlePattern);
          return section?.content || [];
     };

     if (loading) {
          return (
               <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="space-y-6">
                         <Skeleton className="h-8 w-3/4" />
                         <Skeleton className="aspect-video w-full rounded-lg" />
                         <div className="space-y-4">
                              {[...Array(5)].map((_, i) => (
                                   <div key={i} className="space-y-3">
                                        <Skeleton className="h-6 w-1/2" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          );
     }

     if (error) {
          return (
               <div className="max-w-4xl mx-auto px-4 py-8">
                    <Alert variant="destructive">
                         <AlertCircle className="h-4 w-4" />
                         <AlertDescription>{error}</AlertDescription>
                    </Alert>
               </div>
          );
     }

     if (!article) {
          return (
               <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-600">
                         Article not found
                    </h1>
               </div>
          );
     }

     return (
          <article className="max-w-6xl mx-auto bg-white p-4 md:p-8 shadow-lg rounded-lg">
               {/* Article Header */}
               <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center text-gray-900 leading-tight">
                         {article.title}
                    </h1>
                    <div className="flex justify-center items-center mb-2">
                         {renderStars(
                              specialBlocks.rating?.overallRating || 4.5
                         )}
                    </div>
                    {article.imageUrl && (
                         <div className="flex justify-center mb-4">
                              <Image
                                   src={article.imageUrl}
                                   alt={article.title}
                                   width={360}
                                   height={360}
                                   className="mx-auto rounded"
                                   priority
                              />
                         </div>
                    )}
                    {/* BUY NOW GIF */}
                    <div className="flex justify-center mb-4">
                         <img
                              src="/buy-now.gif"
                              alt="Buy Now"
                              className="w-128 h-auto"
                              // style={{ maxWidth: 200 }}
                         />
                    </div>
                    <p className="text-gray-700 mb-2 text-center text-lg">
                         {article.metaDescription}
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500 mt-2">
                         <span>
                              By <strong>{article.user?.name}</strong>
                         </span>
                         <span>•</span>
                         <span>Reviewed by Dr. Jane Doe, M.D., Ph.D.</span>
                         <span>•</span>
                         <span>
                              Updated:{" "}
                              {new Date(article.updatedAt).toLocaleDateString()}
                         </span>
                         <span>•</span>
                         <span>{article.readingTime} min read</span>
                    </div>
               </header>

               <main>
                    {/* Product Comparison Table */}
                    {specialBlocks.specifications && (
                         <section
                              className="mb-8"
                              aria-label="Product Comparison"
                         >
                              <h2 className="text-2xl font-bold mb-3">
                                   Product Comparison
                              </h2>
                              <div className="overflow-x-auto rounded-lg border border-gray-200">
                                   <table className="min-w-full text-sm">
                                        <thead>
                                             <tr className="bg-gray-50">
                                                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                                       Product
                                                  </th>
                                                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                                       Price
                                                  </th>
                                                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                                       Rating
                                                  </th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {specialBlocks.specifications.specifications?.map(
                                                  (spec: any, idx: number) => (
                                                       <tr
                                                            key={spec.id}
                                                            className={
                                                                 idx % 2 === 0
                                                                      ? "bg-white"
                                                                      : "bg-gray-50"
                                                            }
                                                       >
                                                            <td className="px-4 py-2 border-t border-gray-100">
                                                                 {spec.name}
                                                            </td>
                                                            <td className="px-4 py-2 border-t border-gray-100">
                                                                 {spec.value}
                                                            </td>
                                                            <td className="px-4 py-2 border-t border-gray-100">
                                                                 {spec.rating ||
                                                                      "-"}
                                                            </td>
                                                       </tr>
                                                  )
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                         </section>
                    )}

                    {/* Sectioned Content */}
                    {organizedContent.map((section: any) => (
                         <section
                              key={section.id}
                              className="mb-8"
                              id={`section-${section.id}`}
                         >
                              <h2 className="text-2xl font-bold mb-2 border-b pb-1">
                                   {section.title}
                              </h2>
                              <div className="prose max-w-none text-left">
                                   {section.blocks.map((block: any) => {
                                        if (block.type === "paragraph") {
                                             return (
                                                  <p key={block.id}>
                                                       {block.content}
                                                  </p>
                                             );
                                        }
                                        if (block.type === "heading") {
                                             return (
                                                  <h3
                                                       key={block.id}
                                                       className="text-xl font-semibold mb-3 mt-6"
                                                  >
                                                       {block.content}
                                                  </h3>
                                             );
                                        }
                                        if (block.type === "bullet-list") {
                                             return (
                                                  <ul
                                                       key={block.id}
                                                       className="list-disc pl-5"
                                                  >
                                                       {block.bulletPoints?.map(
                                                            (bp: any) => (
                                                                 <li
                                                                      key={
                                                                           bp.id
                                                                      }
                                                                 >
                                                                      {
                                                                           bp.content
                                                                      }
                                                                 </li>
                                                            )
                                                       )}
                                                  </ul>
                                             );
                                        }
                                        // ... handle other block types as needed ...
                                        return null;
                                   })}
                              </div>
                         </section>
                    ))}

                    {/* Pros & Cons Table */}
                    <section className="mb-8" aria-label="Pros and Cons">
                         <h2 className="text-2xl font-bold mb-2">
                              Pros and Cons
                         </h2>
                         <div className="flex flex-col md:flex-row gap-4 rounded-lg overflow-hidden border border-gray-200">
                              {/* Pros */}
                              <div className="flex-1 bg-green-50 p-4">
                                   <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                                        <CheckCircle
                                             className="inline-block text-green-500"
                                             size={20}
                                        />
                                        Pros
                                   </h3>
                                   <ul className="space-y-2">
                                        {specialBlocks.prosCons.pros?.length ? (
                                             specialBlocks.prosCons.pros.map(
                                                  (pro: any) => (
                                                       <li
                                                            key={pro.id}
                                                            className="flex items-start gap-2"
                                                       >
                                                            <CheckCircle
                                                                 className="text-green-500 mt-1"
                                                                 size={16}
                                                            />
                                                            <span>
                                                                 {pro.content}
                                                            </span>
                                                       </li>
                                                  )
                                             )
                                        ) : (
                                             <li className="text-gray-400">
                                                  No pros listed.
                                             </li>
                                        )}
                                   </ul>
                              </div>
                              {/* Cons */}
                              <div className="flex-1 bg-red-50 p-4 border-t md:border-t-0 md:border-l border-gray-200">
                                   <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                                        <XCircle
                                             className="inline-block text-red-500"
                                             size={20}
                                        />
                                        Cons
                                   </h3>
                                   <ul className="space-y-2">
                                        {specialBlocks.prosCons.cons?.length ? (
                                             specialBlocks.prosCons.cons.map(
                                                  (con: any) => (
                                                       <li
                                                            key={con.id}
                                                            className="flex items-start gap-2"
                                                       >
                                                            <XCircle
                                                                 className="text-red-500 mt-1"
                                                                 size={16}
                                                            />
                                                            <span>
                                                                 {con.content}
                                                            </span>
                                                       </li>
                                                  )
                                             )
                                        ) : (
                                             <li className="text-gray-400">
                                                  No cons listed.
                                             </li>
                                        )}
                                   </ul>
                              </div>
                         </div>
                    </section>

                    {/* FAQ Section */}
                    {specialBlocks.faq && (
                         <section
                              className="mb-8"
                              aria-label="Frequently Asked Questions"
                         >
                              <h2 className="text-2xl font-bold mb-2">
                                   Frequently Asked Questions
                              </h2>
                              <FAQBlock block={specialBlocks.faq} />
                         </section>
                    )}
               </main>

               {/* Author Box */}
               <footer className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center bg-gray-100 rounded-lg p-4 mb-8">
                         <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                              <User className="h-8 w-8 text-gray-600" />
                         </div>
                         <div>
                              <div className="font-bold">
                                   {article.user?.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                   Reviewed by Dr. Jane Doe, M.D., Ph.D.
                              </div>
                         </div>
                    </div>
                    <div className="text-center">
                         <p className="text-gray-600">
                              Last updated:{" "}
                              {formatDistanceToNow(new Date(article.updatedAt))}{" "}
                              ago
                         </p>
                         <p className="text-sm text-gray-500 mt-2">
                              {article.wordCount} words • {article.readingTime}{" "}
                              minute read • {organizedContent.length} sections
                         </p>
                    </div>
               </footer>

               {/* Comment Form */}
               <section
                    className="bg-gray-50 p-4 rounded-lg mt-8"
                    aria-label="Leave a Comment"
               >
                    <h2 className="font-bold mb-2 text-lg">Leave a Comment</h2>
                    <form>
                         <label
                              htmlFor="comment"
                              className="block text-sm font-medium mb-1"
                         >
                              Comment
                         </label>
                         <textarea
                              id="comment"
                              className="w-full border rounded p-2 mb-2"
                              rows={3}
                              placeholder="Your comment..."
                         />
                         <div className="flex gap-2 mb-2">
                              <div className="flex-1">
                                   <label
                                        htmlFor="name"
                                        className="block text-sm font-medium mb-1"
                                   >
                                        Name
                                   </label>
                                   <input
                                        id="name"
                                        className="border rounded p-1 w-full"
                                        placeholder="Name"
                                   />
                              </div>
                              <div className="flex-1">
                                   <label
                                        htmlFor="email"
                                        className="block text-sm font-medium mb-1"
                                   >
                                        Email
                                   </label>
                                   <input
                                        id="email"
                                        className="border rounded p-1 w-full"
                                        placeholder="Email"
                                        type="email"
                                   />
                              </div>
                         </div>
                         <Button
                              className="bg-blue-600 text-white px-4 py-2 rounded"
                              type="submit"
                         >
                              Submit
                         </Button>
                    </form>
               </section>
          </article>
     );
}
