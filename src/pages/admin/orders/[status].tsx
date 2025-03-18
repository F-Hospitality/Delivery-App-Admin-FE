import { useRouter } from "next/router";
import OrdersTable from "@/components/orders-table";
import AdminLayout from "@/components/auth-layout";

const OrderStatusPage = () => {
  const router = useRouter();
  const { status } = router.query; // Get the status from the URL

  // Ensure status is a string
  const statusString = Array.isArray(status) ? status[0] : status;

  if (!statusString) {
    return <div>Loading...</div>;
  }

  // Capitalize first letter and format for display
  const formattedStatus = statusString.charAt(0).toUpperCase() + statusString.slice(1).replace(/-/g, " ");

  return (
    <AdminLayout>
      <OrdersTable status={formattedStatus} />
    </AdminLayout>
  );
};

export default OrderStatusPage;
