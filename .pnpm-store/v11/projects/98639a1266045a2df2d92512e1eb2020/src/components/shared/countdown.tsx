"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export function CountdownTimer() {
  const [time, setTime] = useState({ days: 2, hours: 14, mins: 35, secs: 22 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 2, hours: 14, mins: 35, secs: 22 };
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.mins },
    { label: "Secs", value: time.secs },
  ];

  return (
    <div className="flex items-center gap-2">
      <Zap className="h-5 w-5 text-amber-400" />
      <div className="flex gap-1.5">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span className="grid h-8 w-10 place-items-center rounded-lg bg-red-500/20 text-sm font-bold text-red-400">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-0.5 text-[10px] text-muted-foreground">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
