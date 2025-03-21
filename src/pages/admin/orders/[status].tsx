import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import {DataTable, DetailViewConfig, type ColumnDefinition} from "@/components/data-table";
import AdminLayout from "@/components/auth-layout";
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


  const ordersData = [
    {
      id: 1,
      orderId: "ORD-001",
      orderDate: "2025-03-18",
      customerInformation: "John Doe, +234 800 123 4567, 123 Main St, Lagos",
      totalAmount: "₦ 5,300",
      orderStatus: "Delivered",
      items: [
        { name: "White soup", quantity: 2, price: "₦ 1,800", subtotal: "₦ 3,600" },
        { name: "Chicken Suya", quantity: 1, price: "₦ 1,700", subtotal: "₦ 1,700" },
      ],
    },
    {
      id: 2,
      orderId: "ORD-002",
      orderDate: "2025-03-17",
      customerInformation: "Jane Smith, +234 800 987 6543, 456 Park Ave, Abuja",
      totalAmount: "₦ 4,200",
      orderStatus: "Processing",
      items: [
        { name: "Jollof Rice", quantity: 1, price: "₦ 2,500", subtotal: "₦ 2,500" },
        { name: "Chicken Suya", quantity: 1, price: "₦ 1,700", subtotal: "₦ 1,700" },
      ],
    },
    {
      id: 3,
      orderId: "ORD-003",
      orderDate: "2025-03-16",
      customerInformation: "Samuel Johnson, +234 800 456 7890, 789 River Rd, Port Harcourt",
      totalAmount: "₦ 7,800",
      orderStatus: "Pending",
      items: [
        { name: "White soup", quantity: 3, price: "₦ 1,800", subtotal: "₦ 5,400" },
        { name: "Jollof Rice", quantity: 1, price: "₦ 2,500", subtotal: "₦ 2,500" },
      ],
    },
  ]

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

  const handleEdit = (item: any) => {
    toast(`Editing ${item.name || item.orderId}`)
  }
  
  const handleDelete = (item: any) => {
    toast( `Deleting ${item.name || item.orderId}`)
  }
  return (
    <AdminLayout>
      <span className="text-2xl font-semibold mb-5">{capitalizeFirstLetter(statusString)} Orders</span>

      <div className="flex justify-between items-center my-8">
            
      <FilterBar
        initialFilters={filters}
        onFilterChange={handleFilterChange}
        // You can customize which filters to show
        showSearch={true}
        showDateRange={true}
        showCustomerType={true}
        showStatus={true}
        // You can also customize the options
        customerTypeOptions={[
          { value: 'all', label: 'All Types' },
          { value: 'premium', label: 'Premium Users' },
          // Custom options...
        ]}
      />
      </div>
       

    
      <div className="mt-10">
      <DataTable
            data={ordersData}
            columns={orderColumns}
            tableType="orders"
            detailView={ordersDetailConfig}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
      </div>
    
    </AdminLayout>
  );
};

export default OrderStatusPage;
