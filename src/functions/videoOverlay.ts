import type { VideoOverlay, VideoOverlayOptions } from 'leaflet'
import type { Ref } from 'vue'

import { propsToLeafletOptions } from '../utils'
import type { ImageOverlayAbstractProps, ImageOverlayEmits } from './imageOverlay.ts'
import { imageOverlayPropsDefaults, setupImageOverlay } from './imageOverlay.ts'

export interface VideoOverlayProps extends ImageOverlayAbstractProps<VideoOverlayOptions> {
    /**
     * Url of the video, urls of the videos or a video Element
     * @initOnly
     */
    video: string | string[] | HTMLVideoElement
}

export const videoOverlayPropsDefaults = {
    ...imageOverlayPropsDefaults,
}

export type VideoOverlayEmits = ImageOverlayEmits<VideoOverlay>

export const setupVideoOverlay = (
    props: VideoOverlayProps,
    leafletRef: Ref<VideoOverlay | undefined>,
    emit: VideoOverlayEmits,
) => {
    const { options: imageOverlayOptions, methods: imageOverlayMethods } = setupImageOverlay(
        props,
        leafletRef,
        emit,
    )

    const options = propsToLeafletOptions<VideoOverlayOptions>(props, imageOverlayOptions)

    const methods = {
        ...imageOverlayMethods,
    }

    return { options, methods }
}
