import React, { PureComponent } from 'react';
import { G, Circle, Text, Line } from 'react-native-svg';
import range from 'lodash.range';
import PropTypes from 'prop-types'; // ES6


export default class ClockFace extends PureComponent {

  static propTypes = {
    r: PropTypes.number,
    stroke: PropTypes.string,
  }

  render() {
    const { r, stroke } = this.props;
    const faceRadius = r - 5; // 5px gap between clock mark and slider
    const textRadius = r - 26;

    return (
      <G>
        {
          range(60).map(i => {
            const cos = Math.cos(2 * Math.PI / 60 * i);
            const sin = Math.sin(2 * Math.PI / 60 * i);

            return (
              // All clock marks have the same length (7) but different width (1 or 3)
              <Line
                key={i}
                stroke={stroke}
                strokeWidth={i % 5 === 0 ? 3 : 1}
                x1={cos * faceRadius}
                y1={sin * faceRadius}
                x2={cos * (faceRadius - 7)} // Stroke length is 7
                y2={sin * (faceRadius - 7)}
              />
            );
          })
        }
        {/* Why transform? */}
        <G transform={{translate: "0, 6"}}> 
          {
            range(12).map((h, i) => (
              <Text
                key={i}
                fill={stroke}
                fontSize="16"
                textAnchor="middle"
                x={textRadius * Math.cos(2 * Math.PI / 12 * i - Math.PI / 2 + Math.PI / 6)}
                y={textRadius * Math.sin(2 * Math.PI / 12 * i - Math.PI / 2 + Math.PI / 6)}
              >
                {(h + 1) * 5}
              </Text>
            ))
          }
        </G>
      </G>
    );
  }
}