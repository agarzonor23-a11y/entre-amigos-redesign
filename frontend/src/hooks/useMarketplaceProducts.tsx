import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:3000/api";

export interface MarketplaceProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  category: string;
  badge: string | null;
  seller: string | null;
  location: string | null;
  stock: number;
  features: string[] | null;
  free_shipping: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useMarketplaceProducts = () => {
  return useQuery({
    queryKey: ["marketplace-products"],
    queryFn: async () => {
      // const response = await fetch(`${API_URL}/products`);
      // if (!response.ok) throw new Error("Network response was not ok");
      // return response.json();
      return [] as MarketplaceProduct[];
    },
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Omit<MarketplaceProduct, "id" | "created_at" | "updated_at">) => {
      //   const response = await fetch(`${API_URL}/products`, {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(product),
      //   });
      //   if (!response.ok) throw new Error("Error creating product");
      console.log("Creating product", product);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace-products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<MarketplaceProduct> & { id: string }) => {
      // const response = await fetch(`${API_URL}/products/${id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(updates),
      // });
      // if (!response.ok) throw new Error("Error updating product");
      console.log("Updating product", id, updates);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace-products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // const response = await fetch(`${API_URL}/products/${id}`, {
      //   method: "DELETE",
      // });
      // if (!response.ok) throw new Error("Error deleting product");
      console.log("Deleting product", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace-products"] }),
  });
};
