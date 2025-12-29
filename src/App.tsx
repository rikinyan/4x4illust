import "./App.css"
import { useState } from "react"
import { useImmer } from "use-immer"

const cellSize = 50

function Cell({ color, onClick }: { color: string, onClick: () => void }) {
  return (
    <div style={{
      width: `${cellSize}px`,
      height: `${cellSize}px`,
      backgroundColor: color,
      border: "solid"
    }} 
    onClick = { onClick }
    >
    </div>
  )
}

interface CellProps {
  row: number,
  col: number
  color: string,
}

function App() {
  const [paint, setPaint] = useState("#ffffff")

  const cellsProps: CellProps[] = []
  const rowLength = 4
  const colLength = 4

  // init cellsProps
  for(let i = 0; i < rowLength; i++) {
    for(let j = 0; j < colLength; j++) {
      cellsProps.push({row: i, col: j, color: `#ffffff`})
    }
  }

  const [cellsPropsState, updateCellPropsState] = useImmer(cellsProps)

  const updateCellColor = (row: number, col: number) => {
    console.log(row, col)
    updateCellPropsState((draft) => {
      const changedProp = draft.find((cellProp => cellProp.row === row && cellProp.col === col))
      if (changedProp === undefined) return 
      changedProp.color = paint
    })
  }

  return (
    <div>
      <div className="grid grid-cols-4" style={{
	width: "200px"
      }}>
	{ cellsPropsState.map(({row, col, color}) => <Cell key={`row${row}-col${col}`} color={color} onClick={() => updateCellColor(row, col)} />) }
      </div>
      <input type="color" value={paint} onChange={(e) => setPaint(e.target.value)}/>
    </div>
  )
}

export default App
