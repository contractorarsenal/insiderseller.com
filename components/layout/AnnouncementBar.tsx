const MESSAGE = 'NEW ARRIVALS WEEKLY  •  AUTHENTICITY GUARANTEED  •  WORLDWIDE SHIPPING  •  INSIDER SELLERS  •';

export default function AnnouncementBar() {
  return (
    <div className="flex h-[30px] items-center overflow-hidden bg-black" role="marquee" aria-label="Announcements">
      <div className="flex w-max shrink-0 animate-marquee">
        <span className="flex shrink-0 items-center whitespace-nowrap pr-8 font-mono text-[11px] tracking-widest text-white">
          {MESSAGE}
        </span>
        <span className="flex shrink-0 items-center whitespace-nowrap pr-8 font-mono text-[11px] tracking-widest text-white" aria-hidden="true">
          {MESSAGE}
        </span>
      </div>
    </div>
  );
}
