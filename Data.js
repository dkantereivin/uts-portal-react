import {AsyncStorage} from 'react-native';
//import * as firebase from 'firebase';

const firebase = require ('firebase');
require ('firebase/firestore');
require ('firebase/database');

class Data 
{
    static is_value(obj){
        if(obj.constructor == "".constructor) return true;
        if(obj.constructor == [].contsructor) return true;
        return false;
    }
    
    static merge(m1, m2){
        if (m1 == undefined) m1 = {};
        for(key in m2){
            if(this.is_value(m2[key])) m1[key] = m2[key];
            else merge(m1[key],m2[key]);
        }
    }

    // static merge (obj1, obj2)
    // {
    //     let result = {};
    //     let key;
    //     for (key in obj1)
    //     {
    //         if (obj1.hasOwnProperty(key))
    //         {
    //             result [key] = obj1 [key]
    //         }
    //     }
    //     for (key in obj2)
    //     {
    //         if (obj2.hasOwnProperty(key))
    //         {
    //             result [key] = obj2 [key]
    //         }
    //     }
    //     return result;
    // }

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
            await AsyncStorage.setItem('@user/timetable', JSON.stringify(this.merge (JSON.parse(value), newData)));
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
            if (value != null && Date.now() < Date.parse(value.expirationDate)) {return}
            let newDate = new Date()
            let now = Date.now();
            let oneday = 1000*60*60*24;
            newDate.setTime(now - now%(oneday) + oneday);
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
            aday? (timetable.A [flipped? fliptonormal [classnumber] : classnumber] = newvalue) : (timetable.B [flipped? fliptonormal [classnumber] : classnumber] = newvalue);
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
            return aday? timetable.A [flipped? fliptonormal [classnumber] : classnumber] : timetable.B [flipped? fliptonormal [classnumber] : classnumber];
        }
        catch (error)
        {
            console.log (error)
        }
        return null;
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
}

export default Data;
/*
masterJSON:
    @user: {
        "expiration": Object {
            "expirationDate" : "DateString"
        },
        notifSettings: Object { //those shown are default values
            "articles" : true,
            "latestart": true,
            "special": true,
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
                "endTimes": Array [
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555941420,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555944420,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555948320,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555951320,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555955040,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555958940,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555962840,
                    },
                ],
                "periodNames": Array ["Period 1","Assembly","Period 2","Lunch","Period 3","Period 4","Period 5",],
                "startTimes": Array [
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555937700,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1554904800,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555944600,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555948320,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555951320,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555955220,
                    },
                    Object {
                        "nanoseconds": 0,
                        "seconds": 1555008720,
                    },
                ],
                "value": 2,
            },
        }
    }
*/