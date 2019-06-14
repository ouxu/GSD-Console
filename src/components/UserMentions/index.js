import React, { Component } from 'react';
import { Select } from 'antd';
import request from 'utils/request';
import debounce from 'lodash/debounce';
const { Option } = Select;

const avatarStyle = { width: 20, height: 20 };

export class UserMention extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadUsers = debounce(this.loadUsers, 800);
  }

  onSearch = search => {
    this.setState({ search, loading: !!search, users: [] });
    this.loadUsers(search);
  };

  loadUsers(keyword) {
    if (!keyword) {
      this.setState({
        users: [],
      });
      return;
    }
    request('/user/query', { params: { keyword } }).then(res => {
      const { search } = this.state;

      if (search !== keyword) return;
      if (!res || !res.success) return;

      this.setState({
        users: res.data,
        loading: false,
      });
    });
  }

  render() {
    const { users = [] } = this.state;

    return (
      <Select
        mode="multiple"
        filterOption={false}
        onSearch={this.onSearch}
        style={{ width: '100%' }}
        {...this.props}
      >
        {users.map(({ id, username, avatar }) => (
          <Option key={id} value={'' + id}>
            <img style={avatarStyle} src={avatar || '/favicon.ico'} alt="" />
            <span> {username}</span>
          </Option>
        ))}
      </Select>
    );
  }
}

export default UserMention;
