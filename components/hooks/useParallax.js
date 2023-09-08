import { useEffect, useState } from 'react';

export default (options) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animationID, setAnimationId] = useState(null);
  const [intersecting, setIntersecting] = useState(null);
  const { el, behavior, appear, speed } = options;

  function onScrolling() {
    setScrollPosition(window.scrollY);
  }

  function observerOnScroll(entries) {
    entries.forEach((entry) => {
      console.log(entry.intersectionRect.top);
      if (entry.isIntersecting) {
        setIntersecting(true);
        const id = window.requestAnimationFrame(animate);
        setAnimationId(id);
      } else {
        setIntersecting(false);
        window.cancelAnimationFrame(animationID);
      }
    });
  }

  function animate() {
    parallaxElement(el, behavior);
    intersecting && window.requestAnimationFrame(animate);
  }

  function parallaxElement(el, behavior) {
    el.style.setProperty(
      'transform',
      `${behavior}(${scrollPosition * speed}px)`
    );
  }

  useEffect(() => {
    const observer = new IntersectionObserver(observerOnScroll, {
      threshold: parseFloat(`0.${appear / 10}`),
    });

    if (el !== null) {
      observer.observe(el.parentElement);
    }

    window.addEventListener('scroll', onScrolling);
    return () => {
      window.removeEventListener('scroll', onScrolling);
    };
  }, [scrollPosition]);

  // return scrollPosition * speed;
};

// Usage

// const examle = useRef(null);
// const [el, setEl] = useState(null);
// useParallax({
//   el: img,
//   behavior: 'translateX',
//   appear: 100,
//   speed: 0.2,
// });

// useEffect(() => {
//   setEl(example.current);
// }, [example]);
