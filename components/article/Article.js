import Link from 'next/link'
import { Check, Info, AlertTriangle, ArrowRight } from 'lucide-react'

// Shared building blocks for the data-driven blog posts, guides and wiring diagrams.
// Body strings support [text](/path) links and **bold**.

export function Inline({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <Link key={i} href={link[2]} className="text-blue-600 hover:underline font-medium">{link[1]}</Link>
    const bold = part.match(/^\*\*([^*]+)\*\*$/)
    if (bold) return <strong key={i} className="text-gray-900">{bold[1]}</strong>
    return part
  })
}

export function Block({ block }) {
  if (typeof block === 'string') {
    return <p className="text-gray-700 leading-relaxed mb-4"><Inline text={block} /></p>
  }
  if (block.ul) {
    return (
      <ul className="space-y-2 mb-4">
        {block.ul.map((item, i) => (
          <li key={i} className="flex items-start text-gray-700">
            <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span><Inline text={item} /></span>
          </li>
        ))}
      </ul>
    )
  }
  if (block.ol) {
    return (
      <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700">
        {block.ol.map((item, i) => <li key={i}><Inline text={item} /></li>)}
      </ol>
    )
  }
  if (block.table) {
    return (
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {block.table.head.map((h, i) => <th key={i} className="px-4 py-3 text-left font-semibold text-gray-900">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, i) => (
              <tr key={i} className="border-t">
                {row.map((cell, j) => <td key={j} className="px-4 py-3 text-gray-700"><Inline text={cell} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (block.tip) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4 flex items-start">
        <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-900"><Inline text={block.tip} /></p>
      </div>
    )
  }
  if (block.warn) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4 flex items-start">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-yellow-900"><Inline text={block.warn} /></p>
      </div>
    )
  }
  return null
}

export function Takeaways({ intro, takeaways }) {
  return (
    <div className="ebay-card p-6 mb-8">
      <p className="text-gray-700 leading-relaxed mb-4">{intro}</p>
      <div className="bg-gray-50 rounded p-4">
        <h2 className="font-semibold text-gray-900 mb-2">Key takeaways</h2>
        <ul className="space-y-2">
          {takeaways.map((t, i) => (
            <li key={i} className="flex items-start text-sm text-gray-700">
              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Sections({ sections }) {
  return sections.map((section, i) => (
    <section key={i} className="ebay-card p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{section.h}</h2>
      {section.blocks.map((block, j) => <Block key={j} block={block} />)}
    </section>
  ))
}

export function Faqs({ faqs }) {
  return (
    <section className="ebay-card p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-1">{f.q}</h3>
            <p className="text-sm text-gray-600">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Cta({ cta }) {
  if (!cta) return null
  return (
    <div className="ebay-card p-8 mb-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{cta.title}</h2>
      <p className="text-gray-600 mb-4">{cta.text}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {cta.links.map((l, i) => (
          <Link key={l.href} href={l.href} className={i === 0 ? 'ebay-btn-primary' : 'ebay-btn-secondary'}>{l.label}</Link>
        ))}
      </div>
    </div>
  )
}

export function RelatedGrid({ items, title = 'Keep reading' }) {
  if (!items.length) return null
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(r => (
          <Link key={r.path} href={r.path} className="ebay-card overflow-hidden hover:shadow-md transition flex flex-col">
            {r.image && <img src={r.image} alt="" loading="lazy" className="w-full h-36 object-cover" />}
            <div className="p-4 flex-1">
              {r.category && <span className="text-xs font-semibold text-blue-600">{r.category}</span>}
              <h3 className="font-semibold text-gray-900 mt-1 mb-1">{r.title}</h3>
              {r.excerpt && <p className="text-sm text-gray-500 line-clamp-2">{r.excerpt}</p>}
              <span className="inline-flex items-center text-sm text-blue-600 mt-2">Read more <ArrowRight className="h-4 w-4 ml-1" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ImageCredit({ credit }) {
  return (
    <figcaption className="text-xs text-gray-500 mt-2">
      Photo: <a href={credit.source} rel="nofollow noopener" target="_blank" className="hover:underline">{credit.author}</a>
      {' / '}
      <a href={credit.licenseUrl} rel="nofollow noopener" target="_blank" className="hover:underline">{credit.license}</a>
      {credit.license !== 'CC0' && ', cropped'}
    </figcaption>
  )
}
