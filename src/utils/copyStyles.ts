type StyleChecklist = Partial<Record<keyof CSSStyleDeclaration, boolean>>;

function copyStyles(
  anchorElem: React.RefObject<HTMLElement>,
  targetElem: React.RefObject<HTMLElement>,
  styles: StyleChecklist
) {
  const anchor = anchorElem.current;
  const target = targetElem.current;

  if (!anchor || !target) return;

  const computed = getComputedStyle(anchor);
  Object.keys(styles).forEach((prop) => {
    if (styles[prop as keyof StyleChecklist]) {
      target.style[prop as any] = computed[prop as any];
    }
  });
}
export default copyStyles;
