import { useEffect } from 'react';

export function useKeyboardNavigation(ref, itemCount, onSelect) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function handleKeyDown(e) {
      if (['ArrowUp', 'ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        let index = parseInt(node.getAttribute('data-active-index')) || 0;
        if (e.key === 'ArrowDown') {
          index = Math.min(itemCount - 1, index + 1);
        } else if (e.key === 'ArrowUp') {
          index = Math.max(0, index - 1);
        } else if (e.key === 'Enter' || e.key === ' ') {
          onSelect(index);
        }
        node.setAttribute('data-active-index', index);
        const items = node.querySelectorAll('[tabindex="0"]');
        items.forEach((item, idx) => {
          item.tabIndex = idx === index ? 0 : -1;
          if (idx === index) item.focus();
        });
      }
    }
    node.addEventListener('keydown', handleKeyDown);
    return () => node.removeEventListener('keydown', handleKeyDown);
  }, [ref, itemCount, onSelect]);
}