import React from 'react';
import UserDecorator from 'components/UserDecorator';

export default UserDecorator(props => React.cloneElement(props.children, props));

