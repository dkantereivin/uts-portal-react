import {AsyncStorage} from 'react-native';
//import * as firebase from 'firebase';

const firebase = require ('firebase');
require ('firebase/firestore');
require ('firebase/database');

class Data 
{
    // static is_value(obj){
    //     if(obj.constructor == "".constructor) return true;
    //     if(obj.constructor == [].contsructor) return true;
    //     return false;
    // }
    
    // static merge(m1, m2){
    //     if(typeof(m1) == "undefined" || m1 == null) m1 = {};
    //     for(key in m2){
    //         if(this.is_value(m2[key])) m1[key] = m2[key];
    //         else this.merge(m1[key],m2[key]);
    //     }
    // }

    static gen_strings(n){
        ret = [], used = {};
        for(i=0; i<n; i++){
            curr = "";
            for(k=0; k<26; k++){
                rd = String.fromCharCode(Math.floor(Math.random()*26)+97);
                curr+=rd;
            }
            if(typeof(used[curr]) != "undefined") i--;
            else ret.push(curr), used[curr] = 1;
        }
        return ret;
    }

    static merge (obj1, obj2)
    {
        let result = {};
        let key;
        for (key in obj1)
        {
            if (obj1.hasOwnProperty(key))
            {
                result [key] = obj1 [key]
            }
        }
        for (key in obj2)
        {
            if (obj2.hasOwnProperty(key))
            {
                result [key] = obj2 [key]
            }
        }
        return result;
    }

    static async initTimetable (ABDay, arr) //ABDay: bool, 
    {
        let jsonArray = [];
        for (let x = 0; x < arr.length; x++)
        {
            jsonArray.push(arr [x]);
        }
        let newData = ABDay? {A: jsonArray} : {B: jsonArray};
        try 
        {
            const value = await AsyncStorage.getItem ('@user/timetable');
            let old = JSON.parse (value);
            await AsyncStorage.setItem('@user/timetable', JSON.stringify(this.merge (old, newData)));
        }
        catch (error)
        {
            console.log (error);
        }
    }

    static async setDefaults ()
    {
        try 
        {
            const value = await AsyncStorage.getItem ('@user/notifSettings');
            if (value == null)
            {
                let notifSettings = {};
                notifSettings ["special"] = true,
                notifSettings ["latestart"] = true,
                notifSettings ["assembly"] = true,
                notifSettings ["articles"] = true;
                notifSettings ["flipday"] = true,
                notifSettings ["general"] = true;
                notifSettings ["house"] = true;
                notifSettings ["surveys"] = true;
                notifSettings ["daysBefore"] = 2;
                notifSettings ["latestart"] = true;
                notifSettings ["assembly"] = true;
                notifSettings ["special"] = true;
                notifSettings ["flipdays"] = true;
                notifSettings ["notifTime"] = 2; //1: afternoon, 2: evening;
                await AsyncStorage.setItem ('@user/notifSettings', JSON.stringify (notifSettings));
            }
        }
        catch (error)
        {
            console.log (error);
        }
    }

    static updateAll ()
    {
        //check for connection with the server
        let ref = firebase.database().ref (".info/connected");
        ref.on ('value', function (snap) {
            if (snap.val() == true)
            {
                Data.updateCheckExpiration();
            }
        })
    }

    static async updateCheckExpiration ()
    {        
        try 
        {
            let value = JSON.parse(await AsyncStorage.getItem ('@user/expiration'));
            if (value != null)
            {
                let date = new Date (value.expirationDate);
                if (Date.now() < date.getTime()) return;
            }
            let newDate = new Date()
            const now = new Date ();
            const oneday = 1000*60*60*24;
            now.setHours (0, 0, 0, 0);
            newDate.setTime(now.getTime() + oneday);
            let newJSON = {}
            newJSON ["expirationDate"] = newDate;
            await AsyncStorage.setItem ('@user/expiration', JSON.stringify (newJSON));
            this.updateSchedules();
            this.updateWeekly();
            this.updateEvents();
            this.updateFlipArray();
        }
        catch (error)
        {
            console.log (error);
        }
    }

    static async updateSchedules ()
    {
        let ref = firebase.firestore().collection("Schedules");
        ref.get().then(function(querySnapshot) {
            let schedules = {};
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                schedules [doc.id] = doc.data();
                if (schedules [doc.id].hasOwnProperty ("startTimes"))
                {
                    for (let i = 0; i < schedules [doc.id]["startTimes"].length; i++)
                    {
                        let temp = schedules[doc.id]["startTimes"][i].toDate()
                        let temp2 = schedules[doc.id]["endTimes"][i].toDate()
                        schedules [doc.id]["startTimes"][i] = temp.getTime();
                        schedules [doc.id]["endTimes"][i] = temp2.getTime();
                    }
                }
            });
            try {
                AsyncStorage.setItem ('@user/schedules', JSON.stringify(schedules));
            }
            catch (error){
                console.log (error);
            }
        });
    }

    static async updateWeekly ()
    {
        let ref = firebase.database().ref ('/DailySchedule');
        ref.once('value').then (function (snapshot) {
            let weekly = {}
            let scheduletype = []; let abday = []; let flipornot = [];
            const data = snapshot.val();
            for (let x = 0; x < data.length; x++) //0: Sunday, 1: Monday, etc.
            {
                scheduletype.push (data [x][0]);
                abday.push (data [x][1]);
                flipornot.push(data [x][2]);
            }
            weekly ['scheduletype'] = scheduletype;
            weekly ['abday'] = abday;
            weekly ['flipornot'] = flipornot;
            AsyncStorage.setItem ('@user/weekly', JSON.stringify(weekly));
        })
    }

    static async updateEvents ()
    {
        let ref = firebase.database().ref ('/Events')
        ref.once ('value').then (function (snapshot) {
            let events = [];
            const data = snapshot.val();
            for (let x = 0; x < data.length; x++) //loop through each event
            {
                const event = {}
                const t = data [x][1];
                if (t == "A")
                {
                    event ["time"] = "all day";
                }
                else if (t == "B")
                {
                    event ["time"] = "before school";
                }
                else if (t == "L")
                {
                    event ['time'] = "at lunch";
                }
                else if (t == "E")
                {
                    event ['time'] = "after school"
                }
                else 
                {
                    event ["time"] = t;
                }
                event ['titleDetail'] = data [x][0];
                event ['date'] = Date.parse (data [x][2]);
                event ['kind'] = data [x][3];
                events.push (event);
            }
            AsyncStorage.setItem('@user/events', JSON.stringify(events));
        });
    }
    
    static async updateFlipArray ()
    {
        let ref = firebase.firestore().collection ("FlipDay").doc ("FlipDay");
        ref.get().then(function(doc) {
            if (doc.exists) {
                let normaltoflip = doc.data() ["correspondingPeriods"];
                let fliptonormal = [];
                fliptonormal.push(0); //buffer
                for (let x = 0; x < 5; x++)
                {
                    fliptonormal [normaltoflip [x]] = x + 1;
                }
                AsyncStorage.setItem ('@user/fliptonormal', JSON.stringify(fliptonormal));
            } else {
                // doc.data() will be undefined in this case
                console.log("you're fooled!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    static async timetableupdate (aday, flipped, classnumber, newvalue)
    {
        try 
        {
            let timetable = JSON.parse(await AsyncStorage.getItem ('@user/timetable'));
            let fliptonormal = JSON.parse(await AsyncStorage.getItem ('@user/fliptonormal'));
            if (aday)
            {
                timetable.A [(flipped? fliptonormal [classnumber] : classnumber) - 1] = newvalue;
            }
            else
            {
                timetable.B [(flipped? fliptonormal [classnumber] : classnumber) - 1] = newvalue;
            }
            await AsyncStorage.setItem ('@user/timetable', JSON.stringify (timetable));
        }
        catch (error) {
            console.log (error);
        }
    }

    static async timetablequery (aday, flipped, classnumber)
    {
        try 
        {
            let timetable = JSON.parse(await AsyncStorage.getItem ('@user/timetable'));
            let fliptonormal = JSON.parse(await AsyncStorage.getItem ('@user/fliptonormal'));
            return aday? timetable.A [(flipped? fliptonormal [classnumber] : classnumber)-1] : timetable.B [(flipped? fliptonormal [classnumber] : classnumber)-1];
        }
        catch (error)
        {
            console.log (error)
        }
    }

    static async setNotification (key, newvalue) //string, value
    {
        if (typeof (newvalue) === "undefined") {try {AsyncStorage.setItem ('@user/notifSettings', JSON.stringify (key));} catch (error) {console.log (error)}}
        try 
        {
            let curr = await AsyncStorage.getItem ('@user/notifSettings');
            let oldJSON = JSON.parse (curr);
            oldJSON [key] = newvalue;
            AsyncStorage.setItem ('@user/notifSettings', JSON.stringify(oldJSON));
        }
        catch (error)
        {
            console.log (error);
        }
    }

    static async getNotification (key)
    {
        if (typeof key === "undefined") {try {return JSON.parse(await AsyncStorage.getItem ('@user/notifSettings'));} catch (error) {console.log (error)}}
        try {let curr = await AsyncStorage.getItem ('@user/notifSettings');let json = JSON.parse (curr);return json [key];}
        catch (error){console.log (error);}
    }

    static async getWeekScheduleData ()
    {
        // JSON:
        // data: [
        //     Object {
        //         date: Js DateTime Number
        //         abday: 'A','B','N/A',
        //         flipornot: 'F','N','N/A',
        //         name: "Regular",
        //         periods: [
        //             Object {
        //                 name: "something",
        //                 classnumber: "correspond",
        //                 startTimes: "something",
        //                 endTimes: "something",
        //             }
        //         ],
        //         events: [
        //             Object {
        //                 "kind": 1,
        //                 "time": "(school closed)",
        //                 "titleDetail": "Thanksgiving Holiday",
        //             }
        //         ]
        //     },
        // ]
        let data = [{}, {}, {}, {}, {}];
        let ids = this.gen_strings(5);
        const oneday = 1000*60*60*24;
        //events
        const events = JSON.parse (await AsyncStorage.getItem ('@user/events'));
        let today = new Date();
        today.setHours (0, 0, 0, 0);
        let later = today.getTime() + 5*oneday;
        for (var i = 0; i < data.length; i++)
        {
            data [i]["date"] = today.getTime() + i*oneday;
            data [i]["events"] = [];
            data [i]["id"] = ids [i];
        }
        for (var i = 0; i < events.length; i++)
        {
            let date = new Date (events [i]["date"])
            let diff = date.getTime() - today.getTime();
            if (diff < 0 || diff >= later) continue;
            data [Math.floor(diff/oneday)]["events"].push (events [i])
        }
        let weekly = JSON.parse (await AsyncStorage.getItem ('@user/weekly'))
        let schedules = JSON.parse (await AsyncStorage.getItem ('@user/schedules'))
        for (var i = 0; i < data.length; i++)
        {

            //ADays and FlipDays
            const curr = new Date (data [i]["date"]); //current day
            const weekday = curr.getDay();
            const abday = weekly ["abday"][weekday];
            const flipornot = weekly ["flipornot"][weekday];
            data [i]["abday"] = abday;
            data [i]["flipornot"] = flipornot;
            //schedules
            let schedule;
            for (key in schedules)
            {
                if (schedules [key]["value"] == weekly ["scheduletype"][weekday])
                {
                    schedule = schedules [key];
                    break;
                }
            }
            let periods = [];
            if (schedule.hasOwnProperty ("periodNames"))
            {
                for (var j = 0; j < schedule ["periodNames"].length; j++)
                {
                    let period = {}
                    const defaultName = schedule ["periodNames"][j];
                    const correspond = schedule ["correspond"][j];
                    const notes = schedule ["additionalNotes"][j];
                    period ["startTime"] = schedule ["startTimes"][j];
                    period ["endTime"] = schedule ["endTimes"][j];
                    period ["classnumber"] = parseInt(correspond);
                    if (correspond == 0)
                    {
                        period ["name"] = defaultName;
                    }
                    else 
                    {
                        let userInput = "";
                        if (notes == "A")
                        {
                            userInput = await this.timetablequery (true, flipornot == "F", correspond)
                        }
                        else if (notes == "B")
                        {
                            userInput = await this.tiemtablequery (false, flipornot == "F", correspond)
                        }
                        else
                        {
                            userInput = await this.timetablequery (abday == "A", flipornot == "F", correspond)
                        }
                        if (userInput == "")
                        {
                            period ["name"] = defaultName;
                        }
                        else 
                        {
                            period ["name"] = userInput;
                        }
                    }
                    periods.push (period);
                }
            }
            data [i]["periods"] = periods;
        }
        return data;
    }
}

export default Data;
/*
masterJSON: //this might not be entirely correct, but the idea should be right
    @device_token: token,
    @user: {
        "basics": Object {
            "name" : str,
            "email" : str,
            "code" : number,
        },
        
        "expiration": Object {
            "expirationDate" : "DateString"
        },
        notifSettings: Object { //those shown are default values
            "articles" : true,
            "latestart": true,
            "special": true,
            "flipday": true,
            "assembly": true,
            "general" : true,
            "house" : true,
            "surveys" : true,
            "daysBefore" : 2,
            "notifTime" : 2,
        },
        fliptonormal: Array [0, 4, 5, 1, 2, 3], //1-indexed: period 1 on flipday is period 4 on normal day and etc.
        timetable: Object {
            "A": Array ["Comsci","223","Class3","sdfs","something"],
            "B": Array ["Coasfci","23","Cass3","Allen-branch","something else"],
        },
        events: Array [
            Object {
                "date": 1571025600000,
                "kind": 1,
                "time": "(school closed)",
                "titleDetail": "Thanksgiving Holiday",
            },
            Object {
                "date": 1571457600000,
                "kind": 1,
                "time": "all day",
                "titleDetail": "UTS Open Trivia Tournament",
            },
            Object {
                "date": 1572235200000,
                "kind": 1,
                "time": "4:00pm - 5:30pm",
                "titleDetail": "Halloween Dance (UTS Humbert Gym)",
            },
            Object {
                "date": 1572321600000,
                "kind": 1,
                "time": "4:00pm - 5:30pm",
                "titleDetail": "Halloween Cookie Decorating (UTS Humbert Gym)",
            },
            Object {
                "date": 1572494400000,
                "kind": 1,
                "time": "all day",
                "titleDetail": "Parent-Teacher Interviews (no classes)",
            },
            Object {
                "date": 1572580800000,
                "kind": 1,
                "time": "all day",
                "titleDetail": "Parent-Teacher Interviews (no classes)",
            },
            Object {
                "date": 1575003600000,
                "kind": 1,
                "time": "all day",
                "titleDetail": "Movember Facial Hair Day (show off your beard for men's health)",
            },
        ],
        weekly: {
            "abday": Array ["N/A", "A","B","A","A","B","N/A",],
            "flipornot": Array ["N/A","N","N","F","F","F","N/A",],
            "scheduletype": Array [4, 1, 1, 3, 1, 1, 4],
        },
        schedules: {
            "Assembly Day": Object {
                "additionalNotes": Array ["","","","","","","",],
                "correspond": Array [1, 0, 2, 0, 3, 4, 5,],
                "endTimes": Array [1555941420, 1555944420, 1555944420,1555944420,1555944420,1555944420,1555944420],
                "periodNames": Array ["Period 1","Assembly","Period 2","Lunch","Period 3","Period 4","Period 5",],
                "startTimes": Array [1555941420, 1555944420, 1555944420,1555944420,1555944420,1555944420,1555944420],
                "value": 2,
            },
        }
    }
*/