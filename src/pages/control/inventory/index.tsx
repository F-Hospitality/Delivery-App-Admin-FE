import AdminLayout from "@/components/auth-layout";
import {DataTable, DetailViewConfig, type ColumnDefinition} from "@/components/data-table";
import Image from "next/image";
import { useState } from "react"
import FilterBar, { DateRange } from '@/components/filter-bar'


const InventoryLayout = () => {

    const inventoryData = [
        {
          id: 1,
          name: "White soup",
          image: "/placeholder.svg?height=60&width=60",
          category: "Swallow",
          price: "₦ 1,800",
          recommended: true,
          status: 'available',
        },
        {
          id: 2,
          name: "Jollof Rice",
          image: "/placeholder.svg?height=60&width=60",
          category: "Rice",
          price: "₦ 2,500",
          recommended: false,
          status: 'low in stock',
        },
        {
          id: 3,
          name: "Chicken Suya",
          image: "/placeholder.svg?height=60&width=60",
          category: "Protein",
          price: "₦ 3,200",
          recommended: true,
          status: 'unavailable',
        },
      ]

      const inventoryDetailConfig: DetailViewConfig = {
        enabled: true,
        title: (item: any) => `Product: ${item.name}`,
      }


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

      const inventoryColumns: ColumnDefinition[] = [
        {
          id: "id",
          header: "#",
          accessorKey: "id",
        },
        {
          id: "name",
          header: "Name",
          accessorKey: "name",
          cell: (info) => (
            <div className="flex items-center gap-3">
              <Image
                src= "/asun.png"
                alt={info.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <span className="font-medium">{info.name}</span>
            </div>
          ),
        },
        {
          id: "category",
          header: "Category",
          accessorKey: "category",
        },
        {
          id: "price",
          header: "Price",
          accessorKey: "price",
        },
  
        {
          id: "status",
          header: "Status",
          accessorKey: "status",
        },
      ]
  return (
    <AdminLayout>
          <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
          <div className="container mx-auto p-6">
   

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
    

      {/* Placeholder for customer table/data */}
      <DataTable
            data={inventoryData}
            columns={inventoryColumns}
            tableType="inventory"
            detailView={inventoryDetailConfig}
            actions={{ edit: true, delete: true }}
           
        
          />
    </div>
       
    </AdminLayout>
  );
};

export default InventoryLayout;
