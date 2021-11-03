---
title: Наш технологический стек на фронте
description: SmartParkingSystem Client Stack
stage: ready
---
## React + TS
Мы используем React, так как у наших программистов больше всего опыта именно в нём. 
TypeScript нужен нам для упрощения процесса разработки и масштабирования проекта.

<img src="https://user-images.githubusercontent.com/57585370/139906993-9004e726-97df-4a1c-8f5c-5aceceb3fc75.png" width="100%" />

Если у вас еще нет опыта работы с UI библиотекой/фреймворком, то советуем вам начать с React. 
Вы быстро освоите его и сможете создавать MVP ваших SPA. У React очень хорошая [документация](https://reactjs.org/tutorial/tutorial.html#what-is-react) и удобная [утилита](https://create-react-app.dev/docs/getting-started) для старта проекта. 
Если же вам нужен SSR, то можете использовать [Next.js](https://nextjs.org/).

## Redux
По началу нам не требовался state-менеджер, но с ростом приложения мы поняли,
что он облегчит нам жизнь. State-менеджер управляет всем: от темы и языка до 
личных данных пользователя. Главный конкурент redux - mobX, но у нашей команды больше опыта 
в работе с redux, поэтому на нём и остановились. На этом [сайте](https://redux.js.org/introduction/getting-started) вы можете познакомиться с redux.

<img src="https://user-images.githubusercontent.com/57585370/139907197-aeb3dd57-9080-4afe-abcc-a6383f62a774.png" width="100%" />

## Styled-components
Styled-components позволяет вам писать css прямо внутри js.
Прекрасное решение для изоляции css и коммуникации между логики на js и стилей. 
Почитайте [документацию](https://styled-components.com/docs) styled-components. В качестве альтернативы можно использовать,
встроенные в react, [css-modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/).

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/57585370/139907298-9af61373-c1d0-4fdf-b13d-9e8876f95f9f.png" width="20%" /></p>

## Storybook
С помощью storybook вы можете создавать и тестировать ваши компоненты в отрыве от самого приложения. 
Очень удобно не запускать все приложения целиком, а только нужные вам компоненты. 
Если вы планируете создать сложный SPA, то [storybook](https://storybook.js.org/) вам необходим.

<img src="https://user-images.githubusercontent.com/57585370/139907372-3a444e4e-e2e8-4240-8dcd-b50ff3ce2afe.png" width="100%" />

## Eslint + Prettier
Для поддержки единого стиля кода мы используем ESLint и prettier. Можете ознакомиться с нашим конфигом [ESLint](https://github.com/Mind-team/smart-parking-system-client-web/blob/master/.eslintrc).

<img src="https://user-images.githubusercontent.com/57585370/139907459-22af2ea6-8b94-48af-a9ff-1cae347ca5d3.png" width="100%" />

## CI
В качестве CI мы используем Github Actions. Каждый коммит в главную ветку проверяется на соблюдение код стайла, 
успешную сборку приложения и storybook.

## React-comet, comet-cli
Для быстрого старта приложения вы можете использовать [react-comet](https://github.com/Ermolaev-Inc/react-comet),
а для удобной последующей работы с ним [comet-cli](https://github.com/Ermolaev-Inc/comet-cli).

