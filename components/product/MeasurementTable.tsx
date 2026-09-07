import { Measurement } from '@/lib/types';

export default function MeasurementTable({ measurements }: { measurements: Measurement[] }) {
  return (
    <table className="w-full">
      <tbody>
        {measurements.map((m) => (
          <tr key={m.label} className="border-b border-black/10 last:border-0">
            <td className="py-2.5 font-mono text-xs uppercase tracking-widest text-muted">{m.label}</td>
            <td className="py-2.5 text-right font-mono text-sm">{m.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
