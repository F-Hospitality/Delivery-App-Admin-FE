import { useState, useEffect } from "react";

// Define the type for each order (if you have a specific structure)
interface Order {
  id: string;
  orderDate: string;
  customerInfo: string;
  totalAmount: number;
  orderStatus: string;
}

interface OrdersTableProps {
  status: string; // 'status' prop is a string
}

const OrdersTable = ({ status }: OrdersTableProps) => {
  const [orders, setOrders] = useState<Order[]>([]); // Specify that orders is an array of Order objects
  const [loading, setLoading] = useState<boolean>(true); // Specify loading as a boolean
  
  // Function to generate dummy orders based on the status
  const generateDummyOrders = (status: string): Order[] => {
    const dummyOrders: Order[] = [
      {
        id: "ORD12345",
        orderDate: "2025-03-10",
        customerInfo: "John Doe",
        totalAmount: 150.0,
        orderStatus: status,
      },
      {
        id: "ORD12346",
        orderDate: "2025-03-12",
        customerInfo: "Jane Smith",
        totalAmount: 120.0,
        orderStatus: status,
      },
      {
        id: "ORD12347",
        orderDate: "2025-03-14",
        customerInfo: "Carlos Garcia",
        totalAmount: 85.0,
        orderStatus: status,
      },
      {
        id: "ORD12348",
        orderDate: "2025-03-15",
        customerInfo: "Lisa Wong",
        totalAmount: 230.0,
        orderStatus: status,
      },
    ];
    return dummyOrders;
  };

  // Set the orders when the component mounts or status changes
  useEffect(() => {
    setLoading(true);
    const fetchedOrders = generateDummyOrders(status);
    setOrders(fetchedOrders);
    setLoading(false);
  }, [status]);

  // Sample empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 25C37.5 25 27.5 35 27.5 47.5C27.5 60 37.5 70 50 70C62.5 70 72.5 60 72.5 47.5C72.5 35 62.5 25 50 25ZM50 30C60 30 67.5 37.5 67.5 47.5C67.5 57.5 60 65 50 65C40 65 32.5 57.5 32.5 47.5C32.5 37.5 40 30 50 30ZM40 40V55L57.5 47.5L40 40Z" fill="#3B82F6"/>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900">No Orders Found</h3>
      <p className="text-gray-500 mt-2">No {status.toLowerCase()} orders found in the system.</p>
    </div>
  );

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{status} Orders</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700">
            Export Data
          </button>
          <button className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700">
            + Add New Order
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Information
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-3 text-sm">{index + 1}</td>
                  <td className="px-6 py-3 text-sm">{order.id}</td>
                  <td className="px-6 py-3 text-sm">{order.orderDate}</td>
                  <td className="px-6 py-3 text-sm">{order.customerInfo}</td>
                  <td className="px-6 py-3 text-sm">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-3 text-sm">{order.orderStatus}</td>
                  <td className="px-6 py-3 text-sm">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default OrdersTable;
