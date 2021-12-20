
<div align="center">
  <img src="https://raw.githubusercontent.com/apostrophecms/apostrophe/main/logo.svg" alt="ApostropheCMS logo" width="80" height="80" />

  <h1>Apostrophe Anchors</h1>

  <p>
    <a aria-label="Apostrophe logo" href="https://v3.docs.apostrophecms.org">
      <img src="https://img.shields.io/badge/MADE%20FOR%20Apostrophe%203-000000.svg?style=for-the-badge&logo=Apostrophe&labelColor=6516dd" />
    </a>
    <a aria-label="Test status" href="https://github.com/apostrophecms/anchors/actions">
      <img alt="GitHub Workflow Status (branch)" src="https://img.shields.io/github/workflow/status/apostrophecms/anchors/Tests/main?label=Tests&logo=github&labelColor=000&style=for-the-badge">
    </a>
    <a aria-label="Join the community on Discord" href="http://chat.apostrophecms.org">
      <img alt="" src="https://img.shields.io/discord/517772094482677790?color=5865f2&label=Join%20the%20Discord&logo=discord&logoColor=fff&labelColor=000&style=for-the-badge&logoWidth=20" />
    </a>
    <a aria-label="License" href="https://github.com/apostrophecms/anchors/blob/main/LICENSE.md">
      <img alt="" src="https://img.shields.io/static/v1?style=for-the-badge&labelColor=000000&label=License&message=MIT&color=3DA639" />
    </a>
  </p>
</div>

This Anchors module adds a wrapping element with an anchor linking target around all widgets. Developers may customize or opt-out individual widget types.

## Installation

To install the module, use the command line to run this command in an Apostrophe project's root directory:

```
npm install @apostrophecms/anchors
```

## Usage

Configure the anchor modules in the `app.js` file:

```javascript
require('apostrophe')({
  shortName: 'my-project',
  modules: {
    // The root bundle module
    '@apostrophecms/anchors': {},
    // The widget type improving module
    '@apostrophecms/anchors-widget-type': {},
    // An improving module for the rich text widget type. This disables the
    // wrapping feature for rich text widgets.
    '@apostrophecms/anchors-rich-text-widget': {}
  }
});
```

When the modules are active, all widget type will have a new "HTML Anchor Value" field. When an editor populates that field with a slug-style string the widget HTML markup will be wrapped with a new `div` with an attribute, an `id` by default, set to the anchor value. This attribute can be targeted by anchor links, e.g., `href="#anchor-id-value"`.

The only Apostrophe core widget type with this feature disabled is the rich text widget, `@apostrophecms/rich-text-widget`.

The "HTML Anchor Value" field is a "slug" type field, which means it is limited to lowercase characters and dashes for consistent usage.

## Options

### `anchorAttribute`

By default the anchor attribute is an `id`. This makes it easy to link to the widget with a hash `href` matching the anchor value as described above. **Developers have the option to use another anchor attribute** if they prefer to target the HTML element with custom JavaScript instead.

To do this, include an `anchorAttribute` option on the individual widget type. You can also add this option on the root `@apostrophecms/widget-type` module or the `@apostrophecms/anchors-widget-type` module to set this for all widget types.

```javascript
// modules/my-banner-widget/index.js
module.export = {
  options: {
    anchorAttribute: 'data-anchor'
  }
};
```

In this example the wrapping `div` element would look like this:

```html
<div data-anchor="anchor-id-value">
  <!-- Normal widget markup here -->
</div>
```

### `anchors: false`

Developers can choose to disable this module's features for any widget type by setting an `anchors: false` option on the widget type.

```javascript
// modules/my-banner-widget/index.js
module.export = {
  options: {
    anchors: false
  }
};
```

This is automatically set for the rich text widget. That can be reversed by setting `anchors: true` on `@apostrophecms/rich-text-widget`.

### `anchorDefault`

To help content editors populate anchor values automatically, set the `anchorDefault` option to the name of an existing field on a widget type. The "HTML Anchor Value" field will populate automatically based on the value of the named field [using the `following` field option mechanism](https://v3.docs.apostrophecms.org/reference/field-types/slug.html#optional).

```javascript
// modules/my-banner-widget/index.js
module.export = {
  options: {
    anchorDefault: 'heading'
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: 'Heading'
      }
    }
  }
};
```