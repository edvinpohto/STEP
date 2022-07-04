export interface Event {
    eventName: string,
    eventDate: Date,
    eventLocation: any,
    eventDescription: string,
    eventOrganiser: string,
    eventTags: string[],
    eventPrivacy: boolean,
    eventAdmission: number,
    eventDuration: number,
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