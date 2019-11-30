import React from 'react';
import moment from 'moment';
import style from './style';
import Data from '../../Data';
import Navbar from './assets/Navbar';
import { AsyncStorage, ScrollView, View, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function toTimeString(ms) // returns ms as MM:SS
{ return moment(ms).local().format('HH:mm'); }

class Home extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            firstName: 'THERE',
            nextClass: {
                start: '8:55',
                name: 'SCHOOL'
            },
            remainingClasses: [],
            nextDays: []
        }
    }

    readFirstName()
    {
        AsyncStorage.getItem('@user/basics').then((res) => {
            const { name } = JSON.parse(res) || {};
            if (!name)
                return this.props.navigation.navigate('Buildings');
            this.setState({firstName: name.toUpperCase() + '.'})
        });
    }

    /**
     * Sets the state to reflect the current user scheduling.
     */
    async setAllScheduling(schedule)
    {
        schedule = schedule || await Data.getWeekScheduleData();
        let {periods} = schedule.shift();

        let time = moment();
        
        // correct all startTimes to current day and set to a momentjs object
        periods.map(per => per.startTime = moment(per.startTime).set('dayOfYear', time.dayOfYear()));

        // filter out any passed periods, only leave future periods
        periods = periods.filter(per => per.startTime.isAfter(time));
        periods.sort(per => per.startTime);
        const nextClass = periods.shift();
        
        
        this.setState({
            nextClass: nextClass ? {
                start: toTimeString(nextClass.startTime),
                name: nextClass.name.toUpperCase()
            } : {start: 'Schools', name: null},
            remainingClasses: periods,
            nextDays: schedule.slice(0, 3) // is this obsolete? dependant on implementation of ScheduleScreen
        })
    }

    resetStack()
    {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({routeName: 'Home'})]
        });
        this.props.navigation.dispatch([reset], 0);
    }

    componentWillMount()
    {
        this.resetStack();
    }

    componentDidMount()
    {
        this.readFirstName();
        this.setAllScheduling();
    }

    render()
    {
        return (
            <View style={style.superContainer}>
                <ScrollView style={style.container} contentContainerStyle={style.containerContent}>
                    <View style={style.topContent}>
                        <Text style={[style.helloMsg, {fontFamily:'gilroy-bold'}]}>HELLO</Text>
                        <Text style={style.helloMsg}>{this.state.firstName}</Text>
                        <Text style={[style.stdText, {paddingTop: hp(2)}]}>STARTS</Text>
                        <View style={style.nextClassContent}>
                            <Text style={style.clock}>{this.state.nextClass.start}</Text>
                            <View style={style.classContentLeftBox}>
                                <Text style={[style.stdText, {fontFamily:'gilroy-bold'}]}>{this.state.nextClass.name}</Text>
                                <Text style={style.stdText}>IS NEXT</Text>
                            </View>
                        </View>
                        <Text style={[style.stdText, {paddingTop: hp(2.5)}]}>REST OF THE DAY</Text>
                    </View>
                    <View style={style.restOfDayBox}>
                        <RemainingClasses periods={this.state.remainingClasses}/>
                    </View>
                    <View style={style.upcomingDayBox}>
                        
                    </View>
                </ScrollView>
                <Navbar navigation={this.props.navigation}/>
            </View>
        )
    }
}

class RemainingClasses extends React.Component
{   // props -> periods: obj[]
    render()
    {
        return (
            <React.Fragment>
                {this.props.periods.length > 0 ? 
                this.props.periods.map((p) => this.periodRow(p)) : 
                <Text style={style.stdText}>Nothing Left Today!</Text>}
            </React.Fragment>
        )
    }

    periodRow({startTime, endTime, name})
    {
        const timeText = toTimeString(startTime) + ' - ' + toTimeString(endTime);
        return (
            <View style={{flex: 1, flexDirection: 'row'}} key={name + startTime}>
                <Text style={[style.stdText, {flex: 0.5}]}>{timeText}</Text>
                <Text style={[style.stdText, {flex: 0.5}]}>{name}</Text>
            </View>
        )
    }
}

class DayListRendered extends React.Component
{   // object, daysUntil: number of days (index) between current and future date -- 0 = cur date
    periodRow({abday, name, periods, events}, daysUntil)
    {
        const date = moment().add({days: daysUntil});
        
    }
}

export default Home;