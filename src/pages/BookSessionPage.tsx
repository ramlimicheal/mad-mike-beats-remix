import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { z } from 'zod';
import { useBookingSlots } from '@/hooks/useBookingSlots';
import { useCreateBooking } from '@/hooks/useBookings';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

const bookingSchema = z.object({
  customer_name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  customer_email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  customer_phone: z.string().trim().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional().or(z.literal('')),
  termsAccepted: z.boolean().refine((val) => val === true, { message: 'You must accept the terms and conditions' }),
});

const sessionTypes = [
  {
    id: 'mix_mastering',
    name: 'Mix & Mastering',
    description: 'Professional mixing and mastering for your tracks',
    duration: '2-3 hours',
    price: 'Starting at $150',
  },
  {
    id: 'live_call',
    name: 'Live Consultation',
    description: 'One-on-one consultation for production guidance',
    duration: '1 hour',
    price: '$75',
  },
];

const BookSessionPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState<'mix_mastering' | 'live_call'>('mix_mastering');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<string>();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: '',
    termsAccepted: false,
  });

  const { data: slots = [] } = useBookingSlots(selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined);
  const createBooking = useCreateBooking();

  const availableDates = slots.map((slot) => new Date(slot.date));
  const filteredSlots = slots.filter((slot) => slot.session_type === sessionType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    try {
      const validated = bookingSchema.parse(formData);

      await createBooking.mutateAsync({
        slot_id: selectedSlot,
        customer_name: validated.customer_name,
        customer_email: validated.customer_email,
        customer_phone: validated.customer_phone || null,
        session_type: sessionType,
        notes: validated.notes || null,
      });

      toast.success('Booking confirmed! Check your email for details.');
      navigate('/');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error.message || 'Failed to create booking');
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 pb-12">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Book a Session
          </h1>
          <p className="text-zinc-400 text-lg">
            Reserve your slot for professional mixing, mastering, or consultation
          </p>
        </motion.div>

        {/* Step 1: Session Type Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6">Select Session Type</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sessionTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all ${
                    sessionType === type.id
                      ? 'border-amber-500 bg-zinc-900'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                  onClick={() => setSessionType(type.id as typeof sessionType)}
                >
                  <CardHeader>
                    <CardTitle className="text-white">{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {type.duration}
                      </div>
                      <div className="text-amber-500 font-semibold">{type.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Continue
            </Button>
          </motion.div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Choose Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || !availableDates.some((d) => d.toDateString() === date.toDateString())}
                    className="rounded-md border-zinc-800"
                  />
                </CardContent>
              </Card>

              <Card className="border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Available Slots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!selectedDate ? (
                    <p className="text-zinc-400 text-sm">Select a date to view available slots</p>
                  ) : filteredSlots.length === 0 ? (
                    <p className="text-zinc-400 text-sm">No available slots for this date</p>
                  ) : (
                    <div className="space-y-2">
                      {filteredSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant={selectedSlot === slot.id ? 'default' : 'outline'}
                          className="w-full justify-start"
                          onClick={() => setSelectedSlot(slot.id)}
                        >
                          {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedSlot}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-6">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="border-zinc-800">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="customer_name">Full Name *</Label>
                    <Input
                      id="customer_name"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="bg-zinc-900 border-zinc-800"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customer_email">Email Address *</Label>
                    <Input
                      id="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      className="bg-zinc-900 border-zinc-800"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customer_phone">Phone Number</Label>
                    <Input
                      id="customer_phone"
                      type="tel"
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      className="bg-zinc-900 border-zinc-800"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes / Requirements</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 min-h-24"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm text-zinc-400">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={createBooking.isPending}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {createBooking.isPending ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookSessionPage;
