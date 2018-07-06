import { h } from 'hyperapp'
import { terminalView } from '../terminal'
import { controlsView } from '../controls'
import styles from './styles.css'

export const appView = props =>
  h('main', { class: styles.app }, [
    h('h1', { class: styles.appTitle }, [h('b', {}, 'Term'), 'Sheets']),
    h(
      'p',
      { class: styles.appTagline },
      'Create animated terminal presentations. Export as SVG, animated GIF, or HTML+CSS'
    ),
    h('div', { class: styles.exportContainer, oncreate: props.updateTerminalEl }, [h(terminalView, props)]),
    h(controlsView, props),
    h('div', { class: styles.appLinks }, [
      h('a', { href: 'https://github.com/gpoitch/term-sheets', target: '_blank', rel: 'noopener' }, 'Github'),
      h('a', { href: 'https://twitter.com/gpoitch', target: '_blank', rel: 'noopener' }, 'Twitter')
    ])
  ])
