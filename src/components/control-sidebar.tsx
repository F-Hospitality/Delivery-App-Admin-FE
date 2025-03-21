import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  Home, 
  Package, 
  Users, 
  BarChart, 
  Truck, 
  LogOut, 
  Menu, 
  BookOpen,
 
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOrdersExpanded, setIsOrdersExpanded] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/control" },
    { name: "Orders", icon: <Package size={20} />, path: "/control/orders", isExpandable: true },
    { name: "Inventory", icon: <BookOpen size={20} />, path: "/control/inventory" },
  ];

  const orderStatuses = [
    { name: "All", path: "/control/orders" },
    { name: "Pending", path: "/control/orders/pending" },
    { name: "Confirmed", path: "/control/orders/confirmed" },
    { name: "Cooking", path: "/control/orders/cooking" },
    { name: "Ready For Delivery", path: "/control/orders/ready-for-delivery" },
    { name: "Item On The Way", path: "/control/orders/on-the-way" },
    { name: "Delivered", path: "/control/orders/delivered" },
    { name: "Refunded", path: "/control/orders/refunded" },
    { name: "Scheduled", path: "/control/orders/scheduled" },
  ];

  const handleOrdersClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => {
        setIsOrdersExpanded(!isOrdersExpanded);
      }, 300);
    } else {
      setIsOrdersExpanded(!isOrdersExpanded);
    }
  };

  return (
    <div className={`h-full bg-[#B2151B] text-white px-4 flex flex-col pt-8 ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}>
      <div className="px-4 flex justify-between items-center">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="focus:outline-none">
          <Menu size={24} />
        </button>
        {!isCollapsed && <img className="w-28" src="/hospitality.png" alt="Logo" />}
      </div>

      <div className="mt-6">
        {!isCollapsed && <p className="px-4 text-gray-300 text-sm">ORDER SECTION</p>}
      </div>

      <nav className="flex flex-col space-y-1 flex-grow mt-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.isExpandable ? (
              <div>
                <div
                  onClick={handleOrdersClick}
                  className={`flex items-center p-3 cursor-pointer hover:bg-[#D85959] rounded-md transition-colors duration-200 ${
                    router.pathname.includes(item.path) ? "bg-[#9C1212]" : ""
                  }`}
                >
                  <span>{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="ml-3">{item.name}</span>
                      <span className="ml-auto">{isOrdersExpanded ? "▼" : "▶"}</span>
                    </>
                  )}
                </div>
                {isOrdersExpanded && !isCollapsed && (
                  <div className="ml-8 mt-1 space-y-1">
                    {orderStatuses.map((status) => (
                      <Link key={status.name} href={status.path} passHref>
                        <div
                          className={`flex items-center py-2 px-2 cursor-pointer hover:bg-[#D85959] rounded-md text-sm transition-colors duration-200 ${
                            router.pathname === status.path ? "text-[#4A90E2]" : "text-gray-300"
                          }`}
                        >
                          <span>{status.name}</span>
                          <span className="ml-auto text-white bg-[#9C1212] px-2 rounded-full">0</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link href={item.path} passHref>
                <div
                  className={`flex items-center p-3 cursor-pointer hover:bg-[#D85959] rounded-md transition-colors duration-200 ${
                    router.pathname === item.path ? "bg-[#9C1212]" : ""
                  }`}
                >
                  <span>{item.icon}</span>
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </div>
              </Link>
            )}
          </div>
        ))}
      </nav>

  
      <div className="p-4 mt-auto">
        <button className="flex items-center w-full p-3 text-red-500 hover:bg-red-800/20 rounded-md">
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
