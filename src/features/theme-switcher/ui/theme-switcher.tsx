'use client'

import { MonitorIcon, MoonIcon, SunIcon, type LucideIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useId, useSyncExternalStore } from 'react'
import { cn } from 'shared/lib/utilities'
import { Button } from 'shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu'
import { ToggleGroup, ToggleGroupItem } from 'shared/ui/toggle-group'

const themePreferences = ['system', 'light', 'dark'] as const

type ThemePreference = (typeof themePreferences)[number]

export type ThemeSwitcherLabels = {
  label: string
  system: string
  light: string
  dark: string
}

const themeOptions: Array<{
  icon: LucideIcon
  value: ThemePreference
}> = [
  { icon: MonitorIcon, value: 'system' },
  { icon: SunIcon, value: 'light' },
  { icon: MoonIcon, value: 'dark' },
]

const unsubscribe = () => {}
const subscribe = () => unsubscribe
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function useMounted() {
  return useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  )
}

function isThemePreference(value: string | undefined): value is ThemePreference {
  return (
    typeof value === 'string' &&
    (themePreferences as readonly string[]).includes(value)
  )
}

function getThemePreference(theme: string | undefined): ThemePreference {
  return isThemePreference(theme) ? theme : 'system'
}

function ThemePreferenceIcon({
  animated = false,
  preference,
}: {
  animated?: boolean
  preference: ThemePreference
}) {
  const Icon =
    themeOptions.find(({ value }) => value === preference)?.icon ?? MonitorIcon

  return (
    <Icon
      key={preference}
      aria-hidden="true"
      className={cn(
        animated && 'animate-in fade-in zoom-in-75 duration-200',
      )}
      data-icon="inline-start"
    />
  )
}

function ThemeSwitcherPlaceholder() {
  return (
    <Button
      aria-hidden="true"
      disabled
      size="icon"
      tabIndex={-1}
      variant="ghost"
    >
      <MonitorIcon
        aria-hidden="true"
        className="opacity-0"
        data-icon="inline-start"
      />
    </Button>
  )
}

export function DesktopThemeSwitcher({
  labels,
}: {
  labels: ThemeSwitcherLabels
}) {
  const mounted = useMounted()
  const { setTheme, theme } = useTheme()

  if (!mounted) return <ThemeSwitcherPlaceholder />

  const preference = getThemePreference(theme)
  const triggerLabel = `${labels.label}: ${labels[preference]}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={triggerLabel}
            size="icon"
            title={triggerLabel}
            variant="ghost"
          />
        }
      >
        <ThemePreferenceIcon
          animated
          preference={preference}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44"
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>{labels.label}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={preference}
            onValueChange={(value) => {
              if (isThemePreference(value)) setTheme(value)
            }}
          >
            {themeOptions.map(({ icon: Icon, value }) => (
              <DropdownMenuRadioItem
                key={value}
                closeOnClick
                value={value}
              >
                <Icon aria-hidden="true" />
                {labels[value]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function MobileThemeSwitcher({
  labels,
}: {
  labels: ThemeSwitcherLabels
}) {
  const labelId = useId()
  const mounted = useMounted()
  const { setTheme, theme } = useTheme()
  const preference = getThemePreference(theme)

  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-xs font-semibold text-muted-foreground"
        id={labelId}
      >
        {labels.label}
      </span>
      <ToggleGroup
        aria-labelledby={labelId}
        className="w-full"
        disabled={!mounted}
        onValueChange={(values) => {
          const value = values[0]

          if (isThemePreference(value)) setTheme(value)
        }}
        size="sm"
        spacing={0}
        value={mounted ? [preference] : []}
        variant="outline"
      >
        {themeOptions.map(({ value }) => (
          <ToggleGroupItem
            key={value}
            className="min-h-11 min-w-0 flex-1"
            value={value}
          >
            {labels[value]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
