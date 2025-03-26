import { IconAdd, IconTrash } from '../icons/Icons';
import { useCart } from '../../contexts/CartContext';

interface CartProps {
  onCheckout: () => void;
}

export default function Cart({ onCheckout }: CartProps) {
  const { items, updateQuantity, subtotal, tax, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
        <p className="text-gray-500 text-center">Add some delicious items to your cart</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          
        </div>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* Item Image */}
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent text overflow */}
              <h3 className="text-gray-900 font-medium truncate">{item.name}</h3>
              <p className="text-[#B2151B] font-semibold">${item.price}</p>
            </div>

            {/* Add availability check */}
            {!item.isAvailable && (
              <span className="text-red-500 text-sm">Currently unavailable</span>
            )}

            {/* Only show quantity controls if item is available */}
            {item.isAvailable && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#B2151B] hover:text-[#B2151B]"
                >
                  {item.quantity === 1 ? (
                    <IconTrash size={14} className="text-red-500" />
                  ) : (
                    "-"
                  )}
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#B2151B] hover:text-[#B2151B]"
                >
                  <IconAdd size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Only enable checkout if all items are available */}
      <button
        onClick={onCheckout}
        disabled={items.some(item => !item.isAvailable)}
        className={`w-full mt-6 py-3 ${
          items.some(item => !item.isAvailable)
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-[#B2151B] hover:bg-orange-600'
        } text-white rounded-xl font-medium transition-colors`}
      >
        Proceed to Checkout
      </button>
    </div>
  );
} 