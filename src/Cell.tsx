export default function Cell({ color, size, onClick }: { color: string, size: number, onClick?: () => void }) {
  return (
    <div style={{
      width: `${ size }px`,
      height: `${ size }px`,
      backgroundColor: color,
      border: "solid"
    }} 
    onClick = { onClick }
    >
    </div>
  )
}

