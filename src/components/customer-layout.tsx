import React, { useState } from 'react';
import Link from 'next/link';
import { IconHome, IconPizza, IconHistory, IconSettings, IconLogout, IconShoppingCart } from '../components/icons/Icons';
import { useCart } from '../contexts/CartContext';
import Cart from './cart/Cart';
import { useRouter } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function CustomerLayout({ children }: MainLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
    const { items } = useCart();
    const router = useRouter();
  return (
    <div className="flex flex-col h-screen bg-gray-100">     
     <button className='bg-[#B2151B] text-white px-4 py-2 rounded-md mb-8 cursor-pointer' onClick={() => router.back()}>Back</button>


      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>
            <Cart onCheckout={() => {
              setIsCartOpen(false);
              // Add your checkout navigation here
            }} />
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg h-16 flex items-center justify-around">
       
        <Link href="/customer/orders" className="p-3 text-gray-400 hover:text-[#B2151B] flex flex-col items-center">
          <IconHistory size={24} />
          <span className="text-xs mt-1">Orders</span>
        </Link>
      
        {/* Cart Button with Badge */}
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="p-3 text-gray-400 hover:text-[#B2151B] flex flex-col items-center relative"
        >
          <IconShoppingCart size={24} />
          {items.length > 0 && (
            <span className="absolute top-2 right-2 bg-[#B2151B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </button>
        <Link href="/customer/settings" className="p-3 text-gray-400 hover:text-[#B2151B] flex flex-col items-center">
          <IconSettings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
        <button className="p-3 text-gray-400 hover:text-[#B2151B] flex flex-col items-center">
          <IconLogout size={24} />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </nav>
    </div>
  );
} 