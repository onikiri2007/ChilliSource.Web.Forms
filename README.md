# ChilliSource.Web.Forms        ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
This project is part of the ChilliSource framework developed by [BlueChilli](https://github.com/BlueChilli).

# Summary
ChilliSource.Web.Forms is a collection of form components, helpers and abstractions that enable faster and cleaner development of React-based apps. This library can be used with or without redux 😀.

# Main Features

## Components
Standard components like `input`, `button` and the rest are already available to use directly in React projects. Our components build upon these standard components to provide React-style components.
- `CheckBox`
- `DatePicker`
- `DropZone`
- `Form`
- `Input`
- `Number`
- `Radio`
- `Select`
- `Switch`
- `TextArea`

## State Retention
Although this framework can be used with Redux, not having it within your stack will not prevent you from using it. Without redux, the state of the form is stored within the `Form` and form elements themselves.

## Validations
All the components can have their own validation with custom validation messages as your project requires. The `Validation` component provides the necessary implementation so that you can directly start using them.
```js
<Input name="sample-input" required maxLength="6">
  <Validation isFor="required">This input can not be blank.</Validation>
  <Validation isFor="maxLength">You can only enter a max of 50 characters</Validation>
</Input>
```

We also support custom validation in case your project requires it.
```js
const lastNameValidationMessage = ...;
const lastNameValidation = value => { ... }

<Input name="lastName" required customValidation={this.lastNameValidation}>
  <Validation isFor="customValidation">{lastNameValidationMessage}</Validation>
</Input>
```

# Installation
The library is available on [npm](https://www.npmjs.com/package/cs.forms) or you can just do
```
npm install --save cs.forms
```

# Releases
See the [releases](https://github.com/BlueChilli/ChilliSource.Web.Forms/releases).

# Contribution
Please see the [contribution guide](https://github.com/BlueChilli/ChilliSource.Web/blob/master/CONTRIBUTING.md).

# License
ChilliSource.Web.Forms is licensed under the [MIT license](https://github.com/BlueChilli/ChilliSource.Web/blob/master/LICENSE).

# Feedback and Contact
For questions or feedback, please contact us at [chillisource@bluechilli.com](mailto:chillisource@bluechilli.com)
