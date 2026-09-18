import { partners } from '../data/content'

export default function PartnersMarquee() {
  const row = [...partners, ...partners]

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-12 hover:[animation-play-state:paused]">
        {row.map((p, i) => (
          <img key={`${p.id}-${i}`} src={p.logo} alt={p.id} className="h-8 w-auto shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
        ))}
      </div>
    </div>
  )
}
