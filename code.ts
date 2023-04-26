import * as figma from "figma";
import { ComponentNode } from "figma";

figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = async (msg: GenerateAnimationMessage) => {
  if (msg.type === "generate-animation") {
    const { componentId1, componentId2 } = msg;
    const component1 = figma.getNodeById(componentId1) as ComponentNode;
    const component2 = figma.getNodeById(componentId2) as ComponentNode;

    if (component1 && component2) {
      figma.ui.postMessage({
        type: "component-data",
        componentData: {
          component1: component1.name,
          component2: component2.name,
        },
      });
    } else {
      figma.ui.postMessage({ type: "error", message: "Invalid components" });
    }
  }
};
