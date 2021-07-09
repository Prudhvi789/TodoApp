import React from 'react';
import fire from '../fire';
import { useAuthState } from 'react-firebase-hooks/auth';

export const GetData = () => {
    const auth = fire.auth();
    const [user] = useAuthState(auth);
    const db = fire.firestore();
    const [documents, setDocuments] = React.useState([]);

    React.useEffect(() => {
        if(user){
            db.collection(`users/${user.uid}/tasks`)
            .get()
            .then((querySnapshot) => {
                let arr = [];
                querySnapshot.docs.map((doc) =>
                arr.push({ id: doc.id, name: doc.data().name, userId: doc.data().userId })
                );
                setDocuments(arr);
            });
        }
    }, [db,user]);
    return [documents];
}

