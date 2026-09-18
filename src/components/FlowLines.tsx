export default function FlowLines() {
  const rows = [
    { y: 40, opacity: 0.35, duration: '22s' },
    { y: 85, opacity: 0.22, duration: '30s' },
    { y: 130, opacity: 0.28, duration: '26s' },
  ]

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden">
      {rows.map((row, i) => (
        <svg
          key={i}
          className="absolute left-0 h-8 w-[200%] animate-[flow-line_linear_infinite]"
          style={{ top: row.y, opacity: row.opacity, animationDuration: row.duration }}
          viewBox="0 0 800 32"
          preserveAspectRatio="none"
        >
          <path
            d="M0,16 C50,4 100,28 150,16 C200,4 250,28 300,16 C350,4 400,28 450,16 C500,4 550,28 600,16 C650,4 700,28 750,16 C780,10 790,20 800,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary-light"
          />
          <path
            d="M0,16 C50,4 100,28 150,16 C200,4 250,28 300,16 C350,4 400,28 450,16 C500,4 550,28 600,16 C650,4 700,28 750,16 C780,10 790,20 800,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary-light"
            transform="translate(800, 0)"
          />
        </svg>
      ))}
    </div>
  )
}
