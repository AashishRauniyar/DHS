'use client';

import { Article } from "@/lib/store/articleSlice";

interface CTASectionProps {
  formData: Article;
  setFormData: React.Dispatch<React.SetStateAction<Article>>;
}

export default function CTASection({ formData, setFormData }: CTASectionProps) {
  // This component would handle the CTA section of the form
  // For now, we'll just return the content that's already in the main form
  
  return (
    <div>
      <h3 className="text-lg font-medium">Call to Action Buttons.</h3>
      <p className="text-sm text-gray-500">
        Configure CTA buttons for the article
      </p>
      
      {/* CTA content would go here */}
      <p className="text-sm text-gray-500">
        You can customize the appearance and behavior of your CTA buttons here.
      </p>
      
      <div className="mt-4">
        {formData.ctaButtons.map((button, index) => (
          <div key={index} className="border p-4 rounded-md relative mb-4">
            <button
              type="button"
              className="absolute top-2 right-2 text-red-500"
              onClick={() => {
                const updatedButtons = [...formData.ctaButtons];
                updatedButtons.splice(index, 1);
                setFormData({
                  ...formData,
                  ctaButtons: updatedButtons,
                });
              }}
              disabled={formData.ctaButtons.length <= 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={`ctaButtons.${index}.text`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Button Text
                </label>
                <input
                  type="text"
                  value={button.text}
                  onChange={(e) => {
                    const updatedButtons = [...formData.ctaButtons];
                    updatedButtons[index] = {
                      ...updatedButtons[index],
                      text: e.target.value,
                    };
                    setFormData({
                      ...formData,
                      ctaButtons: updatedButtons,
                    });
                  }}
                  placeholder="e.g. Buy Now"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor={`ctaButtons.${index}.url`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Button URL
                </label>
                <input
                  type="text"
                  value={button.url}
                  onChange={(e) => {
                    const updatedButtons = [...formData.ctaButtons];
                    updatedButtons[index] = {
                      ...updatedButtons[index],
                      url: e.target.value,
                    };
                    setFormData({
                      ...formData,
                      ctaButtons: updatedButtons,
                    });
                  }}
                  placeholder="https://example.com/buy"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => {
            setFormData({
              ...formData,
              ctaButtons: [
                ...formData.ctaButtons,
                {
                  text: "Buy Now",
                  url: "",
                  type: "primary",
                  position: "bottom",
                  description: "",
                },
              ],
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Add CTA Button
        </button>
      </div>
    </div>
  );
}