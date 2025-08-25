import { InterfaceDeclaration, Project, SyntaxKind } from 'ts-morph'
import { type VueWrapper } from '@vue/test-utils'

const project = new Project({
    tsConfigFilePath: 'tsconfig.json'
})
project.addSourceFilesAtPaths('src/**/*')

export default function getReactivePropCount(componentName: string) {
    const componentBase = componentName.replace(/^L/, '')
    const interfaceName = `${componentBase}Props`

    const interfaceDeclaration = project
        .getSourceFiles()
        .flatMap((sf) => sf.getInterfaces())
        .find((i) => i.getName() === interfaceName)
    if (!interfaceDeclaration) {
        return { reactive: 0, reactiveNative: 0, initOnly: 0 }
    }

    return collectReactivePropCount(interfaceDeclaration)
}

function collectReactivePropCount(interfaceDecl: InterfaceDeclaration) {
    let reactiveCount = 0
    let reactiveNativeCount = 0
    let initOnlyCount = 0
    // Own properties
    for (const prop of interfaceDecl.getProperties()) {
        if (prop.getName() === 'options') {
            continue
        }
        const jsDocs = prop.getJsDocs()
        const hasReactive = jsDocs.some((doc) =>
            doc.getTags().some((tag) => tag.getTagName() === 'reactive')
        )
        const hasReactiveNative = jsDocs.some((doc) =>
            doc
                .getTags()
                .some((tag) => tag.getTagName() === 'reactive' && tag.getCommentText() === 'native')
        )
        const hasInitOnly = jsDocs.some((doc) =>
            doc.getTags().some((tag) => tag.getTagName() === 'initOnly')
        )
        if (hasReactive) reactiveCount++
        if (hasReactiveNative) reactiveNativeCount++
        if (hasInitOnly) initOnlyCount++
    }

    // Inherited interfaces
    for (const clause of interfaceDecl.getHeritageClauses()) {
        for (const typeNode of clause.getTypeNodes()) {
            const symbol = typeNode.getType().getSymbol()
            if (!symbol) continue

            const decl = symbol
                .getDeclarations()
                .find((d) => d.getKind() === SyntaxKind.InterfaceDeclaration)
            if (decl) {
                const { reactive, reactiveNative, initOnly } = collectReactivePropCount(decl)
                reactiveCount += reactive
                reactiveNativeCount += reactiveNative
                initOnlyCount += initOnly
            }
        }
    }
    return { reactive: reactiveCount, reactiveNative: reactiveNativeCount, initOnly: initOnlyCount }
}

type ReactiveProps = {
    expecting?: Record<string, (leafletObject: any, iteration: number, wrapper: VueWrapper) => void>
    [key: string]: any
}

export function mergeReactiveProps<P extends ReactiveProps, C extends ReactiveProps>(
    parentProps: P,
    childProps: C
): P & C {
    return {
        ...parentProps,
        ...childProps,
        expecting: {
            ...parentProps.expecting,
            ...childProps.expecting
        }
    }
}
