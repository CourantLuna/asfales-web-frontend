import * as React from "react";
import { Progress } from "@/components/ui/progress";

interface EventDrivenProgressProps {
  className?: string;
  duration?: number;
}

export interface EventDrivenProgressRef {
  start: () => void;
  finish: () => void;
}

const EventDrivenProgress = React.forwardRef<EventDrivenProgressRef, EventDrivenProgressProps>(
  ({ className, duration = 300 }, ref) => {
    const [progress, setProgress] = React.useState(0);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    const clear = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const start = () => {
      clear();
      setProgress(0);
      const startTime = Date.now();

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percent = Math.min((elapsed / duration) * 100, 95);
        setProgress(percent);
      }, 10);
    };

    const finish = () => {
      clear();
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    };

    React.useImperativeHandle(ref, () => ({ start, finish }), [duration]);

    React.useEffect(() => clear, []);

    if (progress === 0) return null;

    return <Progress value={progress} className={className} />;
  }
);

EventDrivenProgress.displayName = "EventDrivenProgress";

export default EventDrivenProgress;
