import React, { useState } from 'react';
import Link from 'next/link';
import { IconHome, IconPizza, IconHistory, IconSettings, IconLogout, IconShoppingCart, IconMenu } from '../components/icons/Icons';
import { useCart } from '../contexts/CartContext';
import Cart from './cart/Cart';
import { useRouter, usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function CustomerLayout({ children }: MainLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const isMenuPage = pathname === '/customer/menu';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar for larger screens */}
      <aside className="hidden lg:flex flex-col w-20 bg-white shadow-lg py-8 fixed h-full">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
       
          {/* Navigation Items */}
          <nav className="flex flex-col items-center space-y-6 flex-1">
          <Link href="/customer/menu" className="p-3 rounded-xl hover:bg-orange-50 text-gray-400 hover:text-[#B2151B]">
              <IconMenu size={24} />
            </Link>
            <Link href="/customer/orders" className="p-3 rounded-xl hover:bg-orange-50 text-gray-400 hover:text-[#B2151B]">
              <IconHistory size={24} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-3 rounded-xl hover:bg-orange-50 text-gray-400 hover:text-[#B2151B] relative"
            >
              <IconShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#B2151B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            <Link href="/customer/settings" className="p-3 rounded-xl hover:bg-orange-50 text-gray-400 hover:text-[#B2151B]">
              <IconSettings size={24} />
            </Link>
          </nav>

          {/* Logout */}
          <button className="p-3 rounded-xl hover:bg-orange-50 text-gray-400 hover:text-[#B2151B]">
            <IconLogout size={24} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-20 lg:mr-[400px]">
        <div className="p-5">
          <button className={`bg-[#B2151B] text-white px-6 py-2 rounded-md cursor-pointer ${isMenuPage ? 'hidden' : ''}`} onClick={() => router.back()}>
            Back
          </button>
        </div>

        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          {children}
        </main>
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  ✕
                </button>
              </div>
              <Cart onCheckout={() => {
                setIsCartOpen(false);
                router.push('/customer/checkout');
              }} />
            </div>
          </div>
        )}

        <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-white shadow-lg h-16 flex items-center justify-around">
          
        <Link href="/customer/menu" className="p-3 text-gray-400 hover:text-[#B2151B] flex flex-col items-center">
            <IconMenu size={24} />
            <span className="text-xs mt-1">Orders</span>
          </Link>
          
          <Link href="/customer/orders" className="p-3 text-gray-400 hover:text-[#B2151B] flex flex-col items-center">
            <IconHistory size={24} />
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="p-3 text-gray-400 hover:text-[#B2151B] flex flex-col items-center relative">
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

      {/* Desktop Right Sidebar Cart */}
      <aside className="hidden lg:block fixed right-0 top-0 w-[400px] h-full bg-white shadow-lg p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Your Cart</h2>
        <Cart onCheckout={() => router.push('/customer/checkout')} />
      </aside>
    </div>
  );
} 