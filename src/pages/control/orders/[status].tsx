import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import {DataTable, DetailViewConfig, type ColumnDefinition} from "@/components/data-table";
import ControlLayout from "@/components/control-layout";
import FilterBar, { DateRange } from '@/components/filter-bar'
import { toast } from "sonner"



const OrderStatusPage = () => {
  const router = useRouter();
  const { status } = router.query; 

  const [filters, setFilters] = useState({
    searchQuery: '',
    dateRange: { from: undefined, to: undefined } as DateRange,
    customerType: 'all',
    status: 'all'
  });

  const statusString = Array.isArray(status) ? status[0] : status;

  const capitalizeFirstLetter = (word: any) => word.charAt(0).toUpperCase() + word.slice(1);


  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      orderId: "ORD-001",
      orderDate: "2024-09-15",
      customerInformation: "John Doe, 123 Main St, New York, NY 10001",
      customer: "John Doe",
      orderStatus: "pending",
      paymentStatus: "paid",
      totalAmount: "$125.00",
      items: [
        { name: "Product 1", quantity: 2, price: "$50.00", subtotal: "$100.00" },
        { name: "Product 2", quantity: 1, price: "$25.00", subtotal: "$25.00" },
      ],
    },
    {
      id: "ORD-002",
      orderId: "ORD-002",
      orderDate: "2024-09-18",
      customerInformation: "Jane Smith, 456 Oak St, Los Angeles, CA 90001",
      customer: "Jane Smith",
      orderStatus: "processing",
      paymentStatus: "paid",
      totalAmount: "$75.50",
      items: [{ name: "Product 3", quantity: 1, price: "$75.50", subtotal: "$75.50" }],
    },
    {
      id: "ORD-003",
      orderId: "ORD-003",
      orderDate: "2024-09-20",
      customerInformation: "Mike Johnson, 789 Pine St, Chicago, IL 60007",
      customer: "Mike Johnson",
      orderStatus: "shipped",
      paymentStatus: "paid",
      totalAmount: "$210.00",
      items: [
        { name: "Product 1", quantity: 1, price: "$50.00", subtotal: "$50.00" },
        { name: "Product 4", quantity: 2, price: "$80.00", subtotal: "$160.00" },
      ],
    },
  ])

  const handleFilterChange = (newFilters:any) => {
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      return newFilters;
    });
    
  };


const orderColumns: ColumnDefinition[] = [
  {
    id: "id",
    header: "#",
    accessorKey: "id",
  },
  {
    id: "orderId",
    header: "Order Id",
    accessorKey: "orderId",
  },
  {
    id: "orderDate",
    header: "Order Date",
    accessorKey: "orderDate",
  },
  {
    id: "customerInformation",
    header: "Customer Information",
    accessorKey: "customerInformation",
  },
  {
    id: "totalAmount",
    header: "Total Amount",
    accessorKey: "totalAmount",
  },
  {
    id: "orderStatus",
    header: "Order Status",
    accessorKey: "orderStatus",
  },
]

  if (!statusString) {
    return <div>Loading...</div>;
  }
  const ordersDetailConfig: DetailViewConfig = {
    enabled: true,
    title: (item: any) => `Order: ${item.id}`,
  }

  const handleAssignOrder = (order:any, riderId: string) => {
    toast(`Order Assigned  to: ${riderId}`)

    const updatedOrders = orders.map((o:any) => (o.id === order.id ? { ...o, riderId, orderStatus: "processing" } : o))
    setOrders(updatedOrders)
  }

  const handleChangeOrderStatus = (order: any, status: string) => {
    toast(`Order Status updadated to: ${status}`)


    // In a real app, you would update the order in your database
    const updatedOrders = orders.map((o:any) => (o.id === order.id ? { ...o, orderStatus: status } : o))
    setOrders(updatedOrders)
  }
  return (
    <ControlLayout>
      <span className="text-2xl font-semibold mb-5">{capitalizeFirstLetter(statusString)} Orders</span>

      <div className="flex justify-between items-center my-8">
            
      <FilterBar
        initialFilters={filters}
        onFilterChange={handleFilterChange}
        showSearch={true}
        showDateRange={true}
        showCustomerType={true}
        showStatus={true}
        customerTypeOptions={[
          { value: 'all', label: 'All Types' },
          { value: 'premium', label: 'Premium Users' },
        ]}
      />
      </div>
       

    
      <div className="mt-10">
      <DataTable
            data={orders}
            columns={orderColumns}
            tableType="orders"
            isControl={true}

            detailView={{ enabled: true, idField: "orderId" }}
            onAssignOrder={handleAssignOrder}
            onChangeOrderStatus={handleChangeOrderStatus}
          />
      </div>
    
    </ControlLayout>
  );
};

export default OrderStatusPage;
