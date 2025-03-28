import ControlLayout from "@/components/control-layout";
import {DataTable, DetailViewConfig, type ColumnDefinition} from "@/components/data-table";
import Image from "next/image";
import { useState } from "react"
import FilterBar, { DateRange } from '@/components/filter-bar'
import { Input } from "@/components/ui/input"

const InventoryLayout = () => {
    const [inventoryData, setInventoryData] = useState([
        {
          id: 1,
          name: "White soup",
          image: "/placeholder.svg?height=60&width=60",
          category: "Swallow",
          price: "₦ 1,800",
          recommended: true,
          status: 'available',
          portions: 50,
          threshold: 10,
        },
        {
          id: 2,
          name: "Jollof Rice",
          image: "/placeholder.svg?height=60&width=60",
          category: "Rice",
          price: "₦ 2,500",
          recommended: false,
          status: 'low in stock',
          portions: 15,
          threshold: 20,
        },
        {
          id: 3,
          name: "Chicken Suya",
          image: "/placeholder.svg?height=60&width=60",
          category: "Protein",
          price: "₦ 3,200",
          recommended: true,
          status: 'unavailable',
          portions: 0,
          threshold: 15,
        },
    ]);

    const handleUpdatePortions = (id: number, newPortions: number) => {
        setInventoryData(prevData =>
            prevData.map(item =>
                item.id === id
                    ? {
                        ...item,
                        portions: newPortions,
                        status: newPortions === 0 ? 'unavailable' : 
                               newPortions <= item.threshold ? 'low in stock' : 'available'
                    }
                    : item
            )
        );
    };

    const handleUpdateThreshold = (id: number, newThreshold: number) => {
        setInventoryData(prevData =>
            prevData.map(item =>
                item.id === id
                    ? {
                        ...item,
                        threshold: newThreshold,
                        status: item.portions === 0 ? 'unavailable' : 
                               item.portions <= newThreshold ? 'low in stock' : 'available'
                    }
                    : item
            )
        );
    };

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
                        src="/asun.png"
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
            id: "portions",
            header: "Portions",
            accessorKey: "portions",
            cell: (info) => (
                <Input
                    type="number"
                    value={info.portions}
                    onChange={(e) => handleUpdatePortions(info.id, Number(e.target.value))}
                    min="0"
                    className="w-24"
                />
            ),
        },
        {
            id: "threshold",
            header: "Threshold",
            accessorKey: "threshold",
            cell: (info) => (
                <Input
                    type="number"
                    value={info.threshold}
                    onChange={(e) => handleUpdateThreshold(info.id, Number(e.target.value))}
                    min="0"
                    className="w-24"
                />
            ),
        },
        {
            id: "status",
            header: "Status",
            accessorKey: "status",
            cell: (info) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                    info.status === 'available' ? 'bg-green-100 text-green-800' :
                    info.status === 'low in stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {info.status}
                </span>
            ),
        },
    ];

    return (
        <ControlLayout>
            <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
            <div className="container mx-auto p-6">
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

                <DataTable
                    data={inventoryData}
                    columns={inventoryColumns}
                    tableType="inventory"
                    detailView={inventoryDetailConfig}
                    actions={{ view: false, edit: false, delete: false }}
                />
            </div>
        </ControlLayout>
    );
};

export default InventoryLayout;
