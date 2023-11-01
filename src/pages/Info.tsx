import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {FunctionComponent, useEffect, useState} from "react";
import {useLoggedIn} from "../api/auth";
import {API, Auth} from "../api";

const Info: FunctionComponent = () => {
    const isLoggedIn = useLoggedIn();
    const [info, setInfo] = useState("Nepřihlášen.");

    useEffect(() => {
        if (isLoggedIn) {
            API.fetch("user").then(data => {
                setInfo(`Přihlášen jako ${data.FullName}.`);
            }).catch(() => {
                Auth.signOut();
                setInfo("Nepřihlášen.");
            });
        } else {
            setInfo("Nepřihlášen.");
        }
    }, [isLoggedIn]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Wigym App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Wigym App</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Informace o uživateli</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {info}
                    </IonCardContent>
                    {info === "Nepřihlášen."
                        ? <IonButton href="/login" fill="clear">Přihlásit se</IonButton>
                        : <IonButton fill="clear" onClick={Auth.signOut}>Odhlásit se</IonButton>
                    }
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Google Play?</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            Wigym App je vyvíjena jako webová aplikace, která se dá nainstalovat na domovskou obrazovku. Tím pádem je dostupná na všech zařízeních, která mají přístup k internetu.
                        </p>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Zdrojový kód</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            Zdrojový kód aplikace je k dispozici na <a href="https://github.com/tomas-wrobel/wigym">GitHubu</a>.
                        </p>
                        <p>
                            Ať už chcete přispět k vývoji, nebo vyvíjet vlastní aplikaci, pamatujte, že je třeba dodržovat licenci. Více informací najdete v souboru <code>LICENSE</code>.
                        </p>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Info;