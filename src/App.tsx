import "./App.css"
import Cell from "./Cell"
import { useState } from "react"
import { useImmer } from "use-immer"
import html2canvas from "html2canvas"

const cellSize = 50

interface CellProps {
  row: number,
  col: number
  color: string,
}

function App() {
  const [paint, setPaint] = useState("#ffffff")
  const [title, setTitle] = useState("")

  const cellsProps: CellProps[] = []
  const rowLength = 4
  const colLength = 4

  // init cellsProps
  for(let i = 0; i < rowLength; i++) {
    for(let j = 0; j < colLength; j++) {
      cellsProps.push({row: i, col: j, color: "#ffffff"})
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

  const resetAction = () => {
    updateCellPropsState((draft => {
      draft.forEach((prop) => prop.color = "#ffffff")
    }))
    setPaint("#ffffff")
    setTitle("")
  }

  return (
    <div>
      <p>今の気分</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <div className="grid grid-cols-4" style={{
	width: `${cellSize * 4}px`
      }}>
	{ cellsPropsState.map(({row, col, color}) => (
	  <Cell
	    key={`row${row}-col${col}`}
	    color={color} 
	    size={cellSize}
	    onClick={() => updateCellColor(row, col)}
	  />
	)) }
      </div>
      <div>
	<input type="color" value={paint} onChange={(e) => setPaint(e.target.value)}/>
	<button onClick={ resetAction }>reset</button>
      </div>

      <div style={{
	borderRadius: "30px",
	backgroundColor: "seagreen",
	width: "300px",
	height: "400px"
      }}>
	<h1 style={{
	  fontFamily: "serif"
	}}>{title}</h1>
	<div className="grid grid-cols-4" style={{
	  width: `${cellSize * 4}px`
	}}>
	  { cellsPropsState.map(({row, col, color}) => (
	    <Cell
	      key={`row${row}-col${col}`}
	      color={color} 
	      size={cellSize}
	    />
	  )) }
	</div>
      </div>
    </div>
  )
}

export default App
