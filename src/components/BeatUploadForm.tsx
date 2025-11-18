import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const SCALES = ['Major', 'Minor'];
const GENRES = ['Trap', 'Lo-Fi', 'R&B', 'Drill', 'Boom Bap', 'Afrobeat', 'House', 'Techno'];
const MOODS = ['Energetic', 'Chill', 'Uplifting', 'Gritty', 'Melodic', 'Dark', 'Happy'];

const BeatUploadForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    artist: 'Mad Mike',
    bpm: '',
    key: '',
    scale: 'Major',
    genre: '',
    mood: '',
    tags: '',
    priceBasic: '',
    pricePremium: '',
    priceExclusive: '',
    soundcloudUrl: '',
    isFeatured: false,
    isActive: true,
  });

  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!artworkFile) {
        toast.error('Please upload album artwork');
        return;
      }

      if (!audioFile && !formData.soundcloudUrl) {
        toast.error('Please upload an audio file or provide a SoundCloud URL');
        return;
      }

      const artworkUrl = await uploadFile(artworkFile, 'beat-artwork');
      let audioUrl = null;

      if (audioFile) {
        audioUrl = await uploadFile(audioFile, 'beat-audio');
      }

      const { error } = await supabase.from('beats').insert([{
        title: formData.title,
        artist: formData.artist,
        bpm: parseInt(formData.bpm),
        key: `${formData.key} ${formData.scale}`,
        genre: formData.genre,
        mood: formData.mood,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        artwork_url: artworkUrl,
        audio_url: audioUrl,
        soundcloud_url: formData.soundcloudUrl || null,
        price_basic: parseInt(formData.priceBasic),
        price_premium: parseInt(formData.pricePremium),
        price_exclusive: parseInt(formData.priceExclusive),
        is_featured: formData.isFeatured,
        is_active: formData.isActive,
      }]);

      if (error) throw error;

      toast.success('Beat uploaded successfully!');
      queryClient.invalidateQueries({ queryKey: ['beats'] });
      queryClient.invalidateQueries({ queryKey: ['all-beats'] });
      queryClient.invalidateQueries({ queryKey: ['featured-beats'] });

      // Reset form
      setFormData({
        title: '',
        artist: 'Mad Mike',
        bpm: '',
        key: '',
        scale: 'Major',
        genre: '',
        mood: '',
        tags: '',
        priceBasic: '',
        pricePremium: '',
        priceExclusive: '',
        soundcloudUrl: '',
        isFeatured: false,
        isActive: true,
      });
      setArtworkFile(null);
      setAudioFile(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload beat');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="artist">Artist</Label>
          <Input
            id="artist"
            value={formData.artist}
            onChange={(e) => handleChange('artist', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="bpm">BPM *</Label>
          <Input
            id="bpm"
            type="number"
            value={formData.bpm}
            onChange={(e) => handleChange('bpm', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="key">Key *</Label>
          <Select value={formData.key} onValueChange={(val) => handleChange('key', val)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select key" />
            </SelectTrigger>
            <SelectContent>
              {KEYS.map(key => (
                <SelectItem key={key} value={key}>{key}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="scale">Scale</Label>
          <Select value={formData.scale} onValueChange={(val) => handleChange('scale', val)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SCALES.map(scale => (
                <SelectItem key={scale} value={scale}>{scale}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="genre">Genre *</Label>
          <Select value={formData.genre} onValueChange={(val) => handleChange('genre', val)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {GENRES.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="mood">Mood *</Label>
          <Select value={formData.mood} onValueChange={(val) => handleChange('mood', val)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select mood" />
            </SelectTrigger>
            <SelectContent>
              {MOODS.map(mood => (
                <SelectItem key={mood} value={mood}>{mood}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            placeholder="808, melodic, hard"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="priceBasic">Basic License Price ($) *</Label>
          <Input
            id="priceBasic"
            type="number"
            value={formData.priceBasic}
            onChange={(e) => handleChange('priceBasic', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="pricePremium">Premium License Price ($) *</Label>
          <Input
            id="pricePremium"
            type="number"
            value={formData.pricePremium}
            onChange={(e) => handleChange('pricePremium', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="priceExclusive">Exclusive License Price ($) *</Label>
          <Input
            id="priceExclusive"
            type="number"
            value={formData.priceExclusive}
            onChange={(e) => handleChange('priceExclusive', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="artwork">Album Artwork *</Label>
        <Input
          id="artwork"
          type="file"
          accept="image/*"
          onChange={(e) => setArtworkFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      <div>
        <Label htmlFor="audio">Audio File (MP3)</Label>
        <Input
          id="audio"
          type="file"
          accept="audio/mp3,audio/mpeg"
          onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <Label htmlFor="soundcloud">SoundCloud URL (alternative to audio file)</Label>
        <Input
          id="soundcloud"
          type="url"
          value={formData.soundcloudUrl}
          onChange={(e) => handleChange('soundcloudUrl', e.target.value)}
          placeholder="https://soundcloud.com/..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.isFeatured}
          onCheckedChange={(checked) => handleChange('isFeatured', checked)}
        />
        <Label htmlFor="featured">Featured Beat</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="active"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleChange('isActive', checked)}
        />
        <Label htmlFor="active">Active / Published</Label>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Uploading...' : 'Upload Beat'}
      </Button>
    </form>
  );
};

export default BeatUploadForm;
