import React, { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export const CursorGlow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const mouseX = useSpring(-100, springConfig)
  const mouseY = useSpring(-100, springConfig)

  useEffect(() => {
    // Only enable for fine pointers (mouse) and not touch devices
    const mediaQuery = window.matchMedia('(pointer: fine)')
    if (!mediaQuery.matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 hidden lg:block"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div className="w-96 h-96 rounded-full bg-gradient-to-r from-[#D49B24]/8 via-[#EC4899]/6 to-[#8B5CF6]/8 blur-3xl" />
    </motion.div>
  )
}
