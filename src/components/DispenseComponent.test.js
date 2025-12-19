import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DispenseComponent from './DispenseComponent'

describe('DispenseComponent', () => {
  const account = '0x123456789'
  const initProps = {
    account,
    dispense: jest.fn(),
    dispensing: false,
    txDispense: null,
    txDispenseCompleted: false,
    errorDispense: null
  }

  it('renders the component', () => {
    const wrapper = mount(<DispenseComponent {...initProps} />)
    expect(wrapper).toBeDefined()
  })

  it('calls dispense with the account when clicking the button', () => {
    const dispense = jest.fn()
    const wrapper = mount(<DispenseComponent {...initProps} dispense={dispense} />)
    wrapper.find('button').simulate('click')
    expect(dispense).toBeCalledWith(account)
  })

  it('shows pending transaction message with explorer link', () => {
    const wrapper = mount(<DispenseComponent {...initProps} txDispense='0x999999' />)
    expect(wrapper.find('.alert').text()).toBe('Transaction pending, see on the explorer')
    expect(wrapper.find('a').prop('href')).toContain('0x999999')
  })

  it('shows completed transaction message with explorer link', () => {
    const wrapper = mount(<DispenseComponent {...initProps} txDispense='0x999999' txDispenseCompleted />)
    expect(wrapper.find('.alert').text()).toBe('RIF Dispensed, see on the explorer')
    expect(wrapper.find('a').prop('href')).toContain('0x999999')
  })

  it('shows errors when provided', () => {
    const wrapper = mount(<DispenseComponent {...initProps} errorDispense='An error' />)
    expect(wrapper.find('.alert').text()).toBe('An error')
  })

  it('handles submit sucessfully', async () => {
    const dispense = jest.fn().mockResolvedValue()
    const wrapper = mount(<DispenseComponent {...initProps} dispense={dispense} />)

    await act(async () => {
      wrapper.find('button').simulate('click')
    })

    expect(dispense).toBeCalledWith(account)
  })
})
