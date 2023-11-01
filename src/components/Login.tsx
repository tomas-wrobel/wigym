import {type FunctionComponent} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonLabel, IonList, useIonAlert} from '@ionic/react';
import {Auth} from "../api";
import {Redirect} from "react-router";

const Login: FunctionComponent<{redirect: string;}> = ({redirect}) => {
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
                    <IonCardTitle>Přihlásit se přes Bakaláře</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonInput label="Uživatelské jméno" labelPlacement="floating" type="text" name="username" />
                        </IonItem>
                        <IonItem>
                            <IonInput label="Heslo" labelPlacement="floating" type="password" name="password" />
                        </IonItem>
                    </IonList>
                </IonCardContent>
                <IonButton type="submit" fill="clear">Potvrdit</IonButton>
            </IonCard>
        </form>
    );
};

export default Login;