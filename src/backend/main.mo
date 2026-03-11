import Array "mo:core/Array";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type BookingRequest = {
    name : Text;
    service : Text;
    preferredDate : Text;
    phone : Text;
    email : Text;
  };

  module ContactSubmission {
    public func compare(sub1 : ContactSubmission, sub2 : ContactSubmission) : Order.Order {
      switch (Int.compare(sub1.timestamp, sub2.timestamp)) {
        case (#equal) { Text.compare(sub1.name, sub2.name) };
        case (order) { order };
      };
    };
  };

  module BookingRequest {
    public func compare(req1 : BookingRequest, req2 : BookingRequest) : Order.Order {
      switch (Text.compare(req1.preferredDate, req2.preferredDate)) {
        case (#equal) { Text.compare(req1.name, req2.name) };
        case (order) { order };
      };
    };
  };

  let contactSubmissionsMap = Map.empty<Principal, ContactSubmission>();
  let bookingRequestsMap = Map.empty<Principal, BookingRequest>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    if (contactSubmissionsMap.containsKey(caller)) {
      Runtime.trap("Contact form already submitted by this user.");
    };
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contactSubmissionsMap.add(caller, submission);
  };

  public shared ({ caller }) func bookService(name : Text, service : Text, preferredDate : Text, phone : Text, email : Text) : async () {
    if (bookingRequestsMap.containsKey(caller)) {
      Runtime.trap("Booking request already submitted by this user.");
    };
    let request : BookingRequest = {
      name;
      service;
      preferredDate;
      phone;
      email;
    };
    bookingRequestsMap.add(caller, request);
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissionsMap.values().toArray().sort();
  };

  public query ({ caller }) func getAllBookingRequests() : async [BookingRequest] {
    bookingRequestsMap.values().toArray().sort();
  };
};
