import React, { type ReactElement } from 'react';
import { cx } from '@arwes/tools';
import { type FRAME_SVG_POLYLINE } from '@arwes/frames';

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index';

interface FrameSVGHexagonProps extends FrameSVGProps {
  squareSize?: number
  inverted?: boolean
  strokeWidth?: number
  className?: string
}

const FrameSVGHexagon = (props: FrameSVGHexagonProps): ReactElement => {
  const {
    squareSize: ss = 16,
    inverted,
    strokeWidth = 1,
    className,
    ...otherProps
  } = props;

  const so = strokeWidth / 2;

  // Polylines without repeated points between them.
  let polyline1: FRAME_SVG_POLYLINE = [];
  let polyline2: FRAME_SVG_POLYLINE = [];

  if (!inverted) {
    polyline1 = [
      [so, `100% - ${so}`],
      [`100% - ${ss - so}`, `100% - ${so}`],
      [`100% - ${so}`, `100% - ${ss - so}`],
      [`100% - ${so}`, so]
    ];
    polyline2 = [
      [ss + so, so],
      [so, ss - so]
    ];
  }
  else {
    polyline1 = [
      [so, so],
      [so, `100% - ${ss}`],
      [ss + so, `100% - ${so}`],
      [`100% - ${so}`, `100% - ${so}`]
    ];
    polyline2 = [
      [`100% - ${so}`, ss - so],
      [`100% - ${ss - so}`, so]
    ];
  }

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-react-frames-framesvghexagon', className)}
      shapes={[
        polyline1.concat(polyline2)
      ]}
      polylinesStyle={{
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        ...otherProps.polylinesStyle,
        strokeWidth
      }}
      polylines={[
        polyline1,
        // Polyline2 joins with ending vertexes of Polyline1.
        [
          polyline1[polyline1.length - 1],
          ...polyline2,
          polyline1[0]
        ]
      ]}
    />
  );
};

export type { FrameSVGHexagonProps };
export { FrameSVGHexagon };
