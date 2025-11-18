import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Booking {
  id: string;
  slot_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  session_type: 'mix_mastering' | 'live_call';
  notes: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  booking_date: string;
  created_at: string;
}

export interface BookingWithSlot extends Booking {
  booking_slots: {
    date: string;
    start_time: string;
    end_time: string;
  };
}

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          booking_slots (
            date,
            start_time,
            end_time
          )
        `)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      return data as BookingWithSlot[];
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: Omit<Booking, 'id' | 'booking_date' | 'created_at' | 'status'>) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Booking['status'] }) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
