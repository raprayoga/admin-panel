import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination, NumberList } from './index'
import '@testing-library/jest-dom'
import { sideCurrentPageList } from './NumberList'

const style = 'p-5 m-5 text-bold'
const args = {
  currentPage: 5,
  lastPage: 10,
  pageRangeDisplayed: 3
}
const handleChangePagination = jest.fn()
const handleChangeNumberList = jest.fn()

const caseComponent: {
  component: () => React.ReactElement
  dataId: string
  onChange: () => void
}[] = [
  {
    component: () => (
      <Pagination
        onPageChange={handleChangePagination}
        data-testid="pagination-element"
        className={style}
        {...args}
      />
    ),
    dataId: 'pagination-element',
    onChange: handleChangePagination
  },
  {
    component: () => (
      <NumberList
        onPageChange={handleChangeNumberList}
        data-testid="numberlist-element"
        className={style}
        {...args}
      />
    ),
    dataId: 'numberlist-element',
    onChange: handleChangeNumberList
  }
]

const caseIconComponent = [
  { testId: 'chevron-double-left-element' },
  { testId: 'chevron-left-element' },
  { testId: 'chevron-double-right-element' },
  { testId: 'chevron-right-element' }
]

describe('Pagination test', () => {
  test.each(caseComponent)(
    'sould render pagination with correct page & style',
    ({ component, dataId, onChange }) => {
      render(component())

      const paginationElement = screen.getByTestId(dataId)
      expect(paginationElement).toHaveClass(`${style}`)

      for (
        let index =
          args.currentPage - Math.floor(args.pageRangeDisplayed / 2) + 1;
        index <= args.currentPage + Math.floor(args.pageRangeDisplayed / 2);
        index++
      ) {
        const pageLink = screen.getByText(index)
        expect(pageLink).toBeInTheDocument()
      }

      const currentPage = screen.getByText(args.currentPage)
      fireEvent.click(currentPage)
      expect(onChange).toHaveBeenCalledTimes(0)

      const lastPage = screen.getByText(args.lastPage)
      expect(lastPage).toBeInTheDocument()
      fireEvent.click(lastPage)
      expect(onChange).toHaveBeenCalledTimes(1)

      const currentPagePlusOne = screen.getByText(args.currentPage + 1)
      fireEvent.click(currentPagePlusOne)
      expect(onChange).toHaveBeenCalledTimes(2)
    }
  )

  test.each(caseIconComponent)(
    'sould render page with arrow icon correctly',
    ({ testId }) => {
      const handleClick = jest.fn()
      render(
        <Pagination
          data-testid="pagination-element"
          onPageChange={handleClick}
          {...args}
        />
      )

      const chevronDoubleLeftElement = screen.getByTestId(testId)
      expect(chevronDoubleLeftElement).toBeInTheDocument()
      fireEvent.click(chevronDoubleLeftElement)
      expect(handleClick).toHaveBeenCalledTimes(1)
    }
  )

  test('sideCurrentPageList func sould return correct value when currentpage in middle of the page list', () => {
    const { leftSide, rightSide } = sideCurrentPageList(args)
    expect(leftSide).toBe(2)
    expect(rightSide).toBe(1)
  })

  test('sideCurrentPageList func sould return correct value when currentpage in beginning of the page list', () => {
    const { leftSide, rightSide } = sideCurrentPageList({
      ...args,
      currentPage: 1
    })
    expect(leftSide).toBe(1)
    expect(rightSide).toBe(2)
  })

  test('sideCurrentPageList func sould return correct value when currentpage in end of the page list', () => {
    const { leftSide, rightSide } = sideCurrentPageList({
      ...args,
      currentPage: args.lastPage - 1
    })
    expect(leftSide).toBe(2)
    expect(rightSide).toBe(1)
  })
})
