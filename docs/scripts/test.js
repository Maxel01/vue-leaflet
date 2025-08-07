import { parse } from 'vue-docgen-api'
import propOriginHandler from './handler.ts'


const result = await parse('./src/components/LCircleMarker.vue', {
    addScriptHandlers: [
        propOriginHandler
    ],

})
console.log(result)
