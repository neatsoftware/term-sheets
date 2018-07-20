import { h } from 'hyperapp'
import { commandEditor } from '../command-editor'
import * as demos from '../../demos'
import styles from './styles.css'

const numbersOnly = e => {
  if (e.which < 48 || e.which > 57) e.preventDefault()
}

export const controlsView = props =>
  props.isEditingCommands
    ? h(commandEditor, props)
    : h('div', { class: styles.controls }, [
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel, for: 'backgroundCheckbox' }, 'Background:'),
          h('input', {
            type: 'checkbox',
            checked: props.background,
            onchange: props.updateBackground,
            id: 'backgroundCheckbox'
          }),
          h('input', {
            type: 'color',
            placeholder: 'Top color',
            title: 'Top background color',
            value: props.bgColor1,
            oninput: props.updatebgColor1,
            disabled: !props.background
          }),
          h('input', {
            type: 'color',
            placeholder: 'Bottom color',
            title: 'Bottom background color',
            value: props.bgColor2,
            oninput: props.updatebgColor2,
            disabled: !props.background
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel, for: 'titlebarCheckbox' }, 'Title bar:'),
          h('input', {
            type: 'checkbox',
            checked: props.titleBar,
            onchange: props.updateTitleBar,
            id: 'titlebarCheckbox'
          }),
          h('input', {
            placeholder: 'Title',
            title: 'Title bar text',
            value: props.title,
            oninput: props.updateTitle,
            disabled: !props.titleBar
          }),
          h('label', { class: styles.controlLabelSub, for: 'buttonsCheckbox' }, 'Buttons:'),
          h('input', {
            type: 'checkbox',
            checked: props.windowButtons,
            onchange: props.updateWindowButtons,
            id: 'buttonsCheckbox'
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel, for: 'promptInput' }, 'Prompt:'),
          h('input', { placeholder: 'Prompt', value: props.prompt, oninput: props.updatePrompt, id: 'promptInput' }),
          h('input', { placeholder: 'Prompt color', value: props.promptColor, oninput: props.updatePromptColor })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel, for: 'widthInput' }, 'Width:'),
          h('input', {
            placeholder: 'Width',
            type: 'number',
            min: 1,
            value: props.width,
            oninput: props.updateWidth,
            onkeypress: numbersOnly,
            id: 'widthInput'
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel, for: 'heightInput' }, 'Height:'),
          h('input', {
            placeholder: 'Height',
            type: 'number',
            min: 1,
            value: props.height,
            oninput: props.updateHeight,
            onkeypress: numbersOnly,
            id: 'heightInput'
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel, for: 'speedInput' }, 'Speed:'),
          h('input', {
            placeholder: 'Speed',
            type: 'number',
            min: 1,
            value: props.speed,
            oninput: props.updateSpeed,
            onkeypress: numbersOnly,
            id: 'speedInput'
          })
        ]),
        h('div', { class: styles.control }, [
          h('label', { class: styles.controlLabel }, 'Content:'),
          h('button', { onclick: props.toggleEditingCommands }, 'Edit...'),
          h('button', { onclick: props.restart }, 'Restart'),
          h('select', { onchange: props.updateDemo, title: 'Demos' }, [
            h('option', { disabled: true, selected: true, hidden: true, value: '' }, 'Or select a demo'),
            ...Object.keys(demos).map(name =>
              h('option', { value: name }, name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())
            )
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
          h('div', { class: styles.exportActions }, [
            h('button', { onclick: props.export }, props.isExporting ? 'Exporting...' : 'Export')
          ])
        ])
      ])
