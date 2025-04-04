import ControlLayout from "@/components/control-layout";
import {DetailViewConfig, ColumnDefinition} from "@/types/data-table";
import Image from "next/image";
import { useState } from "react"
import FilterBar, { DateRange } from '@/components/filter-bar'
import { Input } from "@/components/ui/input"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { DataTable } from "@/components/data-table"
const InventoryLayout = () => {
    const { theme } = useTheme();
    const [inventoryData, setInventoryData] = useState([
        {
          id: 1,
          name: "White soup",
          image: "/images/products/rice.png",
          category: "Swallow",
          price: `${theme.currency.symbol} 1,800`,
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
          price: `${theme.currency.symbol} 2,500`,
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
          price: `${theme.currency.symbol} 3,200`,
          recommended: true,
          status: 'unavailable',
          portions: 0,
          threshold: 15,
        },
    ]);

    const [editingItem, setEditingItem] = useState<number | null>(null);
    const [tempValues, setTempValues] = useState<{ portions: number; threshold: number } | null>(null);

    const handleStartEdit = (id: number, portions: number, threshold: number) => {
        setEditingItem(id);
        setTempValues({ portions, threshold });
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
        setTempValues(null);
    };

    const handleSaveEdit = async (id: number) => {
        if (!tempValues) return;

        try {
            // Here you would make your API call to update the backend
            // const response = await fetch(`/api/inventory/${id}`, {
            //     method: 'PUT',
            //     body: JSON.stringify(tempValues)
            // });
            
            // For now, we'll simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setInventoryData(prevData =>
                prevData.map(item =>
                    item.id === id
                        ? {
                            ...item,
                            portions: tempValues.portions,
                            threshold: tempValues.threshold,
                            status: tempValues.portions === 0 ? 'unavailable' : 
                                   tempValues.portions <= tempValues.threshold ? 'low in stock' : 'available'
                        }
                        : item
                )
            );

            toast.success('Inventory updated successfully');
            handleCancelEdit();
        } catch (error) {
            toast.error('Failed to update inventory');
            console.error('Error updating inventory:', error);
        }
    };

    const handleUpdateTempValue = (field: 'portions' | 'threshold', value: number) => {
        if (!tempValues) return;
        setTempValues(prev => prev ? { ...prev, [field]: value } : null);
    };

      const inventoryDetailConfig: DetailViewConfig = {
        enabled: true,
        title: (item: any) => `Product: ${item.name}`,
        content: (item: any) => (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Category</h3>
                        <p>{item.category}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Price</h3>
                        <p>{item.price}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Portions</h3>
                        <p>{item.portions}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Threshold</h3>
                        <p>{item.threshold}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'available' ? 'bg-green-100 text-green-800' :
                            item.status === 'low in stock' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {item.status}
                        </span>
                    </div>
                </div>
            </div>
        ),
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

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'available':
                return theme.status.available;
            case 'low in stock':
                return theme.status.lowStock;
            default:
                return theme.status.unavailable;
        }
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
                        src={info.image}
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
                <div className="flex items-center gap-2">
                    {editingItem === info.id ? (
                        <Input
                            type="number"
                            value={tempValues?.portions ?? info.portions}
                            onChange={(e) => handleUpdateTempValue('portions', Number(e.target.value))}
                            min="0"
                            className="w-24"
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <span>{info.portions}</span>
                    )}
                </div>
            ),
        },
        {
            id: "threshold",
            header: "Threshold",
            accessorKey: "threshold",
            cell: (info) => (
                <div className="flex items-center gap-2">
                    {editingItem === info.id ? (
                        <Input
                            type="number"
                            value={tempValues?.threshold ?? info.threshold}
                            onChange={(e) => handleUpdateTempValue('threshold', Number(e.target.value))}
                            min="0"
                            className="w-24"
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <span>{info.threshold}</span>
                    )}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            accessorKey: "actions",
            cell: (info) => (
                <div className="flex items-center gap-2">
                    {editingItem === info.id ? (
                        <div className="flex gap-1">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveEdit(info.id);
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelEdit();
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStartEdit(info.id, info.portions, info.threshold);
                            }}
                        >
                            Edit
                        </Button>
                    )}
                </div>
            ),
        },
        {
          id: "status",
          header: "Status",
          accessorKey: "status",
            cell: (info) => {
                const statusConfig = getStatusConfig(info.status);
                return (
                    <span className={`px-2 py-1 rounded-full text-xs ${statusConfig.color}`}>
                        {statusConfig.text}
                    </span>
                );
            },
        },
    ];

  return (
      <ControlLayout>
            <h2 className="text-xl font-semibold mb-4" style={{ color: theme.brand.textColor }}>
                {theme.brand.name} - Inventory Management
            </h2>
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
