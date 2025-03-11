import React from "react";

interface FoodItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  currency: string;
  rating?: number;
}

interface FoodMenuProps {
  items: FoodItem[];
}

const FoodMenu: React.FC<FoodMenuProps> = ({ items }) => {

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              {item.image ? (
                <img className="p-4 rounded-t-lg w-full h-48 object-cover" src={item.image} alt={item.name} />
              ) : (
                <div className="p-4 rounded-t-lg bg-gray-300 flex items-center justify-center h-48">
                  No Image
                </div>
              )}
            </a>
            <div className="px-4 pb-4">
              <a href="#">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {Array(4).fill(0).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                  ))}
                  <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{item.currency} {item.price}</span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default FoodMenu;
  