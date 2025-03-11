import { useEffect, useState } from "react";
import FoodMenu from "../../components/menu";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/catalog")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Food Menu</h1>
      <FoodMenu items={items} />
    </div>
  );
}
