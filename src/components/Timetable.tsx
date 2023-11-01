import {type FunctionComponent, useEffect, useState} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonDatetime, IonDatetimeButton, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
import {API} from "../api";

type Timetable = {
    Hours: {
        Id: number;
        Caption: string;
        BeginTime: string;
        EndTime: string;
    }[];
    Days: {
        Atoms: {
            HourId: number;
            SubjectId: number;
        }[];
        Date: string;
    }[];
    Subjects: {
        Id: number;
        Name: string;
        Abbrev: string;
    }[];
};

const Timetable: FunctionComponent<{permanent: boolean;}> = ({permanent}) => {
    const [date, setDate] = useState(new Date().toISOString());
    const [timetable, setTimetable] = useState<Timetable>();

    useEffect(() => {
        if (permanent) {
            API.fetch("timetable/permanent").then(setTimetable);
        } else {
            API.fetch("timetable/actual", {date}).then(setTimetable);
        }
    }, [date, permanent]);

    if (!timetable) {
        return null;
    }

    return (
        <>
            <IonModal keepContentsMounted>
                <IonDatetime
                    id="tt-date"
                    firstDayOfWeek={1}
                    value={date}
                    onIonChange={e => {
                        const value = e.detail.value;
                        if (typeof value === "string") {
                            setDate(value);
                        }
                    }}
                    presentation="date"
                />
            </IonModal>
            {permanent || (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Datum</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonDatetimeButton datetime="tt-date" />
                    </IonCardContent>
                </IonCard>
            )}
            {timetable.Days.map(({Atoms, Date: date}, i) => (
                <IonCard key={i}>
                    <IonCardHeader>
                        <IonCardTitle>{new Date(date).toLocaleDateString("cs-CZ", {
                            weekday: "long", 
                            day: permanent ? undefined : "numeric", 
                            month: permanent ? undefined : "long"
                        })}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            {Atoms.map(({HourId, SubjectId}, j) => (
                                <IonItem key={i + j}>
                                    <IonLabel>{timetable.Subjects.find(({Id}) => Id === SubjectId)?.Name || "Volná hodina"}</IonLabel>
                                    <IonLabel style={{textAlign: "right"}}>{timetable.Hours.find(({Id}) => Id === HourId)?.Caption}</IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                    </IonCardContent>
                </IonCard>
            ))}
        </>
    );
};

export default Timetable;