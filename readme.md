# Remote Hideaway
https://remote-hideaway.netlify.app

Project is written in React.js with Vite build tool, has protected routes. Implemented Supabase which is an open source Firebase alternative with a Postgres database, Authentication etc... Context is used for implementation of dark mode/theme change. React Query for handling requests along with hot toast for notifications. The project has Feature Based approach when it comes to files structure. Compound component pattern for Modals and Menus, also Tables, reusable components made combined with styled-components css.

## Description

- Users of the app are hotem employees. They need to be logged to perform tasks. New users can be signed up inside the app (to guarantee that actual hotel employees can get accounts). Users can upload an avatar, change their name and password.

- App needs table view for Cabins, cabin photo, name, capacity, price, discount. Users can create, edit, delete cabins.

- App needs table view for all Bookings, showing arrival and departure date, status, paid amount, cabin and guest data.
Booking statuses can be: "unconfirmed", "checked-in", "checked-out", table shuld be filterable by this statuses.
Booking data also includes info: guests number, number of nights, guest observation, is breakfast included, breakfast price.

Users can delete, check-in, check-out a booking (as guest arrives/leaves).

- Booking may not have been paid in advance yet, so on check-in users (employee) have to accept payment (outside the app), and then confirm the payment has been received (do this inside app on checking in a guest). On check-in, the guest can add breakfast additionally for the entire stay, in case they hadn't already.

- Guest data should contain: full name, email, national ID, nationality, country flag.

Initial app screen (dashboard) should display info for the last 7/30/90 days:
- A list of guests checking in/out on the current day (today). Users can perform this tasks from here.
- Statistics on recent bookings, sales, check-ins, occupancy rate (calculated)
- A chart showing sales, showing "total" sales and "extras" sales (which is breakfast only atm)
- A chart showing stay durations

- Users can define app settings! Currently they are read-only. Breakfast price, min/max nights, max guests

- Dark/light mode theme


## Installation
Vite build tool

npm install

npm run dev

## Technologies
Vite build tool, eslint

project uses feature based aproach

Desktop-First

supabase as database for storage and backend part

react hooks

Context

React Query

styled-components css

react-hot-toast for notifications, react-hook-form, react-icons, recharts, date-fns, react-error-boundary

### Posibble future improvements

Edit, or Add new booking from the app (for superuser) (if new guest appears or books by phone call).

Add exact date+time when check-in/check-out (arrival/departure) happened.

Maybe have 1 route /booking/:id and there handle everything about a booking (instead of having /checkin and /booking routes).

More detailed view of a Cabin, with multiple images of it, discount price in %, multuple images of a cabin, and maybe show ID.

Add restaurant page just with breakfast menu for start... Or Branch menu instead of just a breakfast.

Add restaurant page in the hotel, stackup an extra bill guests made so they have to pay at the departure.

After checkout, generate PDF invoice that we can mail to user... Regex for input fields etc...

Maybe add big list of All Guests and add search input...

Make this as a part of the website, so app users can view this app, but regular Guests can visit "/" landing page route and just view cabins, menu, pricing etc. (so we have 2 types of users: employee and guests)







