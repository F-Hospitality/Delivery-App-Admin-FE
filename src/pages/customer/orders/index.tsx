'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomerLayout from '@/components/customer-layout';
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  status: 'preparing' | 'on-the-way' | 'delivered';
  totalAmount: number;
  createdAt: string;
  estimatedDeliveryTime: string;
  deliveryAddress: string;
}

export default function Orders() {
  const router = useRouter();
  // Placeholder data - in a real app, this would come from an API
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      items: [
        {
          id: 1,
          name: 'Pepperoni Pizza',
          price: 12.99,
          quantity: 2,
          image: '/images/pepperoni-pizza.jpg',
        },
        {
          id: 2,
          name: 'Chocolate Milkshake',
          price: 4.99,
          quantity: 1,
          image: '/images/milkshake.jpg',
        },
      ],
      status: 'preparing',
      totalAmount: 30.97,
      createdAt: '2024-03-11T10:30:00Z',
      estimatedDeliveryTime: '2024-03-11T11:15:00Z',
      deliveryAddress: '123 Main St, New York, NY 10001',
    },
    {
      id: 'ORD-002',
      items: [
        {
          id: 3,
          name: 'Cheeseburger',
          price: 8.99,
          quantity: 1,
          image: '/images/cheeseburger.jpg',
        },
      ],
      status: 'on-the-way',
      totalAmount: 8.99,
      createdAt: '2024-03-11T09:15:00Z',
      estimatedDeliveryTime: '2024-03-11T10:00:00Z',
      deliveryAddress: '456 Park Ave, New York, NY 10022',
    },
    {
      id: 'ORD-003',
      items: [
        {
          id: 4,
          name: 'Margherita Pizza',
          price: 10.99,
          quantity: 1,
          image: '/images/margherita-pizza.jpg',
        },
        {
          id: 5,
          name: 'Chocolate Milkshake',
          price: 4.99,
          quantity: 2,
          image: '/images/milkshake.jpg',
        },
      ],
      status: 'delivered',
      totalAmount: 20.97,
      createdAt: '2024-03-10T18:45:00Z',
      estimatedDeliveryTime: '2024-03-10T19:30:00Z',
      deliveryAddress: '789 Broadway, New York, NY 10003',
    },
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'on-the-way':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <CustomerLayout>
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Order {order.id}</h2>
                <p className="text-sm text-gray-500">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-b border-gray-100 py-4 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-4 last:mb-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-medium">{item.name}</h3>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-gray-900 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-gray-500">
                <span>Delivery Address</span>
                <span className="text-right">{order.deliveryAddress}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Estimated Delivery</span>
                <span>{formatDate(order.estimatedDeliveryTime)}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold">
                <span>Total Amount</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </CustomerLayout>
  );
} 