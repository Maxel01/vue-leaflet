import { describe, it, expect } from 'vitest'
import { isFunction } from '@/utils'

describe('isFunction', () => {
    it('returns true for regular functions', () => {
        expect(isFunction(function () {})).toBe(true)
    })

    it('returns true for arrow functions', () => {
        expect(isFunction(() => {})).toBe(true)
    })

    it('returns true for async functions', () => {
        expect(isFunction(async () => {})).toBe(true)
    })

    it('returns true for class constructors', () => {
        class MyClass {}
        expect(isFunction(MyClass)).toBe(true)
    })

    it('returns false for objects', () => {
        expect(isFunction({})).toBe(false)
    })

    it('returns false for arrays', () => {
        expect(isFunction([])).toBe(false)
    })

    it('returns false for strings', () => {
        expect(isFunction('hello')).toBe(false)
    })

    it('returns false for numbers', () => {
        expect(isFunction(42)).toBe(false)
    })

    it('returns false for null', () => {
        expect(isFunction(null)).toBe(false)
    })

    it('returns false for undefined', () => {
        expect(isFunction(undefined)).toBe(false)
    })

    it('returns false for boolean values', () => {
        expect(isFunction(true)).toBe(false)
        expect(isFunction(false)).toBe(false)
    })

    it('returns true for Proxy-wrapped functions', () => {
        const fn = () => {}
        const proxy = new Proxy(fn, {})
        expect(isFunction(proxy)).toBe(true)
    })
})
