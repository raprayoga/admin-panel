import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dialog from './index'

const text = 'Dialog'

describe('Render Dialog', () => {
  test('Sould handle click close', () => {
    const handleClose = jest.fn()
    render(
      <Dialog onClose={handleClose} isShow={true}>
        {text}
      </Dialog>
    )

    expect(screen.getByTestId('body-dialog-element')).toBeInTheDocument()

    const overlayElement = screen.getByTestId('overlay-element')
    fireEvent.click(overlayElement)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
