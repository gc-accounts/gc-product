'use client'
import { useEffect } from 'react'

export default function HydrationFix() {
  useEffect(() => {
    // Remove all fdprocessedid attributes from the entire document
    const removeFdProcessedIds = () => {
      const elements = document.querySelectorAll('[fdprocessedid]')
      elements.forEach(el => {
        el.removeAttribute('fdprocessedid')
      })
    }

    // Run immediately
    removeFdProcessedIds()

    // Run after a short delay to catch any dynamically added ones
    const timeoutId = setTimeout(removeFdProcessedIds, 100)
    
    // Set up a MutationObserver to catch any future additions
    const observer = new MutationObserver((mutations) => {
      let shouldCleanup = false
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && (node as Element).hasAttribute('fdprocessedid')) {
            shouldCleanup = true
          }
        })
      })
      if (shouldCleanup) {
        removeFdProcessedIds()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  return null
}