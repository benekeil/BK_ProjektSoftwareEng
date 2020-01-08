import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircleOutline, calendar, addCircle } from 'ionicons/icons';
import NewMonth from './pages/NewMonth';
import MonthReview from './pages/MonthReview';
import NewInput from './pages/NewInput';
import ActualMonth from './pages/ActualMonth';
import Start from './pages/Start';
import StartError from './errors/starterror';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';
import { DBConfig } from './db/DBConfig';


import { initDB, useIndexedDB } from 'react-indexed-db';


initDB(DBConfig);



interface IState {
  month: string;
  startbudget: number;
  monthObj: object[];
  monthlist?: object[];
  monthlistDB: object[];
  actualMonth?: string;
  actualBudget: number;
  allMonthObj: object[];
  actualMonthObj: actualMonthObj;
  inputs: object[];
  monthID: number;
  firstLoad: boolean;
  normalMode: boolean;
  starterror: boolean;
}
interface IProps {

}

interface actualMonthObj {
  month: string;
  startbudget: number;
  actualbudget: number;
  id: number;
}

/**
 * 
 * Documentation Projekt Softwareengineering
 * Es wurde ein Ausgabenrechner implementiert, 
 * der eine Übersicht über das aktuelle Budget und alle Ausgaben/Einnahmen eines Monats gibt
 * @author: Benedikt Keil
 * 
 */
class App extends React.Component<IProps, IState>{
  state: IState = {
    actualBudget: 0,
    startbudget: NaN,
    month: "test",
    monthObj: [{ "month": "Test", "startbudget": 0 }],
    monthlistDB: [],
    allMonthObj: [{ "month": "no Month", "startbudget": 0, "id": 1 }],
    actualMonthObj: { month: "no Month", startbudget: 0, actualbudget: 0, id: 0 },
    inputs: [],
    monthID: 1,
    firstLoad: true,
    normalMode: false,
    starterror: false
  }


  /**
 * Methode um ausgewählten Monat zu speichern
 */
  public getMonth = (event: CustomEvent<DatetimeChangeEventDetail>) => {
    let month = event.detail.value;
    let monthsubstr = month!.substr(0, 7);


    this.setState({
      month: monthsubstr!,

    });

    console.log(this.state.month);

  }
  /**
  * Methode um eingegebenes Startbudget zu speichern
  */
  public getStartbudget = (event: CustomEvent<InputChangeEventDetail>) => {
    this.setState({
      startbudget: parseInt(event.detail.value!),

    })
    console.log(this.state.startbudget);


  }
  /**
   * Methode um Eingaben über Monat und Startbudget in Indexed DB zu speichern 
   * und um alle gespeicherten Monate in Indexed DB als State (monthlistDB) zu speichern.
   * Aufruf der Methode getActualMonth um aktuellen Monat in App zu setzen.
   */
  public pushMonthObj = () => {

    this.state.monthObj.push({ "month": this.state.month, "startbudget": this.state.startbudget })
    this.forceUpdate();
    const { add, getAll } = useIndexedDB('monthlist');


    add({ month: this.state.month, startbudget: this.state.startbudget, actualbudget: this.state.startbudget })



    getAll().then((monthlistDB) => {
      this.setState({
        monthlistDB: monthlistDB
      })
    })
    this.getActualMonth();
  }

  /**
   * Methode um alle gespeicherten Monate in Indexed DB abzurufen
   * und im State monthlistDB zu speichern
   */
  public getMonthObj = () => {
    const { getAll } = useIndexedDB('monthlist');
    getAll().then((monthlistDB) => {
      this.setState({
        monthlistDB: monthlistDB
      })
    })
  }

  /**
   * Methode um Startseite beim aller ersten Start der App zu starten.
   * Die Seite wird benötigt um einen ersten Datenbank Eintrag zu generieren.
   */
  public firstLoadApp = () => {
    const { getAll } = useIndexedDB('monthlist');
    getAll().then((month) => {

      if (month.length === 0) {
        this.setState({
          firstLoad: true,
        })
      }
      else {
        this.setState({
          firstLoad: false,
          normalMode: true,
        })
        this.getActualMonth();
      }
    })
    console.log(this.state.month+this.state.startbudget);
  }


  /**
   * Methode erstellt nach betätigen des "Start Ausgabenrechner" Buttons den ersten Datenbankeintrag in dem objectStore "monthlist"
   */
  public startRechner = () => {
   
    const { add, getAll } = useIndexedDB('monthlist');
    if (this.state.month !== "test" && this.state.startbudget !== 0){
    add({ month: this.state.month, startbudget: this.state.startbudget, actualbudget: this.state.startbudget });
    getAll().then((month) => {
      
      if (month.length === 0) {
        add({ month: this.state.month, startbudget: this.state.startbudget, actualbudget: this.state.startbudget });
      }
      getAll().then((month) => {


        this.setState({
          allMonthObj: month,
          firstLoad: false,
          normalMode: true,
        })

        this.getActualMonth();
      })
    })
    }
    else {
    this.setState({
        starterror: true,
    })
    }
  }


  /**
   * Methode um aktuellen Monat (letzter hinzugefügter Monat) abzurufen
   * und speichern der Werte dieses Monats als State (month, startbudget, actualbudget).
   * Aufruf der Methode getActualBudget um aktuelles Budget abzurufen, wenn sich der Monat ändert.
   */
  public getActualMonth = () => {

    const { getAll, getByID } = useIndexedDB('monthlist');
    getAll().then((month) => {


      this.setState({
        allMonthObj: month
      })
    }).then(() => {
      getByID(Math.max.apply(Math, this.state.allMonthObj.map((o: any) => { this.setState({ monthID: o.id }); return o.id }))).then((actualMonth) => {
        console.log(actualMonth);

        this.setState({
          actualMonthObj: actualMonth,
        })
        this.setState({
          month: this.state.actualMonthObj.month,
          startbudget: this.state.actualMonthObj.startbudget,
          actualBudget: this.state.actualMonthObj.actualbudget,
        })
        this.forceUpdate();
        console.log(this.state.actualBudget)
        this.getActualBudget();


      })
    })

  }



  /**
   * Methode um aktuelles Budget aller Inputs des aktuellen Monats zu berechnen.
   * Speichert den Wert in State (aktualBudget) 
   */
  public getActualBudget = () => {
   
    const { getAll, update } = useIndexedDB('inputs');

    getAll().then((inputs) => {

      this.setState({
        inputs: inputs
      })
    }).then(() => {

      if (this.state.inputs.length !== 0) {
        
        this.state.inputs.map((index: any) => {
          if (index.month === this.state.month && index.added === true){
            let actualBudget = index.actualbudget;
            this.setState({
              actualBudget: actualBudget,
            })
          }
          if (index.month === this.state.month && index.added === false) {

            let actualBudget = index.actualbudget;
            this.setState({
              actualBudget: actualBudget,
            })
            if (index.ausgabe) {

              actualBudget += index.betrag;
              this.setState({
                actualBudget: actualBudget,
              })
              update({ inputs_id: index.inputs_id, betrag: index.betrag, ausgabe: index.ausgabe, titel: index.titel, datum: index.datum, month: index.month, added: true, actualbudget: actualBudget });
              
            }
            else {
              actualBudget -= index.betrag;
              this.setState({
                actualBudget: actualBudget,
              });
              update({ inputs_id: index.inputs_id, betrag: index.betrag, ausgabe: index.ausgabe, titel: index.titel, datum: index.datum, month: index.month, added: true, actualbudget: actualBudget });
              
            }
          }

          return {
           }
         })
       }
    })
  }

  /**
   * Diese Methode rendert die TabBar die immer am unteren Bildschirmende gezeigt wird. 
   * Außerdem wird ein Router erstellt der die Navigation zwischen den einzelnen Seiten bereit stellt.
   * Hier werden auch die Methoden der App Klasse an die anderen Komponenten übergeben, 
   * die dann in den einzelne Komponenten als Props zur Verfügung stehen.
   */
  public render() {

    return (
      <IonApp onLoad={() => { this.firstLoadApp(); this.getMonthObj();}}>

        {this.state.firstLoad && (<Start startRechner={this.startRechner} getMonth={this.getMonth} getStartbudget={this.getStartbudget} month={this.state.month} startbudget={this.state.startbudget}></Start>)}
        {this.state.starterror && (<StartError></StartError>)}
        <IonReactRouter>

          {this.state.normalMode && (<IonTabs>
            <IonRouterOutlet>
              <Route path="/newMonth" >
                <NewMonth getMonth={this.getMonth} getStartbudget={this.getStartbudget} pushMonthObj={this.pushMonthObj}></NewMonth>
              </Route>
              <Route path="/monthReview" component={MonthReview} exact={true}> <MonthReview monthObj={this.state.monthlistDB}></MonthReview></Route>
              <Route path="/actualMonth" component={ActualMonth} exact={true}>
                <ActualMonth month={this.state.month} budget={this.state.actualBudget} getActualBudget={this.getActualBudget} getActualMonth={this.getActualMonth}></ActualMonth>
              </Route>
              <Route path="/newInput" component={NewInput}>
                <NewInput month={this.state.month} budget={this.state.actualBudget} getActualBudget={this.getActualBudget} ></NewInput>
              </Route>
              <Route path="/" render={() => <Redirect to="/start" />} exact={true} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="newInput" href="/newInput" onClick={this.getActualBudget}>
                <IonIcon icon={addCircle} />
                <IonLabel>New Input</IonLabel>
              </IonTabButton>
              <IonTabButton tab="actualMonth" href="/actualMonth" onClick={this.getActualBudget}>
                <IonIcon icon={calendar} />
                <IonLabel> Actual Month </IonLabel>
              </IonTabButton>
              <IonTabButton tab="newMonth" href="/newMonth">
                <IonIcon icon={addCircleOutline} />
                <IonLabel>New Month</IonLabel>
              </IonTabButton>
              <IonTabButton tab="monthReview" href="/monthReview">
                <IonIcon icon={calendar} />
                <IonLabel>Month Review</IonLabel>
              </IonTabButton>


            </IonTabBar>
          </IonTabs>)}

        </IonReactRouter>
      </IonApp>
    )
  };
}

export default App;
