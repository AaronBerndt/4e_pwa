import { useRef } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { Buffer } from "buffer";
import { Checkbox } from "../node_modules/@mui/material/index";
import useUpdatePowerUsage from "../hooks/useUpdatePowerUsage";

type Props = {
  htmlToRender: string;
};

export function DisplayCard({ htmlToRender }: Props) {
  return <div className="detail">{parse(htmlToRender)}</div>;
}

type PowerDisplayCardProps = {
  _id: string;
  powerName: string;
  htmlToRender: string;
  expendedPowers: string[];
};

export function PowerDisplayCard({
  _id,
  powerName,
  htmlToRender,
  expendedPowers,
}: PowerDisplayCardProps) {
  const { mutate: adjustUsedPowers } = useUpdatePowerUsage();
  return (
    <div className="detail">
      {parse(htmlToRender, {
        replace: (domNode) => {
          if (domNode.name === "input") {
            delete domNode.attribs.onclick;
            return (
              <Checkbox
                checked={expendedPowers.includes(powerName)}
                onClick={(e) => {
                  adjustUsedPowers({
                    _id,
                    powerName,
                    action: e.target.checked ? "expend" : "regain",
                  });
                }}
              />
            );
          }
        },
      })}
    </div>
  );
}
