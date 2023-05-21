# Chargebee Notion Blog Starter

This is sample Next.js starter site that uses Notion as CMS and Chargebee for managing membership subscriptions.

Authentication and user profile information is stored in [Supabase](https://supabase.com/) (PostgreSQL).

## Screenshot

<img src="https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/meta/bharathvaj.png?raw=true">

**Demo**: https://chargebee-blog-starter.vercel.app/

## Features

🚀 Fast and responsive

- Fast page render and responsive design
- Fast static and server side generation with efficient compiler

🔥 Membership

- Manage membership with Chargebee subscription easily

🤖 Deploy instantly

- Deploy on Vercel/Netlify in minutes
- Incremental regeneration and no need to redeploy after update the content in notion

🚙 Fully functional

- Comments, full width page, quick search and tag filter
- RSS, analytics, web vital... and much more

🎨 Easy for customization

- Rich config options, support English & Chinese interface
- Built with Tailwind CSS, easy for customization

🕸 Pretty URLs and SEO friendly

- Automatic OG image generation
- Meta tag generation to unfurl meta information on social platforms

## Built With

- [Next.js](https://nextjs.org/) – Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Notion](https://www.notion.so/) – Content
- [Chargebee](https://www.chargebee.com/) – Subscription
- [Supabase](https://supabase.com/) - Database & Authentication

## Getting Started

This project requires a recent version of Node.js (we recommend >= 16).

- Star this repo 😉
- Duplicate [this Notion template](https://bharathvaj-ganesan.notion.site/d51a395709e74a9eaae9f2cd3895f98c?v=1d2ea9e6652e4d508439ed5a9a73e08d). Make sure it is not public.
- Fork this project by clicking on `Use this template` action.
- Customize [blog.config.js](https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/blog.config.js). All config is defined in this file.
- (Optional) Replace favicon.png in /public folder with your own.
- For local development, run `cp .env.example .env.local` and update the following env properties.

### Configuration

| **Env Property**              | **How to get it ?**                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| NOTION_PAGE_ID                | The ID of the Notion page you previously shared to the web, usually has 32 digits after your workspace address |
| NOTION_ACCESS_TOKEN           | Notion Access Token                                                                                            |
| SUPABASE_SERVICE_KEY          | Supabase Admin Key                                                                                             |
| NEXT_PUBLIC_SUPABASE_URL      | Supabase project public URL.                                                                                   |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key.                                                                                        |
| NEXT_PUBLIC_CHARGEBEE_DOMAIN  | Chargebee Domain name.                                                                                         |
| CHARGEBEE_API_KEY             | Chargebee's Full access key.                                                                                   |
| DEFAULT_PLAN                  | Your default item plan id. - Eg. free                                                                          |
| API_ROUTE_SECRET              | Admin Secret Key to access our API                                                                             |

<details><summary>How to get Notion related envs</summary>
<img src="https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/meta/Notion-page-id.png?raw=true">
<img src="https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/meta/Notion-token.png?raw=true">
</details>

<details><summary>How to get Supabase related envs</summary>
<img src="https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/meta/Supabase.png?raw=true">
</details>

<details><summary>How to get Chargebee related envs</summary>
<img src="https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/meta/Chargebee.png?raw=true">
</details>

<details><summary>How to get API Route secret</summary>
Run this terminal command and use the value.

`openssl rand -base64 32`

</details>

- Run this following seed command once to setup Chargebee.
  `pnpm seed`

  This will create product catalog configuration needed for this blog starter to work. You can customize generated product catalog as per your preference.

- That's it! Easy-peasy? You now have blog running locally.
- Now you can deploy to Vercel using the following button and update the env property values.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/bharathvaj-ganesan/chargebee-blog-starter/tree/main&project-name=chargebee-notion-blog&repository-name=chargebee-notion-blog)

- Configure Supabase.

  - Copy the [seed.sql](https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/supabase/seed.sql) and in a freshly created Supabase project. Go to SQL Editor and run this sql script. This will create required tables, triggers and functions.
  - You also need to create a webhook in Supabase that watches the row insertions and triggers a HTTP call to our application to create new customer in Chargebee.
  - Finally configure Supabase Auth. You can add social SSO based on your requirement easily from Supabase console.

- Configure Chargebee
  - Create new webhook with path `{REPLACE_YOUR_BASE_URL}/api/webhooks`. This will allow Chargebee to inform our application about the subscription changes happening at their end.
  - <details><summary>How does it will look like</summary>
    <img src="https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/meta/Chargebee-webhook.png?raw=true">
    </details>

<details><summary>How to create ?</summary>
1. Webhook Name: create_chargebee_customer
2. Conditions: Table - profiles; Event - insert 
3. Type of Webhook - HTTP POST
4. Headers 
  - Content-type: application/json
  - x-api-secret: {{REPLACE_WITH_API_ROUTE_SECRET}}
5. Create
</details>

- Awesome. It's your time to write content. 🎉

## Contributing

We love our contributors! Here's how you can contribute:

[Open an issue](https://github.com/bharathvaj-ganesan/chargebee-blog-starter/issues/new) if you believe you've encountered a bug.
[Make a pull request](https://github.com/bharathvaj-ganesan/chargebee-blog-starter/pulls) to add new features/make quality-of-life improvements/fix bugs.

## Author

Bharathvaj Ganesan ([@bharathvaj_g](https://twitter.com/bharathvaj_g))

## License

Inspired by [Notion Blog](https://github.com/bharathvaj-ganesan/chargebee-blog-starter), this starter is open-source under the MIT. You can find it [here](https://github.com/bharathvaj-ganesan/chargebee-blog-starter/blob/main/LICENSE).
