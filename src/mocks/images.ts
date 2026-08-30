import aboutImage from '@/assets/images/about.png'
import avatarImage from '@/assets/images/avatar.png'
import newsThumbImage from '@/assets/images/news-thumb.png'
import pastEventImage from '@/assets/images/past-event.png'
import slide1Image from '@/assets/images/slide-1.png'
import slide2Image from '@/assets/images/slide-2.png'
import slide3Image from '@/assets/images/slide-3.png'
import slide4Image from '@/assets/images/slide-4.png'
import slide5Image from '@/assets/images/slide-5.png'
import partnerLogo from '@/assets/icons/partner-logo.svg'

export const images = {
  about: aboutImage,
  newsThumb: newsThumbImage,
  pastEvent: pastEventImage,
  avatar: avatarImage,
  slides: [slide1Image, slide2Image, slide3Image, slide4Image, slide5Image],
  partnerLogo,
} as const
