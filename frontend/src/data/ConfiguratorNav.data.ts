import { CS2, Fortnite, Spotify, Valorant } from '@/components/icons'
import { Bell, Crosshair, House, MessageSquare, Settings } from 'lucide-vue-next'

interface ConfiguratorLink {
  label: string
  link?: string
  color?: string
  description: string
  status?: 'process' | 'disabled' | 'release'
  icon: any
  disabled?: boolean
}

interface ConfiguratorSection {
  title: string
  links: ConfiguratorLink[]
}

export const CONFIGURATOR_NAV_DATA: ConfiguratorSection[] = [
  {
    title: 'sidebar.navigation.title.start',
    links: [
      {
        label: 'sidebar.navigation.links.home',
        description: 'sidebar.navigation.description.home',
        link: 'configurator-home',
        icon: House,
        color: '#4A90E2',
      },
    ],
  },
  {
    title: 'sidebar.navigation.title.overlays',
    links: [
      {
        label: 'sidebar.navigation.links.valorant',
        description: 'sidebar.navigation.description.valorant',
        link: 'configurator-valorant',
        icon: Valorant,
        color: '#F53A2D',
        status: 'release',
      },
      {
        label: 'sidebar.navigation.links.spotify',
        description: 'sidebar.navigation.description.spotify',
        link: 'configurator-spotify',
        icon: Spotify,
        color: '#1DB954',
        disabled: false,
        status: 'process',
      },
      {
        label: 'sidebar.navigation.links.counter_strike',
        description: 'sidebar.navigation.description.counter_strike',
        icon: CS2,
        color: '#FB9A0E',
        disabled: true,
        status: 'process',
      },
      {
        label: 'sidebar.navigation.links.fortnite',
        description: 'sidebar.navigation.description.fortnite',
        icon: Fortnite,
        color: '#9D4DBB',
        disabled: true,
        status: 'process',
      },
    ],
  },
  {
    title: 'sidebar.navigation.title.bots',
    links: [
      {
        label: 'sidebar.navigation.links.chat',
        description: 'sidebar.navigation.description.chat',
        icon: MessageSquare,
        color: '#FF6F61',
        disabled: true,
        status: 'process',
      },
      {
        label: 'sidebar.navigation.links.notification',
        description: 'sidebar.navigation.description.notification',
        icon: Bell,
        color: '#FF9F00',
        disabled: true,
        status: 'process',
      },
    ],
  },
  {
    title: 'sidebar.navigation.title.others',
    links: [
      {
        label: 'sidebar.navigation.links.crosshairs',
        description: 'sidebar.navigation.description.crosshairs',
        icon: Crosshair,
        color: '#8B0000',
        disabled: true,
        status: 'process',
      },
      {
        label: 'sidebar.navigation.links.settings',
        description: 'sidebar.navigation.description.settings',
        icon: Settings,
        color: '#778899',
        disabled: true,
        status: 'process',
      },
    ],
  },
]
