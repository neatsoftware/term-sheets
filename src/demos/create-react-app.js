export default [
  {
    input: 'npx create-react-app my-app',
    output: [
      { content: '| Installing...', replace: true },
      { content: '/ Installing...', replace: true },
      { content: '- Installing...', replace: true },
      { content: '\\ Installing...', replace: true },
      { content: '| Installing...', replace: true },
      { content: '/ Installing...', replace: true },
      { content: '- Installing...', replace: true },
      'npx: installed 67 in 3.500s',
      '<br/>Creating a new React app in <span style="color:#25BC24">~/my-app</span>',
      '<br/>Installing <span style="color:#33BBC8">react</span>, <span style="color:#33BBC8">react-dom</span>, and <span style="color:#33BBC8">react-scripts</span>...',
      { content: '| Installing...', replace: true },
      { content: '/ Installing...', replace: true },
      { content: '- Installing...', replace: true },
      { content: '\\ Installing...', replace: true },
      { content: '| Installing...', replace: true },
      { content: '/ Installing...', replace: true },
      { content: '- Installing...', replace: true },
      '<span style="color:#25BC24">✔︎ Done</span><br/><br/>'
    ]
  },
  {
    input: 'cd my-app'
  },
  {
    input: {
      prompt: 'my-app$',
      content: 'npm start'
    },
    output: [
      '<br/>Starting the development server...',
      'Compiled successfully!',
      '<br/>Your can now view my-app in the browser.<br/>  Local:            http://localhost:3000/<br/>  On Your Network:  http://192.168.37.106:3000/'
    ]
  }
]
