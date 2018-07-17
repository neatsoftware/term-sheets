## Documentation

### Content payload API

- Must be serializable json
- The root must be an array containing objects with `input`, `output` properties. `input` is the typing input. `output` is the response to the input.
- `input` can either be a string or an object with `content`, `prompt` properties. `content` is the string text. `prompt` is a custom prompt for that input line.
- `output` must be an array of strings or objects with `content`, `replace` properties. The string or `content` is the string text (may contain html). `replace` indicates that the next line should replace the output instead of appending.

```json
[
  {
    "input": "an input string",
    "output": ["an output string"]
  },
  {
    "input": {
      "prompt": "my-prompt >",
      "content": "an input string"
    },
    "output": [
      {
        "content": "please wait",
        "replace": true
      },
      "done!"
    ]
  }
]
```
