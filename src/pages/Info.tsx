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
                        <IonCardTitle>O aplikaci</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            Vítejte ve Wigym Aapp, aplikaci pro studenty Wichterlova gymnázia. Tato aplikace je vyvíjena Tomášem Wróblem a měla by sjednotit všechny služby, které jsou pro studenty důležité.
                        </p>
                        <p>
                            Tak například zde najdete přehled svých známek, rozvrh, aktuality a další.
                        </p>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Google Play? App Store?</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>
                            Wigym App je vyvíjena jako webová aplikace, která se dá nainstalovat na domovskou obrazovku. Tím pádem je dostupná na všech zařízeních, která mají přístup k internetu.
                        </p>
                        <p>
                            Zatím totiž nemám licence na vývoj pro Google Play ani App Store. Navíc nemám souhlas od Wichterlova gymnázia, takže bych nemohl aplikaci publikovat.
                        </p>
                    </IonCardContent>
                </IonCard>
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
            </IonContent>
        </IonPage>
    );
};

export default Info;