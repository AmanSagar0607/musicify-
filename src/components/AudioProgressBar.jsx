// import React from 'react';

export default function AudioProgressBar(props) {
  const { duration, currentProgress, buffered, ...rest } = props;

  // Calculate the duration in minutes and seconds
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration - durationMinutes * 60);

  // Format the duration display for start and end
  const startDurationDisplay = `0:00`;
  const endDurationDisplay = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

  const progressBarWidth = isNaN(currentProgress / duration) ? 0 : currentProgress / duration;
  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const progressStyles = {
    '--progress-width': progressBarWidth,
    '--buffered-width': bufferedWidth,
  };

  return (
    <div className="absolute h-1 -top-[4px] left-0 right-0 group">
      <div className="flex justify-between text-xs text-slate-300 px-2 pt-3">
        <span>{startDurationDisplay}</span>
        <span>{endDurationDisplay}</span>
      </div>
      <input
        type="range"
        name="progress"
        className={`progress-bar absolute inset-0 w-full m-0 h-full bg-transparent appearance-none cursor-pointer dark:bg-gray-300 group-hover:h-2 transition-all accent-green-500 hover:accent-green-500 before:absolute before:inset-0 before:h-full before:w-full before:bg-green-400 before:origin-left after:absolute after:h-full after:w-full after:bg-green-500/0`}
        style={progressStyles}
        min={0}
        max={duration}
        value={currentProgress}
        {...rest}
      />
    </div>
  );
}
