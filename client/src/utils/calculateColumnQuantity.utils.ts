export const calculateColumnQuantity = (width: number, gap: number, columnWidth: number): number =>
  Math.round(width / (columnWidth + gap))
