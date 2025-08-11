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
    const outputDir = path.resolve(__dirname, '../components')
    await emptyLFilesOnly(outputDir)

    for (const file of componentFiles) {
        const doc = await parse(file, {
            alias: { '@': path.resolve(__dirname, '../src') },
            addScriptHandlers: [propOriginHandler]
        })

        const name = doc.displayName || path.basename(file, '.vue')
        const markdownPath = path.join(outputDir, `${toKebabCase(name)}.md`)

        let markdown = `# ${name}\n\n${doc.description || ''}\n\n`
        markdown = '---\noutline: deep\n---\n\n'
        markdown += `# ${doc.displayName}\n\n`
        markdown += `${doc.description}\n\n`

        markdown = writeDemo(doc, markdown)
        markdown = writeProps(doc, markdown)

        // Emits
        if (doc.events?.length) {
            markdown += '## Emits\n\n| Event | Arguments | Description |\n| --- | --- | --- |\n'
            for (const event of doc.events) {
                const args = event.type?.names?.join(', ') || '-'
                markdown += `| \`${event.name}\` | \`${args}\` | ${event.description || '-'} |\n`
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
        if (doc.expose?.length) {
            markdown += '## Exposes\n\n| Name | Type | Description |\n| --- | --- | --- |\n'
            for (const expose of doc.expose) {
                const type = expose.tags?.find(i => i.title === 'type')?.type?.name || '-'
                markdown += `| \`${expose.name}\` | \`${type}\` | ${expose.description || '-'} |\n`
            }
            markdown += '\n'
        }

        await fse.outputFile(markdownPath, markdown, 'utf8')
        console.log(`📄 Generated: ${path.relative(path.resolve(__dirname, "../../"), markdownPath)}`)
    }
}

function writeDemo(doc, markdown) {
    if (doc.tags.demo) {
        const demo = doc.tags.demo[0]
        const [demoName, highlight] = demo.description.split(' ')
        markdown += '## Demo\n\n' +
            '<script>\n' +
            'import "leaflet/dist/leaflet.css";\n' +
            '</script>\n\n' +
            '<div class="demo">\n' +
            `    <${demoName} />\n` +
            '</div>\n\n' +
            `\`\`\`vue${highlight}\n` +
            `<!--@include: ../../src/playground/views/${demoName}.vue -->\n` +
            '```\n\n'
    }
    return markdown
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

        let skip = false
        if (sortedGroups.length > 0 && sortedGroups[0][1].level > 0){
            markdown += 'This component does not have any specific props.\n\n### Inherited props\n'
        }
        for (let i = 0; i < sortedGroups.length; i++) {
            if (skip) {
                skip = false
                continue
            }
            const [ifaceName, group] = sortedGroups[i]
            if (group.level > 0)
                markdown += `<details>\n<summary>from <strong>${ifaceName}</strong></summary>\n\n`
            markdown += '| Prop name | Description | Type | Reactive | Default | Required |\n'
            markdown = writePropsTable(group, markdown)

            if (i + 1 < sortedGroups.length) {
                const [nextIfaceName, nextGroup] = sortedGroups[i + 1]
                if (ifaceName === nextIfaceName.replace('Abstract', '')) {
                    markdown = writePropsTable(nextGroup, markdown)
                    skip = true
                }
            }
            if (group.level > 0) markdown += '\n</details>\n\n'
            else markdown += '\n### Inherited props\n'
        }
    }
    return markdown
}

function writePropsTable(group, markdown) {
    markdown += '| --- | --- | --- | --- | --- | --- |\n'

    for (const prop of group.props) {
        const reactive = prop.tags?.['reactive'] ? 'true' : prop.tags?.['initOnly'] ? 'initOnly' : '?'
        const type = typeof prop.type === 'object' ? prop.type?.name || '-' : prop.type || '-'
        markdown += `| ${prop.name} | ${prop.description || '-'} | \`${type}\` | \`${reactive}\` | \`${prop.defaultValue?.value || '-'}\` | \`${prop.required}\` |\n`
    }
    return markdown
}

function toKebabCase(name) {
    if (name === 'LSVGOverlay') return 'l-svg-overlay';
    return name
        .replace(/^L/, 'l')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
}

async function emptyLFilesOnly(dir) {
    const files = await fse.readdir(dir);

    for (const file of files) {
        if (file.startsWith('l-')) {
            const filePath = path.join(dir, file);
            const stat = await fse.stat(filePath);

            if (stat.isFile()) {
                await fse.remove(filePath);
            }
        }
    }
}


generate().catch(error => {
    console.error(error)
    process.exit(1)
})
