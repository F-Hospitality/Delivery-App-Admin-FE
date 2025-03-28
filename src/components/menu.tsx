import React from "react";

interface FoodItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isAvailable: boolean;
}

interface FoodMenuProps {
  items: FoodItem[];
  onAddToCart: (item: FoodItem) => void;
}

const FoodMenu: React.FC<FoodMenuProps> = ({ items, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 gap-3 px-2 md:grid-cols-3 lg:grid-cols-4 md:p-8 md:gap-6">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden">
          {item.image ? (
            <img 
              className="w-full h-28 object-cover" 
              src={item.image} 
              alt={item.name} 
            />
          ) : (
            <div className="w-full h-28 bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
          <div className="p-2">
            <h5 className="font-medium text-sm">{item.name}</h5>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-xs ml-1">{item.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({item.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex flex-col items-center mt-2">
              <span className="font-bold">${item.price}</span>
              <button 
                onClick={() => onAddToCart(item)}
                className="bg-[#B2151B] text-white text-xs px-3 py-1.5 rounded-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodMenu;
  