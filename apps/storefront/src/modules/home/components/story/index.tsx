import { Heading, Text } from "@medusajs/ui"
import Reveal from "@modules/home/components/reveal"

const values = [
  {
    title: "Bold design",
    body: "Pieces that refuse to blend in. Color, cut and attitude engineered for the everyday.",
  },
  {
    title: "Everyday quality",
    body: "Garments made to move with you — washed, worn and loved for seasons to come.",
  },
  {
    title: "Considered making",
    body: "Thoughtful materials and responsible production at the heart of every drop.",
  },
]

const Story = () => {
  return (
    <section
      id="story"
      aria-label="About CHICYA"
      className="w-full bg-chicya-cream py-16 small:py-28"
    >
      <div className="content-container grid grid-cols-1 small:grid-cols-12 gap-y-12 small:gap-x-12">
        <Reveal className="small:col-span-5 flex flex-col justify-center gap-6">
          <p className="text-xs uppercase tracking-[0.35em] text-chicya-gold">
            Our story
          </p>
          <Heading
            level="h2"
            className="text-4xl small:text-5xl text-chicya-ink uppercase tracking-[0.12em] leading-tight"
          >
            Be bold.
            <br />
            Be <span className="italic text-chicya-gold">CHICYA.</span>
          </Heading>
          <Text className="text-chicya-ink/80 max-w-md text-base leading-7">
            CHICYA is a fashion label for people who wear their confidence out
            loud. Every collection mixes statement silhouettes with the comfort
            of your favorite wardrobe staple — because bold should feel good,
            not performative.
          </Text>
        </Reveal>

        <div className="small:col-span-7 grid grid-cols-1 small:grid-cols-3 gap-x-6 gap-y-10">
          {values.map((value, i) => (
            <Reveal
              key={value.title}
              as="div"
              delay={i * 120}
              className="border-t border-chicya-ink/15 pt-6"
            >
              <span
                className="block text-3xl text-chicya-gold font-light mb-4"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <Heading
                level="h3"
                className="text-lg text-chicya-ink uppercase tracking-[0.12em] mb-3"
              >
                {value.title}
              </Heading>
              <Text className="text-sm text-chicya-ink/70 leading-6">
                {value.body}
              </Text>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Story