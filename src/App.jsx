import React, { useRef, useState } from 'react';
import './App.css';  // Import the CSS file

const App = () => {

  const songList = [
    { title: "Song 1", artist: "Artist 1", src: "src/yt1s.com - Howling at the Moon.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "src/Y2Mate.is - Ikson - Blue Sky (Vlog No Copyright Music)-WlqmtiHygGM-160k-1645377329836.mp3" },
    // Add more songs
  ];

  const [currentSong, setCurrentSong] = useState(songList[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null); // Reference to the audio element

  const playSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const skipNext = () => {
    const currentSongIndex = songList.findIndex(song => song.title === currentSong.title);
    const nextIndex = (currentSongIndex + 1) % songList.length;
    setCurrentSong(songList[nextIndex]);
  };

  const skipPrev = () => {
    const currentSongIndex = songList.findIndex(song => song.title === currentSong.title);
    const prevIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    setCurrentSong(songList[prevIndex]);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="music-player">
      <span>Playing: {currentSong.title}</span>
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      ></audio>

      <div className="controls">
        <button onClick={skipPrev}>⏮️</button>
        <button onClick={isPlaying ? pauseSong : playSong}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button onClick={skipNext}>⏭️</button>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100}
        onChange={handleSeek}
      />
    </div>
  );
};

export default App;
