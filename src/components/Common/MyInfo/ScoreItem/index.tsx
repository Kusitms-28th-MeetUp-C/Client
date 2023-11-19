import { IoIosArrowForward } from 'react-icons/io';

import ScoreName from './ScoreName';
import ScoreCount from './ScoreCount';

interface ScoreItemProps {
  label: string;
  count: number;
  countLabel: string;
  isPoint?: boolean;
  className?: string;
}

const ScoreItem = ({
  label,
  count,
  countLabel,
  isPoint,
  className,
}: ScoreItemProps) => {
  return (
    <div
      className={`flex items-center justify-between${
        className ? ` ${className}` : ''
      }`}
    >
      {isPoint ? (
        <>
          <span className="flex cursor-pointer items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-[0.1px] border-black">
              P
            </div>
            <ScoreItem.Name>{label}</ScoreItem.Name>
            <i className="text-xl">
              <IoIosArrowForward />
            </i>
          </span>
          <ScoreItem.Count count={count} countLabel={countLabel} />
        </>
      ) : (
        <>
          <ScoreItem.Name>{label}</ScoreItem.Name>
          <ScoreItem.Count count={count} countLabel={countLabel} />
        </>
      )}
    </div>
  );
};

ScoreItem.Name = ScoreName;
ScoreItem.Count = ScoreCount;

export default ScoreItem;
