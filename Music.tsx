import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Music as MusicIcon, Play, Pause } from 'lucide-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface Track {
  title: string;
  artist: string;
  duration: string;
  url: string;
  category: string;
}

const tracks: Track[] = [
  {
    title: 'Peaceful Rain',
    artist: 'Nature Sounds',
    duration: '5:30',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_1b0ab0042e.mp3',
    category: 'Nature'
  },
  {
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    duration: '6:15',
    url: 'https://cdn.pixabay.com/download/audio/2021/10/25/audio_d1a76f2f60.mp3',
    category: 'Nature'
  },
  {
    title: 'Meditation Bell',
    artist: 'Zen Music',
    duration: '4:45',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3',
    category: 'Meditation'
  }
];

const Music = () => {
  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <MusicIcon className="h-6 w-6 mr-2" />
                Peaceful Music
              </h1>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4">
              {tracks.map((track) => (
                <div
                  key={track.title}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    currentTrack?.title === track.title
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => setCurrentTrack(track)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {currentTrack?.title === track.title ? (
                        <Pause className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <Play className="h-5 w-5 text-gray-600" />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{track.title}</h3>
                        <p className="text-sm text-gray-500">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{track.duration}</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        {track.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentTrack && (
            <div className="border-t border-gray-200 p-4">
              <AudioPlayer
                src={currentTrack.url}
                showJumpControls={false}
                customProgressBarSection={[]}
                customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
                autoPlayAfterSrcChange={true}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Music;