// General type interface source file

export interface Event {
    _id: string;
    eventId: string;
    eventName: string,
    eventDate: string,
    eventLocation: any,
    eventDescription: string,
    eventImage: string,
    eventOrganiser: string,
    eventTags: string[],
    eventPrivacy: boolean,
    eventAdmission: number,
    eventDuration: number,
    eventLikes: string[],
    currentUser: string,
}

export interface Card {
    eventId: string;
    eventName: string,
    eventDate: string,
    eventLocation: string,
    eventOrganiser: string,
    eventAdmission: number,
    eventImage: string,
    eventLikes: string[],
    currentUser: string,
}

export interface Session {
    user: {
    email: string,
    image: string,
    name: string,
    }
}

export interface CurrentUser {
name: string;
email: string;
image: string;
id: string;
}