import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import AvatarFooter from './AvatarFooter.vue'
import './custom.css'

export default {
	...DefaultTheme,
	Layout() {
		return h(DefaultTheme.Layout, null, {
			'sidebar-nav-after': () => h(AvatarFooter)
		})
	}
}
