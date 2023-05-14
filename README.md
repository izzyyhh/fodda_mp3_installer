This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Fian Fodda

Mp3 files are downloaded in **_ /downloads/ _** directory

## with Docker

To build:

```bash
docker build -t ${your_tag_here} .
```

To run:

```bash
docker run -v $(pwd)/downloads:/app/downloads -p 3000:3000 ${your_tag_here}
```

## Or, run the development server:

First Install dependencies:

```bash
npm i

```

Then run dev server:

```bash
npm run dev

```

## Or, run the production build:

First Install dependencies:

```bash
npm i

```

Then build:

```bash
npm run build

```

Then start:

```bash
npm run start

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
