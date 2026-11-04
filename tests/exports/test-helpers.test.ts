import * as testHelpers from '@/tests/test-helpers'
import { describe, expect, it } from 'vitest'

describe('test-helpers export', () => {
    it('should export setupVueLeafletTest and setupLeafletTest', () => {
        expect(testHelpers.setupVueLeafletTest).toBeDefined()
        expect(typeof testHelpers.setupVueLeafletTest).toBe('function')
        expect(testHelpers.setupLeafletTest).toBe(testHelpers.setupVueLeafletTest)
    })
})
