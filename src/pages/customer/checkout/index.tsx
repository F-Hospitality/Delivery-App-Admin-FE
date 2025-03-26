'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../contexts/CartContext';
import CustomerLayout from '@/components/customer-layout';

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentMethod {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

export default function Checkout() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<'delivery' | 'payment' | 'confirmation'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  // Redirect to home if cart is empty
  if (items.length === 0) {
    router.push('/');
    return null;
  }

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
  };

  const handleConfirmOrder = () => {
    // Here you would typically:
    // 1. Process the payment
    // 2. Create the order in your backend
    // 3. Clear the cart
    // 4. Redirect to order confirmation
    clearCart();
    router.push('/orders');
  };

  return (
    <CustomerLayout>
    <div className="max-w-2xl mx-auto py-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 'delivery' ? 'bg-[#B2151B] text-white' : 'bg-[#B2151B] text-white'
          }`}>
            1
          </div>
          <div className="ml-2 font-medium text-gray-900">Delivery</div>
        </div>
        <div className="h-0.5 flex-1 mx-4 bg-gray-200">
          <div className={`h-full bg-[#B2151B] transition-all ${
            step !== 'delivery' ? 'w-full' : 'w-0'
          }`} />
        </div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 'payment' ? 'bg-[#B2151B] text-white' : step === 'confirmation' ? 'bg-[#B2151B] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
          <div className="ml-2 font-medium text-gray-900">Payment</div>
        </div>
        <div className="h-0.5 flex-1 mx-4 bg-gray-200">
          <div className={`h-full bg-[#B2151B] transition-all ${
            step === 'confirmation' ? 'w-full' : 'w-0'
          }`} />
        </div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step === 'confirmation' ? 'bg-[#B2151B] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            3
          </div>
          <div className="ml-2 font-medium text-gray-900">Confirmation</div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {step === 'delivery' && (
          <form onSubmit={handleDeliverySubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                value={deliveryAddress.street}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border--[#B2151B] focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={deliveryAddress.city}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border--[#B2151B] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={deliveryAddress.state}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border--[#B2151B] focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={deliveryAddress.zipCode}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, zipCode: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border--[#B2151B] focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#B2151B] text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
            >
              Continue to Payment
            </button>
          </form>
        )}

        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={paymentMethod.cardNumber}
                onChange={(e) => setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border--[#B2151B] focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentMethod.expiryDate}
                  onChange={(e) => setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border--[#B2151B] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={paymentMethod.cvv}
                  onChange={(e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border--[#B2151B] focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name on Card
              </label>
              <input
                type="text"
                id="name"
                value={paymentMethod.name}
                onChange={(e) => setPaymentMethod({ ...paymentMethod, name: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border--[#B2151B] focus:outline-none"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('delivery')}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-[#B2151B] text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
              >
                Review Order
              </button>
            </div>
          </form>
        )}

        {step === 'confirmation' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-900 mb-2">Delivery Address</h3>
                <p className="text-gray-600">
                  {deliveryAddress.street}<br />
                  {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                <p className="text-gray-600">
                  Card ending in {paymentMethod.cardNumber.slice(-4)}<br />
                  {paymentMethod.name}
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="text-gray-900 font-bold text-xl">
                  Total: ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('payment')}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="flex-1 py-3 bg-[#B2151B] text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </CustomerLayout>
  );
} 