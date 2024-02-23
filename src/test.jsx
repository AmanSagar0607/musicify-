import * as React from 'react';

export default function App() {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const progressBarRef = React.useRef<HTMLSpanElement | null>(null);
  const bufferedBarRef = React.useRef<HTMLSpanElement | null>(null);

  const [isReady, setIsReady] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [buffered, setBuffered] = React.useState(0);
  const [volume, setVolume] = React.useState(0.2);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  return (
    <>
      <div>
        <h1>Audio Player</h1>

        <audio
          ref={audioRef}
          controls
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onCanPlay={() => setIsReady(true)}
          onTimeUpdate={(e) => {
            setCurrentProgress(e.currentTarget.currentTime);
            handleBufferProgress(e);
          }}
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        >
          <source
            type="audio/mpeg"
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3"
          />
        </audio>

        <div>
          <label htmlFor="progress">Progress</label>
          <input
            name="progress"
            type="range"
            min={0}
            max={duration}
            value={currentProgress}
            onChange={(e) => {
              if (!audioRef.current) return;
              audioRef.current.currentTime = Number(e.target.value);
              setCurrentProgress(Number(e.target.value));
            }}
          />
          <label htmlFor="volume">Volume</label>
          <input
            name="volume"
            type="range"
            min={0}
            step={0.05}
            max={1}
            value={volume}
            onChange={(e) => {
              if (!audioRef.current) return;
              audioRef.current.volume = Number(e.target.value);
              setVolume(Number(e.target.value));
            }}
          />
          <p>{duration}</p>
          <button disabled={!isReady} onClick={togglePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div style={{ position: 'relative', margin: 10 }}>
            <span
              style={{
                width: 300,
                height: 24,
                backgroundColor: 'silver',
                display: 'block',
                marginBottom: 4,
                position: 'absolute',
                inset: 0,
              }}
              ref={bufferedBarRef}
            ></span>
            <span
              style={{
                width: 300 * (currentProgress / duration),
                backgroundColor: 'green',
                ...progressStyles,
              }}
              ref={progressBarRef}
            ></span>
            <span
              style={{
                width: 300 * (buffered / duration),
                backgroundColor: 'green',
                opacity: 0.3,
                ...progressStyles,
              }}
              ref={bufferedBarRef}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
}
