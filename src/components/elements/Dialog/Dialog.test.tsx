import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Dialog from './index'

const text = 'Dialog'

describe('Render Dialog', () => {
  test('Sould handle click close', async () => {
    const handleClose = jest.fn()
    const user = userEvent.setup()
    render(
      <Dialog onClose={handleClose} isShow={true}>
        {text}
      </Dialog>
    )

    expect(screen.getByTestId('body-dialog-element')).toBeInTheDocument()

    const overlayElement = screen.getByTestId('overlay-element')
    await user.click(overlayElement)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
