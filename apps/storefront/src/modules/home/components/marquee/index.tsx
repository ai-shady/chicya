import { getT } from "@i18n/get-t"

const Marquee = async ({ locale }: { locale: string }) => {
  const { t, dict } = await getT(locale)
  const items = dict.home.marquee.items as string[]

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
      aria-label={t("home.marquee.aria")}
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