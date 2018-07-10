import { h } from 'hyperapp'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import styles from './styles.css'

let editor
function setupCodeEditor(element, code) {
  editor = CodeMirror(element, {
    mode: 'javascript',
    theme: 'dracula',
    value: JSON.stringify(code, null, 2)
  })
}

function save(props) {
  let updatedCode
  try {
    updatedCode = JSON.parse(editor.getValue())
  } catch (e) {
    return alert('Invalid JSON')
  }
  props.updateCommandsAndPlay(updatedCode)
  props.toggleEditingCommands()
}

export const commandEditor = props =>
  h('div', { class: styles.commandEditor }, [
    h('div', { class: styles.code }, [h('div', { oncreate: el => setupCodeEditor(el, props.commands) })]),
    h('button', { onclick: () => save(props) }, 'Save'),
    h('button', { onclick: props.toggleEditingCommands }, 'Cancel')
  ])
