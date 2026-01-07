'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    website: '',
    role: '',
    biggestBottleneck: '',
    whatWouldMakeThisAWin: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('ai_plan_bookings')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            company_name: formData.companyName,
            website: formData.website || null,
            role: formData.role,
            biggest_bottleneck: formData.biggestBottleneck || null,
            what_would_make_this_a_win: formData.whatWouldMakeThisAWin || null
          }
        ]);

      if (error) throw error;

      toast({
        title: 'Booking Submitted!',
        description: 'We\'ll be in touch within 24 hours to schedule your call.',
      });

      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        website: '',
        role: '',
        biggestBottleneck: '',
        whatWouldMakeThisAWin: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="bg-gray-900 border-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="bg-gray-900 border-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-gray-300">Company Name *</Label>
          <Input
            id="companyName"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="bg-gray-900 border-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-gray-300">Website (Optional)</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="bg-gray-900 border-gray-800 text-white"
            placeholder="https://"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-gray-300">Role *</Label>
        <Input
          id="role"
          required
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="bg-gray-900 border-gray-800 text-white"
          placeholder="e.g., Founder, Director, Manager"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="bottleneck" className="text-gray-300">
            Biggest bottleneck in your business (Optional)
          </Label>
          <Textarea
            id="bottleneck"
            value={formData.biggestBottleneck}
            onChange={(e) => setFormData({ ...formData, biggestBottleneck: e.target.value })}
            placeholder="Describe your biggest bottleneck..."
            className="bg-gray-900 border-gray-800 text-white min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="win" className="text-gray-300">
            What would make this a win? (Optional)
          </Label>
          <Textarea
            id="win"
            value={formData.whatWouldMakeThisAWin}
            onChange={(e) => setFormData({ ...formData, whatWouldMakeThisAWin: e.target.value })}
            placeholder="More leads, faster delivery, less admin, lower costs, etc."
            className="bg-gray-900 border-gray-800 text-white min-h-[100px]"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white hover:bg-gray-200 text-black font-bold text-lg py-6 uppercase tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {isSubmitting ? 'Submitting...' : 'Get My Free AI Plan'}
      </Button>
    </form>
  );
};

export default BookingForm;
