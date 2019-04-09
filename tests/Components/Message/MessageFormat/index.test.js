/* eslint-disable */

import React from 'react';
import { expect } from 'chai';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import MessageFormat from 'src/components/Message/MessageFormat';
describe('<MessageFormat />', () => {
  it('Italic : apply a style to slack _text_', () => {
    const message = 'I am a _simple_ message';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.contains(<span className="italic">simple</span>));
  });
  it('Bold : apply a style to slack *text*', () => {
    const message = 'I am a *simple* message';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.contains(<span className="bold">simple</span>));
  });
  it('Tbq : apply a style to slack ```text```', () => {
    const message = 'I am a ```simple``` message';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.contains(<div className="tbq">simple</div>));
  });
  it('Sbq : apply a style to slack `text`', () => {
    const message = 'I am a `simple` message';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.contains(<span className="sbq">simple</span>));
  });
  it('Username : username not found <@U435345SDH> -> Anonymous', () => {
    const message = 'My name is <@U435345SDH>';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.contains(<span className="notify-user">Anonymous</span>));
  });
  it('Username : Replace username from an user list <@U57565456> -> @Jordan', () => {
    const message = 'My name is <@U435345SDH>';
    const users = [
      {
        id_slack: 'U435345SDH',
        display_name: 'Jordan',
        real_name: 'Jordan',
      }
    ];
    const wrapper = mount(<MessageFormat message={message} users={users} />);
    expect(wrapper.contains(<span className="notify-user">@Jordan</span>));
  });
  it('Notify channel : Replace <!channel> -> @channel', () => {
    const message = 'Hello <!channel>';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.html()).to.equal('<pre class="message-content">Hello <span class="notify-channel">@channel</span></pre>');
  });
  it('Notify channel : Replace <!here> -> @channel', () => {
    const message = 'Hello <!here>';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.contains(<span className="notify-channel">@channel</span>));
  });
  it('Smiley :wave:', () => {
    const message = 'Hello :wave:';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.html()).to.contains('emoji-mart-emoji');
  });
  it('Multiple elements', () => {
    const message = ':wave:, <!channel> and my friend <@U435345SDH>, here is a little `code` to help you';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.html()).to.contains('emoji-mart-emoji');
    expect(wrapper.html()).to.contains('@channel');
    expect(wrapper.html()).to.contains('Anonymous');
    expect(wrapper.html()).to.contains('<span class="sbq">code</span>');
  })
  it('Allowed nested elements', () => {
    const message = '```Test <http://iamatest.fr>```';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.html()).to.contains('link');
    expect(wrapper.html()).to.contains('tbq');

  })
  it('Not allowed nested elements', () => {
    const message = '```Test *Hello* ```';
    const wrapper = mount(<MessageFormat message={message} />);
    expect(wrapper.html()).to.contains('tbq');
    expect(wrapper.html()).not.to.contains('bold');

  })

});

