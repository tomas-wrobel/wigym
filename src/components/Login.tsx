import {type FunctionComponent} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel, IonList, useIonAlert} from '@ionic/react';
import {Auth} from "../api";
import {Redirect} from "react-router";

const Login: FunctionComponent<{redirect: string}> = ({redirect}) => {
    const [errorAlert] = useIonAlert();
    const isLoggedIn = Auth.useLoggedIn();

    if (isLoggedIn) {
        return <Redirect to={redirect} />;
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);

            Auth.signIn(
                data.get("username") as string,
                data.get("password") as string
            ).catch(error => errorAlert({
                header: "Chyba při přihlašování",
                message: String(error),
                buttons: ["OK"]
            }));
        }}>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Login</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Uživatelské jméno</IonLabel>
                            <IonInput aria-label="Uživatelské jméno" type="text" name="username" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Heslo</IonLabel>
                            <IonInput aria-label="Heslo" type="password" name="password" />
                        </IonItem>
                        <IonButton type="submit">Přihlásit se přes Bakaláře</IonButton>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </form>
    );
};

export default Login;