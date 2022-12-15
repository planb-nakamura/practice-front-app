import { Dimmer , Loader } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

// eslint-disable-next-line react/prop-types
function Loading({ inverted = true, content="Loading"}) {
return (
    < Dimmer inverted={inverted} active={true}>
        < Loader content={content}/>
    </ Dimmer>
)
}

export default Loading;