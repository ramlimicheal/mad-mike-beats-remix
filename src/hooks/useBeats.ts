import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Beat } from '@/types';

export const useBeats = () => {
  return useQuery({
    queryKey: ['beats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('beats')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data.map(transformBeat);
    },
  });
};

export const useFeaturedBeats = () => {
  return useQuery({
    queryKey: ['featured-beats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('beats')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data.map(transformBeat);
    },
  });
};

export const useBeat = (id: string | undefined) => {
  return useQuery({
    queryKey: ['beat', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('beats')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return transformBeat(data);
    },
    enabled: !!id,
  });
};

export const useAllBeats = () => {
  return useQuery({
    queryKey: ['all-beats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('beats')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data.map(transformBeat);
    },
  });
};

export const useDeleteBeat = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('beats')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beats'] });
      queryClient.invalidateQueries({ queryKey: ['all-beats'] });
      queryClient.invalidateQueries({ queryKey: ['featured-beats'] });
    },
  });
};

export const useToggleBeatActive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('beats')
        .update({ is_active: isActive })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beats'] });
      queryClient.invalidateQueries({ queryKey: ['all-beats'] });
    },
  });
};

export const useToggleBeatFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      const { error } = await supabase
        .from('beats')
        .update({ is_featured: isFeatured })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beats'] });
      queryClient.invalidateQueries({ queryKey: ['all-beats'] });
      queryClient.invalidateQueries({ queryKey: ['featured-beats'] });
    },
  });
};

// Helper function to transform database beat to app Beat type
function transformBeat(dbBeat: any): Beat {
  return {
    id: dbBeat.id,
    title: dbBeat.title,
    artist: dbBeat.artist,
    bpm: dbBeat.bpm,
    key: dbBeat.key,
    genre: dbBeat.genre,
    mood: dbBeat.mood,
    tags: dbBeat.tags || [],
    artworkUrl: dbBeat.artwork_url,
    audioUrl: dbBeat.audio_url || '',
    soundCloudUrl: dbBeat.soundcloud_url,
    price: {
      basic: dbBeat.price_basic,
      premium: dbBeat.price_premium,
      exclusive: dbBeat.price_exclusive,
    },
  };
}
