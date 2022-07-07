import { Card, CardContent } from "@mui/material";
import { useRef } from "react";

type Props = {
  src: string;
};

export function PowerCard({ src }: Props) {
  const url = `http://iws.mx/dnd/?view=${src}`;
  const gridIframe = useRef(null);
  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <CardContent>
        <iframe
          ref={gridIframe}
          allowFullScreen
          src={url}
          onLoad={(event) => {
            const iframeItem = gridIframe.current;
            console.log(iframeItem.contentWindow.document);
          }}
          width="100%"
          height="100%"
        />
      </CardContent>
    </Card>
  );
}
