::: details from [path.ts](https://github.com/maxel01/vue-leaflet/blob/master/src/functions/path.ts)

| Prop name   | Description                                                                                                                                           | Type          | Required  |
| ----------- |-------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------  |
| stroke      | Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.                                                   | Boolean       | -         |
| color       | Stroke color                                                                                                                                          | String        | -         |
| weight      | Stroke width in pixels                                                                                                                                | Number        | -         |
| opacity     | Stroke opacity                                                                                                                                        | Number        | -         |
| lineCap     | A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.               | LineCapShape  | -         |
| lineJoin    | A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.          | LineJoinShape | -         |
| dashArray   | A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray).                               | String        | -         |
| dashOffset  | A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). | String        | -         |
| fill        | Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.                                                     | Boolean       | -        |
| fillColor   | Fill color. Defaults to the value of the color option                                                                                                                                          | String        | -        |
| fillOpacity | Fill opacity                                                                                                                                          | Number        | -        |
| fillRule    | A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined                       | FillRule      | -        |
| className   | Custom class name set on an element. Only for SVG renderer.                                                                                           | String        | -        |
|             |                                                                                                                                                       |               |          |
:::

<!--@include: ./interactive-layer-props.md-->