export interface VueLeafletTestOptions {
    /**
     * Default width for HTMLElement.prototype.clientWidth in JSDOM.
     * @default 300
     */
    width?: number
    /**
     * Default height for HTMLElement.prototype.clientHeight in JSDOM.
     * @default 300
     */
    height?: number
}

/**
 * Sets up polyfills and mocks required by Leaflet in Node/JSDOM test environments (Vitest/Jest).
 *
 * Mocks:
 * - `globalThis.ResizeObserver`
 * - `window.matchMedia`
 * - `HTMLElement.prototype.clientWidth` / `clientHeight`
 */
export function setupVueLeafletTest(options: VueLeafletTestOptions = {}): void {
    const { width = 300, height = 300 } = options

    // 1. Mock ResizeObserver
    if (typeof globalThis !== 'undefined' && typeof globalThis.ResizeObserver === 'undefined') {
        globalThis.ResizeObserver = class ResizeObserver {
            observe(): void {}
            unobserve(): void {}
            disconnect(): void {}
        }
    }

    // 2. Mock window.matchMedia
    if (typeof window !== 'undefined' && !window.matchMedia) {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            configurable: true,
            value: (query: string) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: () => {},
                removeListener: () => {},
                addEventListener: () => {},
                removeEventListener: () => {},
                dispatchEvent: () => false
            })
        })
    }

    // 3. Mock HTMLElement dimensions
    if (typeof HTMLElement !== 'undefined') {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
            configurable: true,
            get() {
                return width
            }
        })
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
            configurable: true,
            get() {
                return height
            }
        })
    }
}

/**
 * Alias for `setupVueLeafletTest`.
 */
export const setupLeafletTest = setupVueLeafletTest
export type LeafletTestOptions = VueLeafletTestOptions
