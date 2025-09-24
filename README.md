# msc-snackbar

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-snackbar) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/22133/branches/651098/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=22133&bid=651098)


&lt;msc-snackbar /> provide brief messages about app processes at the bottom of the screen. It's a web component and applied Material Design - Snackbar's spec.

![<msc-snackbar />](https://blog.lalacube.com/mei/img/preview/msc-snackbar.png)

## Basic Usage

&lt;msc-snackbar /> is a web component. All we need to do is put the required script into your HTML document. Then follow <msc-snackbar />'s html structure and everything will be all set.

- Required Script

```html
<script
  type="module"
  src="https://unpkg.com/msc-snackbar/mjs/wc-msc-snackbar.js">        
</script>
```

- Structure

Put &lt;msc-snacker /> into HTML document. It will have different functions and looks with attribute mutation.

```html
<msc-snackbar>
  <script type="application/json">
    {
      "duration": 99999,
      "actioncontent": "Action"
    }
  </script>
</msc-snackbar>
```

Otherwise, developers could also choose remoteconfig to fetch config for &lt;msc-snackbar />.

```html
<msc-snackbar
  remoteconfig="https://your-domain/api-path"
>
</msc-snackbar>
```

## JavaScript Instantiation

&lt;msc-snackbar /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscSnackbar } from 'https://unpkg.com/msc-snackbar/mjs/wc-msc-snackbar.js';

// use DOM api
const nodeA = document.createElement('msc-snackbar');
document.body.appendChild(nodeA);
nodeA.show('Show me the money.');

// new instance with Class
const nodeB = new MscSnackbar();
document.body.appendChild(nodeB);
nodeB.duration = 5;
nodeB.show('Show me the money.');

// new instance with Class & default config
const config = {
  duration: 10,
  actioncontent: 'OK'
};
const nodeC = new MscSnackbar(config);
document.body.appendChild(nodeC);
nodeC.show('Show me the money.');
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;msc-snackbar /> margin distance.

```html
<style>
msc-snackbar {
  --msc-snackbar-action-button-color: rgba(208 188 255);
}
</style>
```

Otherwise, developers could set data attribute to change layout direction and button display.

```html
<msc-snackbar
  data-direction="stack"
  data-hide-action-button
  data-hide-dismiss-button
>
  ...
</msc-snackbar>
```

## Attributes

&lt;msc-snackbar /> supports some attributes to let it become more convenience & useful.

- **duration**

Set auto dismiss duration for &lt;msc-snackbar />. Default is `99999` (seconds).

```html
<msc-snackbar
  duration="99999"
>
  ...
</msc-snackbar>
```

<hr />

- **actioncontent**

Set action button's content. Default is "`Action`".

```html
<msc-snackbar
  actioncontent="Action"
>
  ...
</msc-snackbar>
```

## Properties

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| duration | Number | Getter / Setter for duration (seconds) to auto dismiss. |
| actioncontent | String | Getter / Setter for action button's content. |
| open | Boolean | Getter for &lt;msc-snackbar />'s open state. |

## Event

| Event Signature | Description |
| ----------- | ----------- |
| msc-snackbar-action-click | Fired when &lt;msc-snackbar />'s action has been clicked. |
| msc-snackbar-dismiss | Fired when &lt;msc-snackbar /> dismiss behavior occured. |

## Reference
- [Material Design - Snackbars](https://material.io/components/snackbars)
- [&lt;msc-snackbar />](https://blog.lalacube.com/mei/webComponent_msc-snackbar.html)
- [WEBCOMPONENTS.ORG](https://www.webcomponents.org/element/msc-snackbar)
- [YouTube tutorial](https://youtube.com/shorts/OT4qqLA-Pzs)
