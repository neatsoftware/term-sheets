export default [
  {
    input: 'sammie init my-app',
    output: [
      '<span style="color:#33BBC8">[sammie]</span> Getting AWS account id...<br/> <span style="color:#ADAD27">aws sts get-caller-identity</span>',
      '<span style="color:#25BC24">[sammie]</span> Account id: 1234567 <span style="color:#25BC24">✔︎</span>',
      '<span style="color:#33BBC8">[sammie]</span> Creating project...',
      '<span style="color:#25BC24">[sammie]</span> Created: "my-app" - template: sam.json | code: index.js <span style="color:#25BC24">✔︎</span>'
    ]
  },
  {
    input: 'sammie deploy',
    output: [
      '<span style="color:#33BBC8">[sammie]</span> Validating template...<br/> <span style="color:#ADAD27">aws cloudformation validate-template --template-body sam.json</span>',
      '<span style="color:#25BC24">[sammie]</span> Template valid <span style="color:#25BC24">✔︎</span>',
      '<span style="color:#33BBC8">[sammie]</span> Creating s3 code bucket (if necessary)...<br/> <span style="color:#ADAD27">aws s3api create-bucket --bucket sam-uploads-1234567</span>',
      '<span style="color:#33BBC8">[sammie]</span> Packaging and uploading code... <br/> <span style="color:#ADAD27">aws cloudformation package --template-file sam.json --output-template-file sam-packaged.json --s3-bucket sam-uploads-1234567 --use-json</span>',
      '<span style="color:#33BBC8">[sammie]</span> Deploying stack: "my-app-development"...<br/> <span style="color:#ADAD27">aws cloudformation deploy --template-file sam-packaged.json --stack-name my-app-development --capabilities CAPABILITY_IAM --parameter-overrides environment=development</span>',
      '<span style="color:#33BBC8">[sammie]</span> Deploy success <span style="color:#25BC24">✔︎</span><br/><span style="color:#33BBC8">[sammie]</span> Live url: https://xxxxxx.execute-api.us-east-1.amazonaws.com/development'
    ]
  }
]
