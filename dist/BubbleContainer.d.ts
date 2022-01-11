import { FC } from 'react';
import './styles/bubble.css';
interface PropTypes {
    columns: number;
    rows: number;
    wrapperClasses?: string[];
    getLabel?: (label: string) => string;
}
export declare const BubbleContainer: FC<PropTypes>;
export {};
