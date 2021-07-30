<h1 align="center" style="position: relative;">
    <img width="200" src="./docs/nodarkreader.png"/><br>
    NoDarkreader
</h1>

<h4 align="center">
    A plugin to block the Darkreader extension from working on your already dark website!
</h4>

<p align="center">
    <img alt="npm" src="https://img.shields.io/npm/v/no-darkreader"/>
    <img alt="GitHub" src="https://img.shields.io/github/license/hadialqattan/no-darkreader">
    <a href="https://deepscan.io/dashboard#view=project&tid=13457&pid=16463&bid=353863"><img src="https://deepscan.io/api/teams/13457/projects/16463/branches/353863/badge/grade.svg" alt="DeepScan grade"></a>
    <img alt="GitHub file size in bytes" src="https://img.shields.io/github/size/hadialqattan/no-darkreader/nodarkreader.min.js?label=minified%20size">
</p>

<p align="center">
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a> •
	<a href="#faq">FAQ</a> •
    <a href="#license">License</a>
</p>

## Installation

You could copy the latest minified version from [nodarkreader.min.js](https://raw.githubusercontent.com/hadialqattan/no-darkreader/master/nodarkreader.min.js), also it's available via `npm`:

```sh
npm install no-darkreader
```

## Usage

You only need to setup your `index.html` file as shown bellow, then it should work properly:

```html
...
<head>
  ...
  <meta name="darkreader" content="NO-DARKREADER-PLUGIN" />
  ...
</head>
...
<script src="./path/to/nodarkreader.min.js"></script>
...
```

**Or** if it was installed via `npm`, you could add this metatag to your `index.html`:

```html
<meta name="darkreader" content="NO-DARKREADER-PLUGIN" />
```

also don't forget to import the plugin within your app's entrypoint (e.g. `index.js` or `App.js` ):

```js
import 'no-darkreader'
```

## Contributing

> note: please run `./minify.sh` before submitting any PR!

Pull requests are welcome! For larger changes, especially structural ones, please open an issue first to discuss what you would like to change.

If you have a feature request, feel free to [open an issue](https://github.com/hadialqattan/no-darkreader/issues)!

## FAQ

### How does it work?
Starting from [DarkReader/src/inject/dynamic-theme/index.ts](https://github.com/darkreader/darkreader/blob/a08d923f43aaf8b96293491fe0c649c9e0c1edc2/src/inject/dynamic-theme/index.ts) file: 
```ts
function isAnotherDarkReaderInstanceActive() {
    const meta: HTMLMetaElement = document.querySelector('meta[name="darkreader"]');
    if (meta) {
        if (meta.content !== INSTANCE_ID) {
            return true;
        }
        return false;
    }
    createDarkReaderInstanceMarker();
    return false;
}
```
`no-darkreader` tricks this function by injecting a fake metatag named `darkreader` which prevents DarkReader from wokring, also it inverse every `css/html` modification DarkReader does.

### What happends if I didn't use `<meta name="darkreader" content="NO-DARKREADER-PLUGIN" />`?
You may encounter this infinite-loop which causes a performance issue:

1- `DarkReader` injects a metatag with its instance ID (`DarkReader` may work before `no-darkreader` plugin):
```ts 
// SOURCE: https://github.com/darkreader/darkreader/blob/a08d923f43aaf8b96293491fe0c649c9e0c1edc2/src/inject/dynamic-theme/index.ts
function createDarkReaderInstanceMarker() {
    const metaElement: HTMLMetaElement = document.createElement('meta');
    metaElement.name = 'darkreader';
    metaElement.content = INSTANCE_ID;
    document.head.appendChild(metaElement);
}
function isAnotherDarkReaderInstanceActive() {
    const meta: HTMLMetaElement = document.querySelector('meta[name="darkreader"]');
    if (meta) {
        if (meta.content !== INSTANCE_ID) {
            return true;
        }
        return false;
    }
    createDarkReaderInstanceMarker();  // added if there's no metatag named `darkreader`.
    return false;
}
```

2- `no-darkreader` removes `DarkReader` metatag in order to inject a fake one.

3- `DarkReader` reinjects a metatag before `no-darkreader` injecting a fake one.

4- **goto step 2**.


## License

This project is licensed under a [MIT](./LICENSE) license.
