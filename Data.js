import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';
// import * as firebase from 'firebase';

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
                let arr = ["", "", "", "", ""];
                await this.initTimetable (true, arr);
                await this.initTimetable(false, arr);
                let notifSettings = {};
                notifSettings ["special"] = true;
                notifSettings ["latestart"] = true;
                notifSettings ["assembly"] = true;
                notifSettings ["articles"] = false;
                notifSettings ["flipday"] = true;
                notifSettings ["general"] = false;
                notifSettings ["house"] = false;
                notifSettings ["surveys"] = false;
                notifSettings ["daysBefore"] = 2;
                notifSettings ["latestart"] = true;
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
        const temp = JSON.parse (await AsyncStorage.getItem ('@user/events'));
        const events = (temp == null ? [] : temp);
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
            let k;
            for (key in schedules)
            {
                if (schedules [key]["value"] == weekly ["scheduletype"][weekday])
                {
                    schedule = schedules [key];
                    k = key
                    break;
                }
            }
            data [i]["value"] = schedule ["value"];
            data [i]["schedulename"] = k;
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

    static startOfDay (date) 
    {
        let a = new Date (date);
        a.setHours (0, 0, 0, 0);
        return a.getTime();
    }

    static nextDays (date, days) 
    {
        let a = new Date (date);
        let t = 1000*60*60*24;
        return a.getTime() + t*days;
    }

    static async scheduleNotifications ()
    {
        await Notifications.cancelAllScheduledNotificationsAsync();
        let contents = []; //an array of body objects;
        let ops = []; //an array of options mainly for time
        const data = await this.getWeekScheduleData(); //gets the next n days of data;
        const notifsettings = await this.getNotification();
        const temp = JSON.parse (await AsyncStorage.getItem ('@user/events'));
        const events = (temp == null? [] : temp);
        const daysbefore = notifsettings ["daysBefore"];

        //loop through each day;
        for (var i = 0; i < data.length; i++)
        {
            let currday = data [i];
            const daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let t = new Date(this.nextDays(this.startOfDay(new Date().getTime()), i));
            if (i + daysbefore < data.length)
            {
                let afterday = data[i + daysbefore];
                //schedule notifications      //if not regular school day or stuff 
                if (notifsettings ["general"] && afterday["value"] != 1 && afterday["value"] != 4) 
                {
                    //notify days before
                    let bd = "";
                    if (notifsettings["notifTime"] == 1) t.setHours(12, 40); //afternoon
                    else if (notifsettings ["notifTime"] == 2) t.setHours (16, 0); //evening 
                    if (daysbefore > 1) bd = "There is " + afterday["schedulename"].toLowerCase() + " in " + daysbefore + " days on " + daysWeek[new Date(afterday["date"]).getDay()] + ".";
                    else bd = "There is " + afterday["schedulename"].toLowerCase() + " tomorrow.";
                    const message1 = {title: afterday["schedulename"], body: bd};
                    const time1 = {time: t.getTime()}
                    contents.push(message1);
                    ops.push(time1);
                }
                if (notifsettings ["articles"]){} //unimplemented
                if (notifsettings ["surveys"]) {} //unimplemented
            }

            //notify the day of
            if (notifsettings ["general"] && currday ["value"] != 1 && currday ["value"] != 4)
            {
                let bd = "";
                t.setHours(7, 10); //notify in the morning because this is the day of
                bd = "There is " + currday ["schedulename"] + " today.";
                const message1 = {title: currday["schedulename"], body: bd};
                const time1 = {time: t.getTime()}
                contents.push(message1);
                ops.push(time1);
            }

            //smart notifications 5 minutes before class starts notifications
            let ls = (notifsettings ["latestart"] && currday ["value"] == 3);
            let ad = (notifsettings ["assembly"] && currday ["value"] == 2);
            let ss = (notifsettings ["special"] && currday["value"] != 3 && currday ["value"] != 2 && currday ["value"] != 1 && currday["value"] != 4);
            let fd = (notifsettings ["flipday"] && currday["flipornot"] == "F");
            if(ls || ad || ss || fd)
            {
                let periods = currday["periods"];
                for (var j = 0; j < periods.length; j++)
                {
                    let ttl = periods [j]["name"].trim();
                    let bd = periods [j]["name"].trim() + " starts in 5 minutes.";
                    let startdateobj = new Date(periods[j]["startTime"]);
                    let notiftime = startdateobj.getTime() - 1000*60*5; // 5 minutes  
                    let notifdateobj = new Date (notiftime);    
                    t.setHours (notifdateobj.getHours(), notifdateobj.getMinutes());       
                    const message1 ={title: ttl, body: bd};
                    const time1 = {time: t.getTime()};
                    contents.push(message1);
                    ops.push(time1);
                }
            }
        }

        //event notifications
        let wantedevents = [];
        let acceptablevalues = [];
        if(notifsettings["general"]) acceptablevalues.push(1);
        if(notifsettings["house"]) acceptablevalues.push(2);
        for(var i = 0; i < events.length; i++) if(acceptablevalues.includes(events[i]["kind"])) acceptablevalues.push(events[i]);
        for(var i = 0; i < wantedevents.length;i++)
        {
            let event = wantedevents[i];
            //sets the day of
            let ttl1 = event ["titleDetail"].trim();
            let bd1 = event ["titleDetail"].trim();
            bd1 += " today " + event ["time"].trim() + ".";
            let t = new Date (this.startOfDay(event["date"]));
            t.setHours (7, 10);
            const message1 = {title: ttl1, body: bd1};
            const time1 = {time: t.getTime()};
            contents.push(message1);
            ops.push(time1);
            
            //set days before
            t = new Date(this.nextDays(this.startOfDay (t.getTime()), -daysbefore));
            let ttl2 = event ["titleDetail"].trim();
            let bd2 = event ["titleDetail"].trim();
            if (daysbefore > 1) bd2 += " " + daysWeek [t.getDay()] + " " + event ["time"].trim() + ".";
            else bd2 += " tomorrow " + event ["time"].trim() + ".";
            if (notifsettings["notifTime"] == 1) t.setHours(12, 40); //afternoon
            else if (notifsettings ["notifTime"] == 2) t.setHours (16, 0); //evening 
            const message2 = {title: ttl2, body: bd2};
            const time2 = {time: t.getTime()};
            contents.push(message2);
            ops.push(time2);
        }
        
        let currdate = new Date().getTime();
        //schedule all the notifications
        for (var i = 0; i < contents.length; i++) 
        {
            if (ops[i].time < currdate) continue;
            contents[i]["ios"] = {sound: true};
            contents [i]["android"] = {sound: true, vibrate: [0, 250, 250, 250]};
            Notifications.scheduleLocalNotificationAsync(contents[i], ops[i]);
        }
    }
    // Object {
    //     "articles": false,
    //     "assembly": true,
    //     "daysBefore": 5,
    //     "flipday": true,
    //     "flipdays": true,
    //     "general": true,
    //     "house": false,
    //     "latestart": true,
    //     "notifTime": 2,
    //     "special": true,
    //     "surveys": false,
    //   }

    // Array [
    //     Object {
    //       "abday": "N/A",
    //       "date": 1578891600000,
    //       "events": Array [],
    //       "flipornot": "N/A",
    //       "id": "ycaojomobrrwniumpwwdasgufe",
    //       "periods": Array [],
    //     },
    //     Object {
    //       "abday": "B",
    //       "date": 1578978000000,
    //       "events": Array [],
    //       "flipornot": "N",
    //       "id": "aenrtkqwuonpoagewcjftxxglg",
    //       "periods": Array [
    //         Object {
    //           "classnumber": 1,
    //           "endTime": 1554905220000,
    //           "name": "Period 1",
    //           "startTime": 1550152500000,
    //         },
    //         Object {
    //           "classnumber": 2,
    //           "endTime": 1555600920000,
    //           "name": "Period 2",
    //           "startTime": 1550070600000,
    //         },
    //         Object {
    //           "classnumber": 3,
    //           "endTime": 1556296620000,
    //           "name": "Period 3",
    //           "startTime": 1554564300000,
    //         },
    //         Object {
    //           "classnumber": 0,
    //           "endTime": 1556386020000,
    //           "name": "Lunch",
    //           "startTime": 1554568620000,
    //         },
    //         Object {
    //           "classnumber": 4,
    //           "endTime": 1555094340000,
    //           "name": "Period 4",
    //           "startTime": 1555176420000,
    //         },
    //         Object {
    //           "classnumber": 5,
    //           "endTime": 1555012440000,
    //           "name": "Period 5",
    //           "startTime": 1554230520000,
    //         },
    //       ],
    //     },
    //     Object {
    //       "abday": "A",
    //       "date": 1579064400000,
    //       "events": Array [],
    //       "flipornot": "F",
    //       "id": "kbyqbpszylxgstjnukwthbrsfi",
    //       "periods": Array [
    //         Object {
    //           "classnumber": 1,
    //           "endTime": 1554905220000,
    //           "name": undefined,
    //           "startTime": 1550152500000,
    //         },
    //         Object {
    //           "classnumber": 2,
    //           "endTime": 1555600920000,
    //           "name": undefined,
    //           "startTime": 1550070600000,
    //         },
    //         Object {
    //           "classnumber": 3,
    //           "endTime": 1556296620000,
    //           "name": undefined,
    //           "startTime": 1554564300000,
    //         },
    //         Object {
    //           "classnumber": 0,
    //           "endTime": 1556386020000,
    //           "name": "Lunch",
    //           "startTime": 1554568620000,
    //         },
    //         Object {
    //           "classnumber": 4,
    //           "endTime": 1555094340000,
    //           "name": undefined,
    //           "startTime": 1555176420000,
    //         },
        //     Object {
        //       "classnumber": 5,
        //       "endTime": 1555012440000,
        //       "name": undefined,
        //       "startTime": 1554230520000,
        //     },
        //   ],
        // },
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