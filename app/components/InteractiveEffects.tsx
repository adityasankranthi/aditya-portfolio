'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EasterEggState {
  logoClicks: number;
  konamiUnlocked: boolean;
  showKonamiMessage: boolean;
}

// Interactive Cursor Component
export const InteractiveCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-screen"
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: 'tween', duration: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-cyan-400 rounded-full opacity-20"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

// Floating Particles Component
export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-400/30 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Emoji Reaction Component
interface EmojiReactionProps {
  x: number;
  y: number;
  emoji: string;
}

export const EmojiReaction = ({ x, y, emoji }: EmojiReactionProps) => (
  <motion.div
    initial={{ x, y, opacity: 1, scale: 1 }}
    animate={{ y: y - 100, opacity: 0, scale: 0.5 }}
    transition={{ duration: 1 }}
    className="pointer-events-none fixed text-2xl font-bold z-40"
  >
    {emoji}
  </motion.div>
);

// Hook for emoji reactions
export const useEmojiReactions = () => {
  const [reactions, setReactions] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);
  const reactionIdRef = useRef(0);

  const triggerReaction = (x: number, y: number, emoji: string = '🎉') => {
    const id = reactionIdRef.current++;
    setReactions((prev) => [...prev, { id, x, y, emoji }]);

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
  };

  return { reactions, triggerReaction };
};

// Main Interactive Effects Manager (Loading + Easter Eggs)
const InteractiveEffectsManager = () => {
  const [loading, setLoading] = useState(true);
  const [easterEgg, setEasterEgg] = useState<EasterEggState>({
    logoClicks: 0,
    konamiUnlocked: false,
    showKonamiMessage: false,
  });
  const konamiSequenceRef = useRef<string[]>([]);

  // Funny loading messages
  const loadingMessages = [
    'Compiling resume...',
    'Optimizing recruiter experience...',
    'Loading cool projects...',
    'Brewing some coffee ☕',
    'Making code prettier...',
    'Debugging imposter syndrome...',
    'Loading the magic ✨',
    'Preparing to impress...',
    'Checking TypeScript strict mode...',
    'Calculating coolness factor...',
  ];

  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  // Rotate loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Konami Code Handler
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key === 'b' || e.key === 'B' ? 'b' : e.key === 'a' || e.key === 'A' ? 'a' : e.code;

      konamiSequenceRef.current.push(key);
      konamiSequenceRef.current = konamiSequenceRef.current.slice(-10);

      if (konamiSequenceRef.current.join(',') === konamiCode.join(',')) {
        setEasterEgg((prev) => ({
          ...prev,
          konamiUnlocked: true,
          showKonamiMessage: true,
        }));

        // Auto-hide message after 5 seconds
        const timer = setTimeout(() => {
          setEasterEgg((prev) => ({
            ...prev,
            showKonamiMessage: false,
          }));
        }, 5000);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Logo click counter
  const handleLogoClick = () => {
    setEasterEgg((prev) => {
      const newCount = prev.logoClicks + 1;

      // Trigger easter egg at 5 clicks
      if (newCount === 5) {
        return {
          ...prev,
          logoClicks: 0,
          showKonamiMessage: true,
        };
      }

      return {
        ...prev,
        logoClicks: newCount,
      };
    });
  };

  // Expose logo click handler to window for Header component
  useEffect(() => {
    (window as any).triggerLogoEasterEgg = handleLogoClick;
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-br from-[#0D0C1D] via-[#1a1a2e] to-[#16213e] flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="text-center">
              {/* Animated loading spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-[#00F6FF] border-t-transparent rounded-full mx-auto mb-8"
              />

              {/* Loading message */}
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="text-lg font-mono text-[#00F6FF] mb-4 h-6"
              >
                {currentMessage}
              </motion.p>

              {/* Subtle progress indicator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.5, ease: 'easeInOut' }}
                className="h-1 w-48 bg-gradient-to-r from-[#3A86FF] to-[#00FF88] rounded-full origin-left"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami Code Easter Egg Message */}
      <AnimatePresence>
        {easterEgg.showKonamiMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 246, 255, 0.3)',
                  '0 0 40px rgba(58, 134, 255, 0.5)',
                  '0 0 20px rgba(0, 246, 255, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-8 py-4 bg-gradient-to-r from-[#0D0C1D] to-[#1a1a2e] border-2 border-[#00F6FF] rounded-lg font-mono text-center"
            >
              <p className="text-[#00FF88] font-bold">🎮 YOU FOUND THE SECRET! 🎮</p>
              <p className="text-[#00F6FF] text-sm mt-1">
                {easterEgg.konamiUnlocked
                  ? 'Konami Code Master unlocked! Check the terminal for hidden messages...'
                  : 'Easter egg unlocked! Keep coding!'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo click counter visual (subtle indicator) */}
      <AnimatePresence>
        {easterEgg.logoClicks > 0 && easterEgg.logoClicks < 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-8 right-8 z-30 pointer-events-none"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3A86FF] to-[#00F6FF] rounded-full text-white font-mono text-sm"
            >
              <span className="text-yellow-300">⭐</span>
              {easterEgg.logoClicks} click{easterEgg.logoClicks !== 1 ? 's' : ''} ({5 - easterEgg.logoClicks} to go!)
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden achievement unlocked (shows when logo clicked 5 times) */}
      <AnimatePresence>
        {easterEgg.logoClicks === 0 && easterEgg.showKonamiMessage && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-8 left-8 z-30 pointer-events-none"
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00F6FF] rounded-lg text-[#0D0C1D] font-bold shadow-xl"
            >
              🎉 Achievement Unlocked: Curious Developer! 🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveEffectsManager;
