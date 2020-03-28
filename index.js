import React, { useState, useEffect, memo } from "react";
import { oneOfType, number, object, func, bool } from "prop-types";
import { Image, Animated } from "react-native";
import FastImage from "react-native-fast-image";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

function AutoSizeImage({
  source,
  width,
  height,
  style,
  onSize,
  onLoadEnd,
  animated
}) {
  const [resultWidth, setResultWidth] = useState(null);
  const [resultHeight, setResultHeight] = useState(null);

  function getImageSize() {
    if (typeof source === "object") {
      Image.getSize(source, (widthGot, heightGot) => {
        setSize(widthGot, heightGot);
        onSize({ width: widthGot, height: heightGot });
      });
    } else if (typeof source === "number") {
      const response = Image.resolveAssetSource(source);
      const widthGot = response.width;
      const heightGot = response.height;

      setSize(widthGot, heightGot);
      onSize({ width: widthGot, height: heightGot });
    }
  }

  function setSize(widthFunc, heightFunc) {
    if (width === null && height === null) {
      setResultWidth(200);
      setResultHeight(200);
      onSize({ width: 200, height: 200 });
    } else if (width === null || (height !== null && height < width)) {
      setResultHeight(height);
      setResultWidth((height * widthFunc) / heightFunc);
      onSize({ width: (height * widthFunc) / heightFunc, height });
    } else if (height === null || (width !== null && width <= height)) {
      setResultWidth(width);
      setResultHeight((width * heightFunc) / widthFunc);
      onSize({ width, height: (width * heightFunc) / widthFunc });
    }
  }

  useEffect(() => {
    getImageSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {resultWidth !== null &&
        resultHeight !== null &&
        (animated ? (
          <AnimatedFastImage
            source={source}
            style={[style, { width: resultWidth, height: resultHeight }]}
            onLoadEnd={onLoadEnd()}
          />
        ) : (
          <FastImage
            source={source}
            style={[style, { width: resultWidth, height: resultHeight }]}
            onLoadEnd={onLoadEnd()}
          />
        ))}
    </>
  );
}

AutoSizeImage.propTypes = {
  source: oneOfType([number, object]).isRequired,
  width: number,
  height: number,
  style: oneOfType([number, object]),
  onSize: func,
  onLoadEnd: func,
  animated: bool
};

AutoSizeImage.defaultProps = {
  width: null,
  height: null,
  style: {},
  onSize: size => {},
  onLoadEnd: () => {},
  animated: false
};

export default memo(AutoSizeImage);
