import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase
        .from("marketplace_products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as MarketplaceProduct[];
    },
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Omit<MarketplaceProduct, "id" | "created_at" | "updated_at">) => {
      const { error } = await supabase.from("marketplace_products").insert(product);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace-products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<MarketplaceProduct> & { id: string }) => {
      const { error } = await supabase.from("marketplace_products").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace-products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("marketplace_products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace-products"] }),
  });
};
