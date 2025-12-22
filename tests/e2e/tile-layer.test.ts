import { test, expect, type Page } from '@playwright/test'

test.describe('TileLayer playground page', () => {
    test('renders tile layers and attributions', async ({ page }: { page: Page }) => {
        await page.goto('/tile-layer')

        // Leaflet should have created tile img elements
        await page.waitForSelector('.leaflet-tile', { timeout: 15000 })
        const tilesCount = await page.locator('.leaflet-tile').count()
        expect(tilesCount).toBeGreaterThan(0)

        // Check that tiles come from both configured sources (OpenStreetMap and SafeCast s3)
        const srcs = await page
            .locator('.leaflet-tile')
            .evaluateAll((els: Element[]) => els.map((e: Element) => (e as HTMLImageElement).src))
        const hasOSM = srcs.some((s: string) => /openstreetmap/.test(s))
        const hasS3 = srcs.some((s: string) => /s3.amazonaws/.test(s))
        expect(hasOSM).toBeTruthy()
        expect(hasS3).toBeTruthy()

        // The SafeCast attribution should appear (from the second tile layer)
        await page.waitForSelector('.leaflet-control-attribution', { timeout: 10000 })
        const attributionHtml = await page.locator('.leaflet-control-attribution').innerHTML()
        expect(attributionHtml.toLowerCase()).toContain('safecast')
    })

    test('overlay minZoom is respected (tiles disappear below minZoom)', async ({
        page
    }: {
        page: Page
    }) => {
        await page.goto('/tile-layer')

        // ensure both sources are present initially
        await page.waitForSelector('.leaflet-tile', { timeout: 15000 })
        await page.waitForFunction(
            () => {
                const imgs = Array.from(
                    document.querySelectorAll('.leaflet-tile')
                ) as HTMLImageElement[]
                return (
                    imgs.some((i) => /s3.amazonaws/.test(i.src)) &&
                    imgs.some((i) => /openstreetmap/.test(i.src))
                )
            },
            { timeout: 15000 }
        )

        // Zoom out until we are below minZoom=5 for the SafeCast overlay
        // initial zoom is 8 -> click zoom-out 4 times to reach 4
        const zoomOut = await page.locator('.leaflet-control-zoom .leaflet-control-zoom-out')
        for (let i = 0; i < 4; i++) {
            await zoomOut.click()
            // give map time to fetch new tiles
            await page.waitForTimeout(500)
        }

        // Wait until no tile src refers to s3.amazonaws (overlay removed below minZoom)
        await page.waitForSelector('.leaflet-tile[src*="s3.amazonaws"]', {
            state: 'detached',
            timeout: 15000
        })
    })

    test('overlay maxZoom is respected (tiles disappear above maxZoom)', async ({
        page
    }: {
        page: Page
    }) => {
        await page.goto('/tile-layer')

        // ensure both sources are present initially
        await page.waitForSelector('.leaflet-tile', { timeout: 15000 })
        await page.waitForFunction(
            () => {
                const imgs = Array.from(
                    document.querySelectorAll('.leaflet-tile')
                ) as HTMLImageElement[]
                return (
                    imgs.some((i) => /s3.amazonaws/.test(i.src)) &&
                    imgs.some((i) => /openstreetmap/.test(i.src))
                )
            },
            { timeout: 15000 }
        )

        // Zoom in until we exceed maxZoom=10 for the SafeCast overlay
        // initial zoom is 8 -> click zoom-in 3 times to reach 11
        const zoomIn = await page.locator('.leaflet-control-zoom .leaflet-control-zoom-in')
        for (let i = 0; i < 3; i++) {
            await zoomIn.click()
            // give map time to fetch new tiles
            await page.waitForTimeout(500)
        }

        // Wait until no tile src refers to s3.amazonaws (overlay removed below minZoom)
        await page.waitForSelector('.leaflet-tile[src*="s3.amazonaws"]', {
            state: 'detached',
            timeout: 15000
        })
    })

    test('tile URLs reflect current zoom level', async ({ page }: { page: Page }) => {
        await page.goto('/tile-layer')

        // Ensure tiles present
        await page.waitForSelector('.leaflet-tile', { timeout: 15000 })

        // Zoom out to 6 (from initial 8 -> 2 times)
        const zoomOut = await page.locator('.leaflet-control-zoom .leaflet-control-zoom-out')
        for (let i = 0; i < 2; i++) {
            await zoomOut.click()
            await page.waitForTimeout(500)
        }

        // Now check that at least one tile src contains '/6/' indicating zoom 6
        await page.waitForFunction(
            () => {
                const imgs = Array.from(
                    document.querySelectorAll('.leaflet-tile')
                ) as HTMLImageElement[]
                return imgs.some((i) => /\/6\//.test(i.src))
            },
            { timeout: 15000 }
        )
    })
})
