/**
 * Returns all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Traps focus within a container (useful for modals)
 */
export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;

  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

/**
 * Manages roving tabindex for keyboard navigation in grids
 */
export class RovingTabIndex {
  private currentIndex = 0;
  private elements: HTMLElement[] = [];

  constructor(private container: HTMLElement, private itemSelector: string) {
    this.updateElements();
  }

  updateElements(): void {
    this.elements = Array.from(
      this.container.querySelectorAll<HTMLElement>(this.itemSelector)
    );
    this.setActiveIndex(this.currentIndex);
  }

  setActiveIndex(index: number): void {
    if (index < 0 || index >= this.elements.length) return;
    
    this.elements.forEach((el, i) => {
      el.tabIndex = i === index ? 0 : -1;
    });
    
    this.currentIndex = index;
  }

  focusCurrent(): void {
    this.elements[this.currentIndex]?.focus();
  }

  moveNext(): void {
    const nextIndex = Math.min(this.currentIndex + 1, this.elements.length - 1);
    this.setActiveIndex(nextIndex);
    this.focusCurrent();
  }

  movePrevious(): void {
    const prevIndex = Math.max(this.currentIndex - 1, 0);
    this.setActiveIndex(prevIndex);
    this.focusCurrent();
  }

  moveDown(columns: number): void {
    const nextIndex = Math.min(
      this.currentIndex + columns,
      this.elements.length - 1
    );
    this.setActiveIndex(nextIndex);
    this.focusCurrent();
  }

  moveUp(columns: number): void {
    const prevIndex = Math.max(this.currentIndex - columns, 0);
    this.setActiveIndex(prevIndex);
    this.focusCurrent();
  }
}

