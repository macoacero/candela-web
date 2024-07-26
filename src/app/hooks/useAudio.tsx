import { useState, useEffect, useRef, useCallback } from 'react';

const useAudio = (url: string): [boolean, () => void, number, (volume: number) => void] => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.4);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(url);
        } else {
            audioRef.current.src = url;
            audioRef.current.load();
        }

        const audio = audioRef.current;

        return () => {
            audio?.pause();
        };
    }, [url]); 

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = Math.min(1, Math.max(0, volume));
        }
    }, [volume]); 

    const toggle = useCallback(() => {
        if (audioRef.current) {
            const audio = audioRef.current;
            if (playing) {
                audio.pause();
            } else {
                audio.play().catch((error) => console.error('Error playing audio:', error));
            }
            setPlaying(prev => !prev);
        }
    }, [playing]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => setPlaying(false);

        if (audio) {
            audio.addEventListener('ended', handleEnded);
            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, []); 

    return [playing, toggle, volume, setVolume];
};

export default useAudio;
