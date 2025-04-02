import AdminLayout from "@/components/auth-layout";
import { DataTable, DetailViewConfig, type ColumnDefinition } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import FilterBar, { DateRange } from '@/components/filter-bar'
import { useState } from "react"



const CustomerLayout = () => {

  const customersData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+234 800 123 4567",
      address: "123 Main St, Lagos",
      joinDate: "2024-01-15",
      totalOrders: 8,
      totalSpent: "₦ 45,600",
      status: "Active",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+234 800 987 6543",
      address: "456 Park Ave, Abuja",
      joinDate: "2024-02-20",
      totalOrders: 5,
      totalSpent: "₦ 28,300",
      status: "Active",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Samuel Johnson",
      email: "samuel.johnson@example.com",
      phone: "+234 800 456 7890",
      address: "789 River Rd, Port Harcourt",
      joinDate: "2024-03-05",
      totalOrders: 3,
      totalSpent: "₦ 15,800",
      status: "Inactive",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  const customerDetailConfig: DetailViewConfig = {
    enabled: true,
    title: (item) => `Customer: ${item.name}`,
  };

  const customerColumns: ColumnDefinition[] = [
    {
      id: "id",
      header: "#",
      accessorKey: "id",
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.avatar || "/placeholder.svg"}
            alt={row.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
    },
    {
      id: "totalOrders",
      header: "Orders",
      accessorKey: "totalOrders",
    },
    {
      id: "totalSpent",
      header: "Total Spent",
      accessorKey: "totalSpent",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <Badge className={row.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
          {row.status}
        </Badge>
      ),
    },
  ];

  const [filters, setFilters] = useState({
    searchQuery: '',
    dateRange: { from: undefined, to: undefined } as DateRange,
    customerType: 'all',
    status: 'all'
  });

  const handleFilterChange = (newFilters:any) => {
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      return newFilters;
    });
    
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
      <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium text-gray-800">Customers</h1>
        
      </div>

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

      <DataTable
        data={customersData}
        columns={customerColumns}
        tableType="customers"
        detailView={customerDetailConfig}
        actions={{ view: true, edit: true, delete: true }}
      />
      
    </div>
      
    </AdminLayout>
  );
};

export default CustomerLayout;