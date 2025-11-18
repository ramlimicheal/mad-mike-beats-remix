import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BookingSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  session_type: 'mix_mastering' | 'live_call';
  created_at: string;
}

export const useBookingSlots = (date?: string) => {
  return useQuery({
    queryKey: ['booking-slots', date],
    queryFn: async () => {
      let query = supabase
        .from('booking_slots')
        .select('*')
        .eq('is_available', true)
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });

      if (date) {
        query = query.eq('date', date);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as BookingSlot[];
    },
  });
};

export const useAllBookingSlots = () => {
  return useQuery({
    queryKey: ['all-booking-slots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('booking_slots')
        .select('*')
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data as BookingSlot[];
    },
  });
};

export const useCreateBookingSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slot: Omit<BookingSlot, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('booking_slots')
        .insert(slot)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-slots'] });
      queryClient.invalidateQueries({ queryKey: ['all-booking-slots'] });
    },
  });
};

export const useToggleSlotAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_available }: { id: string; is_available: boolean }) => {
      const { data, error } = await supabase
        .from('booking_slots')
        .update({ is_available })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-slots'] });
      queryClient.invalidateQueries({ queryKey: ['all-booking-slots'] });
    },
  });
};

export const useDeleteBookingSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('booking_slots')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-slots'] });
      queryClient.invalidateQueries({ queryKey: ['all-booking-slots'] });
    },
  });
};
