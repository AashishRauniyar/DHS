/* eslint-disable @typescript-eslint/no-explicit-any */
// Core Article Types
export interface User {
  id: string
  email: string
  name: string
  role: "ADMINISTRATOR" | "EDITOR"
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  _count?: {
    articles: number
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  parent?: Category
  children: Category[]
  isActive: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
  _count?: {
    articles: number
  }
}

export interface Section {
  id: string
  title: string
  order: number
  createdAt: Date
  updatedAt: Date
  articleId: string
  blocks: Block[]
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  imageUrl?: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  publishDate: Date
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
  categoryId?: string
  category?: Category
  sections: Section[] // Changed from blocks to sections

  // SEO fields
  metaDescription?: string
  focusKeyword?: string
  keywords: KeywordVariation[] // Updated to use KeywordVariation[] consistently

  // Content structure
  content?: ArticleContent
  seo?: ArticleSEO
  product?: ProductReview

  // Reading statistics
  wordCount?: number
  readingTime?: number
}

export interface ArticleContent {
  introduction?: string
  overview?: string
  conclusion?: string
  sections: ContentSection[]
  wordCount?: number
  readingTime?: number
}

export interface ContentSection {
  id: string
  type: "heading" | "paragraph" | "image" | "list" | "quote" | "cta"
  content: string
  level?: number
  order: number
  metadata?: Record<string, any>
}

export interface ArticleSEO {
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  seoScore?: number
  readabilityScore?: number
  keywordDensity?: number
  keywords: KeywordVariation[] // Updated to use KeywordVariation[]
}

export interface Keyword {
  id: string
  keyword: string
  searchVolume?: number
  difficulty?: "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN"
  intent?: "COMMERCIAL" | "INFORMATIONAL" | "NAVIGATIONAL" | "TRANSACTIONAL"
  isPrimary: boolean
}

// Block Types
export interface Block {
  id: string
  type: BlockType
  content?: string
  order: number
  sectionId: string // Changed from articleId to sectionId

  // Heading specific
  level?: 1 | 2 | 3

  // List specific
  listType?: "ordered" | "unordered"

  // Image specific
  imageUrl?: string
  imageCaption?: string
  imageAlt?: string
  imageAttribution?: string

  // Code specific
  language?: string

  // CTA specific
  ctaText?: string
  ctaLink?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  backgroundColor?: string

  // Product specific
  productName?: string
  overallRating?: number
  ingredientsIntroduction?: string
  howToUse?: string
  price?: string
  verdict?: string
  author?: string
  reviewDate?: string
  medicallyReviewed?: boolean
  factChecked?: boolean

  // Related data arrays
  pros: Pros[]
  cons: Cons[]
  ingredients: Ingredient[]
  highlights: Highlight[]
  customFields: CustomField[]
  ingredientsList: IngredientItem[]
  bulletPoints: BulletPoint[]
  faqItems: FAQItem[]
  specifications: Specification[]
  ratings?: Rating
}

export type BlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "list"
  | "quote"
  | "code"
  | "cta"
  | "rating"
  | "pros-cons"
  | "ingredients"
  | "bullet-list"
  | "faq"
  | "specifications"

// Rating Types
export interface Rating {
  id: string
  blockId: string
  ingredients?: number
  value?: number
  manufacturer?: number
  safety?: number
  effectiveness?: number
}

// Content Item Types (unchanged)
export interface Pros {
  id: string
  content: string
  order: number
  blockId: string
}

export interface Cons {
  id: string
  content: string
  order: number
  blockId: string
}

export interface Ingredient {
  id: string
  content: string
  order: number
  blockId: string
}

export interface Highlight {
  id: string
  content: string
  order: number
  blockId: string
}

export interface BulletPoint {
  id: string
  content: string
  order: number
  blockId: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  order: number
  blockId: string
}

export interface Specification {
  id: string
  name: string
  value: string
  order: number
  blockId: string
}

export interface CustomField {
  id: string
  name: string
  value: string
  blockId: string
}

export interface IngredientItem {
  id: string
  number: number
  name: string
  imageUrl: string
  description: string
  benefits?: string
  dosage?: string
  studyYear?: string
  studySource?: string
  studyDescription?: string
  blockId: string
}

// Product Review Types (unchanged)
export interface ProductReview {
  productName: string
  brand?: string
  price?: string
  officialWebsite?: string
  overallRating?: number
  medicallyReviewed: boolean
  factChecked: boolean

  ratings: Record<string, number>
  highlights: string[]
  pros: string[]
  cons: string[]
  ingredients?: ProductIngredients
  pricing?: ProductPricing
  faqs: ProductFAQ[]
  customerReviews: CustomerReview[]
}

export interface ProductIngredients {
  introduction?: string
  list: IngredientDetail[]
}

export interface IngredientDetail {
  id: string
  name: string
  description: string
  benefits?: string
  imageUrl?: string
  dosage?: string
  studyYear?: string
  studySource?: string
  studyDescription?: string
  order: number
}

export interface ProductPricing {
  singleBottle?: string
  threeBottles?: string
  sixBottles?: string
  currency: string
  discounts?: any[]
  shippingInfo?: string
}

export interface ProductFAQ {
  id: string
  question: string
  answer: string
  order: number
}

export interface CustomerReview {
  id: string
  customerName: string
  location?: string
  rating: number
  reviewText: string
  verified: boolean
  createdAt: string
}

// SEO-related types - Updated for consistency
export interface KeywordVariation {
  id: string
  keyword: string
  searchVolume?: number
  difficulty?: "Low" | "Medium" | "High" | "Unknown"
  intent?: "Commercial" | "Informational" | "Navigational" | "Custom"
  isPrimary?: boolean
}

export interface ContentSuggestions {
  introduction: string[]
  benefits: string[]
  ingredients: string[]
  conclusion: string[]
  [key: string]: string[]
}

export interface SEOData {
  keywords: KeywordVariation[]
  titleSuggestions: string[]
  contentSuggestions: ContentSuggestions
  metaDescription?: string
  focusKeyword?: string
}

// Image Upload Types (unchanged)
export interface ImageUploadData {
  url: string
  publicId: string
  variants: Record<string, string>
  metadata?: {
    width: number
    height: number
    format: string
    folder_type?: string
    preset?: string
    bytes?: number
    asset_id?: string
    version?: number
    created_at?: string
    tags?: string[]
  }
}

export interface CloudinaryResponse {
  success: boolean
  url: string
  publicId: string
  folder: string
  preset: string
  variants: Record<string, string>
  eager?: any[]
  metadata: {
    width: number
    height: number
    format: string
    bytes: number
    asset_id: string
    version: number
    created_at: string
    tags: string[]
    folder_type: string
  }
}

// Component prop types - Updated for sections
export interface KeywordVariationToolProps {
  productName: string
  onKeywordsChange: (keywords: KeywordVariation[]) => void
  onTitleSuggestions: (titles: string[]) => void
  onContentSuggestions: (suggestions: ContentSuggestions) => void
}

export interface SEOSuggestionsProps {
  titleSuggestions: string[]
  contentSuggestions: ContentSuggestions
  onTitleSelect: (title: string) => void
  onContentInsert: (section: string, content: string) => void
}

export interface BlockEditorProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
  sectionId?: string // Changed from articleId to sectionId
}

export interface SectionEditorProps {
  sections: Section[] // Changed from Block[][] to Section[]
  onChange: (sections: Section[]) => void
}

export interface ImageBlockProps {
  block: Block
  onChange: (updates: Partial<Block>) => void
}

export interface ImageUploaderProps {
  onUpload: (imageData: ImageUploadData) => void
  currentImage?: string
  preset?: string
  className?: string
}

// API Response Types - Updated for sections
export interface ArticleListResponse {
  success: boolean
  articles: Article[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface CreateArticleRequest {
  title: string
  excerpt?: string
  imageUrl?: string
  userId: string
  categoryId?: string
  sections: CreateSectionRequest[] // Changed from blocks to sections
  metaDescription?: string
  focusKeyword?: string
  keywords?: KeywordVariation[] // Updated to use KeywordVariation[]
  status?: "DRAFT" | "PUBLISHED"
}

export interface CreateSectionRequest {
  title: string
  order: number
  blocks: Block[]
}

export interface CreateArticleResponse {
  success: boolean
  article: Article
  message?: string
}

// Validation Types (unchanged)
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface FormErrors {
  [key: string]: string
}

// Utility Types - Updated
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type BlockUpdate = Partial<Block>

export type SectionUpdate = Section[] // Changed from Block[][]

// Editor State Types (unchanged)
export interface EditorState {
  activeBlock: string | null
  activeSection: string
  isGenerating: boolean
  isDirty: boolean
  hasUnsavedChanges: boolean
  isSubmitting: boolean
  showSetupWizard: boolean
  previewMode: boolean
}

// Cloudinary Types (unchanged)
export type CloudinaryPreset = "article" | "ingredient" | "hero" | "thumbnail" | "default"

export interface CloudinaryConfig {
  cloud_name: string
  api_key: string
  api_secret?: string
}

export interface TransformationPreset {
  quality: "auto"
  fetch_format: "auto"
  width?: number
  height?: number
  crop?: "fill" | "scale" | "fit" | "limit" | "mfit" | "mpad"
  gravity?: "auto" | "center" | "face" | "faces"
  background?: string
}
