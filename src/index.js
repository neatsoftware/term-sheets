import { h, app } from 'hyperapp'
import { appView } from './components/app'
import { exportProject } from './utils/exporting'
import * as demos from './demos'

const state = {
  // Terminal state
  background: true,
  bgColor1: '#40bfbf',
  bgColor2: '#4095bf',
  titleBar: true,
  windowButtons: true,
  title: '~/',
  prompt: '~$',
  promptColor: '#5ed7ff',
  width: 780,
  height: 440,
  speed: 1,
  commands: demos.featureTests,
  // Internal app state
  exportType: 'svg',
  isEditingCommands: false,
  isExporting: false,
  terminalEl: null
}

const actions = {
  updateBackground: (e) => ({ background: e.target.checked }),
  updatebgColor1: (e) => ({ bgColor1: e.target.value }),
  updatebgColor2: (e) => ({ bgColor2: e.target.value }),
  updateTitleBar: (e) => ({ titleBar: e.target.checked }),
  updateWindowButtons: (e) => ({ windowButtons: e.target.checked }),
  updateTitle: (e) => ({ title: e.target.value }),
  updatePrompt: (e) => ({ prompt: e.target.value }),
  updatePromptColor: (e) => ({ promptColor: e.target.value }),
  updateWidth: (e) => ({ width: e.target.value }),
  updateHeight: (e) => ({ height: e.target.value }),
  updateSpeed: (e) => ({ speed: e.target.value }),
  updateExportType: (e) => ({ exportType: e.target.value }),
  updateTerminalEl: (element) => ({ terminalEl: element }),
  toggleEditingCommands: () => (state) => ({ isEditingCommands: !state.isEditingCommands }),
  updateIsExporting: (isExporting) => ({ isExporting }),
  updateDemo: (e) => (state, actions) => actions.updateCommandsAndPlay(demos[e.target.value]),
  updateCommands: (commands) => ({ commands }),
  updateCommandsAndPlay: (commands) => (state, actions) => {
    actions.updateCommands(commands)
    actions.restart()
  },
  restart: () => (state, actions) => {
    const commands = state.commands
    actions.updateCommands([])
    setTimeout(() => actions.updateCommands(commands))
  },
  export: () => (state, actions) => {
    actions.updateIsExporting(true)
    return exportProject(state)
      .catch(alert)
      .then(() => actions.updateIsExporting(false))
  }
}

const view = (state, actions) => h(appView, Object.assign(state, actions))

export default app(state, actions, view, document.body)
