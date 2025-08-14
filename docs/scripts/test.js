import { parse } from 'vue-docgen-api'
import propOriginHandler from './handler.js'
import { alias } from '../../alias.config.js'


const result = await parse('./src/components/LCircleMarker.vue', {
    alias,
    addScriptHandlers: [
        propOriginHandler
    ],

})
console.log(result)
