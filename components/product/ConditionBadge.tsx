import { ConditionGrade } from '@/lib/types';

export default function ConditionBadge({ condition, score }: { condition: ConditionGrade; score: number }) {
  return (
    <span className="inline-flex items-center gap-2 border border-black/20 px-3 py-1.5 font-mono text-xs uppercase tracking-widest">
      {condition} / {score.toFixed(1)}
    </span>
  );
}
