import { describe, expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from './utils/testUtils'
import path from './constants/path'

describe('App', () => {
  test('App render and redirect page', async () => {
    const { user } = renderWithRouter()

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Home | Shopee Clone')
    })

    await user.click(screen.getByText(/Sign in/i))
    await waitFor(() => {
      expect(screen.queryByText('Do not have an account?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Sign in | Shopee Clone')
    })
  })

  test('Back to not found', async () => {
    const badRoute = '/some/bad/route'
    renderWithRouter({ route: badRoute })
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })
  })

  test('Render register page', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.getByText(/Do have an account?/i)).toBeInTheDocument()
    })
  })
})
