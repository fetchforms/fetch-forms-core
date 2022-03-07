# Fetch Forms Core

### What is Fetch Forms?
Fetch Forms is a headless forms builder designed to help developers build forms and connect data.

## Documentation
- [Full code examples](https://github.com/fetchforms)
- [Doc Overview](https://www.fetchforms.io/docs/overview)
- [The Fetch Form object](https://www.fetchforms.io/docs/fetch-form-object)

### Add the package to your app
```sh
npm install @fetchforms/core
```
```sh
yarn add @fetchforms/core
```

### Quick start
Using the `renderForm()` function is the quickest way to get started. It'll handle state management, client side validation, and sending the submission to Fetch Forms if applicable. 
You can add functions to recieve data when the form loads or a submission is completed. 

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Fetch Forms Javascript</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <main>
      <h2 id="form_name" style="margin-bottom: 25px;"></h2>
      <div id="fetch_form"></div>
      <pre id="result"></pre>
    </main>
    <script>
     import { renderForm } from "@fetchforms/core";

     const onComplete = (data) => {
       document.getElementById("result").innerHTML = JSON.stringify(data, null, 2);
     };
     const onLoad = (data) => {
       document.getElementById("form_name").innerHTML = data.name;
     };

     renderForm(
       "fcd4ca8b-12d4-4b8c-882d-00144d54d02c",
       "fetch_form",
       onComplete,
       onLoad
     );
   </script>
  </body>
</html>
```

### API Reference
There are three methods available:

`getForm`: Returns the [Fetch Form object]("www.fetchforms.io/docs/fetch-form-object"). Use this to render the form in whatever way you need..<br/>
`renderForm`: Will build out and submit forms for you. You need pass in the ID of an element to attach the form to. Optionally, you can subscribe to the form's details and submission data.<br/>
`requestBuild`: Returns the [Fetch Form object]("www.fetchforms.io/docs/fetch-form-object") based on a [source code form]("www.fetchforms.io/docs/source-code-forms").
