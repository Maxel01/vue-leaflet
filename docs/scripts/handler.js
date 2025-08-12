import { Project, SyntaxKind } from 'ts-morph'
import path from 'path'

const project = new Project({
    tsConfigFilePath: 'tsconfig.json'
})
project.addSourceFilesAtPaths('src/**/*')

export default function propOriginHandler(
    documentation,
    _componentDefinition,
    _astPath,
    options
) {
    const filePath = options.filePath || ''
    const fileName = path.basename(filePath, '.vue')

    const componentBase = fileName.replace(/^L/, '')
    const interfaceName = `${componentBase}Props`.replace('Json', 'JSON')

    const interfaceDeclaration = project
        .getSourceFiles()
        .flatMap(sf => sf.getInterfaces())
        .find(i => i.getName() === interfaceName)
    if (!interfaceDeclaration) {
        console.warn(`[propOriginHandler] Interface "${interfaceName}" not found in ${filePath}`)
        return
    }

    const result = new Map()
    collectProps(interfaceDeclaration, result)

    const doc = documentation.toObject()
    if (!doc.props) {
        console.warn(`[propOriginHandler] props is ${doc.props}`)
        return
    }
    for (const prop of doc.props) {
        prop['interface'] = result.get(prop.name)
        const typeInfo = prop.type

        if (typeInfo?.name === 'union' && Array.isArray(typeInfo.elements)) {
            prop.type.name = typeInfo.elements.map((el) => el.name).join(' \\| ')
        }

    }
}

function collectProps(interfaceDecl, resultMap, level = 0) {
    const name = interfaceDecl.getName()

    // Own properties
    for (const prop of interfaceDecl.getProperties()) {
        const propName = prop.getName()
        if (!resultMap.has(propName)) {
            resultMap.set(propName, { name: name, level: level })
        }
    }

    // Inherited interfaces
    for (const clause of interfaceDecl.getHeritageClauses()) {
        for (const typeNode of clause.getTypeNodes()) {
            const symbol = typeNode.getType().getSymbol()
            if (!symbol) continue

            const decl = symbol.getDeclarations().find(d => d.getKind() === SyntaxKind.InterfaceDeclaration)
            if (decl) {
                collectProps(decl, resultMap, level + 1)
            }
        }
    }
}

