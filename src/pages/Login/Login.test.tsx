import { screen, waitFor, fireEvent } from '@testing-library/react'
import path from 'src/constants/path'
import { renderWithRouter } from 'src/utils/testUtils'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })
  it('Display required error when field is empty', async () => {
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email is required')).toBeTruthy()
      expect(screen.queryByText('Password is required')).toBeTruthy()
    })
  })
  it('Display error when enter value input wrong', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@mail'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email format is incorrect')).toBeTruthy()
      expect(screen.queryByText('Length is 6 - 160 letters')).toBeTruthy()
    })
  })

  it('Do not display error when re enter correct value', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'd3@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: 'useruser'
      }
    })

    await waitFor(() => {
      expect(screen.queryByText('Email format is incorrect')).toBeFalsy()
      expect(screen.queryByText('Lenth is 6 - 160 letters')).toBeFalsy()
    })
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Home | Shopee Clone')
    })
    // console.log(await screen.findByText('Email format is incorrect'))
  })
})
