'use client'

import { useMemo, useState } from 'react'
import { getCalcLogic } from '../../lib/calc/logic'
import { categories } from '../../lib/calc/categories'
import s from './Device.module.css'

const initialValues = calc =>
  Object.fromEntries(calc.inputs.map(i => [i.id, Array.isArray(i.default) ? i.default.map(row => ({ ...row })) : i.default]))

const decimalsOf = step => (String(step).split('.')[1] || '').length

function format(value, digits = 0) {
  if (typeof value === 'string') return value
  if (value === null || value === undefined || !Number.isFinite(value)) return '—'
  return value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

function NumberControl({ input, value, onChange }) {
  const step = input.step ?? 1
  const bump = dir => {
    const next = Math.min(input.max ?? Infinity, Math.max(input.min ?? -Infinity, (Number(value) || 0) + dir * step))
    onChange(Number(next.toFixed(decimalsOf(step))))
  }
  return (
    <div className={s.well}>
      <button type="button" className={s.keyStep} onClick={() => bump(-1)} aria-label={`Decrease ${input.label}`}>−</button>
      <label className={s.lcd}>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          min={input.min}
          max={input.max}
          step={step}
          onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          aria-label={input.label}
        />
        {input.unit && <span className={s.lcdUnit}>{input.unit}</span>}
      </label>
      <button type="button" className={s.keyStep} onClick={() => bump(1)} aria-label={`Increase ${input.label}`}>+</button>
    </div>
  )
}

function RangeControl({ input, value, onChange }) {
  const fill = ((value - input.min) / (input.max - input.min)) * 100
  return (
    <div className={s.fader}>
      <input
        type="range"
        className={s.range}
        min={input.min}
        max={input.max}
        step={input.step}
        value={value}
        style={{ '--fill': `${fill}%` }}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={input.label}
      />
      <span className={s.faderValue}>
        {format(Number(value), decimalsOf(input.step ?? 1))}
        {input.unit && <small>{input.unit}</small>}
      </span>
    </div>
  )
}

function SelectControl({ input, value, onChange }) {
  // Few options: a row of lit keys. Many: an LCD dropdown.
  if (input.options.length <= 4) {
    return (
      <div className={s.keyGroup} role="radiogroup" aria-label={input.label}>
        {input.options.map(o => {
          const active = String(o.value) === String(value)
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              className={`${s.key} ${active ? s.keyActive : ''}`}
              onClick={() => onChange(o.value)}
            >
              <span className={s.keyLed} />
              {o.label}
            </button>
          )
        })}
      </div>
    )
  }
  return (
    <label className={s.lcd}>
      <select
        value={value}
        onChange={e => onChange(input.options.find(o => String(o.value) === e.target.value).value)}
        aria-label={input.label}
      >
        {input.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span className={s.lcdUnit}>▾</span>
    </label>
  )
}

function LoadsControl({ value, onChange }) {
  const update = (index, field, v) => onChange(value.map((row, i) => (i === index ? { ...row, [field]: v } : row)))
  const num = v => (v === '' ? '' : Number(v))
  return (
    <div>
      <div className={s.loadsHead}>
        <span>Appliance</span><span>Watts</span><span>Qty</span><span>Hrs/day</span><span />
      </div>
      {value.map((row, i) => (
        <div className={s.loadRow} key={i}>
          <label className={s.lcd}><input value={row.name} onChange={e => update(i, 'name', e.target.value)} aria-label="Appliance name" /></label>
          <label className={s.lcd}><input type="number" min="0" value={row.watts} onChange={e => update(i, 'watts', num(e.target.value))} aria-label={`${row.name} watts`} /></label>
          <label className={s.lcd}><input type="number" min="0" value={row.qty} onChange={e => update(i, 'qty', num(e.target.value))} aria-label={`${row.name} quantity`} /></label>
          <label className={s.lcd}><input type="number" min="0" max="24" step="0.5" value={row.hours} onChange={e => update(i, 'hours', num(e.target.value))} aria-label={`${row.name} hours per day`} /></label>
          <button type="button" className={s.keyStep} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label={`Remove ${row.name}`}>×</button>
        </div>
      ))}
      <button type="button" className={s.key} onClick={() => onChange([...value, { name: 'New appliance', watts: 100, qty: 1, hours: 1 }])}>
        + ADD APPLIANCE
      </button>
    </div>
  )
}

const controlFor = { number: NumberControl, range: RangeControl, select: SelectControl, loads: LoadsControl }

export default function CalcDevice({ slug }) {
  const calc = getCalcLogic(slug)
  const category = categories[calc.category]
  const [values, setValues] = useState(() => initialValues(calc))
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    // Blank fields count as zero while the user is typing
    const clean = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v === '' ? 0 : v]))
    try {
      return calc.compute(clean)
    } catch {
      return { primary: { label: 'Result', value: '—' }, readouts: [], status: { level: 'bad', text: 'Check your inputs' } }
    }
  }, [calc, values])

  const { primary, readouts = [], status, meter, bars } = result
  const primaryIsText = typeof primary.value === 'string' && primary.value.length > 8

  const copyResult = async () => {
    const lines = [
      `${calc.name} (${calc.code})`,
      `${primary.label}: ${format(primary.value, primary.digits)} ${primary.unit || ''}`.trim(),
      ...readouts.map(r => `${r.label}: ${format(r.value, r.digits)} ${r.unit || ''}`.trim()),
      `https://theloadcalc.com/calculators/${calc.slug}`
    ]
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <section className={s.device} style={{ '--accent': category.accent }} aria-label={`${calc.name} device`}>
      <div className={s.topbar}>
        <div className={s.brand}>
          <span className={s.logo}>THELOADCALC</span>
          <span className={s.model}><b>{calc.code}</b> · {category.name} unit</span>
        </div>
        <div className={s.solarStrip} aria-hidden="true">
          {[0, 1, 2, 3].map(i => <span key={i} className={s.solarCell} />)}
        </div>
        <div className={s.leds} aria-hidden="true">
          <span className={s.ledOn} />
          <span className={s.led} />
          <span className={s.led} />
        </div>
      </div>

      <div className={s.screen} role="status" aria-live="polite">
        <div className={s.screenHeader}>
          <span>{primary.label}</span>
          <span>{calc.code}</span>
        </div>
        <div className={`${s.primary} ${primaryIsText ? s.primaryText : ''}`}>
          {format(primary.value, primary.digits)}
          {primary.unit && <span className={s.unit}>{primary.unit}</span>}
        </div>

        {meter && (
          <div className={s.meter}>
            <div className={s.meterLabel}><span>{meter.label}</span><span>{meter.text}</span></div>
            <div className={s.meterTrack}>
              <div className={s.meterFill} style={{ width: `${Math.max(0, Math.min(1, meter.value)) * 100}%` }} />
            </div>
          </div>
        )}

        {bars && (
          <div className={s.bars} aria-hidden="true">
            {bars.map(b => (
              <div key={b.label} className={s.bar}>
                <div className={s.barFill} style={{ height: `${Math.max(2, Math.min(1, b.value) * 100)}%` }} />
                {b.label[0]}
              </div>
            ))}
          </div>
        )}

        {readouts.length > 0 && (
          <div className={s.readouts}>
            {readouts.map(r => (
              <div key={r.label} className={s.readout}>
                <span className={s.readoutLabel}>{r.label}</span>
                <span className={s.readoutValue}>
                  {format(r.value, r.digits)}
                  {r.unit && <small>{r.unit}</small>}
                </span>
              </div>
            ))}
          </div>
        )}

        {status && (
          <div className={s.status}>
            <span className={`${s.statusDot} ${s[status.level]}`} />
            {status.text}
          </div>
        )}
      </div>

      <div className={s.controls}>
        {calc.inputs.map(input => {
          const Control = controlFor[input.type]
          return (
            <div key={input.id} className={input.type === 'loads' ? s.controlWide : s.control}>
              <span className={s.label}>{input.label}</span>
              <Control input={input} value={values[input.id]} onChange={v => setValues(prev => ({ ...prev, [input.id]: v }))} />
            </div>
          )
        })}
      </div>

      <div className={s.footer}>
        <div className={s.footerKeys}>
          <button type="button" className={s.key} onClick={() => setValues(initialValues(calc))}>RESET</button>
          <button type="button" className={s.keyAccent} onClick={copyResult}>{copied ? 'COPIED ✓' : 'COPY RESULT'}</button>
        </div>
        <span className={s.fine}>{category.series} series · MK-IV · 2060</span>
      </div>
    </section>
  )
}
