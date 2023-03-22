import { FC, useCallback, useEffect, useState } from "react";

// type Config = Readonly<{
//   bynderUrl?: string;
//   previewDerivative?: string;
//   webDerivative?: string;
// }>;

export const IntegrationApp: FC = () => {
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [config, setConfig] = useState<any>(null);
  const [fixedSize, setFixedSize] = useState<number | null>(null);

  const updateSize = useCallback((providedSize?: number) => {
    const newSize =
      providedSize ?? Math.max(document.documentElement.offsetHeight, 100);
    setFixedSize(providedSize ?? null);

    CustomElement.setHeight(Math.ceil(newSize));
  }, []);

  useEffect(() => {
    CustomElement.init((el) => {
      setConfig(el.config ?? {});
    });
  }, [updateSize]);

  const updateValue = () => {
    const val = (parseInt(currentValue) + 1).toString();
    CustomElement.setValue(val);
    setCurrentValue(val);
  };

  return (
    <div>
      <h1>You've clicked the button {currentValue} times.</h1>
      <button onClick={updateValue}>Click Me!</button>
    </div>
  );
};
