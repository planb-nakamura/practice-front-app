import { Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Loading({
  inverted = true,
  content = "Loading",
}: {
  inverted?: boolean;
  content?: string;
}) {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content} />
    </Dimmer>
  );
}

export default Loading;
