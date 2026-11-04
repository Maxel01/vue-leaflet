import { Project, SyntaxKind } from 'ts-morph'
import fse from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getDeclarationSignature(decl) {
    let sig = ''
    const kind = decl.getKindName()

    if (kind === 'FunctionDeclaration') {
        const params = decl
            .getParameters()
            .map((p) => p.getText())
            .join(', ')
        sig = `(${params}) => ${decl.getReturnType().getText()}`
    } else if (kind === 'VariableDeclaration') {
        sig = decl.getType().getText(decl)
    } else if (kind === 'InterfaceDeclaration') {
        const props = decl
            .getProperties()
            .map((p) => p.getText())
            .join('; ')
        sig = props ? `{ ${props} }` : '{}'
    } else if (kind === 'TypeAliasDeclaration') {
        const typeNode = decl.getTypeNode()
        sig = typeNode ? typeNode.getText() : decl.getType().getText()
    } else {
        sig = decl.getType().getText()
    }

    // Clean up noisy import(...) qualifiers
    sig = sig.replace(/import\([^)]+\)\./g, '')
    // Normalize newlines and spaces
    sig = sig.replace(/\s+/g, ' ').trim()
    // Escape pipes for markdown tables
    return sig.replace(/\|/g, '\\|')
}

export async function generateTestDocs() {
    const project = new Project({
        tsConfigFilePath: 'tsconfig.json'
    })

    const sourceFile = project.getSourceFileOrThrow('tests/test-helpers.ts')
    const exportsMap = sourceFile.getExportedDeclarations()

    const groups = {
        setup: {
            title: '🛠️ Environment Setup',
            description:
                'Helpers to initialize headless browser testing environments (JSDOM) for Leaflet.',
            items: []
        },
        wrappers: {
            title: '📦 Component Wrappers',
            description:
                'Factory functions that mount components in isolation with pre-configured mock injections.',
            items: []
        },
        assertions: {
            title: '🧪 Lifecycle & Event Assertions',
            description:
                'Standardized test suites for testing common Leaflet component lifecycle hooks and events.',
            items: []
        },
        reactivity: {
            title: '⚡ Reactivity & Prop Binding Helpers',
            description:
                'Utilities to assert synchronization between Vue reactive props and Leaflet setters.',
            items: []
        },
        mocks: {
            title: '🎭 Mock Injections',
            description:
                'Pre-configured Vitest mock functions for Vue injection keys (e.g. `addLayer`, `removeLayer`).',
            items: []
        },
        geo: {
            title: '🗺️ Geo & Coordinate Helpers',
            description: 'Helpers for comparing Leaflet coordinates and bounds.',
            items: []
        }
    }

    for (const [name, decls] of exportsMap) {
        const decl = decls[0]
        const statement = decl.getFirstAncestorByKind(SyntaxKind.VariableStatement)
        const jsDocs = decl.getJsDocs ? decl.getJsDocs() : statement ? statement.getJsDocs() : []
        const rawComment = jsDocs[0]?.getDescription()?.trim() || ''
        const description = rawComment.replace(/\n+/g, ' ').replace(/\|/g, '\\|') || '-'

        const signature = getDeclarationSignature(decl)
        const item = { name, description, signature }

        if (name.startsWith('setup') || name === 'VueLeafletTestOptions') {
            groups.setup.items.push(item)
        } else if (name.startsWith('create') && name.endsWith('Wrapper')) {
            groups.wrappers.items.push(item)
        } else if (name.includes('PropBinding') || name === 'mergeReactiveProps') {
            groups.reactivity.items.push(item)
        } else if (name.startsWith('test')) {
            groups.assertions.items.push(item)
        } else if (name.startsWith('mock')) {
            groups.mocks.items.push(item)
        } else if (name === 'expectBoundsToBeClose') {
            groups.geo.items.push(item)
        }
    }

    let generatedMarkdown = '## 📚 Test Utilities API Reference\n\n'
    generatedMarkdown +=
        'The following utilities and helpers are automatically exported from `@maxel01/vue-leaflet/tests`:\n\n'

    for (const group of Object.values(groups)) {
        if (!group.items.length) continue

        generatedMarkdown += `### ${group.title}\n\n${group.description}\n\n`
        generatedMarkdown += '| Export | Description | Type / Signature |\n'
        generatedMarkdown += '| --- | --- | --- |\n'

        // Sort items alphabetically
        group.items.sort((a, b) => a.name.localeCompare(b.name))

        for (const item of group.items) {
            generatedMarkdown += `| \`${item.name}\` | ${item.description} | \`${item.signature}\` |\n`
        }
        generatedMarkdown += '\n'
    }

    const outputPath = path.resolve(__dirname, '../guide/generated-test-helpers.md')
    await fse.outputFile(outputPath, generatedMarkdown.trim() + '\n', 'utf8')
    console.log(`📄 Generated: ${path.relative(path.resolve(__dirname, '../../'), outputPath)}`)
}

// Allow direct CLI execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    generateTestDocs().catch((err) => {
        console.error(err)
        process.exit(1)
    })
}
