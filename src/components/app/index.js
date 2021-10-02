import { h } from 'hyperapp'
import { terminalView } from '../terminal'
import { controlsView } from '../controls'
import styles from './styles.css'

export const appView = (props) =>
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
      h(
        'a',
        { href: 'https://neat.software', target: '_blank', rel: 'noopener' },
        `© ${new Date().getFullYear()} Neat Software Co.`
      ),
      ' | ',
      h(
        'a',
        { href: 'https://github.com/neatsoftware/term-sheets', target: '_blank', rel: 'noopener' },
        'View Source on Github'
      )
    ])
  ])
