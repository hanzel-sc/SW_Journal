import React, { useState, useEffect, useRef } from 'react';
import tracks from './tracks.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import './musicplayer.css';
function MusicPlayer() {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (!audioRef.current)
    {
      audioRef.current = new Audio();
    }
    if (tracks.length > 0) {
      const newTrack = tracks[trackIndex];
      setTrack(newTrack);
      audioRef.current.src = `${process.env.PUBLIC_URL}/music/${newTrack.file}`;

      audioRef.current.currentTime = 0;

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      audioRef.current.onended = () => {
        playNextTrack();
      }
      if (isPlaying)
      {
        audioRef.current.play();
      }

      return () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      };
    }
  }, [trackIndex]); 

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const playNextTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const playPreviousTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="music-player">
      {track ? (
        <div className="player-content">
          <h2 className="song-title">{track.name}</h2>
          <p className="artist-name">{track.artist}</p>

          {/* Time & Progress Bar */}
          <div className="time-bar">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="progress-bar"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>

          <div className="music-controls">
            <button className="prev-btn" onClick={playPreviousTrack}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
            
            <button className="play-pause-btn" onClick={togglePlayPause}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button className="next-btn" onClick={playNextTrack}>
              <FontAwesomeIcon icon={faForward} />
            </button>
</div>


        </div>
      ) : (
        <p>Loading music...</p>
      )}
    </div>
  );
}

// Helper function to format time (mm:ss)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export default MusicPlayer;
