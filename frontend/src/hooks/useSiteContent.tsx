import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:3000/api";

export const useSiteContent = (sectionKey: string) => {
  return useQuery({
    queryKey: ["site-content", sectionKey],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_URL}/content/${sectionKey}`);
      // if (!response.ok) throw new Error("Network response was not ok");
      // return response.json();
      return null;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllSiteContent = () => {
  return useQuery({
    queryKey: ["site-content-all"],
    queryFn: async () => {
      // const response = await fetch(`${API_URL}/content`);
      // if (!response.ok) throw new Error("Network response was not ok");
      // return response.json();
      return [];
    },
  });
};

export const useUpdateSiteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sectionKey, content }: { sectionKey: string; content: Record<string, any> }) => {
      // const response = await fetch(`${API_URL}/content/${sectionKey}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ content }),
      // });
      // if (!response.ok) throw new Error("Network response was not ok");
      console.log("Updating content", sectionKey, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content-all"] });
    },
  });
};
