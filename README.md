# react-native-autosize-image

Tired of struggling to keep the aspect ratio on a image using React Native? This component will help you, just set the width and it will auto adjust the height in order to keep the aspect ratio and vice versa.

It also uses [FastImage](https://github.com/DylanVann/react-native-fast-image) to cache everything.

### Installing

First you need to install **FastImage**.

```shell
yarn add react-native-fast-image && cd ios && pod install
```

Then...

```shell
yarn add react-native-image-autosize
```

## Usage

```js
import AutoSizeImage from 'react-native-image-autosize';
import { Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

...

      <AutoSizeImage
        source={{
          uri:
            'https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2020/03/marnie-dog-1280x720.jpg',
        }}
        width={screenWidth}
        height={screenHeight}
        onSize={res => setSize(res.resized)}
      />
```

## props

| name        | type     | default | description                                                               |
| ----------- | -------- | ------- | ------------------------------------------------------------------------- |
| `height`    | number   | none    | Maximum image height                                                      |
| `width`     | number   | none    | Maximum image width                                                       |
| `onSize`    | function | none    | returns an object `{resized: {width, height}, original: {width, height}}` |
| `onLoadEnd` | function | none    | is called when the image ends loading                                     |
| `animated`  | bool     | false   | when true, makes the component animatable                                 |
