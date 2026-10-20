import { brands } from '../data/brands'

const withLogo = brands.filter((b) => b.logo)

export default function PartnersMarquee() {
  const row = [...withLogo, ...withLogo]

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[marquee_80s_linear_infinite] items-center gap-12 pr-12 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row.map((b, i) => (
          <img key={`${b.name}-${i}`} loading="lazy" decoding="async" src={b.logo} alt={b.name} className="h-10 w-auto max-w-[140px] shrink-0 object-contain opacity-70 transition hover:opacity-100" />
        ))}
      </div>
    </div>
  )
}
