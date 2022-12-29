import { Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Loading() {
  return (
    <Dimmer active inverted>
      <Loader content="Loading" />
    </Dimmer>
  );
}

export default Loading;
