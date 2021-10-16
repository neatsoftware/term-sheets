import { h } from 'hyperapp'
import { terminalView } from '../terminal'
import { controlsView } from '../controls'
import styles from './styles.css'

export const appView = (props) =>
  h('div', { class: styles.app }, [
    h('div', { class: styles.exportContainer, oncreate: props.updateTerminalEl }, [h(terminalView, props)]),
    h(controlsView, props)
  ])
