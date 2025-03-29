import Github from '@/components/icons/socials/Github.vue'
import Twitch from '@/components/icons/socials/Twitch.vue'
import Telegram from '@/components/icons/socials/Telegram.vue'
import Hearts from '@/components/icons/Hearts.vue'

interface SocialLinks {
  name: string
  url: string
  icon: any
}

export const SocialLinksData: SocialLinks = [
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
