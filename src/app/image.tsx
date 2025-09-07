import { useEffect, useState } from "react";

export default function Image(
  originalProps: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const [isLoading, setIsLoading] = useState(true);

  const props = { ...originalProps };

  const originalOnLoad = props.onLoad;
  props.onLoad = (e) => {
    setIsLoading(false);
    originalOnLoad?.(e);
  };

  const originalOnError = props.onError;
  props.onError = (e) => {
    setIsLoading(false);
    originalOnError?.(e);
  };

  useEffect(() => {
    setIsLoading(true);
  }, [props.src]);

  if (isLoading) {
    props.className = (props.className ?? "") + " blur";
  }

  return <img {...props} />;
}
