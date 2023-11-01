import {useState, type FunctionComponent} from "react";
import {IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonToolbar} from '@ionic/react';
import {Auth} from "../api";
import Timetable from "../components/Timetable";
import Login from "../components/Login";

const TimetablePage: FunctionComponent = () => {
    const isLoggedIn = Auth.useLoggedIn();
    const [tab, setTab] = useState("actual");

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonSegment value={tab} onIonChange={e => setTab(e.detail.value as string)}>
                        <IonSegmentButton value="actual">
                            Aktuální
                        </IonSegmentButton>
                        <IonSegmentButton value="permanent">
                            Trvalý rozvrh
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {isLoggedIn ? <Timetable permanent={tab === "permanent"} /> : <Login redirect="/timetable" />}
            </IonContent>
        </IonPage>
    );
};

export default TimetablePage;