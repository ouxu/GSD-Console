import React, { Component } from 'react';
import Loading from 'components/Loading';
import { Button, Card } from 'antd';
import { Result } from 'ant-design-pro';
import router from 'umi/router';

export default (request, disableLoading) => WrappedComponent => {
  class HocComponent extends Component {
    state = {
      loading: true,
    };
    componentDidMount() {
      this.init();
    }

    init = () => {
      disableLoading && this.setState({ loading: true });
      request(this.props).then(data => this.setState({ ...data, loading: false }));
    };
    goHome = () => {
      router.push('/console/home');
    };
    onRefresh = () => {
      window.history.go();
    };
    render() {
      if (!disableLoading && this.state.loading) {
        return <Loading />;
      }
      const { error = false, errorMsg = '', errorTitle } = this.state;

      if (error) {
        return (
          <Card bordered={false}>
            <Result
              type="error"
              title={errorTitle || '未知错误'}
              description={errorMsg}
              actions={[
                <Button type="primary" onClick={this.goHome}>
                  返回首页
                </Button>,
                <Button onClick={this.onRefresh}>刷新重试</Button>,
              ]}
            />
          </Card>
        );
      }
      return <WrappedComponent reInit={this.init} {...this.state} {...this.props} />;
    }
  }
  return HocComponent;
};
