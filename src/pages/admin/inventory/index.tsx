import AdminLayout from "@/components/auth-layout";
import {DataTable, DetailViewConfig, type ColumnDefinition} from "@/components/data-table";
import { toast } from "sonner"
import Image from "next/image";
import { useState } from "react"
import { Calendar, Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

 

const InventoryLayout = () => {

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
      
const handleStatusChange = (item: any, newStatus: boolean) => {
    toast('Status Changed')
  }
  
  const handleRecommendedChange = (item: any, newStatus: boolean) => {
    toast('Unreccomended')
  }
  

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium text-gray-800">Inventory</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Export
          </Button>
        
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2 min-w-[240px]">
              <Calendar className="h-4 w-4" />
              {date.from && date.to
                ? `${format(date.from, "d MMM")} - ${format(date.to, "d MMM yyyy")}`
                : "Select date range"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto h-4 w-4 opacity-50"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={{
                from: date.from || new Date(),
                to: date.to || new Date(),
              }}
              onSelect={(range) => {
                setDate({
                  from: range?.from,
                  to: range?.to,
                })
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={customerType} onValueChange={setCustomerType}>
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder="All Items" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            <SelectItem value="new">New Customers</SelectItem>
            <SelectItem value="returning">Returning Customers</SelectItem>
            <SelectItem value="vip">VIP Customers</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
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
