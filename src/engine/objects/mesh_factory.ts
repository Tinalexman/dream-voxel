export function generatePlaneData(divisions: number) {
  
  const grid:number[] = [];
  for (let i = 0; i <= divisions; i++) {
      const x = -0.5 + (i / divisions) * 1.0;
      grid.push(x, -0.5, x, 0.5); // Horizontal lines
      grid.push(-0.5, x, 0.5, x); // Vertical lines
  }
  console.log(grid);
  return grid;
}


