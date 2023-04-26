declare const __html__: string;

import "./ui.css";

const container = document.createElement("div");
container.innerHTML = __html__;
document.body.appendChild(container);

const componentId1Input = document.getElementById(
  "component-id-1"
) as HTMLInputElement;
const componentId2Input = document.getElementById(
  "component-id-2"
) as HTMLInputElement;
const generateButton = document.getElementById(
  "generate-button"
) as HTMLButtonElement;
const htmlOutput = document.getElementById(
  "html-output"
) as HTMLTextAreaElement;
const cssOutput = document.getElementById(
  "css-output"
) as HTMLTextAreaElement;
const jsOutput = document.getElementById(
  "js-output"
) as HTMLTextAreaElement;

generateButton.onclick = () => {
  const componentId1 = componentId1Input.value;
  const componentId2 = componentId2Input.value;

  parent.postMessage(
    {
      pluginMessage: {
        type: "generate-animation",
        componentId1,
        componentId2,
      },
    },
    "*"
  );
};

window.onmessage = (event) => {
  const { type, data } = event.data.pluginMessage;

  if (type === "animation-generated") {
    htmlOutput.value = data.html.trim();
    cssOutput.value = data.css.trim();
    jsOutput.value = data.js.trim();
  } else if (type === "error") {
    console.error(event.data.pluginMessage.message);
  }
};
