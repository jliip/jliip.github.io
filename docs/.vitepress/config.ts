import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Personal Lab Notes',
  description: 'Minimal personal website for projects, blog, and research.',
  themeConfig: {
    nav: [
      { text: 'About', link: '/about' },
      { text: 'Projects', link: '/projects' },
      { text: 'Blog', link: '/blog' },
      { text: 'Research', link: '/research' }
    ],
    sidebar: [
      {
        text: 'Sections',
        items: [
          { text: 'About', link: '/about' },
          { text: 'Projects', link: '/projects' },
          { text: 'Blog', link: '/blog' },
          { text: 'Research', link: '/research' }
        ]
      },
      {
        text: 'Some Online Projects',
        items: [
          { text: 'UST Room', link: 'https://jliip.github.io/ust_room/' },
          { text: 'FarmTime!', link: 'https://yunxinz.github.io/farm-time/' },
          { text: '', link: '' }
        ]
      }
    ],
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jliip' }
    ]
  }
})
