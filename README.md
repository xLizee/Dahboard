This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
- npm install
- npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

# DOCS

To see the different functions in more detail:
- Open docs
- Open index.html
If you want to see Diagram:
- Open docs
- Open Diagramme_dashboard.pdf

## Docker-compose

The project use a docker-compose dev and prod

For launch docker-compose dev:
- npm run dev:up
For launch docker-compose prod:
- npm run prod:up
For the status docker-compose:
- docker-compose ps

If you want rebuild you can add "--build" at the end of the order

## Services and Widgets

Services:
- Weather
- Clock
- Movies
- Crypto

Widgets:
- Weather, Displays the weather of the daily and weekly.
- Clock, Displays the date of the chosen timezone.
- Movies, one widget with the popular Movies, one widget with the top rated Movies, one widget with the upcoming Movies and one widget with playing now Movies.
- Crypto, displays the informations of volume, high, low, up and price of the chosen crypto

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
