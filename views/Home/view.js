import React from 'react';
import moment from 'moment';
import style from './style';
import Data from '../../Data';
import Navbar from '../../components/Navbar';
import { AsyncStorage, ScrollView, View, Text, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function toTimeString(ms) // returns ms as MM:SS
{ return moment(ms).local().format('HH:mm'); }

class Home extends React.Component
{
    static navigationOptions = {
        gesturesEnabled: false,
        swipeEnabled: false,
    };

    constructor(props)
    {
        super(props);
        this.state = {
            firstName: 'THERE',
            nextClass: {
                start: '8:55',
                name: 'SCHOOL'
            },
            remainingClasses: [],
            nextDays: []
        }
         this.handleBackButton = this.handleBackButton.bind(this);
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
    async setAllScheduling()
    {
        let schedule = await Data.getWeekScheduleData();
        let {periods} = schedule.shift();

        let time = moment();
        
        // correct all startTimes to current day and set to a momentjs object
        periods.map(per => per.startTime = moment(per.startTime).set('dayOfYear', time.dayOfYear()));

        // filter out any passed periods, only leave future periods
        periods = periods.filter(per => per.startTime.isAfter(time));
        periods.sort(per => per.startTime);
        const nextClass = periods.shift();
        
        
        this.setState({
            nextClass: nextClass != undefined && nextClass != null ? {
                start: toTimeString(nextClass.startTime),
                name: nextClass.name.toUpperCase()
            } : {start: 'School', name: null},
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
        BackHandler.addEventListener('hardwareBackPress',  this.handleBackButton);
    }

    componentWillUnmount()
    {
        BackHandler.removeEventListener('hardwareBackPress',  this.handleBackButton);
    }

    handleBackButton=()=>
    {
        if (!this.props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }
        BackHandler.exitApp();
        return true;
    };

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
                        <DaysList days={this.state.nextDays} navigation={this.props.navigation}/>
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

class DaysList extends React.Component
{   // days: object, not a prop -- daysUntil (key): number of days (index) between current and future date -- 0 = cur date
    render()
    {
        return (
            <React.Fragment>
                {this.props.days.length > 0 ? 
                this.props.days.map((day, idx) => this.periodRow(day, idx)):null}
            </React.Fragment>
        )
    }

    periodRow({abday, name, events}, daysUntil)
    {
        const date = moment().add({days: daysUntil});
        return ( // 1 row/day
            <TouchableWithoutFeedback style={{flex:1}} key={daysUntil} 
            onPress={() => this.props.navigation.navigate('Schedule', {index: daysUntil})}
            >
                <View style={style.futureDayButton}>
                <View style={style.nextDaysCalendar}>
                    <Text style={{flex: 0.5, justifyContent: 'flex-end', fontFamily: 'gilroy-bold', fontSize: 16, color: 'rgba(83,109,254,1)'}}>
                        {abday == 'N/A' ? null : abday}
                    </Text>
                    <View style={{flex: 0.5, flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', alignContent: 'center'}}>
                        <Text style={{flex:0, fontFamily: 'gilroy-bold', fontSize: 30}}>
                            {date.format('dd').toUpperCase()}
                        </Text>
                        <Text style={[style.stdText, {flex: 0}]}>{date.format('DD')}</Text>
                    </View>
                </View>
                <View style={style.nextDaysText}>
                    <Text style={style.stdText}>
                        {this.dayDescription(abday, events)}
                    </Text>
                </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    // ideally, this would be replaced with the use of weekScheduleData[n].name
    dayDescription(abday, events)
    {
        if (events.length > 0)
        {
            let out = '';
            for (let cur in events)
                out += cur.titleDetail;
            return out;
        }
        if (abday == 'N/A')
            return 'NO SCHOOL!\nWEEKEND.';
        return 'PERFECTLY\nNORMAL DAY.';
    }
}

export default Home;