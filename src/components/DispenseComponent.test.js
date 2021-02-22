import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DispenseComponent from './DispenseComponent';

describe('DispenseComponent', () => {
  const account = '0x123456789'
  const initProps = {
    account,
    dispense: jest.fn(),
    dispensing: false,
    txDispense: null,
    errorDispense: null
  }

  it('renders the component', () => {
    const wrapper = mount(<DispenseComponent {...initProps} />)
    expect(wrapper).toBeDefined()
  })

  it('sets the account as the address', () => {
    const wrapper = mount(<DispenseComponent {...initProps} />)
    expect(wrapper.find('input').props().value).toBe(account)
    expect(wrapper.find('label').text()).toBe('Address to dispense to (your address):')
  })

  it('does not show (your account) if input is different than address', () => {
    const wrapper = mount(<DispenseComponent {...initProps} />)
    wrapper.find('input').simulate('change', { target: { value: '0x987654321', id: 'dispenseTo' } })
    expect(wrapper.find('label').text()).toBe('Address to dispense to:')
  })

  it('handles submit sucessfully', async () => {
    const dispense = jest.fn()
    const props = {
      ...initProps,
      dispense: (account) => Promise.resolve(dispense(account))
    }
    const wrapper = mount(<DispenseComponent {...props} />)

    await act(async () => {
      await wrapper.find('button').simulate('click')
      expect(dispense).toBeCalledWith(account)
    })
  })

  it('handles success', () => {
    const wrapper = mount(<DispenseComponent {...initProps} txDispense='0x999999' />)
    expect(wrapper.find('.alert').text()).toBe('Dispensing, see the transaction onthe explorer!')
  })

  it('handles errors', () => {
    const wrapper = mount(<DispenseComponent {...initProps} errorDispense='An error' />)
    expect(wrapper.find('.alert').text()).toBe('An error')
  })
})