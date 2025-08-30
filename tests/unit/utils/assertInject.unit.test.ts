import { beforeEach, describe, expect, it, vi } from 'vitest'
import { inject, InjectionKey } from 'vue'
import { assertInject } from '@/utils'

const mockedInject = inject as unknown as ReturnType<typeof vi.fn>
// Mock Vue's inject
vi.mock('vue', async () => {
    const actual = await vi.importActual<typeof import('vue')>('vue')
    return {
        ...actual,
        inject: vi.fn()
    }
})

describe('assertInject (unit)', () => {
    beforeEach(() => {
        mockedInject.mockReset()
    })

    it('returns the injected value when defined', () => {
        const key: InjectionKey<string> = { description: 'myKey' } as InjectionKey<string>
        mockedInject.mockReturnValue('hello')

        const result = assertInject(key)
        expect(result).toBe('hello')
        expect(mockedInject).toHaveBeenCalledWith(key)
    })

    it('throws an error when injected value is undefined', () => {
        const key: InjectionKey<string> = { description: 'missingKey' } as InjectionKey<string>
        mockedInject.mockReturnValue(undefined)

        expect(() => assertInject(key)).toThrowError(
            'Attempt to inject missingKey before it was provided.'
        )
    })
})
