import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface BookingRequest {
    service: string;
    name: string;
    email: string;
    preferredDate: string;
    phone: string;
}
export interface backendInterface {
    bookService(name: string, service: string, preferredDate: string, phone: string, email: string): Promise<void>;
    getAllBookingRequests(): Promise<Array<BookingRequest>>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
}
