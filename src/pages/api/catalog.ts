import { NextApiRequest, NextApiResponse } from "next";
import { squareRequest } from "../../lib/square"; // Ensure this imports your Square API helper

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const data = await squareRequest("/v2/catalog/list?types=ITEM");

    if (!data.objects) {
      return res.status(404).json({ error: "No items found" });
    }

    // Process each item
    const items = await Promise.all(
      data.objects.map(async (item: any) => {
        const { item_data } = item;

        // ✅ Extract the first variation (assuming each item has at least one)
        const variation = item_data.variations?.[0]?.item_variation_data;
        const priceMoney = variation?.price_money;
        const price = priceMoney ? priceMoney.amount / 100 : null; // Convert cents to dollars
        const currency = priceMoney?.currency || "USD"; // Default to USD if missing

        // ✅ Extract Image URL if exists
        let imageUrl = null;
        const imageId = item_data.image_ids?.[0];
        if (imageId) {
          const imageData = await squareRequest(`/v2/catalog/object/${imageId}`);
          imageUrl = imageData.object?.image_data?.url || null;
        }

        return {
          id: item.id,
          name: item_data.name,
          price,
          currency,
          image: imageUrl,
        };
      })
    );

    return res.status(200).json(items);
  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
}
