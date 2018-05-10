import { h } from 'hyperapp'
import styles from './terminal.css'

export const DELAY_TYPE_START = 750
export const DELAY_TYPE_CHAR = 35
export const DELAY_TYPE_SUBMIT = 350
export const DELAY_OUTPUT_LINE = 500

export const terminalView = props =>
  h(
    'div',
    {
      class: props.background && styles.terminalBackground,
      style: {
        width: props.width + 'px',
        height: props.height + 'px',
        backgroundImage: props.background ? `linear-gradient(${props.bgColor1}, ${props.bgColor2})` : null
      }
    },
    [h('div', { class: styles.terminal }, [h(terminalTitleView, props), h(terminalContentView, props)])]
  )

const terminalTitleView = props =>
  h(
    'div',
    {
      class: [props.titleBar && styles.terminalTitleBar, props.windowButtons && styles.terminalButtons]
        .filter(Boolean)
        .join(' ')
    },
    props.titleBar && props.title
  )

const terminalContentView = props => {
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

const terminalCommandView = props => [h(terminalInputView, props), h(terminalOutputView, props)]

const terminalInputView = props => {
  const { commands, commandIndex, commandTimings, prompt, speed } = props
  const command = commands[commandIndex]
  const { startDelay, inputTime } = commandTimings[commandIndex]
  const cursorHideDelay = startDelay + inputTime
  return [
    h(
      'div',
      { class: styles.terminalInput, 'data-prompt': prompt, style: { animationDelay: `${startDelay}ms` } },
      Array.from(command.input).map((char, i) => {
        const charDelay = startDelay + DELAY_TYPE_START / speed + (DELAY_TYPE_CHAR * i) / speed
        return h('span', { class: styles.inputChar, style: { animationDelay: `${charDelay}ms` } }, char)
      })
    ),
    h('div', { class: styles.cursor, style: { animationDelay: `${startDelay}ms,${cursorHideDelay}ms` } })
  ]
}

const terminalOutputView = props => {
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
