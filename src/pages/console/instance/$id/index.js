/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import semver from 'semver';
import { Typography, Button, Form, Input, Alert } from 'antd';
import { Link } from 'react-router-dom';
import jsonFormat from 'json-format';
import { getInstance, getInstanceData, updateItem } from '../services';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import withInit from 'components/InitDecorator';
import sleep from 'utils/sleep';
import message from 'utils/message';
import styles from '../index.less';
import AceEditor from 'components/AceEditor/async';

const ossBaseUrl = 'https://open.gsd.outxu.cn/';

const { Title } = Typography;

const init = async props => {
  const { id } = props.match.params || '';
  const res = await getInstance(id);
  if (res && res.success && res.data) {
    let data = '{}';
    const dataUrl = ossBaseUrl + res.data.item;
    if (res.data.item) {
      data = await getInstanceData(dataUrl);
    }

    return {
      data: jsonFormat(data),
      dataUrl: dataUrl,
      instance: res.data,
    };
  }
  return {
    error: true,
    errorMsg: res.message,
    errorTitle: '实例信息获取失败',
  };
};

const Instance = props => {
  const { instance, data, form, dataUrl } = props;
  const [json, setJSON] = useState(data);
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator } = form;
  const onUpdate = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        const version = semver.inc(instance.version || '0.0.1', 'patch');
        updateItem({
          id: instance.id,
          item: instance.item,
          data: json,
          version,
          versionComment: values.versionComment,
        });
        await sleep(500);
        setLoading(false);
        message.success('更新成功');
        props.reInit();
      }
    });
  };

  const editorProps = {
    value: json,
    mode: 'json',
    onChange: setJSON,
    theme: 'tomorrow',
    className: 'ace-editor',
    enableSnippets: true,
    fontSize: 13,
    tabSize: 2,
    width: '100%',
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
  };
  const info = (
    <Alert
      message={
        <div>
          <p>
            数据请求地址：
            <a target="_blank" href={dataUrl + '?' + Date.now()}>
              {dataUrl}
            </a>
          </p>
          <p>当前版本：{instance.version || '0.0.0'}</p>
          <p>修改者： {instance.versionAuthor || ''}</p>
          <p>修改备注： {instance.versionComment || ''}</p>
        </div>
      }
    />
  );
  return (
    <PageHeaderWrapper
      bodyStyle={{ margin: 0, background: '#fff' }}
      content={
        <div className={styles.pageHeaderContent}>
          <Title level={3}>{instance.name || ''}</Title>
          <p>{instance.description || '暂无描述'}</p>
          {info}
        </div>
      }
      extraContent={
        <div style={{ marginTop: 12 }}>
          <Link style={{ marginRight: 8 }} to={'/console/project/' + instance.projectId}>
            <Button type="primary">返回项目</Button>
          </Link>
          <Link to={'/console/instance/edit?id=' + instance.id}>
            <Button>修改实例信息</Button>
          </Link>
        </div>
      }
    >
      <div className={styles.editorWrap}>
        <Title level={4}>
          JSON源数据编辑
          <Button type="link">切换</Button>
        </Title>
        <AceEditor {...editorProps} />
        <Form.Item className={styles.versionComment}>
          {getFieldDecorator('versionComment', {
            rules: [{ required: true, message: '请输入变更备注' }],
          })(<Input.TextArea placeholder="请输入变更备注" />)}
        </Form.Item>
        <Button style={{ marginRight: 12 }} loading={loading} onClick={onUpdate} type="primary">
          更新
        </Button>
        <Button type="danger">回滚</Button>
        <div style={{ marginTop: 12 }}>{info}</div>
      </div>
    </PageHeaderWrapper>
  );
};

export default Form.create()(withInit(init)(Instance));
