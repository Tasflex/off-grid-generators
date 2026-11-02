import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { ArrowRight, ChevronRight } from 'lucide-react'
import CalcDevice from '../../../components/calc/CalcDevice'
import { categories, deviceCalculators, getDeviceCalculator } from '../../../lib/calc'
import { getPageSeo, SITE_URL } from '../../../lib/seo'

const display = Orbitron({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-display' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-mono' })

// Hand-built calculators keep their own folders; this route serves the device-series calculators.
// The root layout renders dynamically, so unknown slugs still reach the page and need notFound().
export function generateStaticParams() {
  return deviceCalculators.map(c => ({ slug: c.slug }))
}

// Related entries are calculator slugs or full site paths
function resolveRelated(ref) {
  const path = ref.startsWith('/') ? ref : `/calculators/${ref}`
  const device = getDeviceCalculator(ref)
  if (device) return { path, title: device.name, code: device.code }
  const page = getPageSeo(path)
  return page ? { path, title: page.title } : null
}

export default function DeviceCalculatorPage({ params }) {
  const calc = getDeviceCalculator(params.slug)
  if (!calc) notFound()

  const category = categories[calc.category]
  const url = `${SITE_URL}${calc.path}`
  const related = calc.related.map(resolveRelated).filter(Boolean)
  const siblings = deviceCalculators.filter(c => c.category === calc.category && c.slug !== calc.slug)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: calc.name,
      url,
      description: calc.description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: 'TheLoadCalc', url: SITE_URL }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: calc.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${SITE_URL}/calculators` },
        { '@type': 'ListItem', position: 3, name: calc.name, item: url }
      ]
    }
  ]

  return (
    <div className={`${display.variable} ${mono.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{calc.name}</span>
        </nav>

        <header className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide text-white" style={{ background: category.accent }}>
              {calc.code}
            </span>
            <span className="text-sm font-medium text-gray-600">{category.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{calc.name}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{calc.intro}</p>
        </header>

        <CalcDevice slug={calc.slug} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <article className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How the {calc.name.replace(/ Calculator.*$/, '').toLowerCase()} calculation works</h2>
              <div className="rounded-xl bg-blue-50 border border-blue-100 text-gray-800 p-5 mb-5 font-mono text-sm leading-relaxed overflow-x-auto">
                {calc.formula.map(line => <div key={line}>{line}</div>)}
              </div>
              <ul className="space-y-3">
                {calc.how.map(point => (
                  <li key={point} className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: category.accent }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
              <div className="space-y-3">
                {calc.faqs.map((f, i) => (
                  <details key={f.q} className="group rounded-xl border border-gray-200 bg-white p-5" open={i === 0}>
                    <summary className="cursor-pointer list-none flex justify-between items-start gap-4 font-semibold text-gray-900">
                      <h3 className="text-base">{f.q}</h3>
                      <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                    </summary>
                    <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <p className="text-sm text-gray-500 leading-relaxed">
              Results are engineering estimates for planning. Confirm final designs against equipment datasheets and local
              electrical codes, and have high-voltage or grid-connected work checked by a licensed electrician.
            </p>
          </article>

          <aside className="space-y-6">
            {related.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h2 className="font-bold text-gray-900 mb-3">Related calculators</h2>
                <ul className="space-y-2">
                  {related.map(r => (
                    <li key={r.path}>
                      <Link href={r.path} className="flex items-center justify-between gap-3 text-sm text-gray-700 hover:text-blue-600">
                        <span>{r.title}</span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {siblings.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <h2 className="font-bold text-gray-900 mb-3">More {category.name.toLowerCase()} tools</h2>
                <ul className="space-y-2">
                  {siblings.map(c => (
                    <li key={c.slug}>
                      <Link href={c.path} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                        <span className="font-mono text-xs text-gray-400 w-12 flex-shrink-0">{c.code}</span>
                        <span>{c.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href="/calculators" className="flex items-center justify-between rounded-2xl bg-blue-600 text-white p-5 hover:bg-blue-700">
              <span className="font-semibold">All solar calculators</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
