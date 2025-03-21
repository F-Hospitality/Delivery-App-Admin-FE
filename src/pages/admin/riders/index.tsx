import AdminLayout from "@/components/auth-layout";
import { DataTable, DetailViewConfig, type ColumnDefinition } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react"
import FilterBar, { DateRange } from '@/components/filter-bar'


const RiderLayout = () => {

    const [date, setDate] = useState<{
        from: Date | undefined
        to: Date | undefined
      }>({
        from: new Date("2024-09-12"),
        to: new Date("2024-10-28"),
      })
    
      const [customerType, setCustomerType] = useState("all")
      const [status, setStatus] = useState("all")
      const [searchQuery, setSearchQuery] = useState("")
    

    const ridersData = [
        {
          id: 1,
          name: "Michael Okonkwo",
          email: "michael.o@example.com",
          phone: "+234 800 111 2222",
          status: "Online",
          vehicleType: "Motorcycle",
          licenseNumber: "LIC-12345",
          totalDeliveries: 156,
          rating: 4.8,
          avatar: "/placeholder.svg?height=60&width=60",
        },
        {
          id: 2,
          name: "Amina Ibrahim",
          email: "amina.i@example.com",
          phone: "+234 800 333 4444",
          status: "Offline",
          vehicleType: "Bicycle",
          licenseNumber: "LIC-67890",
          totalDeliveries: 89,
          rating: 4.5,
          avatar: "/placeholder.svg?height=60&width=60",
        },
        {
          id: 3,
          name: "David Adeyemi",
          email: "david.a@example.com",
          phone: "+234 800 555 6666",
          status: "On Delivery",
          vehicleType: "Motorcycle",
          licenseNumber: "LIC-24680",
          totalDeliveries: 212,
          rating: 4.9,
          avatar: "/placeholder.svg?height=60&width=60",
        },
      ]
      

  const customerDetailConfig: DetailViewConfig = {
    enabled: true,
    title: (item) => `Customer: ${item.name}`,
  };

  const riderColumns: ColumnDefinition[] = [
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
            src={info.avatar || "/placeholder.svg"}
            alt={info.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{info.name}</div>
            <div className="text-sm text-muted-foreground">{info.email}</div>
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
      id: "vehicleType",
      header: "Vehicle",
      accessorKey: "vehicleType",
    },
    {
      id: "totalDeliveries",
      header: "Deliveries",
      accessorKey: "totalDeliveries",
    },
    {
      id: "rating",
      header: "Rating",
      accessorKey: "rating",
      cell: (info) => (
        <div className="flex items-center">
          <span className="font-medium">{info.rating}</span>
          <span className="text-yellow-500 ml-1">★</span>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (info) => {
        const statusStyles = {
          Online: "bg-green-100 text-green-800",
          Offline: "bg-gray-100 text-gray-800",
        }
        const style = "bg-gray-100 text-gray-800"
  
        return <Badge className={style}>{info.status}</Badge>
      },
    },
  ]

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
      <div className="container mx-auto p-6">
        <h1 className="text-xl font-semibold mb-5">Rider Management</h1>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium text-gray-800">Riders</h1>
    
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
        data={ridersData}
        columns={riderColumns}
        tableType="customers"
        detailView={customerDetailConfig}
        actions={{ view: true, edit: true, delete: true }}
      />
    </div>
   
    </AdminLayout>
  );
};

export default RiderLayout;