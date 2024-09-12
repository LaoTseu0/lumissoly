import { FunctionComponent } from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ progress }) => {
  const validProgress = Math.min(100, Math.max(0, progress));
  return (
    <div>
      <div className="h-2.5 w-full bg-primary rounded-md">
        <div
          className="bg-tertiary h-2.5 rounded-md"
          style={{ width: `${validProgress}%` }}
        ></div>
      </div>

      <p className="flex justify-between text-p-annotation mt-1 px-1 text-secondary">
        <span>stockage à {0}%</span> <span>x souvenir sur x</span>
      </p>
    </div>
  );
};

export default ProgressBar;
