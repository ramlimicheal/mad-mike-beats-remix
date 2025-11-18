import React from 'react';

interface SoundCloudEmbedProps {
  url: string;
  height?: number;
  autoPlay?: boolean;
  showComments?: boolean;
  showUser?: boolean;
  color?: string;
}

/**
 * SoundCloud Embed Player Component
 * 
 * To get your track URL:
 * 1. Upload your beat to SoundCloud
 * 2. Go to the track page
 * 3. Click "Share" -> "Embed" 
 * 4. Copy the track URL from the iframe src
 * 
 * Or use this format: https://soundcloud.com/YOUR_USERNAME/TRACK_NAME
 */
export const SoundCloudEmbed: React.FC<SoundCloudEmbedProps> = ({
  url,
  height = 166,
  autoPlay = false,
  showComments = false,
  showUser = true,
  color = 'ff5500', // Orange default, change to match your brand
}) => {
  // Encode the URL for the SoundCloud player
  const encodedUrl = encodeURIComponent(url);
  
  const playerUrl = `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23${color}&auto_play=${autoPlay}&hide_related=true&show_comments=${showComments}&show_user=${showUser}&show_reposts=false&show_teaser=false&visual=true`;

  return (
    <div className="soundcloud-embed-wrapper w-full">
      <iframe
        width="100%"
        height={height}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={playerUrl}
        className="rounded-lg"
        title="SoundCloud Player"
      />
    </div>
  );
};

// Compact version for smaller spaces
export const SoundCloudEmbedCompact: React.FC<SoundCloudEmbedProps> = (props) => {
  return <SoundCloudEmbed {...props} height={120} />;
};
