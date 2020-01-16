import React from 'react';
import moment from 'moment';
import style from './style';
import Data from '../../Data';
import Navbar from '../../components/Navbar';
import { AsyncStorage, ScrollView, View, Text, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { HeaderStyleInterpolator } from 'react-navigation-stack';

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
        let {periods} = schedule[0];
        let wantedperiods = [];
        for (var i = 0; i < periods.length; i++) 
        {
            let temp = periods [i].startTime;
            temp %= 1000*60*60*24;
            let curr = new Date().getTime();
            curr %= 1000*60*60*24;
            if (curr < temp) wantedperiods.push(periods[i]); //if the periods hasn't started;
        }

        let nextclass = {};
        if (wantedperiods.length != 0) nextclass = {start: toTimeString(wantedperiods [0].startTime), name: wantedperiods[0].name.toUpperCase()};
        else 
        {
            //leave this to allen;
            nextclass.name = "Pei";
            nextclass.start = "Allen";
        }
        
        this.setState({
            nextClass: nextclass,
            remainingClasses: wantedperiods,
            nextDays: schedule.slice(0, 3),
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
            <View style = {style.superContainer}>
                <ScrollView style = {style.container} contentContainerStyle={style.containerContent}>
                    <Text style = {style.helloMsg}>
                        HELLO{'\n'}
                        <Text style = {style.firstName}>
                            {this.state.firstName}
                        </Text>
                    </Text>
                    <Text style = {style.stdText}>
                        STARTS
                    </Text>
                    <Text style = {style.clock} numberOfLines = {1} allowFontScaling = {true}>
                        {this.state.nextClass.start}
                    </Text>
                    <Text style = {style.nextclassname} numberOfLines = {2} allowFontScaling = {true}>
                        {this.state.nextClass.name} {'\n'}
                        <Text style = {style.isnext}>
                            IS NEXT
                        </Text>
                    </Text>
                    <Text style = {style.restofdaylabel} numberOfLines={1}>
                        REST OF THE DAY
                    </Text>
                    <View style = {style.restOfDayBox}>
                        <RemainingClasses periods = {this.state.remainingClasses}/>
                    </View>
                    <View style = {style.upcomingDayBox}>
                        <DaysList days= {this.state.nextDays}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

class RemainingClasses extends React.Component
{   // props -> periods: obj[]


    constructor (props)
    {
        super(props);
        this.generatePeriods = this.generatePeriods.bind(this);
    }

    generatePeriods ()
    {
        if (this.props.periods.length == 0)
        {
            return (
                <Text style = {style.nothinglefttext}>
                    Nothing Left Today!
                </Text>
            )
        }
        let stack = []
        let ids = Data.gen_strings (this.props.periods.length);
        for (let i = 0; i < this.props.periods.length; i++)
        {
            stack.push(this.genperiod(this.props.periods [i], ids[i]));
        }
        return stack;
    }

    genperiod (period, id)
    {
        const timeText = toTimeString(period.startTime) + ' - ' + toTimeString(period.endTime);
        return (
            <View style = {style.periodcontainer} key = {id}>
                <Text style={style.periodtimelabel} numberOfLines={1}>{timeText}</Text>
                <Text style={style.periodclasslabel} numberofLines={1}>{period.name}</Text>
            </View>
        )
    }

    render () 
    {
        return (
            <ScrollView style = {style.restofdayscroll} contentContainerStyle = {style.restofdaycontent}>
                {this.generatePeriods()}
            </ScrollView>
        );
    }

    // render()
    // {
    //     return (
    //         <React.Fragment>
    //             {this.props.periods.length > 0 ? 
    //             this.props.periods.map((p) => this.periodRow(p)) : 
    //             <Text style={style.stdText}>Nothing Left Today!</Text>}
    //         </React.Fragment>
    //     )
    // }

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
    
    constructor(props) {
        super(props);
        this.generateDays = this.generateDays.bind(this);
        this.generateDay = this.generateDay.bind(this);
    }

    render ()
    {
        return (
            <View style = {style.dayscontainer}>
                {this.generateDays()}
            </View>
        )
    }

    generateDays()
    {
        let stack = []
        let ids = Data.gen_strings (this.props.days.length);
        for (let i = 0; i < this.props.days.length; i++)
        {
            stack.push(this.generateDay(this.props.days [i], ids[i], i));
        }
        return stack;
    }

    generateDay(day, id, daysUntil)
    {
        const date = moment().add({days: daysUntil});
        let datenum = date.format ('DD');
        let datenumtext = '';
        if (datenum.charAt(datenum.length - 1) == '1') datenumtext = 'st';
        else if (datenum.charAt(datenum.length - 1) == '2') datenumtext = 'nd';
        else datenumtext = 'th';
        return (
            <View style = {style.daycontainer} key = {id}>
                <Text style = {style.abdaylabel}>
                    {day.abday == 'N/A' ? null : day.abday}
                </Text>
                <Text style = {style.weekdaylabel}>
                    {date.format('dd').toUpperCase()}
                </Text>
                <Text style = {style.daynumlabel}>
                    {datenum}
                    <Text style = {style.dayth}>
                        {datenumtext}
                    </Text>
                </Text>
                <Text style = {style.daynamelabel} numberOfLines={2}>
                    {day.schedulename}
                </Text>
            </View>
        );
    }
    
    
    // render()
    // {
    //     return (
    //         <React.Fragment>
    //             {this.props.days.length > 0 ? 
    //             this.props.days.map((day, idx) => this.periodRow(day, idx)):null}
    //         </React.Fragment>
    //     )
    // }

    

    // periodRow({abday, name, events}, daysUntil)
    // {
    //     const date = moment().add({days: daysUntil});
    //     return ( // 1 row/day
    //         <TouchableWithoutFeedback style={{flex:1}} key={daysUntil} 
    //         onPress={() => this.props.navigation.navigate('Schedule', {index: daysUntil})}
    //         >
    //             <View style={style.futureDayButton}>
    //             <View style={style.nextDaysCalendar}>
    //                 <Text style={{flex: 0.5, justifyContent: 'flex-end', fontFamily: 'gilroy-bold', fontSize: 16, color: 'rgba(83,109,254,1)'}}>
    //                     {abday == 'N/A' ? null : abday}
    //                 </Text>
    //                 <View style={{flex: 0.5, flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', alignContent: 'center'}}>
    //                     <Text style={{flex:0, fontFamily: 'gilroy-bold', fontSize: 30}}>
    //                         {date.format('dd').toUpperCase()}
    //                     </Text>
    //                     <Text style={[style.stdText, {flex: 0}]}>{date.format('DD')}</Text>
    //                 </View>
    //             </View>
    //             <View style={style.nextDaysText}>
    //                 <Text style={style.stdText}>
    //                     {this.dayDescription(abday, events)}
    //                 </Text>
    //             </View>
    //             </View>
    //         </TouchableWithoutFeedback>
    //     )
    // }

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