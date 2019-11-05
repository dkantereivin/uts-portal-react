    import React, {Component} from 'react';
    import { Animated, Image, View } from 'react-native';
    import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


    import style from "./style";
    //import aVals from "./animate";

    const images = {
        backgroundGradient: require("./assets/backgroundGradient.png"),
        buildings: require("./assets/buildings.png"),
        frontBuildings: require("./assets/frontBuildings.png"),
        icon: require("./assets/icon.png")
    };

    class LoadingScreen extends Component
    {
        style = style;

        constructor()
        {
            super();
            this.startPos = { // for buildings.png
                x: wp(-70),
                y: hp(31),
                w: wp(273),
                h: hp(81)
            }

            this.endPos = {
                x: wp(-110),
                y: hp(34),
                w: wp(350),
                h: hp(104)
            }

            this.buildingAnimation = new Animated.ValueXY({x: this.startPos.x, y: this.startPos.y});
        }

        moveBuildings() {
            Animated.spring(this.buildingAnimation,
                {toValue: {x: this.endPos.x, y: this.endPos.y}
            }).start();
            
        }
        
        componentDidMount()
        {
            this.moveBuildings();
        }

        render() 
        {
            return (
            <View style={style.view}>
            <Image style={style.gradient} source={images.backgroundGradient} />
            <Animated.Image style={[style.buildings, this.buildingAnimation.getLayout()]} />
            </View>);
        }
    } 
    // <Image style={this.style.icon} source={require('./assets/icon.png')} />
    // <Image style={this.style.buildings} source={require('./assets/buildings.png')} />
    // <Image style={this.style.frontBuildings} source={require('./assets/icon.png')} />

    export default LoadingScreen;
