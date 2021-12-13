import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconThumbUp } from '@arco-design/web-react/icon';
import ArcoConfetti from 'arco-confetti';

const wrapperStyle = {
  height: 300,
  paddingBottom: 20,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
};

export default function Demo() {
  return (
    <div style={wrapperStyle}>
      <ArcoConfetti>
        <Button type="primary" shape="circle" size="large">
          <IconThumbUp style={{ fontSize: 18, verticalAlign: -4 }} />
        </Button>
      </ArcoConfetti>
    </div>
  );
}
