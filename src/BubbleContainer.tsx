import {
  useEffect, useRef, useState, FC,
} from 'react';
import { useInterval } from './useInterval';
import { bubble } from './bubble';

import './styles/bubble.css';

interface CellType {
  [key: string]: string | null,
}

interface ColumnType {
  [key: string]: boolean,
}

interface PropTypes {
  columns: number,
  rows: number,
  wrapperClasses?: string[],
  getLabel?: (label: string) => string,
}

interface BubbleType {
  wrapperClass: string,
  label: string | null,
  getLabel?: (label: string) => string,
}

const defaultWrapperClasses: string[] = [
  'bubble-1',
  'bubble-2',
  'bubble-3',
  'bubble-4',
  'bubble-5',
];

const getRemainderOnDividingByFive = (number: string): number => (parseInt(number, 10) % 5);

const getObjectFromNumber = (number: number, value: null | false) => {
  let object = {};
  for (let iterator = 0; iterator < number; iterator += 1) {
    object = {
      ...object,
      [iterator]: value,
    };
  }
  return object;
};

const Bubble: FC<BubbleType> = ({
  wrapperClass,
  label,
  getLabel,
}) => (
  <div
    className={`bubble-column ${label ? wrapperClass : 'hidden'}`}
  >
    <div className="bubble-container">
      <div className="bubble">
        {getLabel?.(label ?? '') || label}
      </div>
    </div>
  </div>
);

export const BubbleContainer: FC<PropTypes> = ({
  columns = 5,
  rows = 5,
  wrapperClasses = defaultWrapperClasses,
  getLabel,
}) => {
  const [bubbleContent, setBubbleContent] = useState<string[]>([]);
  const [busyColumns, setBusyColumns] = useState<ColumnType>({});
  const [bubbles, setBubbles] = useState<CellType>({});

  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addBubbleContent = (content: string) => {
    setBubbleContent((prevBubbleContent: string[]): string[] => [
      content,
      ...prevBubbleContent,
    ]);
  };

  const clearBubbles = () => {
    setBubbleContent([]);
    setBubbles({});
    setBusyColumns({});
  };

  useEffect(() => {
    bubble.add = addBubbleContent;
    bubble.clearAll = clearBubbles;
    setBusyColumns(getObjectFromNumber(columns, false));
    setBubbles(getObjectFromNumber((columns * rows), null));

    return (() => {
      if (bubbleTimeoutRef.current) {
        clearTimeout(bubbleTimeoutRef.current);
      }
      if (busyTimeoutRef.current) {
        clearTimeout(busyTimeoutRef.current);
      }
      clearBubbles();
    });
  }, []);

  const getRandomFromOneToFive = (): string | null => {
    const emptyKeys = Object.keys(bubbles).filter((key) => {
      const isColumnFree = busyColumns[getRemainderOnDividingByFive(key)] === false;
      const isCellFree = bubbles[key] === null;
      return isCellFree && isColumnFree;
    });
    const emptyKeysLength = emptyKeys.length;
    if (!emptyKeysLength) return null;
    if (emptyKeysLength === 1) return emptyKeys[0];
    const randomIndex = Math.floor(Math.random() * (emptyKeysLength - 1)) + 1;
    return emptyKeys[randomIndex];
  };

  useInterval(() => {
    const [firstBubbleContent, ...otherBubbles] = bubbleContent;
    if (firstBubbleContent) {
      const bubbleKey = getRandomFromOneToFive();

      if (bubbleKey !== null) {
        const column = getRemainderOnDividingByFive(bubbleKey);

        setBubbles((prevBubbles) => ({
          ...prevBubbles,
          [bubbleKey]: firstBubbleContent,
        }));
        setBusyColumns((prevBusyColumns) => ({
          ...prevBusyColumns,
          [column]: true,
        }));
        setBubbleContent(otherBubbles);

        bubbleTimeoutRef.current = setTimeout(() => {
          setBubbles((prevBubbles) => ({
            ...prevBubbles,
            [bubbleKey]: null,
          }));
        }, 2000);
        busyTimeoutRef.current = setTimeout(() => {
          setBusyColumns((prevBusyColumns) => ({
            ...prevBusyColumns,
            [column]: false,
          }));
        }, (2000 / (rows * columns)));
      }
    }
  }, (2000 / (rows * columns)));

  return (
    <>
      {Object.entries(bubbles).map(([key, content]) => {
        const column = getRemainderOnDividingByFive(key);
        return (
          <Bubble
            wrapperClass={wrapperClasses[column]}
            label={content}
            getLabel={getLabel}
          />
        );
      })}
    </>
  );
};
