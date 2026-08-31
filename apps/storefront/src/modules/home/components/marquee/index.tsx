const items = [
  "NEW SEASON DROP LIVE",
  "10% OFF YOUR FIRST ORDER WITH CODE CHICYA10",
  "FREE SHIPPING ON ORDERS OVER $100",
  "BE BOLD. BE CHICYA.",
]

const Marquee = () => {
  const content = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center text-sm uppercase tracking-[0.25em] text-white px-6 whitespace-nowrap"
        >
          {item}
          <span className="ml-12 text-chicya-gold" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      aria-label="Announcements"
      className="w-full overflow-hidden bg-chicya-ink py-4"
    >
      <div className="flex w-max animate-chicya-marquee">
        {content}
        {content}
      </div>
    </div>
  )
}

export default Marquee