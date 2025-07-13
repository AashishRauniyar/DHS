'use client';

import { useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchArticles, deleteArticle } from '@/lib/store/articleSlice';

interface ArticleListProps {
  onEditArticle?: (id: string) => void;
}

export default function ArticleList({ onEditArticle }: ArticleListProps) {
  const dispatch = useAppDispatch();
  const { articles, status, error } = useAppSelector((state) => state.articles);
  
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);
  
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      dispatch(deleteArticle(id));
    }
  };
  
  const handleEdit = (id: string) => {
    if (onEditArticle) {
      onEditArticle(id);
    }
  };
  
  if (status === 'loading') {
    return <div className="text-center py-10">Loading articles...</div>;
  }
  
  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }
  
  if (articles.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="mb-4">No articles found. Create your first article!</p>
        <button
          onClick={() => onEditArticle && onEditArticle('new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Article
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Articles</h2>
        <button
          onClick={() => onEditArticle && onEditArticle('new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Article
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{article.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {article.updatedAt ? new Date(article.updatedAt).toLocaleDateString() : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(article.id)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="h-5 w-5 inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}