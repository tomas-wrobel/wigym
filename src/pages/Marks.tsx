import type {FunctionComponent} from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {Auth} from "../api";
import Marks from "../components/Marks";
import Login from "../components/Login";

const MarksPage: FunctionComponent = () => {
    const isLoggedIn = Auth.useLoggedIn();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Známky</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Známky</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {isLoggedIn ? <Marks /> : <Login redirect="/login" />}
            </IonContent>
        </IonPage>
    );
};

export default MarksPage;