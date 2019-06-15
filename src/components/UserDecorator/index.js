import React, { Component } from 'react';
import router from 'umi/router';
import { UserContext } from 'contexts/';

import Loading from 'components/Loading';

import { tRequest, request } from 'utils/request';
import message from 'utils/message';

export default WrappedComponent => {
  class UserHoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {},
        loading: true,
        login: this.login,
        logout: this.logout,
      };
    }
    componentDidMount() {
      this.initUser();
    }

    initUser = () => {
      tRequest('/user/info/me').then(res => {
        if (res.success) {
          const user = res.data;
          user.avatar = user.avatar || '/favicon.ico';
          this.setState({ user: res.data, loading: false });
          const { pathname = '' } = this.props.location;
          if (pathname === '/login') {
            router.replace('/console/home');
          }
        } else {
          this.setState({ user: {}, loading: false });
        }
      });
    };

    login = async data => {
      await request.post('/user/login/', { data }).then(res => {
        if (res.success) {
          this.setState({ user: res.data });
          window.localStorage.setItem('gsd-token', res.data.token);
          setTimeout(() => {
            window.location.href = '/console/home';
            message.success('登录成功');
          }, 1000);
        } else {
          message.error(res.message);
        }
      });
    };

    logout = () => {
      message.success('登出成功');
      this.setState({ user: {} });
      window.localStorage.removeItem('gsd-token');
    };

    render() {
      const { loading = true } = this.state;

      if (loading) {
        return <Loading />;
      }
      return (
        <UserContext.Provider value={this.state}>
          <WrappedComponent {...this.props} />
        </UserContext.Provider>
      );
    }
  }

  return UserHoc;
};
