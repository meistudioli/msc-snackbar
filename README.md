# msc-snackbar

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-snackbar) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/22012/branches/644916/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=22012&bid=644916)

&lt;msc-snackbar /> provide brief messages about app processes at the bottom of the screen. It's a web component and applied Material Design - Snackbar's spec.

![<msc-zoom />](https://blog.lalacube.com/mei/img/preview/msc-snackbar.png)

## Basic Usage

&lt;msc-snackbar /> is a web component. All we need to do is put the required script into your HTML document. Then follow <msc-snackbar />'s html structure and everything will be all set.

- Required Script

```html
<script
  type="module"
  src="https://your-domain/wc-msc-snackbar.js">        
</script>
```

- Structure

Put &lt;msc-snacker /> into HTML document. It will have different functions and looks with attribute mutation.

```html
<msc-snackbar>
  <script type="application/json">
    {
      "active": false,
      "stack": false,
      "label": "messages",
      "action": {
        "content": "action",
        "hidden": true,
        "params": {
          ...
        }
      },
      "dismiss": {
        "auto": true,
        "hidden": true,
        "duration": 5000
      }
    }
  </script>
</msc-snackbar>
```

## JavaScript Instantiation

&lt;msc-snackbar /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscSnackbar } from 'https://your-domain/wc-msc-snackbar.js';

// use DOM api
const nodeA = document.createElement('msc-snackbar');
document.body.appendChild(nodeA);
nodeA.label = 'Put message here to let user aware';
nodeA.active = true;

// new instance with Class
const nodeB = new MscSnackbar();
document.body.appendChild(nodeB);
nodeB.label = 'Put message here to let user aware';
nodeB.active = true;

// new instance with Class & default config
const config = {
  active: false,
  stack: false,
  label: 'messages',
  action: {
    content: 'action',
    hidden: true,
    params: {
      ...
    }
  },
  dismiss: {
    auto: true,
    hidden: true,
    duration: 5000
  }
};
const nodeC = new MscSnackbar(config);
document.body.appendChild(nodeC);
nodeC.active = true;
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;msc-snackbar /> margin distance.

```html
<style>
msc-snackbar {
  --msc-snackbar-margin-inline: 16px;
  --msc-snackbar-margin-block-end: 16px;
}
</style>
```

Otherwise, apply class - `msc-snackbar--leading` to make &lt;msc-snackbar /> align flex-start.

```html
<msc-snackbar
  class="msc-snackbar--leading"
>
  ...
</msc-snackbar>
```

## Attributes

&lt;msc-snackbar /> supports some attributes to let it become more convenience & useful.

- **active**

Set active for &lt;msc-snackbar />. It will show up once set true. Default is `false` (not set).

```html
<msc-snackbar
  active
>
  ...
</msc-snackbar>
```

- **stack**

Set stacke for &lt;msc-snackbar /> to display stacked view. Default is `false` (not set).

```html
<msc-snackbar
  stack
>
  ...
</msc-snackbar>
```

- **label**

Set label for &lt;msc-snackbar />.

```html
<msc-snackbar
  label="put message here"
>
  ...
</msc-snackbar>
```

- **action**

Set action for &lt;msc-snackbar />. It should be JSON string. Developers could set `content`、`hidden` and extra `params` here.（`hidden` must be boolean to make action display or not, default is `true`）.

```html
<msc-snackbar
  action='{"content":"retry","hidden":true,"params":{"origin":"extra param you like","id":"extra param you like"}}'
>
  ...
</msc-snackbar>
```

- **dismiss**

Set dismiss for &lt;msc-snackbar />. It should be JSON string. Developers could set `auto`、`hidden` and `duration` (ms) here.

`hidden` is for dismiss button display or not (default is `true`). `auto` (default is `true`) and `duration` (default is `5000`) are for auto dismiss behavior.

```html
<msc-snackbar
  dismiss='{"auto":true,"hidden":true,"duration":5000}'
>
  ...
</msc-snackbar>
```


## Properties

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| active | Boolean | 	Getter / Setter for active. It will make <msc-snackbar /> show up or not. |
| stack | Boolean | Getter / Setter for stack. This will set stacked view once set true. Default is `false`. |
| label | String | Getter / Setter for label. Developers could set message through this property. |
| action | Object | Getter / Setter for action. Developers could set `content`、`hidden` and extra `params` here.（`hidden` must be boolean to make action display or not, default is `true`）. |
| dismiss | Object | Getter / Setter for dismiss. Developers could set `auto`、`hidden` and `duration` (ms) here. `hidden` is for dismiss button display or not (default is `true`). `auto` (default is `true`) and `duration` (default is `5000`) are for auto dismiss behavior. |


## Event

| Event Signature | Description |
| ----------- | ----------- |
| msc-snackbar-action-click | Fired when &lt;msc-snackbar />'s action has been clicked. Developers could get `params` through `event.detail`. |
| msc-snackbar-dissmiss | Fired when <msc-snackbar /> dismiss behavior occured. |


## Reference
- [Material Design - Snackbars](https://material.io/components/snackbars)
- [&lt;msc-snackbar />](https://blog.lalacube.com/mei/webComponent_msc-snackbar.html)
