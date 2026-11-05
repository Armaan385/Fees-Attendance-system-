/**
 * AnimatedList - React Bits Component Native Web Engine
 * Faithful browser implementation of React Bits AnimatedList.
 * Includes physics-based spring indicator, smootherstep edge fade masks,
 * keyboard accessibility, scroll stagger, and VisionOS themes.
 */
(function() {
  'use strict';

  const THEMES = {
    dark: {
      '--al-frame': 'rgba(15, 23, 42, 0.75)',
      '--al-frame-edge': 'rgba(255, 255, 255, 0.12)',
      '--al-frame-highlight': 'rgba(255, 255, 255, 0.22)',
      '--al-frame-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
      '--al-tile': 'linear-gradient(180deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.85) 100%)',
      '--al-tile-edge': 'rgba(255, 255, 255, 0.08)',
      '--al-tile-highlight': 'rgba(255, 255, 255, 0.2)',
      '--al-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.7)',
      '--al-well': 'rgba(56, 189, 248, 0.12)',
      '--al-ink': '#f8fafc',
      '--al-muted': 'rgba(148, 163, 184, 0.85)',
      '--al-thumb': 'rgba(255, 255, 255, 0.18)',
      '--al-ring': 'rgba(56, 189, 248, 0.65)',
      '--al-ring-fill': 'rgba(56, 189, 248, 0.08)',
      '--al-hover': 'brightness(1.15)',
      '--al-press': 'brightness(0.88)',
      '--al-active': 'brightness(1.18)'
    },
    light: {
      '--al-frame': 'rgba(240, 240, 243, 0.85)',
      '--al-frame-edge': 'rgba(24, 24, 27, 0.07)',
      '--al-frame-highlight': 'rgba(255, 255, 255, 0.95)',
      '--al-frame-shadow': '0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)',
      '--al-tile': 'linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)',
      '--al-tile-edge': 'rgba(24, 24, 27, 0.08)',
      '--al-tile-highlight': 'rgba(255, 255, 255, 1)',
      '--al-tile-shadow': '0 4px 10px -5px rgba(24, 24, 27, 0.25)',
      '--al-well': 'rgba(24, 24, 27, 0.05)',
      '--al-ink': '#27272a',
      '--al-muted': 'rgba(39, 39, 42, 0.55)',
      '--al-thumb': 'rgba(24, 24, 27, 0.16)',
      '--al-ring': 'rgba(24, 24, 27, 0.28)',
      '--al-ring-fill': 'transparent',
      '--al-hover': 'brightness(0.97)',
      '--al-press': 'brightness(0.92)',
      '--al-active': 'none'
    }
  };

  const HIDDEN = {
    pop: { above: 'translate3d(0, -12px, 0) scale(0.8)', below: 'translate3d(0, 12px, 0) scale(0.8)' },
    slide: { above: 'translate3d(0, -28px, 0) scale(0.98)', below: 'translate3d(0, 28px, 0) scale(0.98)' },
    fade: { above: 'translate3d(0, -4px, 0)', below: 'translate3d(0, 4px, 0)' }
  };

  const SPRING =
    'linear(0, 0.0603, 0.2033, 0.3821, 0.5633, 0.7258, 0.8584, 0.9574, 1.0242, 1.0634, 1.0809, 1.0828, 1.0747, 1.0613, 1.046, 1.0313, 1.0186, 1.0085, 1.0012, 0.9965, 0.994, 0.9931, 0.9933, 0.9941, 0.9953, 0.9966, 0.9978, 0.9988, 1)';

  const smootherstep = t => t * t * t * (t * (t * 6 - 15) + 10);

  const FADE_MASK = (() => {
    const steps = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1];
    const top = steps.map(t => `rgba(0, 0, 0, ${smootherstep(t).toFixed(3)}) calc(var(--al-fade-top) * ${t})`);
    const bottom = [...steps]
      .reverse()
      .map(t => `rgba(0, 0, 0, ${smootherstep(t).toFixed(3)}) calc(100% - var(--al-fade-bottom) * ${t})`);
    return `linear-gradient(to bottom, ${[...top, ...bottom].join(', ')})`;
  })();

  function mountAnimatedList(root, customOpts = {}) {
    if (root._animatedListMounted) return;
    root._animatedListMounted = true;

    const theme = root.dataset.theme || customOpts.theme || 'dark';
    const chosenTheme = THEMES[theme] ?? THEMES.dark;
    for (const [k, v] of Object.entries(chosenTheme)) {
      root.style.setProperty(k, v);
    }

    const radius = parseFloat(root.dataset.radius || customOpts.radius || 14);
    const gap = parseFloat(root.dataset.gap || customOpts.gap || 8);
    const width = root.dataset.width || customOpts.width || '440px';
    const maxHeight = root.dataset.maxHeight || customOpts.maxHeight || '440px';
    const animation = root.dataset.animation || customOpts.animation || 'pop';
    const selectOnHover = root.dataset.selectOnHover !== 'false' && customOpts.selectOnHover !== false;
    const enableArrowNav = root.dataset.enableArrowNavigation !== 'false' && customOpts.enableArrowNavigation !== false;
    const loop = root.dataset.loop === 'true' || customOpts.loop === true;
    const showGradients = root.dataset.showGradients !== 'false' && customOpts.showGradients !== false;
    const fadeSize = parseFloat(root.dataset.fadeSize || customOpts.fadeSize || 56);
    const stagger = parseFloat(root.dataset.stagger || customOpts.stagger || 0.05);
    const animateOnce = root.dataset.animateOnce === 'true' || customOpts.animateOnce === true;

    root.style.setProperty('--al-radius', `${radius}px`);
    root.style.setProperty('--al-gap', `${gap}px`);
    root.style.setProperty('--al-width', typeof width === 'number' ? `${width}px` : width);

    let viewport = root.querySelector('.animated-list__viewport');
    if (!viewport) {
      viewport = document.createElement('div');
      viewport.className = 'animated-list__viewport';
      viewport.setAttribute('role', 'listbox');
      viewport.setAttribute('tabindex', '0');
      while (root.firstChild) {
        viewport.appendChild(root.firstChild);
      }
      root.appendChild(viewport);
    }

    viewport.style.maxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
    if (showGradients) {
      viewport.style.maskImage = FADE_MASK;
      viewport.style.webkitMaskImage = FADE_MASK;
    }

    let track = viewport.querySelector('.animated-list__track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'animated-list__track';
      while (viewport.firstChild) {
        track.appendChild(viewport.firstChild);
      }
      viewport.appendChild(track);
    }

    // Indicator & ring
    let indicator = track.querySelector('.animated-list__indicator');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'animated-list__indicator';
      indicator.setAttribute('aria-hidden', 'true');
      const ring = document.createElement('span');
      ring.className = 'animated-list__ring';
      indicator.appendChild(ring);
      track.appendChild(indicator);
    }
    const ring = indicator.querySelector('.animated-list__ring');

    // Frame rim
    if (root.classList.contains('animated-list--framed') && !root.querySelector('.animated-list__frame-rim')) {
      const frameRim = document.createElement('span');
      frameRim.className = 'animated-list__frame-rim';
      frameRim.setAttribute('aria-hidden', 'true');
      root.appendChild(frameRim);
    }

    const itemElements = Array.from(track.querySelectorAll('.animated-list__item'));
    itemElements.forEach((item, index) => {
      item.dataset.index = index;
      if (!item.querySelector('.animated-list__rim')) {
        const rim = document.createElement('span');
        rim.className = 'animated-list__rim';
        rim.setAttribute('aria-hidden', 'true');
        item.appendChild(rim);
      }
    });

    let selected = parseInt(root.dataset.initialSelectedIndex || customOpts.initialSelectedIndex || -1, 10);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const springEase = CSS.supports?.('transition-timing-function', 'linear(0, 1)')
      ? SPRING
      : 'cubic-bezier(0.34, 1.4, 0.64, 1)';
    const transition = `transform 620ms ${springEase}, opacity 300ms cubic-bezier(0.22, 1, 0.36, 1), filter 200ms ease`;
    const motion = { y: 0, h: 0, vy: 0, vh: 0, ty: 0, th: 0, ready: false };
    const fades = { top: '', bottom: '' };
    let boxes = [];
    let current = null;
    let entered = false;
    let engaged = false;
    let pointer = [0, 0];
    let raf = 0;
    let last = 0;
    let keyboardNav = false;

    const mode = () => {
      if (animation === 'none' || !HIDDEN[animation]) return 'none';
      return reduced ? 'fade' : animation;
    };

    const apply = (element, state) => {
      element.dataset.state = state;
      const pose = current && current !== 'none' && state !== 'in' ? HIDDEN[current][state] : '';
      element.style.transform = pose;
      element.style.opacity = pose ? '0' : '';
    };

    const syncRing = () => {
      const item = itemElements[selected];
      if (!item || !ring) return;
      const state = item.dataset.state || 'in';
      if (state === ring.dataset.state) return;
      ring.style.transitionDelay = item.style.transitionDelay;
      apply(ring, state);
    };

    const write = () => {
      indicator.style.transform = `translate3d(0, ${motion.y.toFixed(2)}px, 0)`;
      indicator.style.height = `${motion.h.toFixed(2)}px`;
    };

    const frame = now => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const omega = 30;
      const zeta = 0.78;
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        motion.vy += (omega * omega * (motion.ty - motion.y) - 2 * zeta * omega * motion.vy) * h;
        motion.vh += (omega * omega * (motion.th - motion.h) - 2 * zeta * omega * motion.vh) * h;
        motion.y += motion.vy * h;
        motion.h += motion.vh * h;
      }
      const moving =
        Math.abs(motion.ty - motion.y) > 0.05 ||
        Math.abs(motion.th - motion.h) > 0.05 ||
        Math.abs(motion.vy) + Math.abs(motion.vh) > 0.5;
      if (!moving) {
        motion.y = motion.ty;
        motion.h = motion.th;
        motion.vy = motion.vh = 0;
      }
      write();
      if (moving) raf = requestAnimationFrame(frame);
    };

    const place = snap => {
      const item = itemElements[selected];
      if (!item) {
        indicator.style.opacity = '0';
        motion.ready = false;
        return;
      }
      indicator.style.opacity = '1';
      motion.ty = item.offsetTop;
      motion.th = item.offsetHeight;
      if (snap || reduced || !motion.ready) {
        motion.y = motion.ty;
        motion.h = motion.th;
        motion.vy = motion.vh = 0;
        motion.ready = true;
        write();
        return;
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const updateFades = () => {
      const span = Math.max(1, fadeSize);
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const top = showGradients ? Math.min(span, Math.max(0, scrollTop)) : 0;
      const bottom = showGradients ? Math.min(span, Math.max(0, scrollHeight - clientHeight - scrollTop)) : 0;
      const nextTop = `${top.toFixed(1)}px`;
      const nextBottom = `${bottom.toFixed(1)}px`;
      if (nextTop !== fades.top) {
        fades.top = nextTop;
        viewport.style.setProperty('--al-fade-top', nextTop);
      }
      if (nextBottom !== fades.bottom) {
        fades.bottom = nextBottom;
        viewport.style.setProperty('--al-fade-bottom', nextBottom);
      }
    };

    const measure = () => {
      const offset = track.offsetTop;
      boxes = itemElements.map(item => (item ? [offset + item.offsetTop, item.offsetHeight] : null));
    };

    const reveal = entrance => {
      if (!entered) return;
      const top = viewport.scrollTop;
      const view = viewport.clientHeight;
      let order = 0;
      itemElements.forEach((item, index) => {
        const box = boxes[index];
        if (!item || !box) return;
        const start = box[0] - top;
        const overlap = Math.min(view, start + box[1]) - Math.max(0, start);
        const hidden =
          current !== 'none' && overlap < Math.min(box[1], view) * 0.5 && !(animateOnce && item.dataset.seen);
        const state = hidden ? (start + box[1] / 2 < view / 2 ? 'above' : 'below') : 'in';
        if (state === item.dataset.state) return;
        const delay = entrance && !hidden ? (order++ * Math.max(0, stagger)).toFixed(3) : 0;
        item.style.transitionDelay = delay ? `${delay}s, ${delay}s, 0s` : '';
        if (!hidden) item.dataset.seen = 'true';
        apply(item, state);
      });
      syncRing();
    };

    const sync = () => {
      const next = mode();
      const changed = next !== current;
      current = next;
      if (current === 'none') entered = true;
      for (const element of [...itemElements, ring]) {
        if (element) element.style.transition = 'none';
      }
      for (const item of itemElements) {
        apply(item, current === 'none' ? 'in' : item.dataset.state || 'below');
      }
      if (ring) apply(ring, itemElements[selected]?.dataset.state || 'in');
      void root.offsetHeight;
      for (const element of [...itemElements, ring]) {
        if (element) element.style.transition = transition;
      }
      measure();
      reveal(true);
    };

    function setSelected(index) {
      if (index === selected) return;
      selected = index;
      itemElements.forEach((el, idx) => {
        if (idx === selected) {
          el.setAttribute('aria-selected', 'true');
          el.dataset.selected = '';
        } else {
          el.removeAttribute('aria-selected');
          delete el.dataset.selected;
        }
      });
      place(false);
      syncRing();

      if (keyboardNav && itemElements[selected]) {
        keyboardNav = false;
        const item = itemElements[selected];
        const top = track.offsetTop + item.offsetTop;
        const bottom = top + item.offsetHeight;
        const room = Math.max(0, (viewport.clientHeight - item.offsetHeight) / 2);
        const margin = Math.min(showGradients ? Math.max(12, fadeSize) : 12, room);
        if (top < viewport.scrollTop + margin) {
          viewport.scrollTo({ top: Math.max(0, top - margin), behavior: 'smooth' });
        } else if (bottom > viewport.scrollTop + viewport.clientHeight - margin) {
          viewport.scrollTo({ top: bottom - viewport.clientHeight + margin, behavior: 'smooth' });
        }
      }

      root.dispatchEvent(new CustomEvent('itemselect', {
        detail: { index, element: itemElements[selected] }
      }));
    }

    itemElements.forEach((item, index) => {
      item.addEventListener('pointerenter', () => {
        if (selectOnHover) setSelected(index);
      });
      item.addEventListener('click', () => {
        setSelected(index);
        if (customOpts.onItemSelect) customOpts.onItemSelect(index, item);
      });
    });

    const onKey = event => {
      if (!enableArrowNav || event.defaultPrevented) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const active = document.activeElement;
      const focused = active === viewport || root.contains(active);
      if (!focused && !engaged) return;

      const count = itemElements.length;
      if (!count) return;
      let next = null;
      if (event.key === 'ArrowDown') next = selected < 0 ? 0 : selected + 1;
      else if (event.key === 'ArrowUp') next = selected < 0 ? count - 1 : selected - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = count - 1;
      else if ((event.key === 'Enter' || event.key === ' ') && selected >= 0 && selected < count) {
        event.preventDefault();
        itemElements[selected]?.click();
        return;
      }
      if (next === null) return;
      event.preventDefault();
      next = loop ? (next + count) % count : Math.min(count - 1, Math.max(0, next));
      keyboardNav = true;
      setSelected(next);
    };

    window.addEventListener('keydown', onKey);
    root.addEventListener('pointerenter', () => { engaged = true; });
    root.addEventListener('pointerleave', () => { engaged = false; });
    viewport.addEventListener('scroll', () => {
      updateFades();
      reveal(false);
    }, { passive: true });

    const observer = new IntersectionObserver((entries, obs) => {
      if (!entries.some(e => e.isIntersecting)) return;
      obs.disconnect();
      entered = true;
      measure();
      reveal(true);
    }, { rootMargin: '0px 0px -10% 0px' });
    observer.observe(root);

    const resizeObs = new ResizeObserver(() => {
      place(true);
      updateFades();
      measure();
      reveal(false);
    });
    resizeObs.observe(viewport);
    resizeObs.observe(track);

    sync();
    updateFades();
    if (selected >= 0) setSelected(selected);
  }

  function initAnimatedLists() {
    document.querySelectorAll('.animated-list').forEach(el => {
      mountAnimatedList(el);
    });
  }

  window.AnimatedList = {
    mount: mountAnimatedList,
    init: initAnimatedLists
  };

  if (typeof customElements !== 'undefined' && !customElements.get('animated-list')) {
    class AnimatedListCustomElement extends HTMLElement {
      connectedCallback() {
        this.classList.add('animated-list', 'animated-list--framed');
        mountAnimatedList(this);
      }
    }
    customElements.define('animated-list', AnimatedListCustomElement);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedLists);
  } else {
    initAnimatedLists();
  }
})();
