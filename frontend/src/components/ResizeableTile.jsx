import React from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ResizableTile = ({ children }) => {
  const layout = [{ i: "0", x: 0, y: 0, w: 4, h: 4 }];

  //   return <div className="resizable-tile">{children}</div>;
  return <ReactGridLayout layout={layout}>{children}</ReactGridLayout>;
};

export default ResizableTile;
