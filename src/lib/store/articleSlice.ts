'use client';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the article type based on your Prisma schema
export interface Article {
  id: string;
  title: string;
  overview: string;
  description: string;
  howToTake: string;
  benefits: {
    title: string;
    description: string;
  }[];
  overallRating: number;
  ingredientsRating: number;
  valueRating: number;
  manufacturerRating: number;
  safetyRating: number;
  brandHighlights: string[];
  keyIngredients: string[];
  pros: string[];
  cons: string[];
  safety: string;
  effectiveness: string;
  pricing: {
    singleBottle: string;
    threeBottles: string;
    sixBottles: string;
  };
  manufacturerInfo: {
    name: string;
    location: string;
    description: string;
  };
  howItWorks: string;
  ingredients: {
    name: string;
    description: string;
    benefits: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  customerReviews: {
    name: string;
    location: string;
    rating: number;
    review: string;
  }[];
  conclusion: string;
  officialWebsite: string;
  productImage: string;
  ctaButtons: {
    text: string;
    url: string;
    type: string;
    position: string;
    description: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

// Define the initial state
interface ArticleState {
  articles: Article[];
  currentArticle: Article | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  currentArticle: null,
  status: 'idle',
  error: null,
};

// Create async thunks for API calls
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await fetch('/api/article');
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return response.json();
  }
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id: string) => {
    const response = await fetch(`/api/article?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return response.json();
  }
);

// Add this to your articleSlice.ts file
export const saveArticle = createAsyncThunk(
  'articles/saveArticle',
  async (articleData: Article, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to save article');
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id: string) => {
    const response = await fetch(`/api/article?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete article');
    }
    
    return id;
  }
);


// Create the article slice
const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentArticle: (state, action: PayloadAction<Article | null>) => {
      state.currentArticle = action.payload;
    },
    resetArticleState: (state) => {
      state.currentArticle = null;
      state.status = 'idle';
      state.error = null;
    },
    updateCurrentArticle: (state, action: PayloadAction<Partial<Article>>) => {
      if (state.currentArticle) {
        state.currentArticle = { ...state.currentArticle, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchArticles
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch articles';
      })
      
      // Handle fetchArticleById
      .addCase(fetchArticleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch article';
      })
      
      // Handle saveArticle
      .addCase(saveArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentArticle = action.payload;
        
        // Update the article in the list if it exists, otherwise add it
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        } else {
          state.articles.push(action.payload);
        }
      })
      .addCase(saveArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to save article';
      })
      
      // Handle deleteArticle
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = state.articles.filter(article => article.id !== action.payload);
        if (state.currentArticle?.id === action.payload) {
          state.currentArticle = null;
        }
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete article';
      });
  },
});

export const { setCurrentArticle, resetArticleState, updateCurrentArticle } = articleSlice.actions;

export default articleSlice.reducer;

