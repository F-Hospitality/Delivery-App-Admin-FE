import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconSearch, IconStar } from '../../../components/icons/Icons';
import Cart from '../../../components/cart/Cart';
import { useCart } from '../../../contexts/CartContext';
import CustomerLayout from '../../../components/customer-layout';
import FoodMenu from '../../../components/menu';
import { ChevronDown } from 'lucide-react';

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

export default function Menu() {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Placeholder data - in a real app, this would come from an API
  const categories = [
    { id: 1, name: 'All', active: selectedCategory === 'All' },
    { id: 2, name: 'Pizza', active: selectedCategory === 'Pizza' },
    { id: 3, name: 'Burger', active: selectedCategory === 'Burger' },
    { id: 4, name: 'Drinks', active: selectedCategory === 'Drinks' },
    { id: 5, name: 'Dessert', active: selectedCategory === 'Dessert' },
  ];

  const foodItems: FoodItem[] = [
    {
      id: 1,
      name: 'Pepperoni Pizza',
      price: 12.99,
      rating: 4.5,
      reviews: 25,
      image: '/images/pepperoni-pizza.jpg',
      category: 'Pizza',
      isAvailable: true,
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      price: 10.99,
      rating: 4.3,
      reviews: 18,
      image: '/images/margherita-pizza.jpg',
      category: 'Pizza',
      isAvailable: true,
    },
    {
      id: 3,
      name: 'Cheeseburger',
      price: 8.99,
      rating: 4.4,
      reviews: 32,
      image: '/images/cheeseburger.jpg',
      category: 'Burger',
      isAvailable: true,
    },
    {
      id: 4,
      name: 'Chocolate Milkshake',
      price: 4.99,
      rating: 4.7,
      reviews: 15,
      image: '/images/milkshake.jpg',
      category: 'Drinks',
      isAvailable: true,
    },
  ];

  const handleCheckout = () => {
    router.push('/customer/checkout');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredFoodItems = foodItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <CustomerLayout>
      <div className="flex flex-col md:p-10  px-4">
        <div className="px-4 pb-4">
          <div className="flex items-center my-5 justify-center w-full">
            <img src="/hospitality.png" alt="logo" className="w-40 h-20" />
          </div>
          <h1 className="text-xl font-semibold mb-2">Good morning, David!</h1>
          <p className="text-gray-600 mb-4">What would you like to eat today?</p>
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search food..."
              className="w-full px-4 py-2 rounded-md border bg-gray-50"
            />
          </div>
        </div>

        <div className="mb-4 px-4">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-[#B2151B] text-white rounded-lg"
            >
              <span>{selectedCategory}</span>
              <ChevronDown size={20} />
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategorySelect(category.name);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 pb-24">
          <FoodMenu 
            items={filteredFoodItems} 
            onAddToCart={addItem}
          />
        </div>

        <div className="hidden lg:block lg:w-[400px] lg:flex-shrink-0">
          <div className="lg:sticky lg:top-8">
            <Cart onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
} 