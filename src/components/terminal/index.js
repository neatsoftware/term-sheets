import { h } from 'hyperapp'
import styles from './terminal.css'

export const DELAY_TYPE_START = 750
export const DELAY_TYPE_CHAR = 35
export const DELAY_TYPE_SUBMIT = 350
export const DELAY_OUTPUT_LINE = 500

export const terminalView = (props) =>
  h(
    'div',
    {
      class: [styles.terminalContainer, props.background && styles.terminalBackground].filter(Boolean).join(' '),
      style: {
        width: props.width + 'px',
        height: props.height + 'px',
        backgroundImage: props.background ? `linear-gradient(${props.bgColor1}, ${props.bgColor2})` : null
      }
    },
    [h('div', { class: styles.terminal }, [h(terminalTitleView, props), h(terminalContentView, props)])]
  )

const terminalTitleView = ({ titleBar, title, windowButtons }) =>
  h(
    'div',
    { class: [titleBar && styles.terminalTitleBar, windowButtons && styles.terminalButtons].filter(Boolean).join(' ') },
    titleBar && title
  )

const terminalContentView = (props) => {
  const { commands, speed } = props
  const commandTimings = commands.reduce((timings, command, i) => {
    const inputTime =
      (DELAY_TYPE_START + DELAY_TYPE_CHAR * Array.from(command.input).length + DELAY_TYPE_SUBMIT) / speed
    const outputTime = command.output ? (DELAY_OUTPUT_LINE * command.output.length) / speed : 0
    const startDelay = timings.reduce((time, item) => time + item.inputTime + item.outputTime, 0)
    timings[i] = { inputTime, outputTime, startDelay }
    return timings
  }, [])

  return h('div', { class: styles.terminalContent }, [
    h(
      'div',
      { class: styles.terminalContentInner },
      commands.map((command, i) => h(terminalCommandView, Object.assign(props, { commandIndex: i, commandTimings })))
    )
  ])
}

const terminalCommandView = (props) => [h(terminalInputView, props), h(terminalOutputView, props)]

const terminalInputView = (props) => {
  const { commands, commandIndex, commandTimings, prompt, promptColor, speed } = props
  const command = commands[commandIndex]
  const { startDelay, inputTime } = commandTimings[commandIndex]
  const cursorHideDelay = startDelay + inputTime
  const input = command.input
  const isObj = typeof input === 'object'
  const content = isObj ? input.content : input
  const linePrompt = (isObj && input.prompt) || prompt
  return [
    h(
      'div',
      { class: styles.terminalPrompt, style: { color: promptColor, animationDelay: `${startDelay}ms` } },
      linePrompt
    ),
    h(
      'div',
      { class: styles.terminalInput, style: { animationDelay: `${startDelay}ms` } },
      Array.from(content).map((char, i) => {
        const charDelay = startDelay + DELAY_TYPE_START / speed + (DELAY_TYPE_CHAR * i) / speed
        return h('span', { style: { animationDelay: `${charDelay}ms` } }, char)
      })
    ),
    h('div', { class: styles.cursor, style: { animationDelay: `${startDelay}ms,${cursorHideDelay}ms` } })
  ]
}

const terminalOutputView = (props) => {
  const { commands, commandIndex, commandTimings, speed } = props
  const { startDelay, inputTime } = commandTimings[commandIndex]
  const outputLines = commands[commandIndex].output || ['']
  return outputLines.map((line, i) => {
    const isObj = typeof line === 'object'
    const content = isObj ? line.content : line
    const replace = isObj && line.replace
    const showDelay = startDelay + inputTime + (DELAY_OUTPUT_LINE * (i + 1)) / speed
    const hideDelay = replace && startDelay + inputTime + (DELAY_OUTPUT_LINE * (i + 2)) / speed
    return h('div', {
      class: [styles.terminalOutput, replace && styles.terminalOutputReplace].filter(Boolean).join(' '),
      style: { animationDelay: replace ? `${showDelay}ms,${hideDelay}ms` : `${showDelay}ms` },
      oncreate(el) {
        el.innerHTML = content
      }
    })
  })
}
