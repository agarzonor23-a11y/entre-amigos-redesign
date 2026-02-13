import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteContent = (sectionKey: string) => {
  return useQuery({
    queryKey: ["site-content", sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("section_key", sectionKey)
        .maybeSingle();
      if (error) throw error;
      return data?.content as Record<string, any> | null;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllSiteContent = () => {
  return useQuery({
    queryKey: ["site-content-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section_key");
      if (error) throw error;
      return data as Array<{ id: string; section_key: string; content: Record<string, any>; updated_at: string }>;
    },
  });
};

export const useUpdateSiteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sectionKey, content }: { sectionKey: string; content: Record<string, any> }) => {
      const { data: existing } = await supabase
        .from("site_content")
        .select("id")
        .eq("section_key", sectionKey)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("site_content")
          .update({ content })
          .eq("section_key", sectionKey);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_content")
          .insert({ section_key: sectionKey, content });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content-all"] });
    },
  });
};
