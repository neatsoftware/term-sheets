import { h } from 'hyperapp'
import { commandEditor } from '../command-editor'
import styles from './styles.css'

const numbersOnly = e => {
  if (e.which < 48 || e.which > 57) e.preventDefault()
}

export const controlsView = props =>
  props.editingCommands
    ? h(commandEditor, props)
    : h('div', { class: styles.controls }, [
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel }, 'Background:'),
          h('input', { type: 'checkbox', checked: props.background, onchange: props.updateBackground }),
          h('input', {
            type: 'color',
            placeholder: 'Top color',
            value: props.bgColor1,
            oninput: props.updatebgColor1,
            disabled: !props.background
          }),
          h('input', {
            type: 'color',
            placeholder: 'Bottom color',
            value: props.bgColor2,
            oninput: props.updatebgColor2,
            disabled: !props.background
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel }, 'Title bar:'),
          h('input', { type: 'checkbox', checked: props.titleBar, onchange: props.updateTitleBar }),
          h('input', {
            placeholder: 'Title',
            value: props.title,
            oninput: props.updateTitle,
            disabled: !props.titleBar
          }),
          h('label', { class: styles.controlLabelSub }, 'Buttons:'),
          h('input', { type: 'checkbox', checked: props.windowButtons, onchange: props.updateWindowButtons })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel }, 'Prompt:'),
          h('input', { placeholder: 'Prompt', value: props.prompt, oninput: props.updatePrompt })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel }, 'Width:'),
          h('input', {
            placeholder: 'Width',
            type: 'number',
            min: 1,
            value: props.width,
            oninput: props.updateWidth,
            onkeypress: numbersOnly
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel }, 'Height:'),
          h('input', {
            placeholder: 'Height',
            type: 'number',
            min: 1,
            value: props.height,
            oninput: props.updateHeight,
            onkeypress: numbersOnly
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel }, 'Speed:'),
          h('input', {
            placeholder: 'Speed',
            type: 'number',
            min: 1,
            value: props.speed,
            oninput: props.updateSpeed,
            onkeypress: numbersOnly
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel }, 'Content:'),
          h('button', { onclick: props.toggleEditingCommands }, 'Edit...'),
          h('button', { onclick: props.restart }, 'Restart'),
          h('label', { class: styles.controlLabelSub }, 'Demos:'),
          h('select', { onchange: props.updateDemo }, [
            h('option', { disabled: true, selected: true, hidden: true, value: '' }, 'Select a demo'),
            h('option', { value: 'features' }, 'Feature tests'),
            h('option', { value: 'cra' }, 'Create react app'),
            h('option', { value: 'sammie' }, 'SAMMIE')
          ])
        ]),
        h('hr', { class: styles.divider }),
        h('div', { class: [styles.control, props.isExporting && styles.disabled].filter(Boolean).join(' ') }, [
          h('label', { class: styles.controlLabel }, 'Export as:'),
          h('input', {
            type: 'radio',
            value: 'svg',
            checked: props.exportType === 'svg',
            id: 'exportTypeSvg',
            name: 'exportType',
            onchange: props.updateExportType
          }),
          h('label', { for: 'exportTypeSvg', class: styles.exportOptLabel }, 'SVG'),
          h('input', {
            type: 'radio',
            value: 'html',
            checked: props.exportType === 'html',
            id: 'exportTypeHtml',
            name: 'exportType',
            onchange: props.updateExportType
          }),
          h('label', { for: 'exportTypeHtml', class: styles.exportOptLabel }, 'HTML'),
          h('input', {
            type: 'radio',
            value: 'gif',
            checked: props.exportType === 'gif',
            id: 'exportTypeGif',
            name: 'exportType',
            onchange: props.updateExportType
          }),
          h('label', { for: 'exportTypeGif', class: styles.exportOptLabel }, [
            'GIF',
            h('span', { class: styles.alpha }, '(alpha)')
          ]),
          h('button', { onclick: props.export }, props.isExporting ? 'Exporting...' : 'Export')
        ])
      ])
