import { Discord, Github, Hearts, Telegram, Twitch } from '@/components/icons'

interface SocialLinks {
  name: string
  url: string
  icon: any
}

export const SocialLinksData: SocialLinks = [
  {
    name: 'Discord',
    url: 'https://discord.gg/pYV4PBV5YW',
    icon: Discord,
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv/magicxcmd',
    icon: Twitch,
  },
  {
    name: 'Github',
    url: 'https://github.com/haxgun/valory',
    icon: Github,
  },
  {
    name: 'Telegram',
    url: 'https://t.me/magicxcmd',
    icon: Telegram,
  },
  {
    name: 'Donate',
    url: 'https://www.donationalerts.com/r/haxgun',
    icon: Hearts,
  },
]
