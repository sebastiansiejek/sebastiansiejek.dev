import { render } from '@testing-library/react'
import React from 'react'
import Favicon, { FaviconProps } from './Favicon'

describe('Favicon', () => {
  const defaultProps: FaviconProps = {}

  it('should render', () => {
    const props = { ...defaultProps }
    const { asFragment, queryByText } = render(<Favicon {...props} />)

    expect(asFragment()).toMatchSnapshot()
    expect(queryByText('Favicon')).toBeTruthy()
  })
})
