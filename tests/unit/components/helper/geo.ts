import { LatLngBounds } from 'leaflet'
import { expect } from 'vitest'

export function expectBoundsToBeClose(
    first: LatLngBounds,
    second: LatLngBounds,
    numDigits: number | number[]
) {
    if (!Array.isArray(numDigits)) {
        numDigits = [numDigits, numDigits, numDigits, numDigits]
    }
    expect(first.getNorth()).toBeCloseTo(second.getNorth(), numDigits[0])
    expect(first.getSouth()).toBeCloseTo(second.getSouth(), numDigits[1])
    expect(first.getWest()).toBeCloseTo(second.getWest(), numDigits[2])
    expect(first.getEast()).toBeCloseTo(second.getEast(), numDigits[3])
}
