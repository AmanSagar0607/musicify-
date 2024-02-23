import React, { useState } from "react";
import { MdPlayArrow, MdPause, MdCloudUpload } from "react-icons/md";
import AudioPlayer from "./AudioPlayer";
import { songs as defaultSongs } from "./songs";

export default function App() {
  const [songs, setSongs] = useState(defaultSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);

  const currentSong = songs[currentSongIndex];

  const handleSongUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const newSong = {
      title: file.name,
      src: URL.createObjectURL(file),
    };

    setSongs([...songs, newSong]);
    setCurrentSongIndex(songs.length); // Play the newly added song
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-8 flex-1 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8 ">Music Player</h1>
        <label
          htmlFor="upload"
          className="mb-6 pb-3 mt-5cursor-pointer flex items-center w-44 max-h-lvh border-2 rounded-lg border-green-500 ">
          <MdCloudUpload className=" animate-bounce mr-2.5 mt-4 ml-7" />{" "}
          <h2 className="mt-2.5">Upload Song</h2>
          <input
            id="upload"
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleSongUpload}
          />
        </label>
        <ul>
          {songs.map((song, index) => (
            <li key={song.title} className="mb-1">
              <button
                onClick={() => setCurrentSongIndex(index)}
                className={`flex items-center py-4 px-3  w-full space-evenly rounded ${
                  currentSongIndex === index
                    ? "bg text-green-500"
                    : " hover:bg-green-500 hover:text-white"
                }`}
              >
                <span className="text-sm">
                  {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                </span>
                <h2 className="flex-1">{song.title}</h2>
                <span>
                  {index === currentSongIndex ? (
                    <MdPause size={20} />
                  ) : (
                    <MdPlayArrow size={20} />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <AudioPlayer
          key={currentSongIndex}
          currentSong={currentSong}
          songCount={songs.length}
          songIndex={currentSongIndex}
          onNext={() => setCurrentSongIndex((i) => i + 1)}
          onPrev={() => setCurrentSongIndex((i) => i - 1)}
        />
      </div>
    </div>
  );
}
