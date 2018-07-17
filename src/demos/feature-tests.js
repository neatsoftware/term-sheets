export default [
  {
    input: 'simple input',
    output: ['simple output']
  },
  {
    input: `let's see some color`,
    output: [
      `<span style="color:#33BBC8">Wow it's cyan</span> <span style="color:#ADAD27">and yellow</span> <span style="color:#C23621">and red</span> and back`
    ]
  },
  {
    input: 'try out some unicode and emojis 😍',
    output: ['🔥 Nice <span style="color:#25BC24">✔︎</span>']
  },
  {
    input: 'spinners via "replace"',
    output: [
      { content: '| Loading', replace: true },
      { content: '/ Loading', replace: true },
      { content: '- Loading', replace: true },
      { content: '\\ Loading', replace: true },
      { content: '| Loading', replace: true },
      { content: '/ Loading', replace: true },
      { content: '- Loading', replace: true },
      { content: 'Complete' }
    ]
  },
  {
    input: 'how about some spacing?',
    output: ['       left pad', 'right pad       !', 'the lines...<br/><br/>can break']
  },
  {
    input: 'it automatically tails content, with only css!',
    output: [
      'line 1',
      'line 2',
      'line 3',
      'line 4',
      'line 5',
      'line 6',
      'line 7',
      'line 8',
      'line 9',
      'line 10',
      'Done!'
    ]
  }
]
