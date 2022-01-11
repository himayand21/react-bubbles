declare type NoOpType = () => void;
interface BubbleTypes {
    add?: ((message: string) => void) | NoOpType;
    clearAll?: () => void;
}
export declare const bubble: BubbleTypes;
export {};
