import React, { useRef, useEffect, cloneElement, ReactNode } from 'react';

/**
 * @title TriggerEffect
 */
export interface TriggerEffectProps {
  children?: ReactNode;
  trigger?: 'hover' | 'click';
  duration?: number;
}

const TriggerEffect = (props: TriggerEffectProps) => {
  const { children, duration = 600 } = props;

  const ref = useRef(null);
  const wrapper = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    ref.current.addEventListener('click', addTriggerEffect);
  }, []);

  function addTriggerEffect(e) {
    clearTimeout(timer.current);
    timer.current = null;

    const { clientX, clientY } = e;
    if (!wrapper.current) {
      wrapper.current = document.createElement('span');
      wrapper.current.setAttribute('class', 'arco-te-ripple-wrapper');
      ref.current.appendChild(wrapper.current);
    }

    const canvas = document.createElement('span');
    canvas.setAttribute('class', 'arco-te-ripple');

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const longSide = width >= height ? width : height;
    const canvasWidth = longSide * 2;
    const offsetX = clientX - left - longSide;
    const offsetY = clientY - top - longSide;

    canvas.setAttribute(
      'style',
      `width:${canvasWidth}px;height:${canvasWidth}px;left:${offsetX}px;top:${offsetY}px;animation-duration:${duration}ms;`
    );

    wrapper.current.appendChild(canvas);

    canvas.setAttribute('class', 'arco-te-ripple arco-te-ripple-visible');

    setTimeout(() => {
      wrapper.current.removeChild(canvas);
    }, duration);

    timer.current = setTimeout(() => {
      ref.current.removeChild(wrapper.current);
      wrapper.current = null;
    }, duration + 50);
  }

  const child = React.Children.only(children) as any;

  return cloneElement(child, {
    ...child.props,
    ref: (node) => {
      ref.current = node;
      const { ref: originRef } = child;
      if (typeof originRef === 'function') {
        originRef(node);
      } else if (originRef !== null) {
        originRef.current = node;
      }
    },
  });
};

export default TriggerEffect;
