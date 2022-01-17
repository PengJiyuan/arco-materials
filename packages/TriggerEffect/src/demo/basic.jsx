import React, { useRef } from 'react';
import { Button } from '@arco-design/web-react';
import TriggerEffect from 'arco-trigger-effect';

function Demo() {
  const ref = useRef(null);

  return (
    <div style={{ padding: 300 }}>
      <TriggerEffect>
        <Button size="large" ref={ref}>
          Click Me
        </Button>
      </TriggerEffect>
    </div>
  );
}

export default () => {
  return <Demo />;
};
