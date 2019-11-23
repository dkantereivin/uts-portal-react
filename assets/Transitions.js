import { Easing, Animated } from 'react-native';
import * as ReactTransitions from 'react-navigation-transitions'; // https://github.com/plmok61/react-navigation-transitions/blob/master/src/index.js

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Transitions
{

    static transitionSpec(duration = 300)
    {
        return {
            duration,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
          }
    }

    static screenInterpolator(sceneProps)
    {
        const params = sceneProps.scene.route.params || {transition: 'fadeIn'};
        const transition = params.transition;
        const time = params.transitionTime || 300;
        const func = ReactTransitions [transition](time).screenInterpolator;
        return func;
    }

    // methods from ReactTransitions
    static fadeIn(duration = 500)
    { return ReactTransitions.fadeIn(duration) }

    static fadeOut(duration = 500)
    { return ReactTransitions.fadeOut(duration) }

    static fromLeft(duration = 300)
    { return ReactTransitions.fromLeft(duration) }

    static fromRight(duration = 300)
    { return ReactTransitions.fromRight(duration) }

    static fromTop(duration = 300)
    { return ReactTransitions.fromTop(duration) }

    static fromBottom(duration = 300)
    { return ReactTransitions.fromBottom(duration) }

    static zoomIn(duration = 300)
    { return ReactTransitions.zoomIn(duration) }

    static zoomOut(duration = 300)
    { return ReactTransitions.zoomOut(duration) }

    static flipHorizontal(duration = 300)
    { return ReactTransitions.flipX(duration) }

    static flipVertical(duration = 300)
    { return ReactTransitions.flipY(duration) }


}

export default Transitions;