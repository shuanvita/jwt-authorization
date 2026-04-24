# JWT Authorization

## Auth form decomposition by FSD

```txt
src/
  app/
    providers/
      router/
      store/
    styles/
    App.vue

  pages/
    auth/
      ui/AuthPage.vue

  widgets/
    auth-card/
      ui/AuthCard.vue

  features/
    auth-by-credentials/
      ui/LoginForm.vue
      model/useLoginForm.ts
      api/loginByCredentials.ts
      lib/validation.ts
      index.ts

    auth-by-oauth/
      ui/OAuthButtons.vue
      api/loginByProvider.ts
      index.ts

  entities/
    session/
      model/session.store.ts
      model/types.ts
      api/sessionApi.ts
      index.ts

    user/
      model/types.ts
      index.ts

  shared/
    api/http.ts
    ui/input/BaseInput.vue
    ui/button/BaseButton.vue
    ui/checkbox/BaseCheckbox.vue
    ui/alert/BaseAlert.vue
    lib/validators/
    config/
```

## Mapping from current UI

- Card container with title/background (`JWT Authorization`) -> `widgets/auth-card`
- Email/password fields, remember me, submit -> `features/auth-by-credentials`
- OAuth actions (`Google`, `GitHub`) -> `features/auth-by-oauth`
- Error alert (`Invalid credentials`) -> `shared/ui/alert` (triggered from feature)
- Auth/session state (tokens, current user) -> `entities/session`

## Data flow

1. `pages/auth` assembles the screen from widgets.
2. `widgets/auth-card` composes independent auth features.
3. `features/auth-by-credentials` validates form, calls API, updates session.
4. `entities/session` is the single source of truth for auth state.

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
