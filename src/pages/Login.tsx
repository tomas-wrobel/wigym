import type {FunctionComponent} from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import Login from "../components/Login";

const LoginPage: FunctionComponent = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Login redirect="/info" />
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;