type NoOpType = () => void;

interface BubbleTypes {
    add?: ((message: string) => void) | NoOpType,
    clearAll?: () => void,
}

export const bubble: BubbleTypes = {
  add: () => undefined,
  clearAll: () => undefined,
};
