import { parse } from 'vue-docgen-api'
import fg from 'fast-glob'
import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import propOriginHandler from './handler.js'

// Reconstruct __dirname in ESM context
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function generate() {
    const componentFiles = await fg('src/components/**/*.vue')
    const outputDir = path.resolve(__dirname, '../gen/components')
    await fse.emptyDir(outputDir)

    for (const file of componentFiles) {
        const doc = await parse(file, {
            alias: { '@': path.resolve(__dirname, '../src') },
            addScriptHandlers: [propOriginHandler]
        })

        const name = doc.displayName || path.basename(file, '.vue')
        const markdownPath = path.join(outputDir, `${name}.md`)

        let markdown = `# ${name}\n\n${doc.description || ''}\n\n`
        markdown = ''

        markdown = writeProps(doc, markdown)

        /*
        // Emits
        if (doc.events?.length) {
            markdown += '## Emits\n\n| Event | Arguments | Description |\n| --- | --- | --- |\n'
            for (const event of doc.events) {
                const args = event.properties?.map(p => p.name).join(', ') || '-'
                markdown += `| \`${event.name}\` | ${args} | ${event.description || '-'} |\n`
            }
            markdown += '\n'
        }

        // Slots
        if (doc.slots?.length) {
            markdown += '## Slots\n\n| Name | Description |\n| --- | --- |\n'
            for (const slot of doc.slots) {
                markdown += `| \`${slot.name}\` | ${slot.description || '-'} |\n`
            }
            markdown += '\n'
        }

        // Exposes
        if (doc.exposes?.length) {
            markdown += '## Exposes\n\n| Name | Type | Description |\n| --- | --- | --- |\n'
            for (const expose of doc.exposes) {
                const type = expose.type?.raw || '-'
                markdown += `| \`${expose.name}\` | \`${type}\` | ${expose.description || '-'} |\n`
            }
            markdown += '\n'
        }
        */

        await fse.outputFile(markdownPath, markdown, 'utf8')
        console.log(`📄 Generated: docs/gen/components/${name}.md`)
    }
}

function writeProps(doc, markdown) {
    // Props
    if (doc.props?.length) {
        const grouped = new Map()

        for (const prop of doc.props) {
            const iface = prop.interface?.name || 'Unknown'
            const level = prop.interface?.level ?? 999

            if (!grouped.has(iface)) {
                grouped.set(iface, { level, props: [] })
            }
            grouped.get(iface).props.push(prop)
        }

        const sortedGroups = Array.from(grouped.entries())
            .sort((a, b) => {
                const levelDiff = a[1].level - b[1].level
                return levelDiff !== 0 ? levelDiff : a[0].localeCompare(b[0])
            })

        markdown += '## Props\n\n'

        for (const [ifaceName, group] of sortedGroups) {
            if (group.level > 0)
                markdown += `<details>\n<summary>from <strong>${ifaceName}</strong></summary>\n\n`
            markdown += '| Prop name | Description | Type | Default | Required |\n'
            markdown += '| --- | --- | --- | --- | --- |\n'

            for (const prop of group.props) {
                const type = typeof prop.type === 'object' ? prop.type?.name || '-' : prop.type || '-'
                markdown += `| ${prop.name} | ${prop.description || '-'} | \`${type}\` | \`${prop.defaultValue?.value || '-'}\` | \`${prop.required}\` |\n`
            }
            if (group.level > 0) markdown += '\n</details>\n\n'
            else markdown += '\n### Inherited props\n'
        }
    }
    return markdown
}

generate().catch(error => {
    console.error(error)
    process.exit(1)
})
