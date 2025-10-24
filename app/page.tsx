"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Heart } from "lucide-react"
import Image from "next/image"

export default function AnniversaryPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [heartGameActive, setHeartGameActive] = useState(false)
  const [heartGameCompleted, setHeartGameCompleted] = useState(false)
  const [showWinMessage, setShowWinMessage] = useState(false)
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [showConnectingLine, setShowConnectingLine] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      }
      setFloatingHearts((prev) => [...prev.slice(-10), newHeart])
    }, 800)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentPage === 4) {
      setShowConnectingLine(false)
      const timer = setTimeout(() => {
        setShowConnectingLine(true)
        // Trigger fireworks
        const fireworksInterval = setInterval(() => {
          const newFirework = {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
          }
          setFireworks((prev) => [...prev.slice(-20), newFirework])
        }, 100)

        return () => clearInterval(fireworksInterval)
      }, 5000)

      return () => clearTimeout(timer)
    } else {
      setShowConnectingLine(false)
      setFireworks([])
    }
  }, [currentPage])

  const pages = [
    {
      title: "Happy Anniversary",
      subtitle: "To My Favorite Person",
      content:
        "Today we celebrate the beautiful journey we've shared together. Every moment with you is a treasure I hold close to my heart.",
      emoji: "💕",
    },
    {
      title: "Our Story",
      subtitle: "A Love Worth Celebrating",
      content:
        "From the first day we met, I knew you were someone special. You've brought so much joy, laughter, and love into my life. Thank you for being my greatest adventure.",
      emoji: "✨",
    },
    {
      title: "Connect Our Hearts",
      subtitle: "Tap the Middle Box",
      content: "Complete the line to show how our hearts are connected. Tap the center box to win my heart!",
      emoji: "💕",
      isHeartGame: true,
    },
    {
      title: "Forever Grateful",
      subtitle: "For You, For Us",
      content:
        "For every smile, every hug, every moment we've shared. For standing by me through thick and thin. For being the person who makes my heart skip a beat. I love you more each day.",
      emoji: "🌹",
      hasImage: true,
    },
    {
      title: "Here's to Us",
      subtitle: "And Many More Years",
      content:
        "Let's continue writing our story together. With you by my side, I know the best is yet to come. Happy Anniversary to the love of my life.",
      emoji: "💑",
    },
  ]

  const currentPageData = pages[currentPage]
  const isLastPage = currentPage === pages.length - 1

  const handleNext = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1)
      if (currentPage + 1 === 2) {
        setHeartGameActive(true)
        setHeartGameCompleted(false)
        setShowWinMessage(false)
      } else {
        setHeartGameActive(false)
      }
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      setHeartGameActive(false)
    }
  }

  const handleHeartTap = () => {
    setHeartGameCompleted(true)
    setShowWinMessage(true)
    setTimeout(() => {
      setShowWinMessage(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl animate-pulse"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animation: `float 6s ease-in forwards`,
              opacity: 0.3,
            }}
          >
            ✨
          </div>
        ))}
        {fireworks.map((firework) => (
          <div
            key={firework.id}
            className="absolute text-3xl"
            style={{
              left: `${firework.x}%`,
              top: `${firework.y}%`,
              animation: `fireworks 1.5s ease-out forwards`,
              pointerEvents: "none",
            }}
          >
            💕
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes heartBeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawLine {
          from {
            stroke-dashoffset: 200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(236, 72, 153, 0);
          }
        }

        @keyframes pop-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes fireworks {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }

        .animate-heart-beat {
          animation: heartBeat 1.5s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out;
        }

        .heart-line {
          stroke-dasharray: 200;
          animation: drawLine 1.5s ease-in-out forwards;
        }

        .heart-tap-box {
          animation: pulse-glow 2s infinite;
        }

        .win-message {
          animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .floating-heart {
          animation: float-up 2s ease-out forwards;
        }

        .connecting-line {
          animation: drawLine 1.5s ease-in-out forwards;
        }
      `}</style>

      <div className="w-full max-w-2xl relative z-10">
        {/* Main Card */}
        <div className="bg-background rounded-2xl shadow-2xl overflow-hidden border border-border animate-slide-in">
          {/* Header with decorative elements */}
          <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 px-8 py-12 text-center">
            <div className="absolute top-4 left-4 text-2xl opacity-50 animate-pulse">✨</div>
            <div className="absolute top-4 right-4 text-2xl opacity-50 animate-pulse">✨</div>

            <div className={`text-5xl mb-4 ${currentPageData.emoji === "💕" ? "animate-heart-beat" : ""}`}>
              {currentPageData.emoji}
            </div>

            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-2 tracking-wide">
              {currentPageData.title}
            </h1>
            <p className="text-lg text-primary font-light italic">{currentPageData.subtitle}</p>
          </div>

          {/* Content */}
          {!currentPageData.isHeartGame ? (
            <div className="px-8 py-12 md:py-16 text-center">
              <p className="text-lg md:text-xl text-foreground leading-relaxed font-light max-w-lg mx-auto mb-8">
                {currentPageData.content}
              </p>
              {currentPageData.hasImage && (
                <div className="space-y-8">
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-sm h-96 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-24%20at%2017.06.51_20c09b74-K7jXb5oYDIWf6JWF2cs0Iy7TUWJEdL.jpg"
                        alt="Our special moment"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {showConnectingLine && (
                    <div className="flex justify-center items-center">
                      <svg width="300" height="100" viewBox="0 0 300 100" className="relative">
                        {/* Left heart */}
                        <text x="30" y="50" fontSize="40" textAnchor="middle" dominantBaseline="middle">
                          💕
                        </text>

                        {/* Right heart */}
                        <text x="270" y="50" fontSize="40" textAnchor="middle" dominantBaseline="middle">
                          💕
                        </text>

                        {/* Connecting line */}
                        <line
                          x1="70"
                          y1="50"
                          x2="230"
                          y2="50"
                          stroke="#ec4899"
                          strokeWidth="3"
                          className="connecting-line"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="px-8 py-12 md:py-16">
              <p className="text-center text-lg text-foreground mb-12">{currentPageData.content}</p>

              {/* Heart Connection Game */}
              <div className="flex justify-center items-center mb-8">
                <svg width="300" height="200" viewBox="0 0 300 200" className="relative">
                  {/* Left heart */}
                  <text x="30" y="100" fontSize="48" textAnchor="middle" dominantBaseline="middle">
                    💕
                  </text>

                  {/* Right heart */}
                  <text x="270" y="100" fontSize="48" textAnchor="middle" dominantBaseline="middle">
                    💕
                  </text>

                  {/* Left line */}
                  <line
                    x1="70"
                    y1="100"
                    x2="130"
                    y2="100"
                    stroke="#ec4899"
                    strokeWidth="3"
                    className={heartGameCompleted ? "heart-line" : "opacity-30"}
                  />

                  {/* Right line */}
                  <line
                    x1="170"
                    y1="100"
                    x2="230"
                    y2="100"
                    stroke="#ec4899"
                    strokeWidth="3"
                    className={heartGameCompleted ? "heart-line" : "opacity-30"}
                  />
                </svg>
              </div>

              {/* Tap box */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleHeartTap}
                  disabled={heartGameCompleted}
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all ${
                    heartGameCompleted
                      ? "bg-primary text-primary-foreground scale-110"
                      : "bg-muted hover:bg-primary/20 heart-tap-box cursor-pointer"
                  }`}
                >
                  💕
                </button>
              </div>

              {/* Win message */}
              {showWinMessage && (
                <div className="text-center space-y-4">
                  <div className="win-message text-3xl font-bold text-primary">You Won My Heart! 💕</div>
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="floating-heart text-2xl" style={{ animationDelay: `${i * 0.1}s` }}>
                        💕
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {heartGameCompleted && !showWinMessage && (
                <p className="text-center text-primary font-semibold">Our hearts are connected! 💕</p>
              )}
            </div>
          )}

          {/* Page Indicator */}
          <div className="flex justify-center gap-2 pb-8">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index)
                  if (index === 2) {
                    setHeartGameActive(true)
                  } else {
                    setHeartGameActive(false)
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentPage ? "bg-primary w-8" : "bg-border w-2 hover:bg-muted"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-8 pb-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="px-6 py-2 rounded-full border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="text-sm text-muted-foreground">
              {currentPage + 1} / {pages.length}
            </div>

            {!isLastPage && (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Next
                <ChevronRight size={18} />
              </button>
            )}
            {isLastPage && <div className="px-6 py-2" />}
          </div>

          {/* Footer */}
          <div className="bg-muted/50 px-8 py-6 text-center border-t border-border">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Heart size={16} fill="currentColor" className="animate-heart-beat" />
              <p className="text-sm font-light">With all my love</p>
              <Heart size={16} fill="currentColor" className="animate-heart-beat" />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p>Forever yours</p>
        </div>
      </div>
    </main>
  )
}
