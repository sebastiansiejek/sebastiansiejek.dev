'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

type TurnstileOptions = {
  action: string
  appearance: 'interaction-only'
  callback: (token: string) => void
  'error-callback': () => void
  execution: 'execute'
  'expired-callback': () => void
  language: 'pl' | 'en'
  sitekey: string
  theme: 'auto'
  'timeout-callback': () => void
}

type TurnstileApi = {
  execute: (widgetId: string) => void
  remove: (widgetId: string) => void
  render: (container: HTMLElement, options: TurnstileOptions) => string
  reset: (widgetId: string) => void
}

function getTurnstile() {
  return (globalThis as { turnstile?: TurnstileApi }).turnstile
}

type TurnstileProperties = {
  executeSignal: number
  locale: 'pl' | 'en'
  onError: () => void
  onVerify: (token: string) => void
  resetSignal: number
  siteKey: string
}

export function Turnstile({
  executeSignal,
  locale,
  onError,
  onVerify,
  resetSignal,
  siteKey,
}: TurnstileProperties) {
  const containerReference = useRef<HTMLDivElement>(null)
  const widgetIdReference = useRef<string | undefined>(undefined)
  const previousResetSignalReference = useRef(resetSignal)
  const [scriptReady, setScriptReady] = useState(false)

  const handleReady = useCallback(() => setScriptReady(true), [])

  useEffect(() => {
    const container = containerReference.current
    const turnstile = getTurnstile()

    if (!scriptReady || !container || !turnstile || !siteKey) return

    widgetIdReference.current = turnstile.render(container, {
      sitekey: siteKey,
      action: 'contact',
      appearance: 'interaction-only',
      execution: 'execute',
      language: locale,
      theme: 'auto',
      callback: onVerify,
      'expired-callback': onError,
      'error-callback': onError,
      'timeout-callback': onError,
    })

    return () => {
      const currentTurnstile = getTurnstile()

      if (widgetIdReference.current && currentTurnstile) {
        currentTurnstile.remove(widgetIdReference.current)
        widgetIdReference.current = undefined
      }
    }
  }, [locale, onError, onVerify, scriptReady, siteKey])

  useEffect(() => {
    const turnstile = getTurnstile()

    if (executeSignal > 0 && widgetIdReference.current && turnstile) {
      turnstile.execute(widgetIdReference.current)
    }
  }, [executeSignal, scriptReady])

  useEffect(() => {
    const turnstile = getTurnstile()

    if (
      previousResetSignalReference.current !== resetSignal &&
      widgetIdReference.current &&
      turnstile
    ) {
      turnstile.reset(widgetIdReference.current)
    }

    previousResetSignalReference.current = resetSignal
  }, [resetSignal])

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onError={onError}
        onReady={handleReady}
      />
      <div ref={containerReference} data-sentry-block />
    </>
  )
}
