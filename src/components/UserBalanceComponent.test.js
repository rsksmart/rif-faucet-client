import React from 'react'
import { mount } from 'enzyme'
import UserBalanceComponent from './UserBalanceComponent';

describe('UserBalanceComponent', () => {
  it('renders empty', () => {
    const wrapper = mount(<UserBalanceComponent gas={1} />)
    expect(wrapper.text()).toBe('')
  })

  it('shows an error message if gas is 0', () => {
    const wrapper = mount(<UserBalanceComponent gas={0} />)
    expect(wrapper.find('p').length).toEqual(1)
  })
})
