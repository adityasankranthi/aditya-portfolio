'use client';
import React, { useEffect, useState } from 'react';

export const InteractiveCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div
                    className="cursor-glow"
                    style={{
                        left: `${mousePosition.x - 10}px`,
                        top: `${mousePosition.y - 10}px`,
                    }}
                />
            )}
        </>
    );
};

export const FloatingParticles = () => {
    const particles = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 4,
    }));

    return (
        <>
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className={`floating-particle particle-${(particle.id % 5) + 1}`}
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: `rgba(0, 246, 255, ${0.3 + Math.random() * 0.5})`,
                        borderRadius: '50%',
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}
        </>
    );
};

export const EmojiReaction = ({ x, y, emoji }: { x: number; y: number; emoji: string }) => {
    return (
        <div
            className="emoji-reaction"
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            {emoji}
        </div>
    );
};

export const useEmojiReactions = () => {
    const [reactions, setReactions] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);
    const [nextId, setNextId] = useState(0);
    const emojis = ['🚀', '✨', '⚡', '💡', '🎉', '🔥', '💯', '🌟'];

    const triggerReaction = (x: number, y: number) => {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const id = nextId;
        setNextId(id + 1);
        setReactions((prev) => [...prev, { id, x, y, emoji }]);

        setTimeout(() => {
            setReactions((prev) => prev.filter((r) => r.id !== id));
        }, 1500);
    };

    return { reactions, triggerReaction };
};

export const useClickRipple = () => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [nextId, setNextId] = useState(0);

    const triggerRipple = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = nextId;
        setNextId(id + 1);

        setRipples((prev) => [...prev, { id, x, y }]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
    };

    return { ripples, triggerRipple };
};
