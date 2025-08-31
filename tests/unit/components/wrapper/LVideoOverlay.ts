import { mergeReactiveProps } from '@/tests/helper/props'
import { imageOverlayAbstractProps } from './LImageOverlay'

export const videoOverlayProps = mergeReactiveProps(imageOverlayAbstractProps, {
    video: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm'
})
