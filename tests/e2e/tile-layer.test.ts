import { test, expect, type Page } from '@playwright/test'

test.describe('TileLayer playground page', () => {
    test('renders tile layers and attributions', async ({ page }: { page: Page }) => {
        await page.goto('/tile-layer')

        // Leaflet should have created tile img elements
        await page.waitForSelector('.leaflet-tile', { timeout: 15000 })
        const tilesCount = await page.locator('.leaflet-tile').count()
        expect(tilesCount).toBeGreaterThan(0)

        // Check that tiles come from both configured sources (OpenStreetMap and SafeCast s3)
        const srcs = await page.locator('.leaflet-tile').evaluateAll((els: Element[]) => els.map((e: Element) => (e as HTMLImageElement).src))
        const hasOSM = srcs.some((s: string) => /openstreetmap/.test(s))
        const hasS3 = srcs.some((s: string) => /s3.amazonaws/.test(s))
        expect(hasOSM).toBeTruthy()
        expect(hasS3).toBeTruthy()

        // The SafeCast attribution should appear (from the second tile layer)
        await page.waitForSelector('.leaflet-control-attribution', { timeout: 10000 })
        const attributionHtml = await page.locator('.leaflet-control-attribution').innerHTML()
        expect(attributionHtml.toLowerCase()).toContain('safecast')
    })
})
