import { useRouter } from "next/router";
import {DataTable, type ColumnDefinition} from "@/components/data-table";
import AdminLayout from "@/components/auth-layout";
import { toast } from "sonner"


const OrderStatusPage = () => {
  const router = useRouter();
  const { status } = router.query; 

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

  const handleEdit = (item: any) => {
    toast(`Editing ${item.name || item.orderId}`)
  }
  
  const handleDelete = (item: any) => {
    toast( `Deleting ${item.name || item.orderId}`)
  }
  return (
    <AdminLayout>
      <span className="text-4xl font-semibold mb-5">{capitalizeFirstLetter(statusString)} Orders</span>
      <div className="mt-10">
      <DataTable
            data={ordersData}
            columns={orderColumns}
            tableType="orders"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
      </div>
    
    </AdminLayout>
  );
};

export default OrderStatusPage;
